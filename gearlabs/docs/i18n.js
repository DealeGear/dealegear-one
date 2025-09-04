// Multilingual content
const i18n = {
    pt: {
        overview: "Visão Geral",
        objective: "Objetivo",
        application: "Aplicação",
        architecture: "Arquitetura",
        userGuide: "Guia de Uso",
        nextSteps: "Perspectivas",
        
        // MyHeart
        myHeart: {
            overview: {
                title: "Visão Geral",
                content: "<p>O MyHeart é uma plataforma de saúde digital que monitora sinais vitais e oferece recomendações personalizadas para melhorar a saúde cardiovascular.</p><p>Desenvolvido com tecnologias de ponta, o MyHeart integra dados de wearables e dispositivos médicos para fornecer uma visão completa da saúde do usuário.</p>"
            },
            objective: {
                title: "Objetivo",
                content: "<p>O principal objetivo do MyHeart é reduzir a incidência de doenças cardiovasculares através da prevenção e monitoramento contínuo.</p><p>Metas específicas:</p><ul><li>Monitorar sinais vitais em tempo real</li><li>Identificar padrões de risco</li><li>Fornecer recomendações personalizadas</li><li>Educar sobre saúde cardiovascular</li></ul>"
            },
            application: {
                title: "Aplicação",
                content: "<p>O MyHeart é aplicável em diversos contextos:</p><ul><li><strong>Uso pessoal:</strong> Indivíduos que desejam monitorar sua saúde cardiovascular</li><li><strong>Profissionais de saúde:</strong> Médicos e enfermeiros que acompanham pacientes</li><li><strong>Instituições:</strong> Hospitais e clínicas que integram o sistema em seus protocolos</li></ul>"
            },
            architecture: {
                title: "Arquitetura",
                content: "<p>A arquitetura do MyHeart é baseada em microsserviços:</p><ul><li><strong>API Gateway:</strong> Ponto único de entrada para todas as requisições</li><li><strong>Serviço de Autenticação:</strong> Gerencia identidades e permissões</li><li><strong>Serviço de Dados:</strong> Armazena e processa dados de saúde</li><li><strong>Serviço de Análise:</strong> Gera insights e recomendações</li><li><strong>Serviço de Notificação:</strong> Envia alertas e lembretes</li></ul>"
            },
            userGuide: {
                title: "Guia de Uso",
                content: "<p>Para começar a usar o MyHeart:</p><ol><li>Baixe o aplicativo na App Store ou Google Play</li><li>Crie sua conta com informações básicas de saúde</li><li>Conecte seus dispositivos wearables</li><li>Configure suas metas e preferências</li><li>Comece a monitorar sua saúde cardiovascular</li></ol><p>Para mais informações, consulte nossa documentação completa.</p>"
            },
            nextSteps: {
                title: "Perspectivas",
                content: "<p>O futuro do MyHeart inclui:</p><ul><li>Integração com mais dispositivos médicos</li><li>Expansão para outras áreas de saúde</li><li>Desenvolvimento de IA preditiva mais avançada</li><li>Parcerias com instituições de saúde</li><li>Lançamento internacional</li></ul>"
            }
        },
        
        // BaristaPro
        baristaPro: {
            overview: {
                title: "Visão Geral",
                content: "<p>O BaristaPro é um sistema completo para gestão de cafeterias, desde o controle de estoque até o atendimento ao cliente.</p><p>Com uma interface intuitiva e funcionalidades robustas, o BaristaPro otimiza operações e melhora a experiência do cliente em estabelecimentos de café.</p>"
            },
            objective: {
                title: "Objetivo",
                content: "<p>O BaristaPro foi desenvolvido para simplificar a gestão de cafeterias, permitindo que os proprietários se concentrem na qualidade do serviço e na experiência do cliente.</p><p>Principais objetivos:</p><ul><li>Automatizar processos operacionais</li><li>Controlar estoque e fornecedores</li><li>Melhorar o atendimento ao cliente</li><li>Gerar relatórios de desempenho</li></ul>"
            },
            application: {
                title: "Aplicação",
                content: "<p>O BaristaPro é ideal para:</p><ul><li><strong>Cafeterias independentes:</strong> Estabelecimentos pequenos e médios</li><li><strong>Redes de café:</strong> Múltiplas localizações com gestão centralizada</li><li><strong>Baristas profissionais:</strong> Ferramentas para aprimorar o serviço</li><li><strong>Fornecedores:</strong> Integração com cadeia de suprimentos</li></ul>"
            },
            architecture: {
                title: "Arquitetura",
                content: "<p>A arquitetura do BaristaPro segue o modelo MVC:</p><ul><li><strong>Frontend:</strong> Interface responsiva desenvolvida em React</li><li><strong>Backend:</strong> API RESTful em Node.js</li><li><strong>Banco de Dados:</strong> PostgreSQL para dados relacionais</li><li><strong>Autenticação:</strong> JWT para segurança</li><li><strong>Hospedagem:</strong> Nuvem com escalabilidade automática</li></ul>"
            },
            userGuide: {
                title: "Guia de Uso",
                content: "<p>Para começar com o BaristaPro:</p><ol><li>Cadastre sua cafeteria e informações básicas</li><li>Adicione seus produtos ao catálogo</li><li>Configure seu estoque inicial</li><li>Cadastre seus funcionários e defina permissões</li><li>Comece a usar o sistema de PDV</li></ol><p>Consulte nosso manual completo para detalhes avançados.</p>"
            },
            nextSteps: {
                title: "Perspectivas",
                content: "<p>Próximos passos para o BaristaPro:</p><ul><li>Desenvolvimento de aplicativo mobile para clientes</li><li>Integração com sistemas de pagamento</li><li>Expansão para outros tipos de estabelecimentos</li><li>Implementação de IA para análise de preferências</li><li>Parcerias com fornecedores de café</li></ul>"
            }
        },
        
        // Synapse
        synapse: {
            overview: {
                title: "Visão Geral",
                content: "<p>O Synapse é uma plataforma de inteligência artificial que processa grandes volumes de dados para gerar insights acionáveis.</p><p>Com algoritmos avançados de machine learning, o Synapse identifica padrões e tendências que ajudam empresas a tomar decisões estratégicas.</p>"
            },
            objective: {
                title: "Objetivo",
                content: "<p>O objetivo do Synapse é democratizar o acesso à inteligência artificial, permitindo que empresas de todos os tamanhos aproveitem o poder dos dados.</p><p>Principais metas:</p><ul><li>Simplificar a análise de dados complexos</li><li>Automatizar a geração de insights</li><li>Oferecer previsões precisas</li><li>Integrar-se com sistemas existentes</li></ul>"
            },
            application: {
                title: "Aplicação",
                content: "<p>O Synapse pode ser aplicado em diversos setores:</p><ul><li><strong>Varejo:</strong> Análise de comportamento do consumidor</li><li><strong>Finanças:</strong> Detecção de fraudes e análise de risco</li><li><strong>Saúde:</strong> Diagnóstico auxiliado por IA</li><li><strong>Manufatura:</strong> Otimização de processos e previsão de demanda</li></ul>"
            },
            architecture: {
                title: "Arquitetura",
                content: "<p>A arquitetura do Synapse é baseada em:</p><ul><li><strong>Camada de Ingestão:</strong> Coleta e processamento de dados de diversas fontes</li><li><strong>Camada de Armazenamento:</strong> Data lakes e data warehouses otimizados</li><li><strong>Camada de Processamento:</strong> Motores de processamento distribuído</li><li><strong>Camada de IA:</strong> Modelos de machine learning e deep learning</li><li><strong>Camada de Apresentação:</strong> Dashboards e APIs para integração</li></ul>"
            },
            userGuide: {
                title: "Guia de Uso",
                content: "<p>Para começar a usar o Synapse:</p><ol><li>Conecte suas fontes de dados</li><li>Configure os parâmetros de análise</li><li>Selecione os modelos de IA adequados</li><li>Defina como receber os insights</li><li>Monitore os resultados e ajuste conforme necessário</li></ol><p>Nossa documentação detalhada oferece guias para cada etapa.</p>"
            },
            nextSteps: {
                title: "Perspectivas",
                content: "<p>O futuro do Synapse inclui:</p><ul><li>Expansão para mais modelos de IA especializados</li><li>Interface de processamento de linguagem natural</li><li>Integração com IoT para dados em tempo real</li><li>Soluções específicas para indústrias verticais</li><li>Parcerias com provedores de dados</li></ul>"
            }
        }
    },
    
    en: {
        overview: "Overview",
        objective: "Objective",
        application: "Application",
        architecture: "Architecture",
        userGuide: "User Guide",
        nextSteps: "Next Steps",
        
        // MyHeart
        myHeart: {
            overview: {
                title: "Overview",
                content: "<p>MyHeart is a digital health platform that monitors vital signs and provides personalized recommendations to improve cardiovascular health.</p><p>Developed with cutting-edge technologies, MyHeart integrates data from wearables and medical devices to provide a comprehensive view of the user's health.</p>"
            },
            objective: {
                title: "Objective",
                content: "<p>The main objective of MyHeart is to reduce the incidence of cardiovascular diseases through prevention and continuous monitoring.</p><p>Specific goals:</p><ul><li>Monitor vital signs in real-time</li><li>Identify risk patterns</li><li>Provide personalized recommendations</li><li>Educate about cardiovascular health</li></ul>"
            },
            application: {
                title: "Application",
                content: "<p>MyHeart is applicable in various contexts:</p><ul><li><strong>Personal use:</strong> Individuals who want to monitor their cardiovascular health</li><li><strong>Healthcare professionals:</strong> Doctors and nurses who monitor patients</li><li><strong>Institutions:</strong> Hospitals and clinics that integrate the system into their protocols</li></ul>"
            },
            architecture: {
                title: "Architecture",
                content: "<p>MyHeart's architecture is based on microservices:</p><ul><li><strong>API Gateway:</strong> Single entry point for all requests</li><li><strong>Authentication Service:</strong> Manages identities and permissions</li><li><strong>Data Service:</strong> Stores and processes health data</li><li><strong>Analysis Service:</strong> Generates insights and recommendations</li><li><strong>Notification Service:</strong> Sends alerts and reminders</li></ul>"
            },
            userGuide: {
                title: "User Guide",
                content: "<p>To get started with MyHeart:</p><ol><li>Download the app from the App Store or Google Play</li><li>Create your account with basic health information</li><li>Connect your wearable devices</li><li>Set your goals and preferences</li><li>Start monitoring your cardiovascular health</li></ol><p>For more information, consult our complete documentation.</p>"
            },
            nextSteps: {
                title: "Next Steps",
                content: "<p>The future of MyHeart includes:</p><ul><li>Integration with more medical devices</li><li>Expansion to other health areas</li><li>Development of more advanced predictive AI</li><li>Partnerships with health institutions</li><li>International launch</li></ul>"
            }
        },
        
        // BaristaPro
        baristaPro: {
            overview: {
                title: "Overview",
                content: "<p>BaristaPro is a complete system for coffee shop management, from inventory control to customer service.</p><p>With an intuitive interface and robust features, BaristaPro optimizes operations and improves the customer experience in coffee establishments.</p>"
            },
            objective: {
                title: "Objective",
                content: "<p>BaristaPro was developed to simplify coffee shop management, allowing owners to focus on service quality and customer experience.</p><p>Main objectives:</p><ul><li>Automate operational processes</li><li>Control inventory and suppliers</li><li>Improve customer service</li><li>Generate performance reports</li></ul>"
            },
            application: {
                title: "Application",
                content: "<p>BaristaPro is ideal for:</p><ul><li><strong>Independent coffee shops:</strong> Small and medium establishments</li><li><strong>Coffee chains:</strong> Multiple locations with centralized management</li><li><strong>Professional baristas:</strong> Tools to enhance service</li><li><strong>Suppliers:</strong> Integration with supply chain</li></ul>"
            },
            architecture: {
                title: "Architecture",
                content: "<p>BaristaPro's architecture follows the MVC model:</p><ul><li><strong>Frontend:</strong> Responsive interface developed in React</li><li><strong>Backend:</strong> RESTful API in Node.js</li><li><strong>Database:</strong> PostgreSQL for relational data</li><li><strong>Authentication:</strong> JWT for security</li><li><strong>Hosting:</strong> Cloud with automatic scalability</li></ul>"
            },
            userGuide: {
                title: "User Guide",
                content: "<p>To get started with BaristaPro:</p><ol><li>Register your coffee shop and basic information</li><li>Add your products to the catalog</li><li>Set up your initial inventory</li><li>Register your employees and define permissions</li><li>Start using the POS system</li></ol><p>Consult our complete manual for advanced details.</p>"
            },
            nextSteps: {
                title: "Next Steps",
                content: "<p>Next steps for BaristaPro:</p><ul><li>Development of mobile app for customers</li><li>Integration with payment systems</li><li>Expansion to other types of establishments</li><li>Implementation of AI for preference analysis</li><li>Partnerships with coffee suppliers</li></ul>"
            }
        },
        
        // Synapse
        synapse: {
            overview: {
                title: "Overview",
                content: "<p>Synapse is an artificial intelligence platform that processes large volumes of data to generate actionable insights.</p><p>With advanced machine learning algorithms, Synapse identifies patterns and trends that help companies make strategic decisions.</p>"
            },
            objective: {
                title: "Objective",
                content: "<p>The goal of Synapse is to democratize access to artificial intelligence, allowing companies of all sizes to leverage the power of data.</p><p>Main goals:</p><ul><li>Simplify complex data analysis</li><li>Automate insight generation</li><li>Provide accurate predictions</li><li>Integrate with existing systems</li></ul>"
            },
            application: {
                title: "Application",
                content: "<p>Synapse can be applied in various sectors:</p><ul><li><strong>Retail:</strong> Consumer behavior analysis</li><li><strong>Finance:</strong> Fraud detection and risk analysis</li><li><strong>Healthcare:</strong> AI-assisted diagnosis</li><li><strong>Manufacturing:</strong> Process optimization and demand forecasting</li></ul>"
            },
            architecture: {
                title: "Architecture",
                content: "<p>Synapse's architecture is based on:</p><ul><li><strong>Ingestion Layer:</strong> Collection and processing of data from various sources</li><li><strong>Storage Layer:</strong> Optimized data lakes and data warehouses</li><li><strong>Processing Layer:</strong> Distributed processing engines</li><li><strong>AI Layer:</strong> Machine learning and deep learning models</li><li><strong>Presentation Layer:</strong> Dashboards and APIs for integration</li></ul>"
            },
            userGuide: {
                title: "User Guide",
                content: "<p>To get started with Synapse:</p><ol><li>Connect your data sources</li><li>Configure analysis parameters</li><li>Select appropriate AI models</li><li>Define how to receive insights</li><li>Monitor results and adjust as needed</li></ol><p>Our detailed documentation offers guides for each step.</p>"
            },
            nextSteps: {
                title: "Next Steps",
                content: "<p>The future of Synapse includes:</p><ul><li>Expansion to more specialized AI models</li><li>Natural language processing interface</li><li>IoT integration for real-time data</li><li>Specific solutions for vertical industries</li><li>Partnerships with data providers</li></ul>"
            }
        }
    },
    
    es: {
        overview: "Visión General",
        objective: "Objetivo",
        application: "Aplicación",
        architecture: "Arquitectura",
        userGuide: "Guía de Uso",
        nextSteps: "Perspectivas",
        
        // MyHeart
        myHeart: {
            overview: {
                title: "Visión General",
                content: "<p>MyHeart es una plataforma de salud digital que monitorea signos vitales y ofrece recomendaciones personalizadas para mejorar la salud cardiovascular.</p><p>Desarrollado con tecnologías de punta, MyHeart integra datos de wearables y dispositivos médicos para proporcionar una visión completa de la salud del usuario.</p>"
            },
            objective: {
                title: "Objetivo",
                content: "<p>El objetivo principal de MyHeart es reducir la incidencia de enfermedades cardiovasculares a través de la prevención y el monitoreo continuo.</p><p>Metas específicas:</p><ul><li>Monitorear signos vitales en tiempo real</li><li>Identificar patrones de riesgo</li><li>Proporcionar recomendaciones personalizadas</li><li>Educar sobre salud cardiovascular</li></ul>"
            },
            application: {
                title: "Aplicación",
                content: "<p>MyHeart es aplicable en varios contextos:</p><ul><li><strong>Uso personal:</strong> Individuos que desean monitorear su salud cardiovascular</li><li><strong>Profesionales de la salud:</strong> Médicos y enfermeras que monitorean pacientes</li><li><strong>Instituciones:</strong> Hospitales y clínicas que integran el sistema en sus protocolos</li></ul>"
            },
            architecture: {
                title: "Arquitectura",
                content: "<p>La arquitectura de MyHeart se basa en microservicios:</p><ul><li><strong>API Gateway:</strong> Punto único de entrada para todas las solicitudes</li><li><strong>Servicio de Autenticación:</strong> Gestiona identidades y permisos</li><li><strong>Servicio de Datos:</strong> Almacena y procesa datos de salud</li><li><strong>Servicio de Análisis:</strong> Genera información y recomendaciones</li><li><strong>Servicio de Notificación:</strong> Envía alertas y recordatorios</li></ul>"
            },
            userGuide: {
                title: "Guía de Uso",
                content: "<p>Para comenzar a usar MyHeart:</p><ol><li>Descargue la aplicación en App Store o Google Play</li><li>Cree su cuenta con información básica de salud</li><li>Conecte sus dispositivos wearables</li><li>Configure sus metas y preferencias</li><li>Comience a monitorear su salud cardiovascular</li></ol><p>Para obtener más información, consulte nuestra documentación completa.</p>"
            },
            nextSteps: {
                title: "Perspectivas",
                content: "<p>El futuro de MyHeart incluye:</p><ul><li>Integración con más dispositivos médicos</li><li>Expansión a otras áreas de la salud</li><li>Desarrollo de IA predictiva más avanzada</li><li>Asociaciones con instituciones de salud</li><li>Lanzamiento internacional</li></ul>"
            }
        },
        
        // BaristaPro
        baristaPro: {
            overview: {
                title: "Visión General",
                content: "<p>BaristaPro es un sistema completo para la gestión de cafeterías, desde el control de inventario hasta la atención al cliente.</p><p>Con una interfaz intuitiva y funcionalidades robustas, BaristaPro optimiza las operaciones y mejora la experiencia del cliente en establecimientos de café.</p>"
            },
            objective: {
                title: "Objetivo",
                content: "<p>BaristaPro fue desarrollado para simplificar la gestión de cafeterías, permitiendo que los propietarios se concentren en la calidad del servicio y en la experiencia del cliente.</p><p>Principales objetivos:</p><ul><li>Automatizar procesos operativos</li><li>Controlar inventario y proveedores</li><li>Mejorar la atención al cliente</li><li>Generar informes de rendimiento</li></ul>"
            },
            application: {
                title: "Aplicación",
                content: "<p>BaristaPro es ideal para:</p><ul><li><strong>Cafeterías independientes:</strong> Establecimientos pequeños y medianos</li><li><strong>Redes de café:</strong> Múltiples ubicaciones con gestión centralizada</li><li><strong>Baristas profesionales:</strong> Herramientas para mejorar el servicio</li><li><strong>Proveedores:</strong> Integración con la cadena de suministro</li></ul>"
            },
            architecture: {
                title: "Arquitectura",
                content: "<p>La arquitectura de BaristaPro sigue el modelo MVC:</p><ul><li><strong>Frontend:</strong> Interfaz receptiva desarrollada en React</li><li><strong>Backend:</strong> API RESTful en Node.js</li><li><strong>Base de Datos:</strong> PostgreSQL para datos relacionales</li><li><strong>Autenticación:</strong> JWT para seguridad</li><li><strong>Hospedaje:</strong> Nube con escalabilidad automática</li></ul>"
            },
            userGuide: {
                title: "Guía de Uso",
                content: "<p>Para comenzar con BaristaPro:</p><ol><li>Registre su cafetería e información básica</li><li>Agregue sus productos al catálogo</li><li>Configure su inventario inicial</li><li>Registre a sus empleados y defina permisos</li><li>Comience a usar el sistema PDV</li></ol><p>Consulte nuestro manual completo para detalles avanzados.</p>"
            },
            nextSteps: {
                title: "Perspectivas",
                content: "<p>Próximos pasos para BaristaPro:</p><ul><li>Desarrollo de aplicación móvil para clientes</li><li>Integración con sistemas de pago</li><li>Expansión a otros tipos de establecimientos</li><li>Implementación de IA para análisis de preferencias</li><li>Asociaciones con proveedores de café</li></ul>"
            }
        },
        
        // Synapse
        synapse: {
            overview: {
                title: "Visión General",
                content: "<p>Synapse es una plataforma de inteligencia artificial que procesa grandes volúmenes de datos para generar información procesable.</p><p>Con algoritmos avanzados de aprendizaje automático, Synapse identifica patrones y tendencias que ayudan a las empresas a tomar decisiones estratégicas.</p>"
            },
            objective: {
                title: "Objetivo",
                content: "<p>El objetivo de Synapse es democratizar el acceso a la inteligencia artificial, permitiendo que empresas de todos los tamaños aprovechen el poder de los datos.</p><p>Principales metas:</p><ul><li>Simplificar el análisis de datos complejos</li><li>Automatizar la generación de información</li><li>Ofrecer predicciones precisas</li><li>Integrarse con sistemas existentes</li></ul>"
            },
            application: {
                title: "Aplicación",
                content: "<p>Synapse se puede aplicar en varios sectores:</p><ul><li><strong>Minoristas:</strong> Análisis del comportamiento del consumidor</li><li><strong>Finanzas:</strong> Detección de fraudes y análisis de riesgo</li><li><strong>Salud:</strong> Diagnóstico asistido por IA</li><li><strong>Manufactura:</strong> Optimización de procesos y previsión de demanda</li></ul>"
            },
            architecture: {
                title: "Arquitectura",
                content: "<p>La arquitectura de Synapse se basa en:</p><ul><li><strong>Capa de Ingestión:</strong> Recopilación y procesamiento de datos de varias fuentes</li><li><strong>Capa de Almacenamiento:</strong> Lagos de datos y almacenes de datos optimizados</li><li><strong>Capa de Procesamiento:</strong> Motores de procesamiento distribuido</li><li><strong>Capa de IA:</strong> Modelos de aprendizaje automático y aprendizaje profundo</li><li><strong>Capa de Presentación:</strong> Paneles y API para integración</li></ul>"
            },
            userGuide: {
                title: "Guía de Uso",
                content: "<p>Para comenzar a usar Synapse:</p><ol><li>Conecte sus fuentes de datos</li><li>Configure los parámetros de análisis</li><li>Seleccione los modelos de IA adecuados</li><li>Defina cómo recibir la información</li><li>Monitoree los resultados y ajuste según sea necesario</li></ol><p>Nuestra documentación detallada ofrece guías para cada paso.</p>"
            },
            nextSteps: {
                title: "Perspectivas",
                content: "<p>El futuro de Synapse incluye:</p><ul><li>Expansión a más modelos de IA especializados</li><li>Interfaz de procesamiento de lenguaje natural</li><li>Integración con IoT para datos en tiempo real</li><li>Soluciones específicas para industrias verticales</li><li>Asociaciones con proveedores de datos</li></ul>"
            }
        }
    }
};