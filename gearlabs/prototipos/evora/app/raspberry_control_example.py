#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Exemplo de controle de sensores e atuadores para o protótipo Evora.
Este código demonstra como ler sensores e controlar atuadores usando Raspberry Pi.
"""

import time
import random
import json
from datetime import datetime
import logging

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Tentar importar bibliotecas de hardware
try:
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    HARDWARE_AVAILABLE = True
    logger.info("Biblioteca RPi.GPIO importada com sucesso")
except ImportError:
    HARDWARE_AVAILABLE = False
    logger.warning("Biblioteca RPi.GPIO não encontrada. Executando em modo de simulação.")

try:
    from gpiozero import PWMOutputDevice, DigitalOutputDevice, Button
    GPIOZERO_AVAILABLE = True
    logger.info("Biblioteca gpiozero importada com sucesso")
except ImportError:
    GPIOZERO_AVAILABLE = False
    logger.warning("Biblioteca gpiozero não encontrada. Usando alternativas.")

# Tentar importar biblioteca Flask para API REST
try:
    from flask import Flask, request, jsonify
    FLASK_AVAILABLE = True
    logger.info("Biblioteca Flask importada com sucesso")
except ImportError:
    FLASK_AVAILABLE = False
    logger.warning("Biblioteca Flask não encontrada. A API REST não estará disponível.")

# Tentar importar biblioteca MQTT
try:
    import paho.mqtt.client as mqtt
    MQTT_AVAILABLE = True
    logger.info("Biblioteca paho-mqtt importada com sucesso")
except ImportError:
    MQTT_AVAILABLE = False
    logger.warning("Biblioteca paho-mqtt não encontrada. O MQTT não estará disponível.")

# Configuração dos pinos GPIO
# ATENÇÃO: Verifique a pinagem do seu modelo de Raspberry Pi antes de conectar hardware
PINS = {
    'water_level_sensor': 4,    # Sensor de nível de água
    'flow_sensor': 17,          # Sensor de fluxo
    'rain_sensor': 27,          # Sensor de chuva
    'pump_relay': 22,           # Relé para controle da bomba
    'valve_relay': 23,          # Relé para controle da válvula
    'pump_pwm': 18              # Saída PWM para controle de velocidade da bomba
}

# Configuração da API
API_TOKEN = "evora_prototype_2023"  # Token simples para autenticação
API_HOST = "0.0.0.0"
API_PORT = 5000

# Configuração MQTT
MQTT_BROKER = "test.mosquitto.org"  # Broker público para testes
MQTT_PORT = 1883
MQTT_TOPIC_TELEMETRY = "evora/hydro/telemetry"
MQTT_TOPIC_COMMANDS = "evora/hydro/commands"
MQTT_CLIENT_ID = f"evora_raspberry_{random.randint(1000, 9999)}"

# Variáveis globais de estado
system_state = {
    "pump": False,
    "valve": False,
    "pump_speed": 50,  # Percentagem de velocidade (0-100)
    "water_level": 0,   # Nível de água em percentagem (0-100)
    "flow_rate": 0,     # Fluxo em L/min
    "is_raining": False
}

class HydroponicSystem:
    """Classe para controlar o sistema hidropônico do protótipo Evora."""
    
    def __init__(self):
        """Inicializa o sistema hidropônico."""
        self.setup_gpio()
        self.setup_api()
        self.setup_mqtt()
        
    def setup_gpio(self):
        """Configura os pinos GPIO."""
        if not HARDWARE_AVAILABLE:
            logger.warning("Hardware não disponível. Executando em modo de simulação.")
            return
            
        # Configurar pinos de entrada
        for pin_name in ['water_level_sensor', 'flow_sensor', 'rain_sensor']:
            pin = PINS[pin_name]
            GPIO.setup(pin, GPIO.IN)
            logger.info(f"Pino {pin} configurado como entrada para {pin_name}")
        
        # Configurar pinos de saída
        for pin_name in ['pump_relay', 'valve_relay']:
            pin = PINS[pin_name]
            GPIO.setup(pin, GPIO.OUT)
            GPIO.output(pin, GPIO.LOW)
            logger.info(f"Pino {pin} configurado como saída para {pin_name}")
            
        # Configurar saída PWM para a bomba
        if GPIOZERO_AVAILABLE:
            self.pump_pwm = PWMOutputDevice(PINS['pump_pwm'])
            self.pump_pwm.value = 0  # Inicialmente desligado
            logger.info(f"Pino {PINS['pump_pwm']} configurado como PWM para controle da bomba")
        else:
            logger.warning("gpiozero não disponível. Controle PWM não será funcional.")
    
    def setup_api(self):
        """Configura a API REST."""
        if not FLASK_AVAILABLE:
            logger.warning("Flask não disponível. API REST não será iniciada.")
            return
            
        self.app = Flask(__name__)
        
        @self.app.route('/api/status', methods=['GET'])
        def get_status():
            """Retorna o status atual do sistema."""
            return jsonify(system_state)
        
        @self.app.route('/api/pump', methods=['POST'])
        def control_pump():
            """Controla a bomba."""
            global system_state
            
            # Verificar token de autenticação
            if not self.authenticate(request):
                return jsonify({"error": "Unauthorized"}), 401
                
            data = request.get_json()
            if not data or 'state' not in data:
                return jsonify({"error": "Missing 'state' parameter"}), 400
                
            state = data['state']
            if isinstance(state, str):
                state = state.lower() in ['on', 'true', '1', 'yes']
                
            system_state['pump'] = state
            self.set_pump_state(state)
            
            return jsonify({"success": True, "pump_state": state})
        
        @self.app.route('/api/valve', methods=['POST'])
        def control_valve():
            """Controla a válvula."""
            global system_state
            
            # Verificar token de autenticação
            if not self.authenticate(request):
                return jsonify({"error": "Unauthorized"}), 401
                
            data = request.get_json()
            if not data or 'state' not in data:
                return jsonify({"error": "Missing 'state' parameter"}), 400
                
            state = data['state']
            if isinstance(state, str):
                state = state.lower() in ['on', 'true', '1', 'yes']
                
            system_state['valve'] = state
            self.set_valve_state(state)
            
            return jsonify({"success": True, "valve_state": state})
        
        @self.app.route('/api/pump_speed', methods=['POST'])
        def set_pump_speed():
            """Define a velocidade da bomba."""
            global system_state
            
            # Verificar token de autenticação
            if not self.authenticate(request):
                return jsonify({"error": "Unauthorized"}), 401
                
            data = request.get_json()
            if not data or 'speed' not in data:
                return jsonify({"error": "Missing 'speed' parameter"}), 400
                
            try:
                speed = int(data['speed'])
                if speed < 0 or speed > 100:
                    return jsonify({"error": "Speed must be between 0 and 100"}), 400
                    
                system_state['pump_speed'] = speed
                self.set_pump_speed(speed)
                
                return jsonify({"success": True, "pump_speed": speed})
            except ValueError:
                return jsonify({"error": "Invalid speed value"}), 400
        
        logger.info("API REST configurada")
    
    def setup_mqtt(self):
        """Configura o cliente MQTT."""
        if not MQTT_AVAILABLE:
            logger.warning("MQTT não disponível. Cliente MQTT não será iniciado.")
            return
            
        self.mqtt_client = mqtt.Client(MQTT_CLIENT_ID)
        
        # Configurar callbacks
        self.mqtt_client.on_connect = self.on_mqtt_connect
        self.mqtt_client.on_message = self.on_mqtt_message
        self.mqtt_client.on_disconnect = self.on_mqtt_disconnect
        
        try:
            self.mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
            self.mqtt_client.loop_start()
            logger.info(f"Cliente MQTT conectado ao broker {MQTT_BROKER}:{MQTT_PORT}")
        except Exception as e:
            logger.error(f"Erro ao conectar ao broker MQTT: {e}")
    
    def authenticate(self, request):
        """Verifica se a requisição está autenticada."""
        token = request.headers.get('X-API-Token') or request.args.get('token')
        return token == API_TOKEN
    
    def set_pump_state(self, state):
        """Liga ou desliga a bomba."""
        if not HARDWARE_AVAILABLE:
            logger.info(f"[SIMULAÇÃO] Bomba {'ligada' if state else 'desligada'}")
            return
            
        if GPIOZERO_AVAILABLE:
            if state:
                self.pump_pwm.value = system_state['pump_speed'] / 100
            else:
                self.pump_pwm.value = 0
        else:
            # Usar RPi.GPIO diretamente
            GPIO.output(PINS['pump_relay'], GPIO.HIGH if state else GPIO.LOW)
            
        logger.info(f"Bomba {'ligada' if state else 'desligada'}")
    
    def set_valve_state(self, state):
        """Abre ou fecha a válvula."""
        if not HARDWARE_AVAILABLE:
            logger.info(f"[SIMULAÇÃO] Válvula {'aberta' if state else 'fechada'}")
            return
            
        GPIO.output(PINS['valve_relay'], GPIO.HIGH if state else GPIO.LOW)
        logger.info(f"Válvula {'aberta' if state else 'fechada'}")
    
    def set_pump_speed(self, speed):
        """Define a velocidade da bomba (0-100%)."""
        if not HARDWARE_AVAILABLE:
            logger.info(f"[SIMULAÇÃO] Velocidade da bomba definida para {speed}%")
            return
            
        if GPIOZERO_AVAILABLE:
            self.pump_pwm.value = speed / 100
        else:
            logger.warning("Controle de velocidade precisa da biblioteca gpiozero")
            
        logger.info(f"Velocidade da bomba definida para {speed}%")
    
    def read_water_level(self):
        """Lê o sensor de nível de água."""
        if not HARDWARE_AVAILABLE:
            # Simular leitura
            level = random.uniform(20, 80)
            system_state['water_level'] = level
            return level
            
        # Ler o sensor de nível de água
        # NOTA: Implementação real depende do tipo de sensor
        # Exemplo para sensor analógico:
        #   value = GPIO.input(PINS['water_level_sensor'])
        #   level = self.map_value(value, 0, 1023, 0, 100)
        
        # Simulação para demonstração
        level = random.uniform(20, 80)
        system_state['water_level'] = level
        return level
    
    def read_flow_rate(self):
        """Lê o sensor de fluxo."""
        if not HARDWARE_AVAILABLE:
            # Simular leitura
            flow = random.uniform(0.5, 5.0) if system_state['pump'] else 0
            system_state['flow_rate'] = flow
            return flow
            
        # Ler o sensor de fluxo
        # NOTA: Implementação real depende do tipo de sensor
        # Exemplo para sensor de pulso:
        #   count = 0
        #   start_time = time.time()
        #   while time.time() - start_time < 1:
        #       if GPIO.input(PINS['flow_sensor']):
        #           count += 1
        #           time.sleep(0.01)
        #   flow = count * conversion_factor
        
        # Simulação para demonstração
        flow = random.uniform(0.5, 5.0) if system_state['pump'] else 0
        system_state['flow_rate'] = flow
        return flow
    
    def read_rain_sensor(self):
        """Lê o sensor de chuva."""
        if not HARDWARE_AVAILABLE:
            # Simular leitura
            raining = random.random() < 0.1  # 10% de chance de chuva
            system_state['is_raining'] = raining
            return raining
            
        # Ler o sensor de chuva
        # NOTA: Implementação real depende do tipo de sensor
        # raining = GPIO.input(PINS['rain_sensor']) == GPIO.LOW
        
        # Simulação para demonstração
        raining = random.random() < 0.1  # 10% de chance de chuva
        system_state['is_raining'] = raining
        return raining
    
    def publish_telemetry(self):
        """Publica dados de telemetria via MQTT."""
        if not MQTT_AVAILABLE or not hasattr(self, 'mqtt_client'):
            return
            
        telemetry = {
            "timestamp": datetime.now().isoformat(),
            "water_level": system_state['water_level'],
            "flow_rate": system_state['flow_rate'],
            "is_raining": system_state['is_raining'],
            "pump_state": system_state['pump'],
            "valve_state": system_state['valve'],
            "pump_speed": system_state['pump_speed']
        }
        
        try:
            self.mqtt_client.publish(
                MQTT_TOPIC_TELEMETRY, 
                json.dumps(telemetry),
                qos=1
            )
            logger.debug(f"Telemetria publicada: {telemetry}")
        except Exception as e:
            logger.error(f"Erro ao publicar telemetria: {e}")
    
    def on_mqtt_connect(self, client, userdata, flags, rc):
        """Callback chamado quando o cliente MQTT se conecta ao broker."""
        if rc == 0:
            logger.info("Conectado ao broker MQTT com sucesso")
            client.subscribe(MQTT_TOPIC_COMMANDS)
            logger.info(f"Inscrito no tópico: {MQTT_TOPIC_COMMANDS}")
        else:
            logger.error(f"Falha ao conectar ao broker MQTT. Código: {rc}")
    
    def on_mqtt_message(self, client, userdata, msg):
        """Callback chamado quando uma mensagem MQTT é recebida."""
        try:
            payload = json.loads(msg.payload.decode())
            logger.info(f"Comando MQTT recebido: {payload}")
            
            # Processar comandos
            if 'pump' in payload:
                state = payload['pump']
                if isinstance(state, str):
                    state = state.lower() in ['on', 'true', '1', 'yes']
                system_state['pump'] = state
                self.set_pump_state(state)
            
            if 'valve' in payload:
                state = payload['valve']
                if isinstance(state, str):
                    state = state.lower() in ['on', 'true', '1', 'yes']
                system_state['valve'] = state
                self.set_valve_state(state)
            
            if 'pump_speed' in payload:
                speed = int(payload['pump_speed'])
                if 0 <= speed <= 100:
                    system_state['pump_speed'] = speed
                    self.set_pump_speed(speed)
                    
        except Exception as e:
            logger.error(f"Erro ao processar mensagem MQTT: {e}")
    
    def on_mqtt_disconnect(self, client, userdata, rc):
        """Callback chamado quando o cliente MQTT é desconectado."""
        if rc != 0:
            logger.warning(f"Desconectado inesperadamente do broker MQTT. Código: {rc}")
            # Tentar reconectar
            try:
                client.reconnect()
            except:
                pass
    
    def run_api(self):
        """Inicia a API REST."""
        if not FLASK_AVAILABLE or not hasattr(self, 'app'):
            logger.error("API não disponível")
            return
            
        logger.info(f"Iniciando API REST em {API_HOST}:{API_PORT}")
        # ATENÇÃO: Em produção, use um servidor WSGI como Gunicorn
        self.app.run(host=API_HOST, port=API_PORT, threaded=True)
    
    def run(self):
        """Executa o sistema principal."""
        logger.info("Iniciando sistema hidropônico Evora")
        
        try:
            while True:
                # Ler sensores
                self.read_water_level()
                self.read_flow_rate()
                self.read_rain_sensor()
                
                # Publicar telemetria
                self.publish_telemetry()
                
                # Lógica de controle automático (opcional)
                # Exemplo: Se o nível de água estiver baixo e não estiver chovendo, ligar a bomba
                if system_state['water_level'] < 30 and not system_state['is_raining'] and not system_state['pump']:
                    logger.info("Nível de água baixo detectado. Ligando bomba automaticamente.")
                    system_state['pump'] = True
                    self.set_pump_state(True)
                
                # Exibir estado atual
                logger.debug(f"Estado do sistema: {system_state}")
                
                # Aguardar próximo ciclo
                time.sleep(5)
                
        except KeyboardInterrupt:
            logger.info("Sistema encerrado pelo usuário")
        except Exception as e:
            logger.error(f"Erro no sistema: {e}")
        finally:
            # Limpar recursos
            self.cleanup()
    
    def cleanup(self):
        """Limpa os recursos do sistema."""
        logger.info("Limpando recursos")
        
        # Desligar atuadores
        system_state['pump'] = False
        system_state['valve'] = False
        self.set_pump_state(False)
        self.set_valve_state(False)
        
        # Limpar GPIO
        if HARDWARE_AVAILABLE:
            GPIO.cleanup()
        
        # Parar cliente MQTT
        if MQTT_AVAILABLE and hasattr(self, 'mqtt_client'):
            self.mqtt_client.loop_stop()
            self.mqtt_client.disconnect()
        
        logger.info("Recursos limpos com sucesso")

if __name__ == "__main__":
    # ATENÇÃO: Antes de conectar hardware, verifique:
    # 1. Se os pinos estão corretos para o seu modelo de Raspberry Pi
    # 2. Se a tensão e corrente dos componentes são compatíveis
    # 3. Se você está usando fusíveis e proteções adequadas
    # 4. Se as conexões estão isoladas e seguras
    
    system = HydroponicSystem()
    
    # Iniciar API em uma thread separada (se disponível)
    if FLASK_AVAILABLE:
        import threading
        api_thread = threading.Thread(target=system.run_api)
        api_thread.daemon = True
        api_thread.start()
    
    # Executar sistema principal
    system.run()