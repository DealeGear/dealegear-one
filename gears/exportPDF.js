// Exportação para PDF
document.addEventListener('DOMContentLoaded', function() {
    // Cria o botão de exportação PDF no header
    const headerActions = document.querySelector('.header-actions');
    const exportBtn = document.createElement('button');
    exportBtn.className = 'export-btn';
    exportBtn.innerHTML = '<i class="fas fa-file-pdf"></i>';
    exportBtn.title = 'Exportar para PDF';
    headerActions.appendChild(exportBtn);
    
    // Adiciona o evento de clique ao botão
    exportBtn.addEventListener('click', function() {
        // Verifica se estamos na landing page
        const landingPage = document.getElementById('landingPage');
        if (landingPage.style.display === 'none' || landingPage.style.display === '') {
            // Mostra uma mensagem de alerta se não estiver na landing page
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert';
            alertDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, carregue um projeto antes de exportar para PDF.';
            alertDiv.style.position = 'fixed';
            alertDiv.style.top = '20px';
            alertDiv.style.right = '20px';
            alertDiv.style.backgroundColor = '#f39c12';
            alertDiv.style.color = 'white';
            alertDiv.style.padding = '15px 20px';
            alertDiv.style.borderRadius = '5px';
            alertDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            alertDiv.style.zIndex = '1000';
            document.body.appendChild(alertDiv);
            
            // Remove o alerta após 3 segundos
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
            
            return;
        }
        
        // Cria um elemento para o conteúdo do PDF
        const pdfContent = document.createElement('div');
        pdfContent.innerHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #3498db; margin-bottom: 10px;">${document.getElementById('projectTitle').textContent}</h1>
                    <div style="background-color: #3498db; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; display: inline-block; margin-bottom: 15px;">
                        ${document.getElementById('projectCategory').textContent}
                    </div>
                    <p style="color: #7f8c8d; max-width: 700px; margin: 0 auto;">
                        ${document.getElementById('projectDescription').textContent}
                    </p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #34495e; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Objetivos</h2>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Propósito do Projeto</h3>
                        <p style="color: #555; margin-bottom: 15px;">${document.getElementById('purposeText').textContent}</p>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Visão</h3>
                        <p style="color: #555; margin-bottom: 15px;">${document.getElementById('visionText').textContent}</p>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Missão</h3>
                        <p style="color: #555; margin-bottom: 15px;">${document.getElementById('missionText').textContent}</p>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Meta Principal</h3>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('mainGoal1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('mainGoal2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('mainGoal3').textContent}</li>
                        </ul>
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #34495e; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Planejamento Inicial</h2>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Proposta de Valor</h3>
                        <p style="color: #555; margin-bottom: 15px;">${document.getElementById('valueProposition').textContent}</p>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Hipóteses Lean Startup</h3>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('hypothesis1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('hypothesis2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('hypothesis3').textContent}</li>
                        </ul>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Descrição do MVP</h3>
                        <p style="color: #555; margin-bottom: 15px;">${document.getElementById('mvpDescription').textContent}</p>
                        <p style="color: #555; margin-bottom: 15px; font-weight: bold;">${document.getElementById('mvpFeatures').textContent}</p>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('mvpFeature1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('mvpFeature2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('mvpFeature3').textContent}</li>
                        </ul>
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #34495e; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Recursos</h2>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Equipe</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">CEO / Fundador</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Responsável pela visão estratégica e liderança do projeto.</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">CTO / Desenvolvedor</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Responsável pela parte técnica e desenvolvimento do produto.</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Designer UX/UI</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Responsável pela experiência do usuário e interface visual.</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Especialista em Marketing</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Responsável pelas estratégias de aquisição e comunicação.</p>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Orçamento Estimado</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Desenvolvimento</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">R$ 15.000 - 25.000</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Marketing</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">R$ 5.000 - 10.000</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Infraestrutura</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">R$ 1.000 - 3.000/mês</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Reserva</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">R$ 5.000 - 10.000</p>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Ferramentas e Tecnologia</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Frontend</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">React, Vue.js ou Angular</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Backend</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Node.js, Python ou Java</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Analytics</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Google Analytics, Mixpanel</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Gerenciamento</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Trello, Asana, Jira</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #34495e; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Estratégia de Execução</h2>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Etapas / Roadmap</h3>
                        <div style="margin-left: 20px;">
                            <div style="margin-bottom: 20px; position: relative; padding-left: 30px;">
                                <div style="position: absolute; left: 0; top: 0; width: 20px; height: 20px; border-radius: 50%; background-color: #3498db;"></div>
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 5px;">Fase 1: Validação (1-2 meses)</h4>
                                <p style="color: #555; font-size: 14px;">Desenvolvimento do MVP, entrevistas com clientes e testes de usabilidade.</p>
                            </div>
                            <div style="margin-bottom: 20px; position: relative; padding-left: 30px;">
                                <div style="position: absolute; left: 0; top: 0; width: 20px; height: 20px; border-radius: 50%; background-color: #3498db;"></div>
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 5px;">Fase 2: Lançamento (2-3 meses)</h4>
                                <p style="color: #555; font-size: 14px;">Lançamento oficial, campanha de marketing inicial e captação dos primeiros usuários.</p>
                            </div>
                            <div style="margin-bottom: 20px; position: relative; padding-left: 30px;">
                                <div style="position: absolute; left: 0; top: 0; width: 20px; height: 20px; border-radius: 50%; background-color: #3498db;"></div>
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 5px;">Fase 3: Crescimento (3-6 meses)</h4>
                                <p style="color: #555; font-size: 14px;">Otimização do produto com base no feedback, expansão de funcionalidades e escala de marketing.</p>
                            </div>
                            <div style="position: relative; padding-left: 30px;">
                                <div style="position: absolute; left: 0; top: 0; width: 20px; height: 20px; border-radius: 50%; background-color: #3498db;"></div>
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 5px;">Fase 4: Expansão (6+ meses)</h4>
                                <p style="color: #555; font-size: 14px;">Busca de investimento, expansão para novos mercados e desenvolvimento de novas linhas de produto.</p>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Marketing</h3>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('marketing1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('marketing2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('marketing3').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('marketing4').textContent}</li>
                        </ul>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Canais de Aquisição</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Google Ads</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Anúncios pagos com base em palavras-chave relevantes.</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Redes Sociais</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Facebook, Instagram, LinkedIn e outras plataformas relevantes.</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Indicações</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Programa de indicação para incentivar usuários a convidar outros.</p>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                                <h4 style="color: #34495e; font-size: 16px; margin-bottom: 10px;">Parcerias</h4>
                                <p style="color: #7f8c8d; font-size: 14px;">Colaborações com empresas complementares.</p>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Parcerias Estratégicas</h3>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('partnership1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('partnership2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('partnership3').textContent}</li>
                        </ul>
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #34495e; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Mensuração</h2>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Métricas Principais (KPIs)</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div style="background-color: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); text-align: center;">
                                <div style="font-size: 24px; font-weight: bold; color: #3498db; margin-bottom: 5px;">CAC</div>
                                <div style="font-size: 14px; color: #7f8c8d;">Custo de Aquisição de Cliente</div>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); text-align: center;">
                                <div style="font-size: 24px; font-weight: bold; color: #3498db; margin-bottom: 5px;">LTV</div>
                                <div style="font-size: 14px; color: #7f8c8d;">Valor do Tempo de Vida do Cliente</div>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); text-align: center;">
                                <div style="font-size: 24px; font-weight: bold; color: #3498db; margin-bottom: 5px;">MRR</div>
                                <div style="font-size: 14px; color: #7f8c8d;">Receita Mensal Recorrente</div>
                            </div>
                            <div style="background-color: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); text-align: center;">
                                <div style="font-size: 24px; font-weight: bold; color: #3498db; margin-bottom: 5px;">Churn</div>
                                <div style="font-size: 14px; color: #7f8c8d;">Taxa de Cancelamento</div>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Indicadores Lean</h3>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('leanMetric1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('leanMetric2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('leanMetric3').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('leanMetric4').textContent}</li>
                        </ul>
                    </div>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Feedback Loop</h3>
                        <p style="color: #555; margin-bottom: 15px;">${document.getElementById('feedbackLoop').textContent}</p>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">${document.getElementById('feedback1').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('feedback2').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('feedback3').textContent}</li>
                            <li style="margin-bottom: 8px;">${document.getElementById('feedback4').textContent}</li>
                        </ul>
                    </div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #34495e; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Diagrama Geral</h2>
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #34495e; font-size: 18px; margin-bottom: 10px;">Visualização do Projeto</h3>
                        <p style="color: #555; margin-bottom: 15px;">Aqui você pode inserir ou fazer upload de diagramas que representem visualmente seu projeto, como:</p>
                        <ul style="color: #555; margin-left: 20px;">
                            <li style="margin-bottom: 8px;">Fluxo de valor</li>
                            <li style="margin-bottom: 8px;">Mapa de empatia do cliente</li>
                            <li style="margin-bottom: 8px;">Canvas do modelo de negócios</li>
                            <li style="margin-bottom: 8px;">Diagrama de arquitetura do sistema</li>
                            <li style="margin-bottom: 8px;">Mapa de jornada do cliente</li>
                        </ul>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #7f8c8d; font-size: 14px;">
                    <p>Gerado por Gears - ${new Date().toLocaleDateString('pt-BR')}</p>
                </div>
            </div>
        `;
        
        // Cria uma janela para imprimir o conteúdo
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${document.getElementById('projectTitle').textContent} - Plano de Negócios</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: white;
                        color: #333;
                    }
                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                ${pdfContent.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        
        // Aguarda um pouco para o conteúdo carregar antes de imprimir
        setTimeout(() => {
            printWindow.print();
        }, 500);
        
        // Mostra uma mensagem de sucesso
        const successDiv = document.createElement('div');
        successDiv.className = 'alert';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> PDF gerado com sucesso!';
        successDiv.style.position = 'fixed';
        successDiv.style.top = '20px';
        successDiv.style.right = '20px';
        successDiv.style.backgroundColor = '#2ecc71';
        successDiv.style.color = 'white';
        successDiv.style.padding = '15px 20px';
        successDiv.style.borderRadius = '5px';
        successDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        successDiv.style.zIndex = '1000';
        document.body.appendChild(successDiv);
        
        // Remove o alerta após 3 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    });
});