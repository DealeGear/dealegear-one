# PROMPT PARA GERAR O APP “CRUSH” (HTML/CSS/JS PURO, RESPONSIVO)

Quero que você crie um aplicativo web chamado **Crush** — um app de relacionamentos com estética **geek/futurista** e foco em conexões reais, resolvendo problemas típicos de apps como Tinder. **Tecnologias**: apenas **HTML, CSS e JavaScript** (ES Modules). **Sem backend**. Todos os dados devem ser simulados no front (objetos/JSON, `localStorage` e/ou `IndexedDB`). O resultado deve ser um **projeto completo** que eu possa abrir no navegador e usar.

## Objetivo do produto

* Evitar “swipe infinito” e foco só em aparência.
* Promover compatibilidade por **interesses/cultura geek** e **mini-quizzes**.
* Estimular **conversas criativas** e encontros com propósito (**Side Quests**).
* Garantir **segurança simulada** e melhor **experiência** para todos os perfis.

## Requisitos de alto nível

1. **Arquitetura & Entrega**

   * Estrutura de pastas:

     ```
     /crush
       index.html
       /assets (ícones, logos, ilustrações SVG)
       /styles (arquivos .css)
       /scripts (módulos .js)
       /data (jsons de mock)
       /pages (templates HTML parciais se necessário)
       sw.js (opcional, PWA)
     ```
   * Código **modular** em JS (ES Modules). Nada de frameworks.
   * **Responsividade total** (mobile-first): telas 360px até 4K.
   * **Acessibilidade**: navegação por teclado, ARIA, contraste, foco visível.

2. **Identidade visual (geek/futurista)**

   * Logo “Crush” (SVG) estilizado (pixel/8-bit + neon sutil).
   * **Paletas**: modo **Light** e **Dark** (toggle). Tipografia legível (web-safe ou variável).
   * Microanimações suaves (CSS): hover, foco, transições de cards.
   * Ícones em SVG (coração, XP, missões, escudo/AI shield, portal, badge verificado).

3. **Internacionalização (i18n)**

   * Idioma padrão: **pt-BR**. Alternativa: **en-US**.
   * Todos os textos do app devem vir de um **dicionário JSON** (`/data/i18n.json`) e mudar em tempo real via toggle.

4. **Páginas/Seções obrigatórias**

   * **Onboarding & Perfil**

     * Criador de perfil em etapas, com **mini-quizzes geeks**: preferências (games, sci-fi, animes, HQs), estilo de humor, rotina, valores.
     * Upload de avatar (simulado): apenas preview local (sem envio).
     * Seleção de objetivo: namoro, amizade, squad para eventos, co-criação de projetos.
     * **Badges** automáticos conforme respostas (ex.: “Sci-fi Master”, “RPG Party”, “Retro Gamer”).
     * **Verificação simulada**: “selfie por vídeo” fake (usar webcam se disponível, sem salvar). Ao concluir, dar **Badge Verificado**.
   * **Descoberta (Discover)**

     * **Limite de 10 perfis/dia** (config por constante `DAILY_CARD_LIMIT`).
     * Cards com foto, badges, resumo de interesses e **porcentagem de compatibilidade**.
     * Botões: “Passar”, “Curtir”, “SuperCurtir” (limitado), “Abrir Perfil Completo”.
     * Explicação de compatibilidade ao abrir perfil (quais interesses pesaram).
   * **Side Quests (Missões)**

     * Lista de **missões temáticas** (ex.: “Debater multiversos”, “Escape Room”, “Co-op roguelike”).
     * Usuários podem **entrar em missões**; o app sugere pessoas compatíveis para aquela missão.
     * Filtro por tema, data, presencial/online.
   * **Chat Gamificado**

     * Chats entre matches com:

       * **Quebra-gelos** automáticos.
       * **Minigame cooperativo** simples (ex.: resolver um puzzle de lógica ou trivia geek).
       * **Prompts criativos** desbloqueados ao avançar “níveis de conversa”.
       * **Sistema de XP do chat** (ver abaixo).
   * **Eventos & Comunidade**

     * Hub com **eventos geek** (mock): quiz nights, board games, meetups, watch parties.
     * Permitir criar **eventos simulados** (salvar no `localStorage`), com tags, local e limite de participantes.
   * **Perfil & Reputação**

     * Exibir **badges**, **nível social**, **histórico de side quests** e **sinais de confiabilidade** (responde rápido, compareceu a X encontros, verificado).
     * **AI Shield (simulado)**: marcador indicando nível de proteção e histórico limpo.
   * **Configurações**

     * Preferências (idioma, tema, notificações simuladas).
     * Gerenciar privacidade: visibilidade de badges, quem pode iniciar conversa.
     * Exportar/limpar dados (JSON via download local).

5. **Mecânicas principais**

   * **Compatibilidade**: função que calcula score (0–100) ponderando:

     * Interesses geek (peso alto), valores/rotina (médio), localização aproximada (mock), preferências de missão/evento (médio).
   * **Limite de perfis/dia**: reduzir “paradoxo da escolha”.
   * **Sistema de XP & Nível**

     * Ações que dão XP: completar perfil, participar de missão, manter conversas respeitosas, concluir minigame no chat, comparecer a evento (check-in simulado).
     * Subir de nível desbloqueia: novos **quebra-gelos**, **stickers**, **templates de convite** e **supercurtidas extras**.
   * **AI Shield (antitóxico) – Simulado no front**

     * Pipeline simples: detectar palavrões/assédio via **lista de termos** + **heurísticas** (ex.: frequência de caps, mensagens repetidas).
     * Em tempo real no chat: se detectar, esmaecer mensagem, sugerir reescrita, oferecer bloqueio/silenciamento. Log local para auditoria do usuário.
     * Exibir feedback educativo (“mensagens construtivas aumentam chance de resposta em X%” — valor simulado).

6. **Dados simulados (mock)**

   * Criar JSONs em `/data`:

     * `users.json`: 20–30 perfis com: id, nome, idade, bio curta, interesses (listas), badges, verificado, fotos (placeholders), localização aproximada (cidade/UF), objetivos.
     * `quests.json`: 12–20 side quests com tema, descrição, slots, online/presencial, tags.
     * `events.json`: 10–15 eventos com data futura, local (mock), descrição e organizador.
     * `i18n.json`: dicionário pt-BR/en-US.
     * `toxicity.json`: termos e regras do AI Shield.
   * Na primeira carga, copiar esses dados para `localStorage` se vazio. Depois, operar sempre em cima do storage.

7. **Fluxos de uso obrigatórios**

   * **F0 – Onboarding**: usuário cria perfil → escolhe interesses → faz mini-quiz → recebe badges e % de compatibilidade “potencial”.
   * **F1 – Descoberta**: vê até 10 cards/dia → curte/passa → ao dar match, abre Chat.
   * **F2 – Chat Gamificado**: quebra-gelos automáticos + 1 minigame cooperativo; ao concluir, +XP e **desbloqueio de prompt** especial.
   * **F3 – Side Quest**: usuário entra em missão → sistema sugere 2–5 pessoas com alto score para aquela missão → criar grupo de chat rápido da missão.
   * **F4 – Evento**: usuário confirma presença (mock) → check-in simulado na hora do evento → ganha XP e badge de participação.
   * **F5 – Verificação**: fluxo simples de webcam (getUserMedia) opcional; ao concluir, marca “Verificado”.

8. **Componentes e UI**

   * **Header**: logo, busca simples, ícones (notificações, perfil, tema, idioma).
   * **Nav inferior (mobile) / lateral (desktop)**: Descobrir, Quests, Eventos, Chat, Perfil.
   * **Cards**: layout acessível; botões grandes, indicadores de compatibilidade e badges.
   * **Modais**: confirmação de supercurtida, detalhes de compatibilidade, regras do AI Shield, criação de evento/quest.
   * **Toasts**: feedbacks curtos (salvo, XP ganho, limite diário atingido).
   * **Placeholders**: imagens de perfil (SVGs/rosto genérico) caso sem foto.

9. **Detalhes técnicos**

   * **Sem bibliotecas externas** (apenas web APIs nativas).
   * **Padrões de código**: JS documentado, funções puras para regras, separação entre **camada de dados** (storage), **domínio** (regras), **UI** (render).
   * **Persistência**: usar `localStorage` (ou `IndexedDB` para coleções grandes).
   * **Roteamento**: hash routing simples (`#/discover`, `#/quests`, …).
   * **Service Worker (opcional)**: cache estático para funcionar offline; se implementar, explique como testar em `localhost/https`.
   * **Segurança (cliente)**: nenhuma coleta real de dados; avisos claros de simulação; bloquear chamadas externas.
   * **Performance**: lazy-load de imagens, `requestAnimationFrame` para animações, evitar reflows desnecessários.

10. **Modelos de dados (exemplos)**

```json
// users.json (exemplo de 1 item)
{
  "id": "u_101",
  "name": "Aiko",
  "age": 27,
  "city": "São Paulo/SP",
  "goals": ["namoro", "amizade"],
  "interests": ["sci-fi", "rpg", "retro-games", "animes"],
  "bio": "Entusiasta de mechas e roguelikes. Procuro party pra co-op.",
  "badges": ["RPG Party", "Sci-fi Master"],
  "verified": true,
  "photos": ["/assets/avatars/aiko1.svg"],
  "response_rate": 0.92
}
```

```json
// quests.json
{
  "id": "q_23",
  "title": "Debate de Multiversos",
  "mode": "online",
  "slots": 6,
  "tags": ["sci-fi", "debate"],
  "description": "Teorias malucas bem-vindas. Traga referências!"
}
```

```json
// events.json
{
  "id": "e_8",
  "title": "Board Game Night",
  "city": "Curitiba/PR",
  "dateISO": "2025-09-12T19:30:00.000Z",
  "tags": ["boardgames", "coop"],
  "limit": 12,
  "organizerId": "u_101"
}
```

11. **Algoritmos (descrever e implementar)**

* `calculateCompatibility(userA, userB)`: Jaccard/ponderado por categorias (interesses 50%, objetivos 20%, rotina/valores 20%, localização 10%).
* `dailyCardGate(userId)`: controla limite de cards/dia (reseta por dia).
* `xpSystem.log(action)`: tabela de XP por ação; `levelForXP(xp)`.
* `toxicityGuard.evaluate(text)`: retorna `{score: 0..1, flags: [...]}` e recomendações; integra-se ao chat.

12. **Testes manuais & QA (incluir no README)**

* Check de acessibilidade básico (tab/shift+tab, leitores de tela).
* Simulação completa dos fluxos F0–F5.
* Modo offline (se SW ativo).
* Troca de idioma e tema.
* Limite diário de cards.

13. **Entrega**

* Projeto completo com todos os arquivos.
* **README.md** contendo:

  * Como rodar localmente (duas opções):

    1. Abrir `index.html` diretamente no navegador.
    2. Rodar um servidor local (ex.: `python -m http.server 8000`) para testar SW/cam.
  * Lista de funcionalidades, atalhos de teclado e notas de acessibilidade.
  * Avisos de **simulação**, privacidade e ausência de backend.

14. **Critérios de aceitação**

* App navegável do início ao fim sem erros.
* Responsivo, acessível e com i18n funcional.
* Limite diário de perfis operante.
* Chat com quebra-gelos + **1 minigame cooperativo** funcional.
* Side Quests e Eventos com criação/entrada simuladas.
* AI Shield simulando moderação no chat.
* Sistema de XP impactando pequenos desbloqueios visíveis.

---

Gere o código completo seguindo tudo acima.
