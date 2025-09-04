const i18n = {
    pt: {
        welcome: "Bem-vindo à GearLabs Docs",
        selectProject: "Selecione um projeto na barra lateral para visualizar sua documentação.",
        projects: "Projetos",
        overview: "Visão Geral",
        objective: "Objetivo",
        application: "Aplicação",
        architecture: "Arquitetura",
        guide: "Guia de Uso",
        perspectives: "Perspectivas",
        footer: {
            community: "Comunidade",
            gearlabs: "GearLabs",
            portal: "Portal",
            one: "DealeGear One"
        },
        search: "Buscar...",
        content: {
            myheart: {
                overview: "O MyHeart é uma aplicação de monitoramento cardíaco que permite aos usuários acompanhar sua saúde cardiovascular em tempo real.",
                objective: "Oferecer uma solução acessível e confiável para monitoramento da saúde cardíaca, ajudando usuários a identificar possíveis problemas precocemente.",
                application: "A aplicação pode ser utilizada por pessoas de todas as idades que desejam monitorar sua saúde cardiovascular, especialmente aquelas com histórico de problemas cardíacos na família.",
                architecture: "O MyHeart é construído com uma arquitetura de microserviços, utilizando React Native para o aplicativo móvel e Node.js para o backend, com banco de dados MongoDB.",
                guide: "Para começar a usar o MyHeart, faça o download do aplicativo, crie uma conta e conecte seu dispositivo de monitoramento cardíaco compatível.",
                perspectives: "Planejamos expandir para integração com mais dispositivos de monitoramento e adicionar funcionalidades de inteligência artificial para análise preditiva."
            },
            baristapro: {
                overview: "BaristaPro é um sistema de gestão para cafeterias, oferecendo controle completo de estoque, vendas e clientes.",
                objective: "Simplificar a gestão de cafeterias, permitindo que os proprietários foquem na qualidade do serviço e dos produtos.",
                application: "Destinado a cafeterias de pequeno e médio porte, o BaristaPro pode ser acessado via web ou aplicativo móvel.",
                architecture: "Desenvolvido com Vue.js para o frontend, Django para o backend e PostgreSQL como banco de dados, com APIs RESTful para integração.",
                guide: "Após registrar sua cafeteria, você pode cadastrar produtos, configurar estoque e começar a registrar vendas através da interface intuitiva.",
                perspectives: "Estamos desenvolvendo módulos de delivery e fidelidade de clientes para as próximas versões."
            },
            synapse: {
                overview: "Synapse é uma plataforma de inteligência artificial que ajuda empresas a tomar decisões baseadas em dados.",
                objective: "Democratizar o acesso a ferramentas de análise de dados e inteligência artificial para empresas de todos os tamanhos.",
                application: "Empresas que desejam otimizar processos, prever tendências de mercado e entender melhor o comportamento dos clientes.",
                architecture: "Construída com Python, TensorFlow e Apache Spark, com interface web em React e armazenamento em nuvem.",
                guide: "Conecte suas fontes de dados, configure os modelos de análise e comece a gerar insights através dos dashboards interativos.",
                perspectives: "Expansão para mais setores e desenvolvimento de modelos especializados para diferentes indústrias."
            },
            "3gto": {
                overview: "3GTO é uma plataforma de gestão de projetos ágeis, focada em equipes de desenvolvimento de software.",
                objective: "Facilitar a organização e acompanhamento de projetos ágeis, fornecendo ferramentas visuais e intuitivas.",
                application: "Equipes de desenvolvimento que utilizam metodologias ágeis como Scrum e Kanban.",
                architecture: "Aplicação web progressiva (PWA) construída com Angular e Node.js, utilizando WebSockets para atualizações em tempo real.",
                guide: "Crie sua equipe, configure projetos e comece a criar tarefas e sprints através da interface drag-and-drop.",
                perspectives: "Integração com ferramentas de CI/CD e expansão para gestão de produtos além de desenvolvimento de software."
            },
            baristas: {
                overview: "Baristas é uma rede social para profissionais de café, onde podem compartilhar receitas, técnicas e experiências.",
                objective: "Conectar baristas de todo o mundo, criando uma comunidade para compartilhamento de conhecimento e experiências.",
                application: "Baristas profissionais, entusiastas de café e estabelecimentos que desejam promover seus profissionais.",
                architecture: "Plataforma web e mobile desenvolvida com React Native e Firebase, com armazenamento de mídia na AWS.",
                guide: "Crie seu perfil, adicione suas especialidades e comece a compartilhar conteúdo e interagir com outros profissionais.",
                perspectives: "Adição de marketplace para produtos de café e funcionalidades de aprendizado online."
            },
            dyris: {
                overview: "Dyris é uma solução de automação residencial que permite controlar dispositivos através de comandos de voz e aplicativo.",
                objective: "Tornar a automação residencial acessível e fácil de usar para todos, sem necessidade de conhecimento técnico.",
                application: "Residências e pequenos escritórios que desejam automatizar tarefas e aumentar a segurança e conforto.",
                architecture: "Sistema baseado em IoT com hub central, aplicativo móvel em React Native e integração com assistentes de voz populares.",
                guide: "Instale o hub Dyris, conecte seus dispositivos compatíveis e configure rotinas e automações através do aplicativo.",
                perspectives: "Expansão para mais dispositivos e integração com sistemas de energia solar."
            },
            fabr: {
                overview: "Fabr é uma plataforma de design e prototipagem 3D acessível para profissionais e entusiastas.",
                objetivo: "Democratizar o acesso a ferramentas de design 3D, permitindo que qualquer pessoa possa criar e prototipar objetos.",
                application: "Designers, engenheiros, estudantes e entusiastas que desejam criar modelos 3D para impressão ou fabricação.",
                architecture: "Aplicação web com WebGL para renderização 3D, backend em Node.js e armazenamento em nuvem.",
                guide: "Crie sua conta, escolha um modelo inicial ou comece do zero, e comece a projetar usando nossas ferramentas intuitivas.",
                perspectives: "Adição de biblioteca de modelos colaborativa e integração com serviços de impressão 3D."
            },
            undersea: {
                overview: "UnderSea é um jogo de exploração submarina com elementos educacionais sobre a vida marinha.",
                objective: "Entreter e educar jogadores sobre ecossistemas marinhos e a importância da conservação dos oceanos.",
                application: "Jogadores de todas as idades interessados em exploração, aventura e aprendizado sobre a vida marinha.",
                architecture: "Desenvolvido em Unity com C#, multiplayer via Photon e assets criados com Blender e Substance Painter.",
                guide: "Navegue pelos oceanos, complete missões, colete espécies e aprenda sobre cada criatura marinha que encontrar.",
                perspectives: "Expansão para realidade virtual e adição de mais ecossistemas marinhos."
            },
            oxygen: {
                overview: "Oxygen é uma aplicação de monitoramento da qualidade do ar, fornecendo dados em tempo real sobre poluição.",
                objective: "Conscientizar a população sobre a qualidade do ar e fornecer dados precisos para tomada de decisões.",
                application: "Cidadãos preocupados com a qualidade do ar, pesquisadores e órgãos governamentais.",
                architecture: "Rede de sensores IoT, aplicativo móvel em React Native e plataforma web para análise de dados.",
                guide: "Instale o sensor Oxygen em sua residência ou empresa e acompanhe os dados através do aplicativo ou portal web.",
                perspectives: "Expansão para mais cidades e adição de alertas personalizados baseados em condições de saúde."
            },
            "bosque-das-frutiferas": {
                overview: "Bosque das Frutíferas é um projeto de reflorestamento com espécies frutíferas nativas, visando a conservação da biodiversidade.",
                objective: "Recuperar áreas degradadas através do plantio de árvores frutíferas nativas, beneficiando o ecossistema e comunidades locais.",
                application: "Propriedades rurais, áreas de conservação e comunidades que desejam implementar sistemas agroflorestais.",
                architecture: "Plataforma web para monitoramento das áreas plantadas, aplicativo móvel para cadastramento de árvores e sistema de georreferenciamento.",
                guide: "Cadastre sua área, selecione as espécies adequadas para sua região e siga as orientações de plantio e manutenção.",
                perspectives: "Expansão para mais regiões e criação de um programa de certificação para produtos originados dessas áreas."
            },
            "mecanico-fantasma": {
                overview: "Mecânico Fantasma é uma plataforma que conecta proprietários de veículos com mecânicos disponíveis para serviços emergenciais.",
                objective: "Facilitar o acesso a serviços mecânicos emergenciais, reduzindo o tempo de espera e fornecendo transparência nos preços.",
                application: "Motoristas que enfrentam problemas mecânicos inesperados e precisam de assistência rápida.",
                architecture: "Aplicativo híbrido desenvolvido com Ionic, backend em Node.js e sistema de geolocalização em tempo real.",
                guide: "Abra o aplicativo, informe seu problema e localização, e aguarde a oferta de mecânicos disponíveis em sua área.",
                perspectives: "Expansão para serviços de reboque e parceria com oficinas para reparos mais complexos."
            },
            "viver-e-uma-arte": {
                overview: "Viver é uma Arte é uma plataforma de bem-estar que oferece conteúdo e ferramentas para saúde mental e emocional.",
                objective: "Promover saúde mental e emocional através de conteúdo educativo, práticas de mindfulness e comunidade de apoio.",
                application: "Pessoas que buscam melhorar seu bem-estar emocional, reduzir estresse e ansiedade, e desenvolver resiliência.",
                architecture: "Aplicativo nativo para iOS e Android, backend em Python com Django e banco de dados PostgreSQL.",
                guide: "Crie seu perfil, responda ao questionário inicial e receba um plano personalizado com atividades e conteúdos.",
                perspectivas: "Adição de sessões de terapia online e integração com dispositivos de monitoramento de saúde."
            },
            "aventuras-peludas": {
                overview: "Aventuras Peludas é uma rede social para donos de pets, onde podem compartilhar experiências e encontrar serviços.",
                objective: "Criar uma comunidade para amantes de animais, facilitando o compartilhamento de experiências e acesso a serviços especializados.",
                application: "Donos de pets que desejam compartilhar momentos de seus animais, encontrar serviços e conectar-se com outros amantes de animais.",
                architecture: "Plataforma web e mobile desenvolvida com React Native, Firebase para autenticação e armazenamento, e API em Node.js.",
                guide: "Crie um perfil para você e seu pet, compartilhe fotos e histórias, e explore serviços e eventos próximos a você.",
                perspectives: "Adição de marketplace para produtos pet e funcionalidade de agendamento de serviços."
            },
            "raiz-urbana": {
                overview: "Raiz Urbana é um projeto de agricultura urbana que transforma espaços ociosos em áreas produtivas.",
                objective: "Promover segurança alimentar e sustentabilidade através da criação de hortas urbanas em espaços subutilizados.",
                application: "Comunidades urbanas, escolas e empresas que desejam implementar hortas para consumo próprio ou comunitário.",
                architecture: "Plataforma web para gestão das hortas, aplicativo móvel para voluntários e sistema de monitoramento de culturas.",
                guide: "Cadastre seu espaço, participe dos treinamentos oferecidos e comece a cultivar com o apoio da comunidade Raiz Urbana.",
                perspectives: "Expansão para mais bairros e criação de um programa de certificação para produtos urbanos."
            },
            "verso-espresso": {
                overview: "Verso Espresso é uma livraria especializada em literatura de café, com espaço para degustação e eventos culturais.",
                objective: "Criar um espaço que une a cultura do café com a literatura, promovendo encontros e trocas de experiências.",
                application: "Amantes de café e literatura que buscam um ambiente acolhedor para leitura, degustação e participação em eventos culturais.",
                architecture: "Sistema de gestão integrado com controle de estoque, vendas e eventos, desenvolvido em PHP e MySQL.",
                guide: "Visite nossa loja física ou explore nosso catálogo online, participe de nossos eventos e degustações programadas.",
                perspectives: "Expansão para um clube de assinatura de livros e café, e criação de uma editora especializada."
            },
            "mike-e-tio-bob": {
                overview: "Mike e Tio Bob é uma série de animação infantil que ensina conceitos de ciência e natureza de forma divertida.",
                objective: "Educar crianças sobre conceitos científicos e importância da natureza através de histórias divertidas e personagens cativantes.",
                application: "Crianças em idade pré-escolar e inicial, pais e educadores que buscam conteúdo educativo de qualidade.",
                architecture: "Plataforma de streaming para os episódios, aplicativo complementar com atividades educativas e site com recursos para pais e professores.",
                guide: "Assista aos episódios com as crianças, explore as atividades complementares no aplicativo e participe dos eventos presenciais.",
                perspectives: "Expansão para mais plataformas de streaming e desenvolvimento de produtos licenciados como livros e brinquedos."
            }
        }
    },
    en: {
        welcome: "Welcome to GearLabs Docs",
        selectProject: "Select a project in the sidebar to view its documentation.",
        projects: "Projects",
        overview: "Overview",
        objective: "Objective",
        application: "Application",
        architecture: "Architecture",
        guide: "User Guide",
        perspectives: "Next Steps",
        footer: {
            community: "Community",
            gearlabs: "GearLabs",
            portal: "Portal",
            one: "DealeGear One"
        },
        search: "Search...",
        content: {
            myheart: {
                overview: "MyHeart is a cardiac monitoring application that allows users to track their cardiovascular health in real time.",
                objective: "To provide an affordable and reliable solution for cardiac health monitoring, helping users identify potential problems early.",
                application: "The application can be used by people of all ages who want to monitor their cardiovascular health, especially those with a family history of heart problems.",
                architecture: "MyHeart is built with a microservices architecture, using React Native for the mobile app and Node.js for the backend, with MongoDB database.",
                guide: "To start using MyHeart, download the app, create an account, and connect your compatible cardiac monitoring device.",
                perspectives: "We plan to expand to integrate with more monitoring devices and add artificial intelligence features for predictive analysis."
            },
            baristapro: {
                overview: "BaristaPro is a management system for coffee shops, offering complete control of inventory, sales, and customers.",
                objective: "To simplify coffee shop management, allowing owners to focus on service and product quality.",
                application: "Designed for small and medium-sized coffee shops, BaristaPro can be accessed via web or mobile app.",
                architecture: "Developed with Vue.js for the frontend, Django for the backend, and PostgreSQL as the database, with RESTful APIs for integration.",
                guide: "After registering your coffee shop, you can register products, configure inventory, and start recording sales through the intuitive interface.",
                perspectives: "We are developing delivery and customer loyalty modules for future versions."
            },
            synapse: {
                overview: "Synapse is an artificial intelligence platform that helps companies make data-driven decisions.",
                objective: "To democratize access to data analysis and artificial intelligence tools for companies of all sizes.",
                application: "Companies that want to optimize processes, predict market trends, and better understand customer behavior.",
                architecture: "Built with Python, TensorFlow, and Apache Spark, with a web interface in React and cloud storage.",
                guide: "Connect your data sources, configure analysis models, and start generating insights through interactive dashboards.",
                perspectives: "Expansion to more sectors and development of specialized models for different industries."
            },
            "3gto": {
                overview: "3GTO is an agile project management platform, focused on software development teams.",
                objective: "To facilitate the organization and tracking of agile projects, providing visual and intuitive tools.",
                application: "Development teams using agile methodologies like Scrum and Kanban.",
                architecture: "Progressive web application (PWA) built with Angular and Node.js, using WebSockets for real-time updates.",
                guide: "Create your team, configure projects, and start creating tasks and sprints through the drag-and-drop interface.",
                perspectives: "Integration with CI/CD tools and expansion to product management beyond software development."
            },
            baristas: {
                overview: "Baristas is a social network for coffee professionals, where they can share recipes, techniques, and experiences.",
                objective: "To connect baristas from around the world, creating a community for sharing knowledge and experiences.",
                application: "Professional baristas, coffee enthusiasts, and establishments that want to promote their professionals.",
                architecture: "Web and mobile platform developed with React Native and Firebase, with media storage on AWS.",
                guide: "Create your profile, add your specialties, and start sharing content and interacting with other professionals.",
                perspectives: "Addition of a marketplace for coffee products and online learning features."
            },
            dyris: {
                overview: "Dyris is a home automation solution that allows controlling devices through voice commands and an app.",
                objective: "To make home automation accessible and easy to use for everyone, without requiring technical knowledge.",
                application: "Homes and small offices that want to automate tasks and increase security and comfort.",
                architecture: "IoT-based system with a central hub, mobile app in React Native, and integration with popular voice assistants.",
                guide: "Install the Dyris hub, connect your compatible devices, and configure routines and automations through the app.",
                perspectives: "Expansion to more devices and integration with solar energy systems."
            },
            fabr: {
                overview: "Fabr is an accessible 3D design and prototyping platform for professionals and enthusiasts.",
                objective: "To democratize access to 3D design tools, allowing anyone to create and prototype objects.",
                application: "Designers, engineers, students, and enthusiasts who want to create 3D models for printing or fabrication.",
                architecture: "Web application with WebGL for 3D rendering, Node.js backend, and cloud storage.",
                guide: "Create your account, choose a starting model or start from scratch, and start designing using our intuitive tools.",
                perspectives: "Addition of a collaborative model library and integration with 3D printing services."
            },
            undersea: {
                overview: "UnderSea is an underwater exploration game with educational elements about marine life.",
                objective: "To entertain and educate players about marine ecosystems and the importance of ocean conservation.",
                application: "Players of all ages interested in exploration, adventure, and learning about marine life.",
                architecture: "Developed in Unity with C#, multiplayer via Photon, and assets created with Blender and Substance Painter.",
                guide: "Navigate through the oceans, complete missions, collect species, and learn about each marine creature you encounter.",
                perspectives: "Expansion to virtual reality and addition of more marine ecosystems."
            },
            oxygen: {
                overview: "Oxygen is an air quality monitoring application, providing real-time data on pollution.",
                objective: "To raise awareness about air quality and provide accurate data for decision-making.",
                application: "Citizens concerned about air quality, researchers, and government agencies.",
                architecture: "Network of IoT sensors, mobile app in React Native, and web platform for data analysis.",
                guide: "Install the Oxygen sensor in your home or business and monitor the data through the app or web portal.",
                perspectives: "Expansion to more cities and addition of personalized alerts based on health conditions."
            },
            "bosque-das-frutiferas": {
                overview: "Bosque das Frutíferas is a reforestation project with native fruit species, aiming at biodiversity conservation.",
                objective: "To recover degraded areas through planting native fruit trees, benefiting the ecosystem and local communities.",
                application: "Rural properties, conservation areas, and communities that want to implement agroforestry systems.",
                architecture: "Web platform for monitoring planted areas, mobile app for tree registration, and georeferencing system.",
                guide: "Register your area, select suitable species for your region, and follow the planting and maintenance guidelines.",
                perspectives: "Expansion to more regions and creation of a certification program for products originating from these areas."
            },
            "mecanico-fantasma": {
                overview: "Mecânico Fantasma is a platform that connects vehicle owners with available mechanics for emergency services.",
                objective: "To facilitate access to emergency mechanical services, reducing waiting time and providing price transparency.",
                application: "Drivers facing unexpected mechanical problems who need quick assistance.",
                architecture: "Hybrid app developed with Ionic, Node.js backend, and real-time geolocation system.",
                guide: "Open the app, report your problem and location, and wait for offers from available mechanics in your area.",
                perspectives: "Expansion to towing services and partnership with workshops for more complex repairs."
            },
            "viver-e-uma-arte": {
                overview: "Viver é uma Arte is a wellness platform that offers content and tools for mental and emotional health.",
                objective: "To promote mental and emotional health through educational content, mindfulness practices, and a support community.",
                application: "People seeking to improve their emotional well-being, reduce stress and anxiety, and develop resilience.",
                architecture: "Native app for iOS and Android, Python backend with Django, and PostgreSQL database.",
                guide: "Create your profile, answer the initial questionnaire, and receive a personalized plan with activities and content.",
                perspectives: "Addition of online therapy sessions and integration with health monitoring devices."
            },
            "aventuras-peludas": {
                overview: "Aventuras Peludas is a social network for pet owners, where they can share experiences and find services.",
                objective: "To create a community for animal lovers, facilitating the sharing of experiences and access to specialized services.",
                application: "Pet owners who want to share moments of their animals, find services, and connect with other animal lovers.",
                architecture: "Web and mobile platform developed with React Native, Firebase for authentication and storage, and Node.js API.",
                guide: "Create a profile for you and your pet, share photos and stories, and explore services and events near you.",
                perspectives: "Addition of a pet product marketplace and service scheduling functionality."
            },
            "raiz-urbana": {
                overview: "Raiz Urbana is an urban agriculture project that transforms idle spaces into productive areas.",
                objective: "To promote food security and sustainability by creating urban gardens in underutilized spaces.",
                application: "Urban communities, schools, and businesses that want to implement gardens for personal or community consumption.",
                architecture: "Web platform for garden management, mobile app for volunteers, and crop monitoring system.",
                guide: "Register your space, participate in the offered trainings, and start cultivating with the support of the Raiz Urbana community.",
                perspectives: "Expansion to more neighborhoods and creation of a certification program for urban products."
            },
            "verso-espresso": {
                overview: "Verso Espresso is a bookstore specializing in coffee literature, with space for tasting and cultural events.",
                objective: "To create a space that combines coffee culture with literature, promoting meetings and exchanges of experiences.",
                application: "Coffee and literature lovers looking for a welcoming environment for reading, tasting, and participating in cultural events.",
                architecture: "Integrated management system with inventory, sales, and event control, developed in PHP and MySQL.",
                guide: "Visit our physical store or explore our online catalog, participate in our scheduled events and tastings.",
                perspectives: "Expansion to a book and coffee subscription club, and creation of a specialized publishing house."
            },
            "mike-e-tio-bob": {
                overview: "Mike e Tio Bob is a children's animation series that teaches science and nature concepts in a fun way.",
                objective: "To educate children about scientific concepts and the importance of nature through fun stories and captivating characters.",
                application: "Preschool and early elementary children, parents, and educators seeking quality educational content.",
                architecture: "Streaming platform for episodes, complementary app with educational activities, and website with resources for parents and teachers.",
                guide: "Watch the episodes with children, explore the complementary activities in the app, and participate in in-person events.",
                perspectives: "Expansion to more streaming platforms and development of licensed products such as books and toys."
            }
        }
    },
    es: {
        welcome: "Bienvenido a GearLabs Docs",
        selectProject: "Selecciona un proyecto en la barra lateral para ver su documentación.",
        projects: "Proyectos",
        overview: "Visión General",
        objective: "Objetivo",
        application: "Aplicación",
        architecture: "Arquitectura",
        guide: "Guía de Uso",
        perspectives: "Próximos Pasos",
        footer: {
            community: "Comunidad",
            gearlabs: "GearLabs",
            portal: "Portal",
            one: "DealeGear One"
        },
        search: "Buscar...",
        content: {
            myheart: {
                overview: "MyHeart es una aplicación de monitoreo cardíaco que permite a los usuarios rastrear su salud cardiovascular en tiempo real.",
                objective: "Ofrecer una solución asequible y confiable para el monitoreo de la salud cardíaca, ayudando a los usuarios a identificar posibles problemas tempranamente.",
                application: "La aplicación puede ser utilizada por personas de todas las edades que deseen monitorear su salud cardiovascular, especialmente aquellas con antecedentes familiares de problemas cardíacos.",
                architecture: "MyHeart está construido con una arquitectura de microservicios, utilizando React Native para la aplicación móvil y Node.js para el backend, con base de datos MongoDB.",
                guide: "Para comenzar a usar MyHeart, descarga la aplicación, crea una cuenta y conecta tu dispositivo de monitoreo cardíaco compatible.",
                perspectives: "Planeamos expandir la integración con más dispositivos de monitoreo y agregar funcionalidades de inteligencia artificial para análisis predictivo."
            },
            baristapro: {
                overview: "BaristaPro es un sistema de gestión para cafeterías, que ofrece control completo de inventario, ventas y clientes.",
                objective: "Simplificar la gestión de cafeterías, permitiendo que los propietarios se enfoquen en la calidad del servicio y los productos.",
                application: "Destinado a cafeterías pequeñas y medianas, BaristaPro puede ser accedido a través de la web o una aplicación móvil.",
                architecture: "Desarrollado con Vue.js para el frontend, Django para el backend y PostgreSQL como base de datos, con APIs RESTful para integración.",
                guide: "Después de registrar tu cafetería, puedes registrar productos, configurar inventario y comenzar a registrar ventas a través de la interfaz intuitiva.",
                perspectives: "Estamos desarrollando módulos de entrega y fidelización de clientes para las próximas versiones."
            },
            synapse: {
                overview: "Synapse es una plataforma de inteligencia artificial que ayuda a las empresas a tomar decisiones basadas en datos.",
                objective: "Democratizar el acceso a herramientas de análisis de datos e inteligencia artificial para empresas de todos los tamaños.",
                application: "Empresas que desean optimizar procesos, predecir tendencias del mercado y comprender mejor el comportamiento de los clientes.",
                architecture: "Construido con Python, TensorFlow y Apache Spark, con interfaz web en React y almacenamiento en la nube.",
                guide: "Conecta tus fuentes de datos, configura los modelos de análisis y comienza a generar información a través de dashboards interactivos.",
                perspectives: "Expansión a más sectores y desarrollo de modelos especializados para diferentes industrias."
            },
            "3gto": {
                overview: "3GTO es una plataforma de gestión de proyectos ágiles, enfocada en equipos de desarrollo de software.",
                objective: "Facilitar la organización y seguimiento de proyectos ágiles, proporcionando herramientas visuales e intuitivas.",
                application: "Equipos de desarrollo que utilizan metodologías ágiles como Scrum y Kanban.",
                architecture: "Aplicación web progresiva (PWA) construida con Angular y Node.js, utilizando WebSockets para actualizaciones en tiempo real.",
                guide: "Crea tu equipo, configura proyectos y comienza a crear tareas y sprints a través de la interfaz de arrastrar y soltar.",
                perspectives: "Integración con herramientas de CI/CD y expansión a la gestión de productos más allá del desarrollo de software."
            },
            baristas: {
                overview: "Baristas es una red social para profesionales del café, donde pueden compartir recetas, técnicas y experiencias.",
                objective: "Conectar baristas de todo el mundo, creando una comunidad para compartir conocimientos y experiencias.",
                application: "Baristas profesionales, entusiastas del café y establecimientos que desean promocionar a sus profesionales.",
                architecture: "Plataforma web y móvil desarrollada con React Native y Firebase, con almacenamiento de medios en AWS.",
                guide: "Crea tu perfil, agrega tus especialidades y comienza a compartir contenido e interactuar con otros profesionales.",
                perspectives: "Adición de un marketplace para productos de café y funcionalidades de aprendizaje en línea."
            },
            dyris: {
                overview: "Dyris es una solución de automatización del hogar que permite controlar dispositivos a través de comandos de voz y una aplicación.",
                objective: "Hacer que la automatización del hogar sea accesible y fácil de usar para todos, sin necesidad de conocimientos técnicos.",
                application: "Hogares y pequeñas oficinas que desean automatizar tareas y aumentar la seguridad y el confort.",
                architecture: "Sistema basado en IoT con un hub central, aplicación móvil en React Native e integración con asistentes de voz populares.",
                guide: "Instala el hub Dyris, conecta tus dispositivos compatibles y configura rutinas y automatizaciones a través de la aplicación.",
                perspectives: "Expansión a más dispositivos e integración con sistemas de energía solar."
            },
            fabr: {
                overview: "Fabr es una plataforma de diseño y prototipado 3D accesible para profesionales y entusiastas.",
                objective: "Democratizar el acceso a herramientas de diseño 3D, permitiendo que cualquiera pueda crear y prototipar objetos.",
                application: "Diseñadores, ingenieros, estudiantes y entusiastas que desean crear modelos 3D para impresión o fabricación.",
                architecture: "Aplicación web con WebGL para renderizado 3D, backend en Node.js y almacenamiento en la nube.",
                guide: "Crea tu cuenta, elige un modelo inicial o comienza desde cero, y comienza a diseñar usando nuestras herramientas intuitivas.",
                perspectives: "Adición de una biblioteca de modelos colaborativa e integración con servicios de impresión 3D."
            },
            undersea: {
                overview: "UnderSea es un juego de exploración submarina con elementos educativos sobre la vida marina.",
                objective: "Entretener y educar a los jugadores sobre los ecosistemas marinos y la importancia de la conservación de los océanos.",
                application: "Jugadores de todas las edades interesados en la exploración, la aventura y el aprendizaje sobre la vida marina.",
                architecture: "Desarrollado en Unity con C#, multiplayer a través de Photon y assets creados con Blender y Substance Painter.",
                guide: "Navega por los océanos, completa misiones, recolecta especies y aprende sobre cada criatura marina que encuentres.",
                perspectives: "Expansión a realidad virtual y adición de más ecosistemas marinos."
            },
            oxygen: {
                overview: "Oxygen es una aplicación de monitoreo de la calidad del aire, que proporciona datos en tiempo real sobre la contaminación.",
                objective: "Concientizar a la población sobre la calidad del aire y proporcionar datos precisos para la toma de decisiones.",
                application: "Ciudadanos preocupados por la calidad del aire, investigadores y organismos gubernamentales.",
                architecture: "Red de sensores IoT, aplicación móvil en React Native y plataforma web para análisis de datos.",
                guide: "Instala el sensor Oxygen en tu hogar o negocio y monitorea los datos a través de la aplicación o portal web.",
                perspectives: "Expansión a más ciudades y adición de alertas personalizadas basadas en condiciones de salud."
            },
            "bosque-das-frutiferas": {
                overview: "Bosque das Frutíferas es un proyecto de reforestación con especies frutales nativas, que busca la conservación de la biodiversidad.",
                objective: "Recuperar áreas degradadas mediante la plantación de árboles frutales nativos, beneficiando al ecosistema y a las comunidades locales.",
                application: "Propiedades rurales, áreas de conservación y comunidades que desean implementar sistemas agroforestales.",
                architecture: "Plataforma web para monitoreo de las áreas plantadas, aplicación móvil para registro de árboles y sistema de georreferenciación.",
                guide: "Registra tu área, selecciona las especies adecuadas para tu región y sigue las orientaciones de plantación y mantenimiento.",
                perspectives: "Expansión a más regiones y creación de un programa de certificación para productos originados de estas áreas."
            },
            "mecanico-fantasma": {
                overview: "Mecánico Fantasma es una plataforma que conecta a propietarios de vehículos con mecánicos disponibles para servicios de emergencia.",
                objective: "Facilitar el acceso a servicios mecánicos de emergencia, reduciendo el tiempo de espera y proporcionando transparencia en los precios.",
                application: "Conductores que enfrentan problemas mecánicos inesperados y necesitan asistencia rápida.",
                architecture: "Aplicación híbrida desarrollada con Ionic, backend en Node.js y sistema de geolocalización en tiempo real.",
                guide: "Abre la aplicación, informa tu problema y ubicación, y espera la oferta de mecánicos disponibles en tu área.",
                perspectives: "Expansión a servicios de grúa y asociación con talleres para reparaciones más complejas."
            },
            "viver-e-uma-arte": {
                overview: "Viver é uma Arte es una plataforma de bienestar que ofrece contenido y herramientas para la salud mental y emocional.",
                objective: "Promover la salud mental y emocional a través de contenido educativo, prácticas de mindfulness y una comunidad de apoyo.",
                application: "Personas que buscan mejorar su bienestar emocional, reducir el estrés y la ansiedad, y desarrollar resiliencia.",
                architecture: "Aplicación nativa para iOS y Android, backend en Python con Django y base de datos PostgreSQL.",
                guide: "Crea tu perfil, responde el cuestionario inicial y recibe un plan personalizado con actividades y contenidos.",
                perspectives: "Adición de sesiones de terapia en línea e integración con dispositivos de monitoreo de salud."
            },
            "aventuras-peludas": {
                overview: "Aventuras Peludas es una red social para dueños de mascotas, donde pueden compartir experiencias y encontrar servicios.",
                objective: "Crear una comunidad para amantes de los animales, facilitando el intercambio de experiencias y acceso a servicios especializados.",
                application: "Dueños de mascotas que desean compartir momentos de sus animales, encontrar servicios y conectarse con otros amantes de los animales.",
                architecture: "Plataforma web y móvil desarrollada con React Native, Firebase para autenticación y almacenamiento, y API en Node.js.",
                guide: "Crea un perfil para ti y tu mascota, comparte fotos e historias, y explora servicios y eventos cerca de ti.",
                perspectives: "Adición de un marketplace para productos de mascotas y funcionalidad de agendamiento de servicios."
            },
            "raiz-urbana": {
                overview: "Raiz Urbana es un proyecto de agricultura urbana que transforma espacios ociosos en áreas productivas.",
                objective: "Promover la seguridad alimentaria y la sostenibilidad mediante la creación de huertas urbanas en espacios subutilizados.",
                application: "Comunidades urbanas, escuelas y empresas que desean implementar huertas para consumo propio o comunitario.",
                architecture: "Plataforma web para gestión de las huertas, aplicación móvil para voluntarios y sistema de monitoreo de cultivos.",
                guide: "Registra tu espacio, participa de los capacitaciones ofrecidas y comienza a cultivar con el apoyo de la comunidad Raiz Urbana.",
                perspectives: "Expansión a más barrios y creación de un programa de certificación para productos urbanos."
            },
            "verso-espresso": {
                overview: "Verso Espresso es una librería especializada en literatura de café, con espacio para degustación y eventos culturales.",
                objective: "Crear un espacio que une la cultura del café con la literatura, promoviendo encuentros e intercambios de experiencias.",
                application: "Amantes del café y la literatura que buscan un ambiente acogedor para lectura, degustación y participación en eventos culturales.",
                architecture: "Sistema de gestión integrado con control de inventario, ventas y eventos, desarrollado en PHP y MySQL.",
                guide: "Visita nuestra tienda física o explora nuestro catálogo en línea, participa de nuestros eventos y degustaciones programadas.",
                perspectives: "Expansión a un club de suscripción de libros y café, y creación de una editorial especializada."
            },
            "mike-e-tio-bob": {
                overview: "Mike e Tio Bob es una serie de animación infantil que enseña conceptos de ciencia y naturaleza de forma divertida.",
                objective: "Educar a los niños sobre conceptos científicos y la importancia de la naturaleza a través de historias divertidas y personajes cautivadores.",
                application: "Niños en edad preescolar y primaria, padres y educadores que buscan contenido educativo de calidad.",
                architecture: "Plataforma de streaming para los episodios, aplicación complementaria con actividades educativas y sitio con recursos para padres y maestros.",
                guide: "Ve los episodios con los niños, explora las actividades complementarias en la aplicación y participa en los eventos presenciales.",
                perspectives: "Expansión a más plataformas de streaming y desarrollo de productos licenciados como libros y juguetes."
            }
        }
    }
};