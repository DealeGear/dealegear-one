// Dados do aplicativo
const appData = {
    selectedCategory: null,
    selectedProject: null,
    categories: {
        startup: {
            title: "Projeto Startup",
            description: "Uma iniciativa inovadora com potencial de crescimento escalável e modelo de negócio disruptivo.",
            purpose: "Criar uma solução inovadora que resolva um problema real do mercado de forma escalável e sustentável.",
            vision: "Tornar-se líder de mercado no segmento de [segmento específico], revolucionando a forma como [problema] é abordado.",
            mission: "Desenvolver produtos e serviços que gerem valor excepcional para clientes, através de inovação contínua e foco em resultados.",
            valueProposition: "Oferecemos uma solução inovadora que resolve [problema específico] com eficiência superior às alternativas existentes, proporcionando [benefícios exclusivos].",
            hypothesis1: "Hipótese de Problema: Empresas do segmento X enfrentam dificuldades para [problema específico] com as ferramentas atuais.",
            hypothesis2: "Hipótese de Solução: Uma plataforma que integra [funcionalidades principais] resolveria 80% do problema com 20% do esforço atual.",
            hypothesis3: "Hipótese de Crescimento: O modelo de freemium com upgrade para funcionalidades premium permitirá crescimento orgânico e viral."
        },
        produto: {
            title: "Produto Digital",
            description: "Uma solução tecnológica desenvolvida para atender necessidades específicas de usuários através de uma interface intuitiva.",
            purpose: "Desenvolver um produto digital que solucione [problema específico] de forma eficiente e com experiência de usuário excepcional.",
            vision: "Ser a plataforma preferida para [atividade específica], reconhecida pela usabilidade, inovação e impacto positivo na vida dos usuários.",
            mission: "Criar produtos digitais que combinem tecnologia de ponta com design centrado no humano, gerando valor e satisfação para nossos usuários.",
            valueProposition: "Oferecemos um produto digital que simplifica [processo complexo] através de uma interface intuitiva e funcionalidades inteligentes, economizando tempo e recursos.",
            hypothesis1: "Hipótese de Problema: Usuários perdem em média X horas por semana realizando [tarefa específica] de forma ineficiente.",
            hypothesis2: "Hipótese de Solução: Uma aplicação com [características principais] reduziria este tempo em 70% com curva de aprendizado mínima.",
            hypothesis3: "Hipótese de Crescimento: A integração com plataformas populares aumentará a taxa de adoção em 40% através de sinergias existentes."
        },
        servico: {
            title: "Serviço Inovador",
            description: "Uma oferta de serviços diferenciada que agrega valor através de metodologias exclusivas e atendimento personalizado.",
            purpose: "Oferecer um serviço inovador que transforme a forma como [processo específico] é realizado, agregando valor e eficiência para clientes.",
            vision: "Tornar-se referência no mercado de serviços de [segmento], reconhecido pela excelência, inovação e impacto mensurável nos resultados dos clientes.",
            mission: "Entregar serviços de alta qualidade que superem as expectativas dos clientes, através de metodologias proprietárias e equipe especializada.",
            valueProposition: "Oferecemos um serviço de [tipo de serviço] que combina [diferenciais] para entregar resultados superiores com maior eficiência e custo-benefício.",
            hypothesis1: "Hipótese de Problema: Empresas do segmento X enfrentam desafios para [desafio específico] com as soluções de serviço atuais.",
            hypothesis2: "Hipótese de Solução: Nossa metodologia proprietária de [nome da metodologia] resolveria este problema com 50% mais eficiência.",
            hypothesis3: "Hipótese de Crescimento: O modelo de assinatura com resultados mensuráveis permitirá retenção de clientes acima de 90%."
        },
        social: {
            title: "Projeto Social",
            description: "Uma iniciativa com propósito de gerar impacto positivo na sociedade, abordando desafios sociais de forma inovadora.",
            purpose: "Criar um impacto social positivo e mensurável na vida de [público-alvo], abordando o problema de [problema social] de forma sustentável.",
            vision: "Construir uma sociedade mais justa e igualitária, onde [público-alvo] tenha acesso a [oportunidade específica] e possa desenvolver seu pleno potencial.",
            mission: "Transformar vidas através de iniciativas inovadoras que gerem oportunidades de desenvolvimento e inclusão para [público-alvo].",
            valueProposition: "Oferecemos uma solução inovadora para [problema social] que combina [abordagens] para gerar impacto duradouro com eficiência de recursos.",
            hypothesis1: "Hipótese de Problema: [Público-alvo] enfrenta barreiras significativas para [oportunidade específica] devido a [causas].",
            hypothesis2: "Hipótese de Solução: Nossa abordagem de [nome da abordagem] poderia reduzir estas barreiras em 60% com investimento escalonável.",
            hypothesis3: "Hipótese de Crescimento: O modelo de replicação com parceiros locais permitirá expansão para 10 comunidades em 2 anos."
        },
        ecommerce: {
            title: "Loja Virtual",
            description: "Uma plataforma de e-commerce para venda de produtos com experiência de compra otimizada e conversão elevada.",
            purpose: "Criar uma plataforma de e-commerce que ofereça uma experiência de compra excepcional e simplificada para clientes.",
            vision: "Tornar-se a principal plataforma de e-commerce no segmento de [segmento específico], reconhecida pela experiência do usuário e qualidade do serviço.",
            mission: "Conectar vendedores e compradores através de uma plataforma intuitiva, segura e eficiente, gerando valor para todos os envolvidos.",
            valueProposition: "Oferecemos uma plataforma de e-commerce que combina [diferenciais] para proporcionar uma experiência de compra superior com taxas de conversão elevadas.",
            hypothesis1: "Hipótese de Problema: Consumidores enfrentam dificuldades para encontrar [produtos específicos] com preço e qualidade adequados.",
            hypothesis2: "Hipótese de Solução: Uma plataforma com curadoria de produtos e processo de compra simplificado aumentaria a satisfação em 70%.",
            hypothesis3: "Hipótese de Crescimento: O modelo de marketplace com múltiplos vendedores permitirá expansão rápida do catálogo e retenção de clientes."
        },
        educacao: {
            title: "Plataforma de Ensino",
            description: "Uma solução educacional que oferece aprendizado personalizado e acessível para diferentes perfis de alunos.",
            purpose: "Democratizar o acesso à educação de qualidade através de uma plataforma que oferece aprendizado personalizado e adaptativo.",
            vision: "Tornar-se a principal plataforma de educação online em [área específica], reconhecida pela eficácia pedagógica e inovação.",
            mission: "Transformar a forma como as pessoas aprendem, através de tecnologia educacional que se adapta às necessidades individuais de cada aluno.",
            valueProposition: "Oferecemos uma plataforma educacional que combina [metodologias] para proporcionar uma experiência de aprendizado eficaz e personalizada.",
            hypothesis1: "Hipótese de Problema: Alunos enfrentam dificuldades para aprender [conteúdo específico] com métodos tradicionais de ensino.",
            hypothesis2: "Hipótese de Solução: Uma plataforma com trilhas de aprendizado adaptativas aumentaria a retenção de conhecimento em 60%.",
            hypothesis3: "Hipótese de Crescimento: O modelo de assinatura com certificações reconhecidas permitirá expansão para novos mercados e segmentos."
        }
    },
    projects: {
        startup: [
            {
                id: "fintech",
                title: "Fintech de Pagamentos",
                description: "Plataforma de pagamentos digitais para pequenas empresas com taxas reduzidas e processo simplificado.",
                color: "#3498db"
            },
            {
                id: "healthtech",
                title: "Healthtech de Telemedicina",
                description: "Solução de telemedicina que conecta pacientes a especialistas de forma rápida e acessível.",
                color: "#2ecc71"
            },
            {
                id: "edtech",
                title: "Edtech Corporativa",
                description: "Plataforma de treinamento corporativo com módulos personalizados para diferentes setores.",
                color: "#9b59b6"
            },
            {
                id: "agritech",
                title: "Agritech de Monitoramento",
                description: "Sistema de monitoramento agrícola que otimiza recursos e aumenta a produtividade no campo.",
                color: "#e67e22"
            }
        ],
        produto: [
            {
                id: "appfitness",
                title: "App de Fitness",
                description: "Aplicativo móvel com planos de treino personalizados e acompanhamento nutricional.",
                color: "#e74c3c"
            },
            {
                id: "toolproductivity",
                title: "Ferramenta de Produtividade",
                description: "Software para gestão de tarefas e projetos com inteligência artificial para priorização.",
                color: "#3498db"
            },
            {
                id: "appfinance",
                title: "App de Finanças Pessoais",
                description: "Aplicativo para controle financeiro com análise de gastos e sugestões de economia.",
                color: "#2ecc71"
            },
            {
                id: "platformdesign",
                title: "Plataforma de Design",
                description: "Ferramenta online para criação de designs gráficos com templates e biblioteca de assets.",
                color: "#9b59b6"
            }
        ],
        servico: [
            {
                id: "consulting",
                title: "Consultoria Digital",
                description: "Serviços de consultoria para transformação digital de empresas tradicionais.",
                color: "#34495e"
            },
            {
                id: "marketing",
                title: "Agência de Marketing",
                description: "Serviços completos de marketing digital com foco em resultados mensuráveis.",
                color: "#e74c3c"
            },
            {
                id: "development",
                title: "Desenvolvimento Sob Demanda",
                description: "Serviços de desenvolvimento de software personalizado para necessidades específicas.",
                color: "#3498db"
            },
            {
                id: "support",
                title: "Suporte Técnico Especializado",
                description: "Serviços de suporte técnico para empresas com atendimento 24/7 e SLA garantido.",
                color: "#2ecc71"
            }
        ],
        social: [
            {
                id: "education",
                title: "Educação para Todos",
                description: "Plataforma que oferece cursos gratuitos para comunidades de baixa renda.",
                color: "#3498db"
            },
            {
                id: "environment",
                title: "Sustentabilidade Ambiental",
                description: "Projeto de reflorestamento e educação ambiental em áreas degradadas.",
                color: "#2ecc71"
            },
            {
                id: "health",
                title: "Saúde Comunitária",
                description: "Iniciativa que oferece atendimentos médicos básicos em comunidades carentes.",
                color: "#e74c3c"
            },
            {
                id: "inclusion",
                title: "Inclusão Digital",
                description: "Programa de inclusão digital para idosos e pessoas com deficiência.",
                color: "#9b59b6"
            }
        ],
        ecommerce: [
            {
                id: "fashion",
                title: "E-commerce de Moda",
                description: "Loja virtual de roupas e acessórios com foco em marcas sustentáveis.",
                color: "#e91e63"
            },
            {
                id: "electronics",
                title: "E-commerce de Eletrônicos",
                description: "Plataforma de venda de eletrônicos com garantia estendida e suporte técnico.",
                color: "#3498db"
            },
            {
                id: "home",
                title: "E-commerce de Decoração",
                description: "Loja virtual de produtos para casa com designer exclusivo e personalização.",
                color: "#2ecc71"
            },
            {
                id: "food",
                title: "E-commerce de Gourmet",
                description: "Plataforma de venda de produtos gourmet e artesanais com entrega rápida.",
                color: "#e67e22"
            }
        ],
        educacao: [
            {
                id: "languages",
                title: "Plataforma de Idiomas",
                description: "Sistema de ensino de idiomas com aulas ao vivo e exercícios interativos.",
                color: "#3498db"
            },
            {
                id: "skills",
                title: "Habilidades Profissionais",
                description: "Cursos online para desenvolvimento de habilidades profissionais com certificação.",
                color: "#2ecc71"
            },
            {
                id: "kids",
                title: "Educação Infantil",
                description: "Plataforma de atividades educativas para crianças com gamificação e progressão.",
                color: "#e74c3c"
            },
            {
                id: "corporate",
                title: "Treinamento Corporativo",
                description: "Solução de treinamento para empresas com módulos customizáveis e métricas.",
                color: "#9b59b6"
            }
        ]
    }
};