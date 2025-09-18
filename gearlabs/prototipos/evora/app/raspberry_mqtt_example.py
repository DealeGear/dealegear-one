#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Exemplo de comunicação MQTT para o protótipo Evora.
Este código demonstra como publicar telemetria e receber comandos via MQTT.
"""

import time
import random
import json
import threading
import logging
from datetime import datetime

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Tentar importar biblioteca MQTT
try:
    import paho.mqtt.client as mqtt
    MQTT_AVAILABLE = True
    logger.info("Biblioteca paho-mqtt importada com sucesso")
except ImportError:
    MQTT_AVAILABLE = False
    logger.error("Biblioteca paho-mqtt não encontrada. Instale com: pip install paho-mqtt")

# Configuração MQTT
# ATENÇÃO: Em produção, use um broker privado com autenticação e TLS
MQTT_BROKER = "test.mosquitto.org"  # Broker público para testes
MQTT_PORT = 1883
MQTT_USERNAME = None  # Usuário para autenticação (None para broker público)
MQTT_PASSWORD = None  # Senha para autenticação (None para broker público)
MQTT_USE_TLS = False   # Usar TLS (recomendado em produção)

# Tópicos MQTT
# NOTA: Use tópicos específicos e segregados para melhor segurança
MQTT_CLIENT_ID = f"evora_mqtt_{random.randint(1000, 9999)}"
MQTT_TOPIC_TELEMETRY = "evora/hydro/telemetry"
MQTT_TOPIC_COMMANDS = "evora/hydro/commands"
MQTT_TOPIC_ALERTS = "evora/hydro/alerts"
MQTT_TOPIC_LOGS = "evora/hydro/logs"

# Intervalo de publicação de telemetria (em segundos)
TELEMETRY_INTERVAL = 10

# Variáveis globais de estado
system_state = {
    "pump": False,
    "valve": False,
    "pump_speed": 50,  # Percentagem de velocidade (0-100)
    "water_level": 0,   # Nível de água em percentagem (0-100)
    "flow_rate": 0,     # Fluxo em L/min
    "is_raining": False,
    "last_update": None
}

class EvoraMQTTClient:
    """Classe para comunicação MQTT do protótipo Evora."""
    
    def __init__(self):
        """Inicializa o cliente MQTT."""
        self.connected = False
        self.client = None
        self.setup_mqtt()
        
    def setup_mqtt(self):
        """Configura o cliente MQTT."""
        if not MQTT_AVAILABLE:
            logger.error("MQTT não disponível. Verifique se a biblioteca paho-mqtt está instalada.")
            return
            
        # Criar cliente MQTT
        self.client = mqtt.Client(MQTT_CLIENT_ID)
        
        # Configurar callbacks
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_disconnect = self.on_disconnect
        self.client.on_publish = self.on_publish
        
        # Configurar autenticação, se necessário
        if MQTT_USERNAME and MQTT_PASSWORD:
            self.client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
        
        # Configurar TLS, se necessário
        if MQTT_USE_TLS:
            # NOTA: Em produção, configure adequadamente o TLS
            # self.client.tls_set(ca_certs="/path/to/ca.crt")
            logger.warning("TLS não configurado. Adicione certificados para uso em produção.")
        
        try:
            # Conectar ao broker
            self.client.connect(MQTT_BROKER, MQTT_PORT, 60)
            logger.info(f"Tentando conectar ao broker MQTT {MQTT_BROKER}:{MQTT_PORT}")
        except Exception as e:
            logger.error(f"Erro ao conectar ao broker MQTT: {e}")
    
    def on_connect(self, client, userdata, flags, rc):
        """Callback chamado quando o cliente se conecta ao broker."""
        if rc == 0:
            self.connected = True
            logger.info("Conectado ao broker MQTT com sucesso")
            
            # Inscrever nos tópicos de comando
            client.subscribe(MQTT_TOPIC_COMMANDS)
            logger.info(f"Inscrito no tópico de comandos: {MQTT_TOPIC_COMMANDS}")
            
            # Publicar mensagem de conexão
            self.publish_connection_status(True)
        else:
            logger.error(f"Falha ao conectar ao broker MQTT. Código: {rc}")
            self.connected = False
    
    def on_disconnect(self, client, userdata, rc):
        """Callback chamado quando o cliente é desconectado."""
        self.connected = False
        if rc != 0:
            logger.warning(f"Desconectado inesperadamente do broker MQTT. Código: {rc}")
            # Tentar reconectar após um intervalo
            time.sleep(5)
            try:
                client.reconnect()
            except:
                logger.error("Falha ao reconectar ao broker MQTT")
        else:
            logger.info("Desconectado do broker MQTT")
    
    def on_message(self, client, userdata, msg):
        """Callback chamado quando uma mensagem é recebida."""
        try:
            topic = msg.topic
            payload = json.loads(msg.payload.decode())
            logger.info(f"Mensagem recebida no tópico {topic}: {payload}")
            
            # Processar comandos
            if topic == MQTT_TOPIC_COMMANDS:
                self.process_command(payload)
            else:
                logger.warning(f"Tópico não reconhecido: {topic}")
                
        except json.JSONDecodeError:
            logger.error("Erro ao decodificar payload JSON")
        except Exception as e:
            logger.error(f"Erro ao processar mensagem: {e}")
    
    def on_publish(self, client, userdata, mid):
        """Callback chamado quando uma mensagem é publicada com sucesso."""
        logger.debug(f"Mensagem publicada com sucesso. MID: {mid}")
    
    def process_command(self, command):
        """Processa comandos recebidos via MQTT."""
        try:
            # Atualizar timestamp
            system_state["last_update"] = datetime.now().isoformat()
            
            # Processar comando da bomba
            if "pump" in command:
                pump_state = command["pump"]
                if isinstance(pump_state, str):
                    pump_state = pump_state.lower() in ["on", "true", "1", "yes"]
                
                system_state["pump"] = pump_state
                logger.info(f"Comando recebido: Bomba {'ligada' if pump_state else 'desligada'}")
                
                # Aqui você chamaria a função para controlar a bomba fisicamente
                # self.set_pump_state(pump_state)
            
            # Processar comando da válvula
            if "valve" in command:
                valve_state = command["valve"]
                if isinstance(valve_state, str):
                    valve_state = valve_state.lower() in ["on", "true", "1", "yes"]
                
                system_state["valve"] = valve_state
                logger.info(f"Comando recebido: Válvula {'aberta' if valve_state else 'fechada'}")
                
                # Aqui você chamaria a função para controlar a válvula fisicamente
                # self.set_valve_state(valve_state)
            
            # Processar comando de velocidade da bomba
            if "pump_speed" in command:
                try:
                    speed = int(command["pump_speed"])
                    if 0 <= speed <= 100:
                        system_state["pump_speed"] = speed
                        logger.info(f"Comando recebido: Velocidade da bomba ajustada para {speed}%")
                        
                        # Aqui você chamaria a função para ajustar a velocidade da bomba
                        # self.set_pump_speed(speed)
                    else:
                        logger.warning(f"Velocidade da bomba inválida: {speed}. Deve estar entre 0 e 100.")
                except ValueError:
                    logger.error("Velocidade da bomba inválida. Deve ser um número inteiro.")
            
            # Publicar confirmação de comando
            self.publish_command_ack(command)
            
        except Exception as e:
            logger.error(f"Erro ao processar comando: {e}")
            self.publish_alert(f"Erro ao processar comando: {str(e)}")
    
    def publish_telemetry(self):
        """Publica dados de telemetria."""
        if not self.connected:
            logger.warning("Não conectado ao broker MQTT. Não foi possível publicar telemetria.")
            return
            
        try:
            # Simular leitura de sensores
            # Em um ambiente real, você obteria esses valores dos sensores físicos
            self.simulate_sensor_readings()
            
            # Criar payload de telemetria
            telemetry = {
                "timestamp": datetime.now().isoformat(),
                "client_id": MQTT_CLIENT_ID,
                "water_level": system_state["water_level"],
                "flow_rate": system_state["flow_rate"],
                "is_raining": system_state["is_raining"],
                "pump_state": system_state["pump"],
                "valve_state": system_state["valve"],
                "pump_speed": system_state["pump_speed"]
            }
            
            # Publicar telemetria
            result = self.client.publish(
                MQTT_TOPIC_TELEMETRY,
                json.dumps(telemetry),
                qos=1  # QoS 1 para garantir entrega
            )
            
            if result.rc == mqtt.MQTT_ERR_SUCCESS:
                logger.debug(f"Telemetria publicada com sucesso")
            else:
                logger.error(f"Falha ao publicar telemetria. Código: {result.rc}")
                
        except Exception as e:
            logger.error(f"Erro ao publicar telemetria: {e}")
    
    def publish_connection_status(self, connected):
        """Publica o status da conexão."""
        if not self.connected:
            return
            
        try:
            status = {
                "timestamp": datetime.now().isoformat(),
                "client_id": MQTT_CLIENT_ID,
                "status": "connected" if connected else "disconnected"
            }
            
            self.client.publish(
                f"{MQTT_TOPIC_LOGS}/connection",
                json.dumps(status),
                qos=1
            )
            
        except Exception as e:
            logger.error(f"Erro ao publicar status de conexão: {e}")
    
    def publish_command_ack(self, command):
        """Publica confirmação de recebimento de comando."""
        if not self.connected:
            return
            
        try:
            ack = {
                "timestamp": datetime.now().isoformat(),
                "client_id": MQTT_CLIENT_ID,
                "command": command,
                "status": "acknowledged"
            }
            
            self.client.publish(
                f"{MQTT_TOPIC_LOGS}/commands",
                json.dumps(ack),
                qos=1
            )
            
        except Exception as e:
            logger.error(f"Erro ao publicar confirmação de comando: {e}")
    
    def publish_alert(self, message):
        """Publica um alerta."""
        if not self.connected:
            return
            
        try:
            alert = {
                "timestamp": datetime.now().isoformat(),
                "client_id": MQTT_CLIENT_ID,
                "level": "warning",
                "message": message
            }
            
            self.client.publish(
                MQTT_TOPIC_ALERTS,
                json.dumps(alert),
                qos=2  # QoS 2 para alertas críticos
            )
            
        except Exception as e:
            logger.error(f"Erro ao publicar alerta: {e}")
    
    def simulate_sensor_readings(self):
        """Simula leituras de sensores para demonstração."""
        # Simular nível de água (varia lentamente)
        if system_state["pump"]:
            # Se a bomba está ligada, o nível aumenta
            system_state["water_level"] = min(100, system_state["water_level"] + random.uniform(0, 2))
        else:
            # Se a bomba está desligada, o nível diminui lentamente
            system_state["water_level"] = max(0, system_state["water_level"] - random.uniform(0, 0.5))
        
        # Simular fluxo de água
        if system_state["pump"]:
            # Fluxo proporcional à velocidade da bomba
            base_flow = system_state["pump_speed"] / 20  # 0-5 L/min
            system_state["flow_rate"] = base_flow * random.uniform(0.9, 1.1)
        else:
            system_state["flow_rate"] = 0
        
        # Simular chuva (aleatório)
        if random.random() < 0.05:  # 5% de chance de começar a chover
            system_state["is_raining"] = True
        elif system_state["is_raining"] and random.random() < 0.2:  # 20% de chance de parar de chover
            system_state["is_raining"] = False
        
        # Verificar condições de alerta
        if system_state["water_level"] < 20:
            self.publish_alert("Nível de água baixo")
        elif system_state["water_level"] > 90:
            self.publish_alert("Nível de água alto")
    
    def start_telemetry_loop(self):
        """Inicia o loop de publicação de telemetria em uma thread separada."""
        def telemetry_loop():
            while True:
                if self.connected:
                    self.publish_telemetry()
                time.sleep(TELEMETRY_INTERVAL)
        
        telemetry_thread = threading.Thread(target=telemetry_loop)
        telemetry_thread.daemon = True
        telemetry_thread.start()
        logger.info(f"Loop de telemetria iniciado com intervalo de {TELEMETRY_INTERVAL} segundos")
    
    def run(self):
        """Executa o cliente MQTT."""
        if not MQTT_AVAILABLE:
            logger.error("MQTT não disponível. Encerrando.")
            return
            
        try:
            # Iniciar loop de rede do MQTT
            self.client.loop_start()
            
            # Iniciar loop de telemetria
            self.start_telemetry_loop()
            
            # Manter o programa em execução
            logger.info("Cliente MQTT em execução. Pressione Ctrl+C para encerrar.")
            while True:
                time.sleep(1)
                
        except KeyboardInterrupt:
            logger.info("Encerrando cliente MQTT...")
        except Exception as e:
            logger.error(f"Erro no cliente MQTT: {e}")
        finally:
            # Limpar recursos
            self.cleanup()
    
    def cleanup(self):
        """Limpa os recursos do cliente MQTT."""
        logger.info("Limpando recursos do cliente MQTT")
        
        if self.client:
            # Publicar status de desconexão
            self.publish_connection_status(False)
            
            # Parar loop de rede
            self.client.loop_stop()
            
            # Desconectar
            self.client.disconnect()
        
        logger.info("Cliente MQTT encerrado")

if __name__ == "__main__":
    # ATENÇÃO: Para uso em produção:
    # 1. Use um broker MQTT privado e seguro
    # 2. Configure autenticação com usuário e senha
    # 3. Habilite TLS para criptografia
    # 4. Use tópicos específicos e bem definidos
    # 5. Implemente controle de acesso adequado
    
    client = EvoraMQTTClient()
    client.run()