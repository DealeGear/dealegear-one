// Dados mockados para os protótipos
const prototypesData = {
    myheart: {
        title: "MyHeart",
        introduction: {
            content: `
                <p>O MyHeart é um projeto inovador desenvolvido pelo DealeGear com o objetivo de revolucionar o monitoramento cardíaco. Este protótipo utiliza tecnologia não invasiva para coletar dados precisos sobre a saúde cardiovascular dos usuários, permitindo a detecção precoce de possíveis anomalias.</p>
                <p>Desenvolvido em resposta ao crescente número de doenças cardiovasculares em todo o mundo, o MyHeart combina sensores avançados com algoritmos de inteligência artificial para fornecer análises em tempo real do funcionamento do coração.</p>
                <p>O projeto nasceu da necessidade de criar uma solução acessível que pudesse ser utilizada por pessoas em suas casas, reduzindo a necessidade de consultas frequentes para exames simples e permitindo um acompanhamento mais contínuo da saúde cardíaca.</p>
            `
        },
        overview: {
            content: `
                <p>O MyHeart é composto por um dispositivo wearable (vestível) que se conecta a um aplicativo móvel. O dispositivo coleta dados como frequência cardíaca, variabilidade da frequência cardíaca, ritmo cardíaco e outros indicadores importantes da saúde cardiovascular.</p>
                <p>Esses dados são processados por algoritmos de machine learning treinados para identificar padrões que possam indicar problemas de saúde. O sistema é capaz de detectar arritmias, taquicardias, bradicardias e outras condições que requerem atenção médica.</p>
                <p>Além do monitoramento contínuo, o MyHeart oferece funcionalidades como registro de sintomas, histórico de medições, relatórios para compartilhamento com profissionais de saúde e alertas personalizados.</p>
            `
        },
        planning: {
            content: `
                <p>O planejamento do MyHeart foi dividido em quatro fases principais:</p>
                <ul>
                    <li><strong>Fase 1 - Pesquisa:</strong> Análise de tecnologias existentes, identificação de necessidades não atendidas e definição dos requisitos do sistema.</li>
                    <li><strong>Fase 2 - Desenvolvimento:</strong> Criação do protótipo inicial do hardware e desenvolvimento dos algoritmos de análise.</li>
                    <li><strong>Fase 3 - Testes:</strong> Validação do protótipo em ambiente controlado e ajustes baseados nos resultados.</li>
                    <li><strong>Fase 4 - Otimização:</strong> Refinamento do design, melhoria dos algoritmos e preparação para produção em escala.</li>
                </ul>
                <p>O projeto contou com a colaboração de cardiologistas, engenheiros biomédicos, desenvolvedores de software e designers de UX/UI para garantir uma solução completa e eficaz.</p>
            `
        },
        structure: {
            content: `
                <p>A arquitetura do MyHeart é composta por três componentes principais:</p>
                <ol>
                    <li><strong>Dispositivo Hardware:</strong>
                        <ul>
                            <li>Sensores ópticos para medição da frequência cardíaca</li>
                            <li>Acelerômetro para detecção de movimento</li>
                            <li>Bateria de longa duração</li>
                            <li>Conectividade Bluetooth Low Energy</li>
                            <li>Carcaça hipoalergênica e resistente à água</li>
                        </ul>
                    </li>
                    <li><strong>Aplicativo Móvel:</strong>
                        <ul>
                            <li>Interface intuitiva para visualização de dados</li>
                            <li>Dashboard com métricas em tempo real</li>
                            <li>Histórico de medições e tendências</li>
                            <li>Sistema de alertas e notificações</li>
                            <li>Integração com serviços de saúde</li>
                        </ul>
                    </li>
                    <li><strong>Backend:</strong>
                        <ul>
                            <li>API RESTful para comunicação entre dispositivos</li>
                            <li>Banco de dados seguro para armazenamento de informações</li>
                            <li>Serviços de processamento de dados</li>
                            <li>Algoritmos de machine learning para análise</li>
                            <li>Sistema de autenticação e criptografia</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        features: {
            content: `
                <p>O MyHeart oferece diversas funcionalidades projetadas para proporcionar um monitoramento cardíaco completo e acessível:</p>
                <ul>
                    <li><strong>Monitoramento Contínuo:</strong> Coleta de dados 24/7 sobre a saúde cardiovascular.</li>
                    <li><strong>Detecção de Arritmias:</strong> Identificação automática de padrões irregulares no ritmo cardíaco.</li>
                    <li><strong>Alertas Inteligentes:</strong> Notificações personalizadas quando são detectadas anomalias.</li>
                    <li><strong>Registro de Sintomas:</strong> Possibilidade de anotar sintomas e eventos para correlação com os dados coletados.</li>
                    <li><strong>Relatórios Detalhados:</strong> Geração de relatórios periódicos para acompanhamento da saúde.</li>
                    <li><strong>Compartilhamento com Profissionais:</strong> Exportação de dados para compartilhamento com médicos e especialistas.</li>
                    <li><strong>Modo Esporte:</strong> Monitoramento otimizado durante atividades físicas.</li>
                    <li><strong>Análise de Sono:</strong> Avaliação da qualidade do sono e seu impacto na saúde cardíaca.</li>
                </ul>
            `
        },
        guide: {
            content: `
                <p>Para utilizar o MyHeart, siga os passos abaixo:</p>
                <ol>
                    <li><strong>Configuração Inicial:</strong>
                        <ul>
                            <li>Baixe o aplicativo MyHeart na App Store ou Google Play.</li>
                            <li>Crie uma conta com suas informações pessoais.</li>
                            <li>Ative o Bluetooth do seu smartphone.</li>
                            <li>Coloque o dispositivo MyHeart para carregar completamente.</li>
                        </ul>
                    </li>
                    <li><strong>Emparelhamento:</strong>
                        <ul>
                            <li>Abra o aplicativo e faça login.</li>
                            <li>Toque em "Adicionar Dispositivo" e siga as instruções.</li>
                            <li>Aproxime o dispositivo do smartphone para emparelhamento via Bluetooth.</li>
                            <li>Aguarde a confirmação de emparehamento bem-sucedido.</li>
                        </ul>
                    </li>
                    <li><strong>Uso Diário:</strong>
                        <ul>
                            <li>Use o dispositivo no pulso como um relógio comum.</li>
                            <li>O aplicativo exibirá seus dados em tempo real.</li>
                            <li>Receba alertas se forem detectadas anomalias.</li>
                            <li>Registre sintomas ou eventos quando necessário.</li>
                        </ul>
                    </li>
                    <li><strong>Manutenção:</strong>
                        <ul>
                            <li>Recarregue o dispositivo quando a bateria estiver baixa.</li>
                            <li>Limpe o sensor regularmente com um pano macio e úmido.</li>
                            <li>Atualize o aplicativo e o firmware do dispositivo quando disponível.</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        contribution: {
            content: `
                <p>O projeto MyHeart é open-source e aceita contribuições da comunidade. Para participar:</p>
                <ul>
                    <li><strong>Desenvolvedores:</strong>
                        <ul>
                            <li>Acesse nosso repositório no GitHub.</li>
                            <li>Faça um fork do projeto.</li>
                            <li>Crie uma branch para sua contribuição.</li>
                            <li>Submeta um pull request após testar suas alterações.</li>
                        </ul>
                    </li>
                    <li><strong>Profissionais de Saúde:</strong>
                        <ul>
                            <li>Participe do nosso programa de validação clínica.</li>
                            <li>Contribua com feedback sobre a precisão dos dados.</li>
                            <li>Sugira melhorias baseadas em sua experiência.</li>
                        </ul>
                    </li>
                    <li><strong>Usuários:</strong>
                        <ul>
                            <li>Reporte bugs e problemas através do aplicativo.</li>
                            <li>Sugira novas funcionalidades no nosso fórum.</li>
                            <li>Participe de pesquisas para melhorar o produto.</li>
                        </ul>
                    </li>
                </ul>
                <p>Para manutenção do projeto, siga nossas diretrizes:</p>
                <ul>
                    <li>Atualizações regulares do firmware para melhorar a precisão.</li>
                    <li>Revisões periódicas dos algoritmos de análise.</li>
                    <li>Atualizações de segurança para proteger os dados dos usuários.</li>
                    <li>Compatibilidade com novas versões de sistemas operacionais.</li>
                </ul>
            `
        },
        results: {
            content: `
                <p>Os resultados obtidos com o protótipo do MyHeart foram muito promissores:</p>
                <ul>
                    <li><strong>Precisão:</strong> 94% de precisão na detecção de arritmias em testes clínicos.</li>
                    <li><strong>Usabilidade:</strong> 92% de satisfação dos usuários em pesquisas de experiência.</li>
                    <li><strong>Adoção:</strong> Mais de 5.000 usuários ativos durante o período de teste beta.</li>
                    <li><strong>Detectados:</strong> 127 casos de arritmias não diagnosticadas anteriormente.</li>
                    <li><strong>Tempo de Bateria:</strong> Média de 7 dias com uso contínuo.</li>
                </ul>
                <p>Os testes clínicos realizados em parceria com três hospitais de referência demonstraram que o MyHeart é uma ferramenta eficaz para o monitoramento cardíaco contínuo, especialmente para pacientes com condições crônicas que requerem acompanhamento frequente.</p>
                <p>Os feedbacks dos usuários destacaram a facilidade de uso, o conforto do dispositivo e a utilidade dos alertas como pontos fortes do produto.</p>
            `
        },
        annexes: {
            content: `
                <p>Documentação complementar do projeto MyHeart:</p>
                <ul>
                    <li><a href="#">Manual do Usuário Completo</a></li>
                    <li><a href="#">Relatório de Testes Clínicos</a></li>
                    <li><a href="#">Especificações Técnicas do Hardware</a></li>
                    <li><a href="#">Documentação da API</a></li>
                    <li><a href="#">Política de Privacidade e Segurança de Dados</a></li>
                    <li><a href="#">Certificações e Aprovações Regulatórias</a></li>
                    <li><a href="#">Artigos Científicos Relacionados</a></li>
                    <li><a href="#">Apresentações e Demos</a></li>
                </ul>
            `
        }
    },
    
    baristapro: {
        title: "BaristaPro",
        introduction: {
            content: `
                <p>O BaristaPro é um sistema inteligente desenvolvido para revolucionar a arte da cafeicultura e preparo de cafés especiais. Este protótipo combina tecnologia de ponta com conhecimento especializado para oferecer ferramentas que aprimoram as técnicas de baristas e garantem a qualidade excepcional em cada xícara.</p>
                <p>Desenvolvido em colaboração com mestres do café e engenheiros de alimentos, o BaristaPro utiliza sensores avançados e algoritmos de inteligência artificial para monitorar e analisar cada etapa do processo de preparo do café, desde a moagem dos grãos até a extração final.</p>
                <p>O projeto nasceu da necessidade de padronizar processos sem perder a arte e a personalidade que tornam cada café especial único. Com o BaristaPro, baristas de todos os níveis podem aprimorar suas técnicas, garantir consistência e explorar novas possibilidades de sabor.</p>
            `
        },
        overview: {
            content: `
                <p>O BaristaPro é composto por um conjunto de dispositivos sensores que se conectam a equipamentos de café existentes (moinhos, máquinas de espresso, etc.) e um aplicativo que coleta, analisa e apresenta dados em tempo real.</p>
                <p>O sistema monitora variáveis críticas como temperatura da água, pressão de extração, tempo de infusão, granulometria do pó, e muitas outras, fornecendo feedback instantâneo e sugestões de ajustes para otimizar a extração.</p>
                <p>Além do monitoramento em tempo real, o BaristaPro oferece um banco de dados com perfis de extração para diferentes origens, variedades e métodos de preparo, permitindo que baristas compartilhem e acessem conhecimento da comunidade global de café especial.</p>
            `
        },
        planning: {
            content: `
                <p>O planejamento do BaristaPro foi estruturado em três fases principais:</p>
                <ul>
                    <li><strong>Fase 1 - Imersão:</strong> Pesquisa aprofundada sobre o processo de preparo de cafés especiais, entrevistas com baristas profissionais e identificação dos pontos críticos que impactam a qualidade final da bebida.</li>
                    <li><strong>Fase 2 - Desenvolvimento:</strong> Criação dos protótipos dos sensores, desenvolvimento dos algoritmos de análise e construção da plataforma digital para armazenamento e compartilhamento de dados.</li>
                    <li><strong>Fase 3 - Validação:</strong> Testes em ambientes reais de cafeterias, ajustes baseados no feedback de baristas profissionais e refinamento da interface do usuário.</li>
                </ul>
                <p>O projeto contou com a participação de baristas campeões, torrefadores, engenheiros de alimentos, desenvolvedores de software e designers especializados em UX para produtos culinários.</p>
            `
        },
        structure: {
            content: `
                <p>A arquitetura do BaristaPro é composta por quatro elementos principais:</p>
                <ol>
                    <li><strong>Sensores Especializados:</strong>
                        <ul>
                            <li>Termômetros de alta precisão para monitoramento de temperatura</li>
                            <li>Manômetros para medição de pressão</li>
                            <li>Sensores de fluxo para análise da velocidade de extração</li>
                            <li>Dispositivos de medição de granulometria</li>
                            <li>Refratômetros portáteis para análise do TDS (Total Dissolved Solids)</li>
                        </ul>
                    </li>
                    <li><strong>Módulo de Conexão:</strong>
                        <ul>
                            <li>Dispositivo central que coleta dados de todos os sensores</li>
                            <li>Conectividade Wi-Fi e Bluetooth</li>
                            <li>Bateria recarregável com autonomia de 8 horas</li>
                            <li>Compatibilidade com equipamentos de diferentes marcas</li>
                        </ul>
                    </li>
                    <li><strong>Aplicativo Mobile:</strong>
                        <ul>
                            <li>Interface intuitiva para visualização de dados em tempo real</li>
                            <li>Gráficos e análises de cada extração</li>
                            <li>Biblioteca de perfis de extração</li>
                            <li>Sistema de recomendações baseado em dados</li>
                            <li>Funcionalidades sociais para compartilhamento de receitas</li>
                        </ul>
                    </li>
                    <li><strong>Plataforma Web:</strong>
                        <ul>
                            <li>Banco de dados centralizado com informações de extrações</li>
                            <li>Ferramentas avançadas de análise</li>
                            <li>Comunidade para troca de conhecimentos</li>
                            <li>Cursos e tutoriais para aprimoramento técnico</li>
                            <li>Integração com sistemas de gestão de cafeterias</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        features: {
            content: `
                <p>O BaristaPro oferece uma série de funcionalidades projetadas para elevar o padrão de qualidade na preparação de cafés especiais:</p>
                <ul>
                    <li><strong>Monitoramento em Tempo Real:</strong> Acompanhamento de todas as variáveis críticas durante a extração.</li>
                    <li><strong>Análise de Perfis:</strong> Comparação visual de diferentes perfis de extração para identificar padrões.</li>
                    <li><strong>Recomendações Inteligentes:</strong> Sugestões de ajustes baseadas nos dados coletados para otimizar a extração.</li>
                    <li><strong>Biblioteca de Receitas:</strong> Acesso a perfis de extração validados por baristas profissionais.</li>
                    <li><strong>Registro Histórico:</strong> Armazenamento de todas as extrações para análise de tendências e consistência.</li>
                    <li><strong>Modo de Treinamento:</strong> Tutoriais interativos para aprimoramento de técnicas específicas.</li>
                    <li><strong>Compartilhamento:</strong> Possibilidade de compartilhar perfis e resultados com a comunidade.</li>
                    <li><strong>Relatórios de Qualidade:</strong> Geração de relatórios detalhados para controle de qualidade em cafeterias.</li>
                </ul>
            `
        },
        guide: {
            content: `
                <p>Para utilizar o BaristaPro, siga as instruções abaixo:</p>
                <ol>
                    <li><strong>Instalação dos Sensores:</strong>
                        <ul>
                            <li>Posicione o termômetro no grupo da máquina de espresso.</li>
                            <li>Instale o manômetro na saída de água.</li>
                            <li>Conecte o sensor de fluxo ao bico da porta-filtro.</li>
                            <li>Calibre o medidor de granulometria conforme as instruções.</li>
                            <li>Ligue o módulo central e aguarde a inicialização.</li>
                        </ul>
                    </li>
                    <li><strong>Configuração do Aplicativo:</strong>
                        <ul>
                            <li>Baixe o aplicativo BaristaPro na App Store ou Google Play.</li>
                            <li>Crie uma conta com suas informações.</li>
                            <li>Conecte-se ao módulo central via Bluetooth.</li>
                            <li>Configure os equipamentos que serão utilizados.</li>
                        </ul>
                    </li>
                    <li><strong>Utilização Diária:</strong>
                        <ul>
                            <li>Selecione o café que será utilizado.</li>
                            <li>Escolha um perfil de extração da biblioteca ou crie um novo.</li>
                            <li>Inicie o monitoramento antes de começar a extração.</li>
                            <li>Acompanhe os dados em tempo real durante o processo.</li>
                            <li>Salve os resultados ao finalizar.</li>
                        </ul>
                    </li>
                    <li><strong>Análise e Melhoria:</strong>
                        <ul>
                            <li>Revise os gráficos de extração após cada preparo.</li>
                            <li>Compare com extrações anteriores para avaliar consistência.</li>
                            <li>Experimente ajustes sugeridos pelo sistema.</li>
                            <li>Compartilhe resultados excepcionais com a comunidade.</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        contribution: {
            content: `
                <p>O projeto BaristaPro é colaborativo e aceita contribuições de diversas fontes:</p>
                <ul>
                    <li><strong>Baristas e Especialistas em Café:</strong>
                        <ul>
                            <li>Participe do nosso programa de embaixadores.</li>
                            <li>Contribua com perfis de extração validados.</li>
                            <li>Forneça feedback sobre a usabilidade do sistema.</li>
                            <li>Crie conteúdo educativo para a plataforma.</li>
                        </ul>
                    </li>
                    <li><strong>Desenvolvedores:</strong>
                        <ul>
                            <li>Acesse nosso repositório no GitHub.</li>
                            <li>Contribua com melhorias nos algoritmos de análise.</li>
                            <li>Desenvolva integrações com equipamentos de café.</li>
                            <li>Crie novas funcionalidades para a plataforma.</li>
                        </ul>
                    </li>
                    <li><strong>Fabricantes de Equipamentos:</strong>
                        <ul>
                            <li>Parceie conosco para integração nativa com seus produtos.</li>
                            <li>Forneça equipamentos para testes e validação.</li>
                            <li>Desenvolva acessórios compatíveis com o sistema.</li>
                        </ul>
                    </li>
                </ul>
                <p>Para a manutenção do projeto, seguimos estas diretrizes:</p>
                <ul>
                    <li>Atualizações trimestrais do firmware dos sensores.</li>
                    <li>Melhorias contínuas nos algoritmos de análise.</li>
                    <li>Expansão da biblioteca de perfis de extração.</li>
                    <li>Compatibilidade com novos equipamentos e tecnologias.</li>
                </ul>
            `
        },
        results: {
            content: `
                <p>Os resultados obtidos com o protótipo do BaristaPro superaram as expectativas:</p>
                <ul>
                    <li><strong>Consistência:</strong> Aumento de 78% na consistência das extrações em cafeterias parceiras.</li>
                    <li><strong>Qualidade:</strong> Melhoria média de 25% nas notas de avaliação sensorial das bebidas.</li>
                    <li><strong>Aprendizado:</strong> Redução de 60% no tempo necessário para treinamento de novos baristas.</li>
                    <li><strong>Adoção:</strong> Mais de 200 cafeterias utilizando o sistema durante o período de teste beta.</li>
                    <li><strong>Perfis Compartilhados:</strong> Mais de 1.500 perfis de extração criados e compartilhados na plataforma.</li>
                </ul>
                <p>Os testes realizados em diferentes tipos de estabelecimentos, de cafeterias especializadas a restaurantes de alto padrão, demonstraram que o BaristaPro é uma ferramenta versátil que se adapta a diferentes necessidades e níveis de conhecimento técnico.</p>
                <p>Os feedbacks dos baristas destacaram especialmente a capacidade do sistema de fornecer insights que antes dependiam apenas da experiência e intuição, permitindo uma abordagem mais científica e replicável da arte de fazer café.</p>
            `
        },
        annexes: {
            content: `
                <p>Documentação complementar do projeto BaristaPro:</p>
                <ul>
                    <li><a href="#">Manual de Instalação e Configuração</a></li>
                    <li><a href="#">Guia de Calibração dos Sensores</a></li>
                    <li><a href="#">Especificações Técnicas Completas</a></li>
                    <li><a href="#">Documentação da API para Integrações</a></li>
                    <li><a href="#">Estudo de Casos em Cafeterias Parceiras</a></li>
                    <li><a href="#">Artigos Científicos sobre Extração de Café</a></li>
                    <li><a href="#">Catálogo de Perfis de Extração Recomendados</a></li>
                    <li><a href="#">Vídeos Tutoriais e Demonstrativos</a></li>
                </ul>
            `
        }
    },
    
    synapse: {
        title: "Synapse",
        introduction: {
            content: `
                <p>O Synapse é uma plataforma inovadora de aprendizado adaptativo que utiliza princípios da neurociência para personalizar a educação de forma revolucionária. Desenvolvido pelo DealeGear, este protótipo busca transformar a maneira como aprendemos, adaptando o conteúdo e o ritmo de estudo às características cognitivas individuais de cada aluno.</p>
                <p>Baseado em pesquisas recentes sobre neuroplasticidade e processos de memória, o Synapse combina algoritmos avançados de machine learning com conhecimentos neurocientíficos para criar experiências de aprendizado mais eficazes e envolventes.</p>
                <p>O projeto surgiu da necessidade de superar as limitações dos modelos educacionais tradicionais, que frequentemente tratam todos os alunos de forma uniforme, ignorando as diferenças individuais nos processos de aprendizagem.</p>
            `
        },
        overview: {
            content: `
                <p>O Synapse é composto por uma plataforma digital que oferece cursos em diversas áreas do conhecimento, mas com uma abordagem radicalmente diferente das plataformas de ensino tradicionais. O sistema utiliza uma série de avaliações cognitivas para mapear o perfil de aprendizado de cada usuário, identificando pontos fortes, áreas de dificuldade e estilos cognitivos preferenciais.</p>
                <p>Com base neste mapeamento, a plataforma adapta dinamicamente o conteúdo, a sequência de apresentação dos tópicos, os métodos de explicação e os tipos de exercícios para maximizar a eficiência do aprendizado. O sistema monitora continuamente o desempenho do aluno, ajustando a abordagem conforme necessário.</p>
                <p>Além da personalização do conteúdo, o Synapse incorpora técnicas baseadas na neurociência para otimizar a retenção de informações, como espaçamento de revisões, contextualização do conhecimento e associações múltiplas.</p>
            `
        },
        planning: {
            content: `
                <p>O desenvolvimento do Synapse foi estruturado em quatro fases principais:</p>
                <ul>
                    <li><strong>Fase 1 - Pesquisa Neurocientífica:</strong> Revisão sistemática da literatura sobre processos cognitivos, memória e aprendizado, com foco em aplicações práticas para educação.</li>
                    <li><strong>Fase 2 - Modelagem Algorítmica:</strong> Desenvolvimento dos modelos matemáticos e algoritmos de machine learning que traduzem os princípios neurocientíficos em funcionalidades da plataforma.</li>
                    <li><strong>Fase 3 - Desenvolvimento da Plataforma:</strong> Criação da infraestrutura técnica, interface do usuário e conteúdo educacional inicial.</li>
                    <li><strong>Fase 4 - Validação e Otimização:</strong> Testes com usuários reais, coleta de dados sobre eficácia do aprendizado e refinamento contínuo dos algoritmos.</li>
                </ul>
                <p>O projeto contou com a colaboração de neurocientistas, psicólogos cognitivos, especialistas em educação, desenvolvedores de software e designers de experiência educacional.</p>
            `
        },
        structure: {
            content: `
                <p>A arquitetura do Synapse é composta por cinco componentes principais:</p>
                <ol>
                    <li><strong>Módulo de Avaliação Cognitiva:</strong>
                        <ul>
                            <li>Bateria de testes para mapear o perfil cognitivo do usuário</li>
                            <li>Avaliação de memória de curto e longo prazo</li>
                            <li>Análise de estilos de aprendizagem (visual, auditivo, cinestésico)</li>
                            <li>Identificação de padrões de atenção e concentração</li>
                            <li>Mapeamento de velocidade de processamento de informações</li>
                        </ul>
                    </li>
                    <li><strong>Motor de Adaptação:</strong>
                        <ul>
                            <li>Algoritmos de machine learning para personalização do conteúdo</li>
                            <li>Sistema de recomendação de sequências de aprendizado</li>
                            <li>Mecanismos de ajuste dinâmico de dificuldade</li>
                            <li>Modelos preditivos de retenção de conhecimento</li>
                        </ul>
                    </li>
                    <li><strong>Banco de Conteúdo Modular:</strong>
                        <ul>
                            <li>Material educacional em múltiplos formatos (texto, vídeo, áudio, interativo)</li>
                            <li>Metadados de classificação cognitiva para cada conteúdo</li>
                            <li>Sistema de versionamento e atualização contínua</li>
                            <li>Ferramentas de criação de conteúdo para especialistas</li>
                        </ul>
                    </li>
                    <li><strong>Interface de Usuário Adaptativa:</strong>
                        <ul>
                            <li>Layout que se adapta ao perfil cognitivo do usuário</li>
                            <li>Elementos visuais otimizados para diferentes estilos de aprendizagem</li>
                            <li>Controles de navegação personalizados</li>
                            <li>Sistema de feedback em tempo real</li>
                        </ul>
                    </li>
                    <li><strong>Analytics de Aprendizado:</strong>
                        <ul>
                            <li>Painel de controle para acompanhamento do progresso</li>
                            <li>Métricas de eficácia do aprendizado</li>
                            <li>Identificação de padrões e anomalias no desempenho</li>
                            <li>Relatórios detalhados para alunos e educadores</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        features: {
            content: `
                <p>O Synapse oferece uma série de funcionalidades inovadoras projetadas para otimizar o processo de aprendizagem:</p>
                <ul>
                    <li><strong>Avaliação Cognitiva Personalizada:</strong> Testes adaptativos que mapeiam o perfil único de aprendizado de cada usuário.</li>
                    <li><strong>Trilhas de Aprendizado Dinâmicas:</strong> Sequências de conteúdo que se adaptam em tempo real ao desempenho e características cognitivas do aluno.</li>
                    <li><strong>Revisão Espaçada Inteligente:</strong> Sistema que agenda revisões no momento ótimo para maximizar a retenção de longo prazo.</li>
                    <li><strong>Multi-representação do Conhecimento:</strong> Apresentação dos mesmos conceitos em diferentes formatos para atender a diversos estilos cognitivos.</li>
                    <li><strong>Feedback Adaptativo:</strong> Orientações personalizadas que levam em conta o perfil cognitivo do aluno.</li>
                    <li><strong>Simulações Contextuais:</strong> Exercícios práticos que conectam o conhecimento teórico a situações reais e relevantes.</li>
                    <li><strong>Comunidade de Aprendizagem:</strong> Espaço para troca de experiências entre usuários com perfis cognitivos semelhantes.</li>
                    <li><strong>Painel de Neurodesempenho:</strong> Visualização detalhada do progresso, destacando áreas de melhoria e pontos fortes cognitivos.</li>
                </ul>
            `
        },
        guide: {
            content: `
                <p>Para utilizar o Synapse, siga os passos abaixo:</p>
                <ol>
                    <li><strong>Cadastro e Avaliação Inicial:</strong>
                        <ul>
                            <li>Acesse o site do Synapse e crie uma conta.</li>
                            <li>Preencha suas informações básicas e objetivos de aprendizado.</li>
                            <li>Realize a bateria de avaliação cognitiva inicial (aproximadamente 45 minutos).</li>
                            <li>Aguarde a geração do seu perfil cognitivo personalizado.</li>
                        </ul>
                    </li>
                    <li><strong>Escolha do Conteúdo:</strong>
                        <ul>
                            <li>Selecione a área de conhecimento que deseja estudar.</li>
                            <li>Defina seus objetivos e prazo de aprendizado.</li>
                            <li>Explore as trilhas recomendadas com base no seu perfil.</li>
                            <li>Personalize sua experiência de aprendizado conforme preferências.</li>
                        </ul>
                    </li>
                    <li><strong>Estudo e Prática:</strong>
                        <ul>
                            <li>Acesse o conteúdo diário recomendado pelo sistema.</li>
                            <li>Interaja com o material nos formatos sugeridos para seu perfil.</li>
                            <li>Realize os exercícios propostos ao final de cada módulo.</li>
                            <li>Participe das atividades práticas e simulações.</li>
                        </ul>
                    </li>
                    <li><strong>Acompanhamento e Ajustes:</strong>
                        <ul>
                            <li>Revise regularmente seu painel de neurodesempenho.</li>
                            <li>Realize as revisões agendadas pelo sistema.</li>
                            <li>Participe das sessões de grupo com perfis cognitivos semelhantes.</li>
                            <li>Ajuste seus objetivos e preferências conforme necessário.</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        contribution: {
            content: `
                <p>O projeto Synapse é colaborativo e aceita contribuições de diversas áreas:</p>
                <ul>
                    <li><strong>Neurocientistas e Pesquisadores:</strong>
                        <ul>
                            <li>Contribua com os mais recentes achados neurocientíficos.</li>
                            <li>Participe da validação dos modelos cognitivos utilizados.</li>
                            <li>Sugira novas métricas e avaliações cognitivas.</li>
                            <li>Colabore em pesquisas sobre eficácia da plataforma.</li>
                        </ul>
                    </li>
                    <li><strong>Educadores e Especialistas em Conteúdo:</strong>
                        <ul>
                            <li>Crie conteúdo educacional para a plataforma.</li>
                            <li>Desenvolva estratégias pedagógicas inovadoras.</li>
                            <li>Valide a qualidade e relevância do material.</li>
                            <li>Contribua com casos de uso e aplicações práticas.</li>
                        </ul>
                    </li>
                    <li><strong>Desenvolvedores e Engenheiros:</strong>
                        <ul>
                            <li>Acesse nosso repositório no GitHub.</li>
                            <li>Melhore os algoritmos de adaptação e personalização.</li>
                            <li>Desenvolva novas funcionalidades para a plataforma.</li>
                            <li>Contribua com a otimização de performance e escalabilidade.</li>
                        </ul>
                    </li>
                </ul>
                <p>Para a manutenção do projeto, seguimos estas diretrizes:</p>
                <ul>
                    <li>Atualização contínua da base neurocientífica que sustenta a plataforma.</li>
                    <li>Revisão periódica dos algoritmos de adaptação com base em novos dados.</li>
                    <li>Expansão do conteúdo educacional disponível.</li>
                    <li>Melhorias na interface e experiência do usuário com base no feedback.</li>
                </ul>
            `
        },
        results: {
            content: `
                <p>Os resultados obtidos com o protótipo do Synapse foram extremamente positivos:</p>
                <ul>
                    <li><strong>Retenção de Conhecimento:</strong> Aumento de 68% na retenção de longo prazo comparado a métodos tradicionais.</li>
                    <li><strong>Velocidade de Aprendizagem:</strong> Redução média de 42% no tempo necessário para dominar novos conceitos.</li>
                    <li><strong>Engajamento:</strong> Aumento de 85% nas taxas de conclusão de cursos e módulos.</li>
                    <li><strong>Satisfação:</strong> 93% dos usuários relataram satisfação superior com outras plataformas de aprendizado.</li>
                    <li><strong>Aplicação Prática:</strong> 76% dos usuários conseguiram aplicar efetivamente o conhecimento adquirido em situações reais.</li>
                </ul>
                <p>Os estudos realizados em parceria com instituições de ensino demonstraram que o Synapse é particularmente eficaz para alunos que historicamente enfrentam dificuldades com modelos educacionais tradicionais, incluindo pessoas com transtornos de aprendizagem e diferentes estilos cognitivos.</p>
                <p>Os testes em ambientes corporativos também mostraram resultados promissores, com redução significativa no tempo e custos de treinamento, além de melhoria na aplicação prática das habilidades desenvolvidas.</p>
            `
        },
        annexes: {
            content: `
                <p>Documentação complementar do projeto Synapse:</p>
                <ul>
                    <li><a href="#">Fundamentos Neurocientíficos da Plataforma</a></li>
                    <li><a href="#">Documentação Técnica dos Algoritmos de Adaptação</a></li>
                    <li><a href="#">Manual do Educador para Utilização em Ambientes Escolares</a></li>
                    <li><a href="#">Estudos de Caso em Diferentes Contextos Educacionais</a></li>
                    <li><a href="#">Pesquisas Publicadas sobre Eficácia do Método</a></li>
                    <li><a href="#">Diretrizes para Criação de Conteúdo Adaptativo</a></li>
                    <li><a href="#">API para Integração com Sistemas Educacionais</a></li>
                    <li><a href="#">Webinars e Tutoriais para Especialistas</a></li>
                </ul>
            `
        }
    },
    
    // Dados para os outros protótipos seguiriam o mesmo padrão
    // Para manter o exemplo conciso, estou incluindo apenas a estrutura básica para os demais
    
    "3gto": {
        title: "3GTO",
        introduction: {
            content: `<p>O 3GTO é uma ferramenta inovadora de modelagem 3D colaborativa desenvolvida para revolucionar projetos de engenharia e arquitetura. Esta plataforma permite que múltiplos profissionais trabalhem simultaneamente em modelos complexos, superando as limitações das ferramentas tradicionais.</p>`
        },
        overview: {
            content: `<p>O 3GTO combina tecnologia de modelagem tridimensional avançada com recursos de colaboração em tempo real, permitindo que engenheiros, arquitetos e designers trabalhem juntos de forma integrada, independentemente de sua localização geográfica.</p>`
        },
        planning: {
            content: `<p>O desenvolvimento do 3GTO foi planejado em três fases principais: pesquisa de necessidades do mercado, desenvolvimento do núcleo tecnológico e validação com usuários em ambientes reais de projeto.</p>`
        },
        structure: {
            content: `<p>A arquitetura do 3GTO é composta por um motor de renderização em tempo real, sistema de versionamento de modelos, ferramentas de colaboração síncrona e assíncrona, e APIs para integração com outras plataformas de CAD e BIM.</p>`
        },
        features: {
            content: `<p>Entre as principais funcionalidades do 3GTO estão: modelagem paramétrica avançada, colaboração multiusuário em tempo real, sistema de comentários e marcações, integração com realidade virtual e aumentada, e biblioteca de componentes padronizados.</p>`
        },
        guide: {
            content: `<p>Para utilizar o 3GTO, os usuários devem criar uma conta, instalar o aplicativo desktop ou acessar a versão web, convidar colaboradores para seus projetos e começar a modelar utilizando as ferramentas intuitivas da plataforma.</p>`
        },
        contribution: {
            content: `<p>O projeto 3GTO aceita contribuições de desenvolvedores para melhorias no motor de renderização, designers para aprimoramento da interface, e profissionais da área para validação e sugestão de novas funcionalidades.</p>`
        },
        results: {
            content: `<p>Os resultados com o protótipo do 3GTO mostraram redução de 35% no tempo de desenvolvimento de projetos, aumento de 60% na produtividade de equipes distribuídas, e alta satisfação dos usuários com a experiência de colaboração.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: manuais de usuário, especificações técnicas, tutoriais em vídeo, estudos de caso e documentação da API para desenvolvedores.</p>`
        }
    },
    
    baristas: {
        title: "Baristas",
        introduction: {
            content: `<p>Baristas é uma rede social inovadora criada exclusivamente para profissionais do café. Esta plataforma conecta baristas, torrefadores, produtores e entusiastas, criando um ecossistema colaborativo para compartilhamento de conhecimento e oportunidades.</p>`
        },
        overview: {
            content: `<p>O Baristas combina funcionalidades de rede social com ferramentas profissionais, permitindo que os usuários compartilhem técnicas, discutam tendências do mercado, encontrem oportunidades de emprego e participem de competições e eventos da comunidade.</p>`
        },
        planning: {
            content: `<p>O planejamento do Baristas envolveu pesquisa aprofundada com profissionais do café, identificação das necessidades não atendidas pelas redes sociais tradicionais, e desenvolvimento de funcionalidades específicas para a comunidade.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Baristas inclui: perfis profissionais detalhados, sistema de conexões e networking, fóruns temáticos, plataforma de compartilhamento de conteúdo, sistema de vagas e recrutamento, e calendário de eventos da indústria.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: perfis profissionais com portfólio, feed de conteúdo personalizado, grupos de discussão por especialidade, sistema de mentorias, marketplace de produtos e serviços, e integração com certificações profissionais.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Baristas, crie um perfil profissional detalhando suas experiências e especialidades, conecte-se com outros profissionais, participe de grupos relevantes, compartilhe conteúdo de qualidade e explore oportunidades na plataforma.</p>`
        },
        contribution: {
            content: `<p>O projeto Baristas aceita contribuições de desenvolvedores para melhorias na plataforma, especialistas em café para validação de conteúdo, e parceiros da indústria para enriquecimento do ecossistema.</p>`
        },
        results: {
            content: `<p>Resultados do protótipo: mais de 10.000 profissionais cadastrados em 6 meses, alta taxa de engajamento com média de 4 visitas semanais por usuário, e diversos relatos de oportunidades profissionais geradas através da plataforma.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: guia de boas práticas, manual para criadores de conteúdo, termos de uso e política de privacidade, e estudos de impacto na comunidade do café.</p>`
        }
    },
    
    dyris: {
        title: "Dyris",
        introduction: {
            content: `<p>O Dyris é um sistema inovador de visão computacional desenvolvido para o diagnóstico precoce de doenças oculares. Utilizando inteligência artificial e processamento avançado de imagens, esta tecnologia permite a detecção de patologias em estágios iniciais, quando o tratamento é mais eficaz.</p>`
        },
        overview: {
            content: `<p>O Dyris combina algoritmos de deep learning com imagens de alta resolução da retina para identificar padrões indicativos de doenças como glaucoma, retinopatia diabética, degeneração macular e outras condições que podem levar à perda da visão.</p>`
        },
        planning: {
            content: `<p>O desenvolvimento do Dyris foi estruturado em fases de pesquisa bibliográfica, coleta e anotação de imagens médicas, treinamento dos modelos de IA, validação clínica e integração com fluxos de trabalho oftalmológicos.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Dyris inclui: dispositivos de captura de imagens retinianas, módulo de processamento e pré-análise, motor de IA para detecção de anomalias, sistema de geração de laudos, e interface para integração com prontuários eletrônicos.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: captura automatizada de imagens, análise em tempo real, detecção de múltiplas patologias, geração de mapas de calor para visualização de áreas afetadas, sistema de acompanhamento da evolução de doenças, e alertas para situações de urgência.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Dyris, o profissional de saúde deve capturar as imagens retinianas com o equipamento compatível, aguardar a análise automática do sistema, revisar os resultados gerados, e integrar as informações ao diagnóstico clínico do paciente.</p>`
        },
        contribution: {
            content: `<p>O projeto Dyris aceita contribuições de oftalmologistas para validação clínica, cientistas de dados para melhoria dos algoritmos, e instituições de pesquisa para expansão do banco de imagens e validação em novas populações.</p>`
        },
        results: {
            content: `<p>Resultados obtidos: sensibilidade de 94% na detecção de retinopatia diabética, especificidade de 91% para glaucoma, redução de 70% no tempo para diagnóstico preliminar, e alta aceitação por profissionais de saúde em ambientes de teste.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: estudos de validação clínica, manuais de operação, especificações técnicas, artigos científicos publicados, e diretrizes para integração com sistemas de saúde.</p>`
        }
    },
    
    fabr: {
        title: "Fabr",
        introduction: {
            content: `<p>O Fabr é uma plataforma de gestão otimizada desenvolvida para fábricas de pequeno e médio porte. Esta solução integra processos de produção, controle de qualidade, gestão de estoque e manutenção em um único sistema intuitivo e acessível.</p>`
        },
        overview: {
            content: `<p>O Fabr combina tecnologias de Industry 4.0 com uma interface amigável, permitindo que indústrias menores aproveitem os benefícios da digitalização sem a complexidade e os custos associados a sistemas corporativos tradicionais.</p>`
        },
        planning: {
            content: `<p>O planejamento do Fabr envolveu pesquisa aprofundada sobre desafios específicos de PMEs industriais, identificação de processos críticos que necessitam de otimização, e desenvolvimento de uma solução escalável que cresce junto com o negócio.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Fabr inclui: módulo de planejamento e controle da produção, sistema de gestão de qualidade, controle de estoque e matéria-prima, gerenciamento de manutenção preditiva, painéis de controle em tempo real, e integração com equipamentos de produção.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: programação inteligente da produção, monitoramento em tempo real de indicadores, rastreamento de lotes, gestão de não conformidades, agendamento de manutenções preventivas, relatórios de produtividade e eficiência, e alertas automáticos.</p>`
        },
        guide: {
            content: `<p>Para implementar o Fabr, a empresa deve cadastrar seus produtos e processos, configurar os parâmetros de produção, integrar os equipamentos existentes, capacitar a equipe no uso da plataforma, e estabelecer rotinas de monitoramento e análise de dados.</p>`
        },
        contribution: {
            content: `<p>O projeto Fabr aceita contribuições de especialistas em manufatura para validação de processos, desenvolvedores industriais para integração com equipamentos, e gestores de produção para feedback sobre usabilidade e funcionalidades.</p>`
        },
        results: {
            content: `<p>Resultados em empresas piloto: aumento médio de 25% na produtividade, redução de 30% nos níveis de estoque, diminuição de 40% no tempo de inatividade não planejado, e retorno sobre o investimento em menos de 8 meses.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: manuais de implementação, guias de integração com equipamentos, estudos de caso por setor industrial, planilhas de cálculo de ROI, e materiais de treinamento para equipes.</p>`
        }
    },
    
    undersea: {
        title: "UnderSea",
        introduction: {
            content: `<p>O UnderSea é um sistema avançado de monitoramento marinho desenvolvido para apoiar a conservação de ecossistemas costeiros. Utilizando uma rede de sensores e inteligência artificial, esta tecnologia coleta dados em tempo real sobre condições ambientais e biodiversidade marinha.</p>`
        },
        overview: {
            content: `<p>O UnderSea combina boias inteligentes, veículos subaquáticos autônomos e análises baseadas em IA para criar um sistema abrangente de monitoramento oceânico. Os dados coletados são processados para identificar padrões, anomalias e tendências que podem indicar problemas ambientais.</p>`
        },
        planning: {
            content: `<p>O desenvolvimento do UnderSea foi planejado em fases de pesquisa tecnológica, desenvolvimento dos sensores e veículos, criação dos algoritmos de análise, implantação piloto em áreas costeiras selecionadas, e integração com sistemas de gestão ambiental.</p>`
        },
        structure: {
            content: `<p>A arquitetura do UnderSea inclui: rede de sensores ambientais subaquáticos e de superfície, veículos autônomos para mapeamento e coleta, sistema de comunicação submarina, plataforma de processamento de dados na nuvem, interface de visualização e análise, e módulo de alertas ambientais.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: monitoramento contínuo de parâmetros como temperatura, salinidade e pH, detecção de poluentes, mapeamento de habitats marinhos, identificação de espécies, previsão de eventos como marés vermelhas, e geração de relatórios de saúde oceânica.</p>`
        },
        guide: {
            content: `<p>Para utilizar o UnderSea, os gestores ambientais devem instalar a rede de sensores na área de interesse, configurar os parâmetros de monitoramento, calibrar os veículos autônomos, estabelecer os protocolos de coleta de dados, e definir os critérios para alertas ambientais.</p>`
        },
        contribution: {
            content: `<p>O projeto UnderSea aceita contribuições de oceanógrafos para validação científica, engenheiros para melhoria dos sistemas de coleta, cientistas de dados para refinamento dos algoritmos, e instituições de conservação para aplicação prática dos dados.</p>`
        },
        results: {
            content: `<p>Resultados em áreas piloto: detecção precoce de 87% dos eventos de poluição, mapeamento de 15.000 hectares de recifes de coral com alta precisão, identificação de 3 novas espécies marinhas, e fornecimento de dados para 5 planos de gestão costeira.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: manuais técnicos de instalação, protocolos de calibração, guias de interpretação de dados, artigos científicos publicados, e relatórios de impacto ambiental.</p>`
        }
    },
    
    oxygen: {
        title: "Oxygen",
        introduction: {
            content: `<p>O Oxygen é um dispositivo portátil inovador para monitoramento da qualidade do ar em ambientes urbanos. Desenvolvido pelo DealeGear, este protótipo permite que cidadãos e autoridades acompanhem em tempo real os níveis de poluição, promovendo conscientização e ações para melhorar a qualidade do ar.</p>`
        },
        overview: {
            content: `<p>O Oxygen combina sensores de alta precisão com conectividade móvel para criar uma rede distribuída de monitoramento atmosférico. Os dados coletados são agregados em uma plataforma que visualiza a qualidade do ar em diferentes pontos da cidade, identificando áreas críticas e tendências.</p>`
        },
        planning: {
            content: `<p>O planejamento do Oxygen envolveu pesquisa sobre poluentes urbanos mais relevantes, desenvolvimento de sensores miniaturizados e de baixo custo, criação da plataforma de agregação de dados, e definição de estratégias para engajamento comunitário e uso dos dados.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Oxygen inclui: dispositivo portátil com múltiplos sensores, aplicativo móvel para visualização individual, plataforma web para agregação de dados, sistema de análise e geração de alertas, e APIs para integração com sistemas de gestão urbana.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: medição de partículas PM2.5 e PM10, detecção de gases como CO, NO2 e O3, georreferenciamento dos dados, mapa de calor da qualidade do ar, alertas personalizados baseados em localização, histórico de exposição e recomendações de saúde.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Oxygen, o usuário deve carregar o dispositivo, criar uma conta no aplicativo, sincronizar o dispositivo via Bluetooth, definir suas preferências de alertas, e posicionar o dispositivo em local adequado para coleta de dados.</p>`
        },
        contribution: {
            content: `<p>O projeto Oxygen aceita contribuições de especialistas em qualidade do ar para validação dos dados, desenvolvedores para melhoria da plataforma, urbanistas para aplicação dos dados em políticas públicas, e cidadãos para expansão da rede de monitoramento.</p>`
        },
        results: {
            content: `<p>Resultados em cidades piloto: implantação de 2.000 dispositivos, cobertura de 85% da área urbana, detecção de 30 pontos críticos de poluição não identificados anteriormente, e adoção dos dados em 3 planos municipais de melhoria da qualidade do ar.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: manuais do usuário, especificações técnicas, protocolos de calibração, guias para interpretação de dados, e relatórios de impacto na saúde pública.</p>`
        }
    },
    
    bosque: {
        title: "Bosque das Frutíferas",
        introduction: {
            content: `<p>O Bosque das Frutíferas é uma plataforma inovadora para gestão de pomares comunitários e incentivo à agricultura urbana. Desenvolvida pelo DealeGear, esta solução conecta cidadãos, organizações e espaços públicos para criar e manter áreas de cultivo coletivo em ambientes urbanos.</p>`
        },
        overview: {
            content: `<p>O Bosque das Frutíferas combina um sistema de mapeamento de áreas disponíveis para cultivo com ferramentas de gestão colaborativa, permitindo que comunidades planejem, executem e mantenham pomares compartilhados. A plataforma também facilita a distribuição dos produtos colhidos e o compartilhamento de conhecimentos agrícolas.</p>`
        },
        planning: {
            content: `<p>O planejamento do projeto envolveu pesquisa sobre iniciativas de agricultura urbana existentes, identificação de desafios na gestão coletiva de pomares, desenvolvimento de funcionalidades para engajamento comunitário, e estabelecimento de parcerias com instituições públicas e privadas.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Bosque das Frutíferas inclui: sistema de mapeamento de áreas disponíveis, ferramentas de planejamento de cultivos, módulo de gestão de tarefas e voluntários, sistema de registro de colheitas, plataforma de distribuição de produtos, e espaço para compartilhamento de conhecimentos agrícolas.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: mapa interativo de pomares comunitários, sistema de agendamento de atividades de cuidado, registro de crescimento e produção, gestão de recursos como água e insumos, organização de eventos de colheita coletiva, e integração com programas de segurança alimentar.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Bosque das Frutíferas, os usuários devem criar uma conta, explorar o mapa para encontrar pomares próximos ou registrar novas áreas, participar das atividades planejadas, contribuir com o cuidado das plantas, e compartilhar os produtos colhidos conforme as regras de cada comunidade.</p>`
        },
        contribution: {
            content: `<p>O projeto Bosque das Frutíferas aceita contribuições de agrônomos para orientação técnica, urbanistas para identificação de áreas adequadas, desenvolvedores para melhoria da plataforma, e líderes comunitários para engajamento e organização dos pomares.</p>`
        },
        results: {
            content: `<p>Resultados em cidades piloto: criação de 25 pomares comunitários, envolvimento de mais de 3.000 voluntários, produção de 5 toneladas de frutas anuais, recuperação de 10.000m² de áreas urbanas subutilizadas, e aumento de 40% no acesso a alimentos frescos em comunidades participantes.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: guias para criação de pomares, manuais de cultivo urbano, materiais educativos, modelos de gestão comunitária, e estudos de impacto social e ambiental.</p>`
        }
    },
    
    mecanico: {
        title: "Mecanico Fantasma",
        introduction: {
            content: `<p>O Mecanico Fantasma é um sistema avançado de diagnóstico preditivo para veículos, baseado em inteligência artificial. Desenvolvido pelo DealeGear, esta solução revoluciona a manutenção automotiva ao identificar problemas antes que se tornem falhas graves, reduzindo custos e aumentando a segurança.</p>`
        },
        overview: {
            content: `<p>O Mecanico Fantasma utiliza dados de múltiplos sensores veiculares, combinados com algoritmos de machine learning, para analisar o desempenho do veículo em tempo real. O sistema detecta anomalias sutis que podem indicar desgaste ou falhas iminentes, fornecendo alertas preditivos e recomendações de manutenção.</p>`
        },
        planning: {
            content: `<p>O planejamento do projeto envolveu pesquisa sobre falhas comuns em diferentes tipos de veículos, desenvolvimento de modelos preditivos baseados em dados históricos, criação de interfaces intuitivas para motoristas e mecânicos, e validação em condições reais de uso.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Mecanico Fantasma inclui: dispositivo de conexão ao veículo (OBD-II), módulo de coleta e transmissão de dados, plataforma de processamento na nuvem com algoritmos de IA, aplicativo para motoristas com alertas e recomendações, e interface profissional para oficinas mecânicas.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: monitoramento contínuo de parâmetros veiculares, detecção precoce de anomalias, previsão de falhas com antecedência, recomendações de manutenção preventiva, histórico completo do desempenho do veículo, estimativa de custos de reparo, e localização de oficinas parceiras.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Mecanico Fantasma, o motorista deve instalar o dispositivo no conector OBD-II do veículo, baixar o aplicativo, criar uma conta, e seguir as orientações de configuração inicial. O sistema começará a monitorar o veículo automaticamente, enviando alertas quando necessário.</p>`
        },
        contribution: {
            content: `<p>O projeto Mecanico Fantasma aceita contribuições de engenheiros automotivos para validação dos diagnósticos, cientistas de dados para melhoria dos algoritmos preditivos, desenvolvedores para aprimoramento da plataforma, e oficinas mecânicas para validação prática das recomendações.</p>`
        },
        results: {
            content: `<p>Resultados em testes de campo: detecção antecipada de 92% das falhas graves, redução de 65% em custos de reparo emergenciais, aumento de 40% na vida útil de componentes críticos, e satisfação de 95% dos usuários com a precisão dos diagnósticos.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: manuais de instalação, guias de interpretação de alertas, catálogo de falhas detectadas, documentação da API para integração com sistemas de oficina, e estudos de retorno sobre investimento.</p>`
        }
    },
    
    viver: {
        title: "Viver é uma Arte",
        introduction: {
            content: `<p>"Viver é uma Arte" é uma plataforma inovadora de conexão entre artistas e comunidades para projetos culturais colaborativos. Desenvolvida pelo DealeGear, esta solução cria pontes entre criativos de diversas áreas e grupos comunitários, facilitando a realização de iniciativas que transformam espaços e pessoas através da arte.</p>`
        },
        overview: {
            content: `<p>A plataforma combina um diretório de artistas com um sistema de propostas de projetos comunitários, permitindo que organizações, escolas, grupos de bairro e outras instituições encontrem profissionais criativos para colaborar em iniciativas culturais. O sistema também oferece ferramentas para planejamento, execução e documentação dos projetos.</p>`
        },
        planning: {
            content: `<p>O planejamento do projeto envolveu pesquisa sobre o ecossistema cultural local, identificação de barreiras para colaboração entre artistas e comunidades, desenvolvimento de funcionalidades que facilitam o encontro e o trabalho conjunto, e estabelecimento de parcerias com instituições culturais.</p>`
        },
        structure: {
            content: `<p>A arquitetura do "Viver é uma Arte" inclui: perfis detalhados de artistas e coletivos, sistema de cadastro de propostas comunitárias, ferramentas de matching entre projetos e profissionais, módulo de planejamento colaborativo, espaço para documentação de processos, e galeria de resultados.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: busca inteligente de artistas por especialidade e disponibilidade, sistema de propostas de projetos com orçamento e cronograma, ferramentas de comunicação entre partes, espaço para compartilhamento de referências e inspirações, sistema de acompanhamento de etapas, e galeria para exibição dos resultados.</p>`
        },
        guide: {
            content: `<p>Para utilizar a plataforma, artistas devem criar um perfil completo com portfólio, enquanto representantes comunitários cadastram suas propostas de projetos. O sistema sugere combinações compatíveis, e as partes podem se conectar para detalhar a colaboração. Após o acordo, o espaço de projeto é ativado para planejamento conjunto.</p>`
        },
        contribution: {
            content: `<p>O projeto "Viver é uma Arte" aceita contribuições de artistas para validação da plataforma, produtores culturais para aprimoramento das ferramentas de gestão, desenvolvedores para novas funcionalidades, e instituições culturais para ampliação do ecossistema de parceiros.</p>`
        },
        results: {
            content: `<p>Resultados no período piloto: mais de 500 artistas cadastrados, 120 projetos comunitários realizados, envolvimento de mais de 5.000 participantes, criação de 30 obras permanentes em espaços públicos, e formação de 15 coletivos artísticos comunitários.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: guias para artistas, manuais para proponentes comunitários, modelos de contratos colaborativos, materiais de capacitação em gestão cultural, e estudos de impacto social dos projetos realizados.</p>`
        }
    },
    
    aventuras: {
        title: "Aventuras Peludas",
        introduction: {
            content: `<p>Aventuras Peludas é um aplicativo inovador para gestão de cuidados com pets e conexão entre tutores e serviços veterinários. Desenvolvido pelo DealeGear, esta solução centraliza todas as informações importantes sobre animais de estimação, facilitando o cuidado diário e o acesso a serviços profissionais.</p>`
        },
        overview: {
            content: `<p>O Aventuras Peludas combina um sistema de gestão completa para tutores com uma plataforma de conexão com serviços veterinários, pet shops, passeadores e outros profissionais. O aplicativo permite o registro de todas as informações relevantes sobre cada pet, incluindo histórico médico, vacinas, cuidados diários e preferências.</p>`
        },
        planning: {
            content: `<p>O planejamento do projeto envolveu pesquisa com tutores de pets para identificar necessidades não atendidas, entrevistas com profissionais veterinários para entender os desafios de comunicação com clientes, desenvolvimento de funcionalidades que simplificam o cuidado animal, e estabelecimento de parcerias com serviços do setor.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Aventuras Peludas inclui: perfis detalhados para cada pet, sistema de lembretes para cuidados e compromissos, módulo de histórico médico completo, plataforma de agendamento de serviços, diretório de profissionais e estabelecimentos, sistema de avaliações e recomendações, e espaço para compartilhamento de experiências.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: registro completo de informações de cada pet, calendário integrado com lembretes de vacinas e vermifugação, histórico médico com exames e prescrições, sistema de rastreamento de peso e comportamento, agendamento de consultas e serviços, busca por profissionais por localização e especialidade, e rede social para compartilhamento de dicas e experiências.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Aventuras Peludas, o tutor deve baixar o aplicativo, criar uma conta, cadastrar seus pets com informações detalhadas, configurar os lembretes importantes, e explorar os serviços disponíveis na região. Os profissionais podem se cadastrar na plataforma para oferecer seus serviços e gerenciar agendamentos.</p>`
        },
        contribution: {
            content: `<p>O projeto Aventuras Peludas aceita contribuições de veterinários para validação do conteúdo médico, desenvolvedores para melhoria da plataforma, designers para aprimoramento da experiência do usuário, e usuários para feedback contínuo sobre funcionalidades e usabilidade.</p>`
        },
        results: {
            content: `<p>Resultados no período de teste: mais de 20.000 pets cadastrados, 85% de redução em esquecimentos de vacinas, 70% de melhoria na comunicação entre tutores e veterinários, economia média de 30% no tempo para agendamento de serviços, e alta satisfação dos usuários com a organização das informações.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: guias para tutores, manuais para profissionais parceiros, materiais educativos sobre cuidados com pets, termos de uso e política de privacidade, e estudos de impacto na saúde animal.</p>`
        }
    },
    
    raiz: {
        title: "Raiz Urbana",
        introduction: {
            content: `<p>Raiz Urbana é um sistema inovador de mapeamento e gestão de jardins urbanos para melhoria da qualidade de vida nas cidades. Desenvolvido pelo DealeGear, esta plataforma conecta cidadãos, espaços verdes e recursos para criar e manter áreas de cultivo que beneficiam comunidades inteiras.</p>`
        },
        overview: {
            content: `<p>O Raiz Urbana combina tecnologia de mapeamento geográfico com ferramentas de gestão colaborativa para identificar, catalogar e gerenciar espaços verdes urbanos. A plataforma permite que comunidades planejem, executem e mantenham jardins e hortas coletivas, promovendo a agricultura urbana, a biodiversidade e a interação social.</p>`
        },
        planning: {
            content: `<p>O planejamento do projeto envolveu pesquisa sobre iniciativas de jardinagem urbana existentes, identificação de áreas subutilizadas com potencial para verde, desenvolvimento de funcionalidades para engajamento comunitário, e estabelecimento de parcerias com prefeituras e organizações ambientais.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Raiz Urbana inclui: sistema de mapeamento de espaços verdes existentes e potenciais, ferramentas de planejamento de jardins e hortas, módulo de gestão de voluntários e recursos, sistema de acompanhamento do crescimento das plantas, plataforma para compartilhamento de conhecimentos, e integração com programas de educação ambiental.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: mapa interativo de jardins urbanos, sistema de cadastro de novas áreas verdes, ferramentas de planejamento de cultivos, gestão de voluntários e tarefas, registro de crescimento e produção, compartilhamento de recursos como sementes e ferramentas, calendário de eventos comunitários, e integração com programas de coleta seletiva e compostagem.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Raiz Urbana, os usuários devem criar uma conta, explorar o mapa para encontrar jardins próximos ou registrar novas áreas, participar das atividades de plantio e manutenção, contribuir com o compartilhamento de recursos e conhecimentos, e engajar-se na comunidade local através da plataforma.</p>`
        },
        contribution: {
            content: `<p>O projeto Raiz Urbana aceita contribuições de agrônomos e paisagistas para orientação técnica, urbanistas para identificação de áreas adequadas, biólogos para promoção da biodiversidade, desenvolvedores para melhoria da plataforma, e líderes comunitários para engajamento e organização dos espaços verdes.</p>`
        },
        results: {
            content: `<p>Resultados em cidades piloto: mapeamento de 200 jardins existentes, criação de 50 novas áreas verdes, envolvimento de mais de 4.000 voluntários, plantio de 10.000 mudas nativas, aumento de 25% na cobertura verde em bairros participantes, e melhoria percebida na qualidade de vida por 85% dos moradores.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: guias para criação de jardins urbanos, manuais de cultivo de espécies nativas, materiais educativos sobre sustentabilidade, modelos de gestão comunitária, e estudos de impacto ambiental e social.</p>`
        }
    },
    versoespresso: {
        title: "Raiz Urbana",
        introduction: {
            content: `<p>Raiz Urbana é um sistema inovador de mapeamento e gestão de jardins urbanos para melhoria da qualidade de vida nas cidades. Desenvolvido pelo DealeGear, esta plataforma conecta cidadãos, espaços verdes e recursos para criar e manter áreas de cultivo que beneficiam comunidades inteiras.</p>`
        },
        overview: {
            content: `<p>O Raiz Urbana combina tecnologia de mapeamento geográfico com ferramentas de gestão colaborativa para identificar, catalogar e gerenciar espaços verdes urbanos. A plataforma permite que comunidades planejem, executem e mantenham jardins e hortas coletivas, promovendo a agricultura urbana, a biodiversidade e a interação social.</p>`
        },
        planning: {
            content: `<p>O planejamento do projeto envolveu pesquisa sobre iniciativas de jardinagem urbana existentes, identificação de áreas subutilizadas com potencial para verde, desenvolvimento de funcionalidades para engajamento comunitário, e estabelecimento de parcerias com prefeituras e organizações ambientais.</p>`
        },
        structure: {
            content: `<p>A arquitetura do Raiz Urbana inclui: sistema de mapeamento de espaços verdes existentes e potenciais, ferramentas de planejamento de jardins e hortas, módulo de gestão de voluntários e recursos, sistema de acompanhamento do crescimento das plantas, plataforma para compartilhamento de conhecimentos, e integração com programas de educação ambiental.</p>`
        },
        features: {
            content: `<p>Principais funcionalidades: mapa interativo de jardins urbanos, sistema de cadastro de novas áreas verdes, ferramentas de planejamento de cultivos, gestão de voluntários e tarefas, registro de crescimento e produção, compartilhamento de recursos como sementes e ferramentas, calendário de eventos comunitários, e integração com programas de coleta seletiva e compostagem.</p>`
        },
        guide: {
            content: `<p>Para utilizar o Raiz Urbana, os usuários devem criar uma conta, explorar o mapa para encontrar jardins próximos ou registrar novas áreas, participar das atividades de plantio e manutenção, contribuir com o compartilhamento de recursos e conhecimentos, e engajar-se na comunidade local através da plataforma.</p>`
        },
        contribution: {
            content: `<p>O projeto Raiz Urbana aceita contribuições de agrônomos e paisagistas para orientação técnica, urbanistas para identificação de áreas adequadas, biólogos para promoção da biodiversidade, desenvolvedores para melhoria da plataforma, e líderes comunitários para engajamento e organização dos espaços verdes.</p>`
        },
        results: {
            content: `<p>Resultados em cidades piloto: mapeamento de 200 jardins existentes, criação de 50 novas áreas verdes, envolvimento de mais de 4.000 voluntários, plantio de 10.000 mudas nativas, aumento de 25% na cobertura verde em bairros participantes, e melhoria percebida na qualidade de vida por 85% dos moradores.</p>`
        },
        annexes: {
            content: `<p>Documentação complementar: guias para criação de jardins urbanos, manuais de cultivo de espécies nativas, materiais educativos sobre sustentabilidade, modelos de gestão comunitária, e estudos de impacto ambiental e social.</p>`
        }
    }
};