// Auth module for user authentication
class Auth {
    constructor() {
        this.initialized = false;
        this.onboardingCompleted = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Check if user is logged in
            const currentUser = await api.getCurrentUser();
            
            if (!currentUser) {
                // Start onboarding
                this.startOnboarding();
            } else {
                this.onboardingCompleted = true;
            }
            
            this.initialized = true;
            console.log('Auth initialized');
        } catch (error) {
            console.error('Error initializing auth:', error);
            throw error;
        }
    }

    async startOnboarding() {
        // Create onboarding UI
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="onboarding-container">
                <div class="onboarding-progress">
                    <div class="onboarding-progress-bar" id="progress-bar" style="width: 20%"></div>
                </div>
                
                <div class="onboarding-step active" id="step-welcome">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.welcome.title">Bem-vindo ao Crush!</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.welcome.subtitle">O app de relacionamentos para quem busca conexões reais com cultura geek</p>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <p data-i18n="onboarding.welcome.description">O Crush foi criado para ajudar você a encontrar pessoas com interesses em comum, seja para namoro, amizade ou squad para eventos.</p>
                            <br>
                            <p data-i18n="onboarding.welcome.features">• Conexões baseadas em interesses geek<br>• Side Quests para encontros com propósito<br>• Chat gamificado com quebra-gelos criativos<br>• Eventos e comunidade</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" id="start-onboarding" data-i18n="onboarding.welcome.start">Começar</button>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-basic-info">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.basicInfo.title">Informações básicas</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.basicInfo.subtitle">Vamos começar com o essencial</p>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label class="form-label" for="name" data-i18n="onboarding.basicInfo.name">Nome</label>
                                <input type="text" id="name" class="form-input" placeholder="Seu nome" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="age" data-i18n="onboarding.basicInfo.age">Idade</label>
                                <input type="number" id="age" class="form-input" placeholder="Sua idade" min="18" max="100" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="city" data-i18n="onboarding.basicInfo.city">Cidade/UF</label>
                                <input type="text" id="city" class="form-input" placeholder="Ex: São Paulo/SP" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="bio" data-i18n="onboarding.basicInfo.bio">Bio</label>
                                <textarea id="bio" class="form-textarea" placeholder="Conte um pouco sobre você..." rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-interests">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.interests.title">Seus interesses</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.interests.subtitle">Selecione seus interesses geek</p>
                    </div>
                    
                    <div class="interests-grid" id="interests-grid">
                        <!-- Interests will be dynamically added here -->
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-goals">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.goals.title">Seus objetivos</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.goals.subtitle">O que você busca no Crush?</p>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <div class="quiz-options">
                                <div class="quiz-option" data-value="namoro">
                                    <h3 data-i18n="onboarding.goals.dating">Namoro</h3>
                                    <p data-i18n="onboarding.goals.datingDesc">Buscar um relacionamento romântico</p>
                                </div>
                                
                                <div class="quiz-option" data-value="amizade">
                                    <h3 data-i18n="onboarding.goals.friendship">Amizade</h3>
                                    <p data-i18n="onboarding.goals.friendshipDesc">Fazer novos amigos</p>
                                </div>
                                
                                <div class="quiz-option" data-value="squad">
                                    <h3 data-i18n="onboarding.goals.squad">Squad</h3>
                                    <p data-i18n="onboarding.goals.squadDesc">Grupo para eventos e atividades</p>
                                </div>
                                
                                <div class="quiz-option" data-value="projetos">
                                    <h3 data-i18n="onboarding.goals.projects">Projetos</h3>
                                    <p data-i18n="onboarding.goals.projectsDesc">Parcerias criativas ou profissionais</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-quiz">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.quiz.title">Quiz geek</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.quiz.subtitle">Responda algumas perguntas para encontrarmos pessoas compatíveis</p>
                    </div>
                    
                    <div class="quiz-container">
                        <div class="quiz-question" data-i18n="onboarding.quiz.q1">Qual destes universos você mais se identifica?</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-value="star-wars">
                                <span data-i18n="onboarding.quiz.a1">Star Wars</span>
                            </div>
                            <div class="quiz-option" data-value="star-trek">
                                <span data-i18n="onboarding.quiz.a2">Star Trek</span>
                            </div>
                            <div class="quiz-option" data-value="marvel">
                                <span data-i18n="onboarding.quiz.a3">Marvel</span>
                            </div>
                            <div class="quiz-option" data-value="dc">
                                <span data-i18n="onboarding.quiz.a4">DC</span>
                            </div>
                            <div class="quiz-option" data-value="lotr">
                                <span data-i18n="onboarding.quiz.a5">Senhor dos Anéis</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quiz-container">
                        <div class="quiz-question" data-i18n="onboarding.quiz.q2">Em uma situação de apocalipse zumbi, qual seria seu papel?</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-value="lider">
                                <span data-i18n="onboarding.quiz.a6">Líder do grupo</span>
                            </div>
                            <div class="quiz-option" data-value="estrategista">
                                <span data-i18n="onboarding.quiz.a7">Estrategista</span>
                            </div>
                            <div class="quiz-option" data-value="medico">
                                <span data-i18n="onboarding.quiz.a8">Médico</span>
                            </div>
                            <div class="quiz-option" data-value="solitario">
                                <span data-i18n="onboarding.quiz.a9">Solitário sobrevivente</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quiz-container">
                        <div class="quiz-question" data-i18n="onboarding.quiz.q3">Qual superpoder você preferia ter?</div>
                        <div class="quiz-options">
                            <div class="quiz-option" data-value="telepatia">
                                <span data-i18n="onboarding.quiz.a10">Telepatia</span>
                            </div>
                            <div class="quiz-option" data-value="teletransporte">
                                <span data-i18n="onboarding.quiz.a11">Teletransporte</span>
                            </div>
                            <div class="quiz-option" data-value="invisibilidade">
                                <span data-i18n="onboarding.quiz.a12">Invisibilidade</span>
                            </div>
                            <div class="quiz-option" data-value="superforca">
                                <span data-i18n="onboarding.quiz.a13">Superforça</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-avatar">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.avatar.title">Sua foto</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.avatar.subtitle">Adicione uma foto para seu perfil</p>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <div class="avatar-upload-container">
                                <div class="avatar-preview" id="avatar-preview">
                                    <img src="/assets/avatar-placeholder.svg" alt="Avatar preview" id="avatar-img">
                                </div>
                                <input type="file" id="avatar-input" accept="image/*" style="display: none;">
                                <button class="btn btn-outline" id="avatar-btn" data-i18n="onboarding.avatar.upload">Escolher foto</button>
                                <p class="form-help" data-i18n="onboarding.avatar.help">Sua foto não será enviada para nenhum servidor. Ela será armazenada apenas no seu navegador.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-verification">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.verification.title">Verificação de perfil</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.verification.subtitle">Verifique seu perfil para ganhar mais confiança</p>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <p data-i18n="onboarding.verification.description">A verificação ajuda a garantir que você é uma pessoa real e aumenta suas chances de encontrar matches.</p>
                            <br>
                            <p data-i18n="onboarding.verification.process">O processo é simples: você precisará fazer uma "selfie por vídeo" simulada. Nenhuma informação será salva ou enviada para servidores.</p>
                            <br>
                            <div class="verification-container" id="verification-container">
                                <button class="btn btn-primary" id="start-verification" data-i18n="onboarding.verification.start">Iniciar verificação</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-step" id="step-complete">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title" data-i18n="onboarding.complete.title">Perfil criado!</h1>
                        <p class="onboarding-subtitle" data-i18n="onboarding.complete.subtitle">Você está pronto para começar a usar o Crush</p>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <div class="profile-summary" id="profile-summary">
                                <!-- Profile summary will be dynamically added here -->
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" id="complete-onboarding" data-i18n="onboarding.complete.start">Começar a usar o Crush</button>
                        </div>
                    </div>
                </div>
                
                <div class="onboarding-navigation">
                    <button class="btn btn-outline" id="prev-step" data-i18n="onboarding.navigation.prev">Anterior</button>
                    <div class="step-indicator">
                        <span id="current-step">1</span> / <span id="total-steps">8</span>
                    </div>
                    <button class="btn btn-primary" id="next-step" data-i18n="onboarding.navigation.next">Próximo</button>
                </div>
            </div>
        `;
        
        // Initialize onboarding
        this.initOnboarding();
    }

    initOnboarding() {
        // Set up onboarding data
        this.onboardingData = {
            step: 0,
            totalSteps: 8,
            basicInfo: {},
            interests: [],
            goals: [],
            quizAnswers: {},
            avatar: null,
            verified: false
        };
        
        // Load interests
        this.loadInterests();
        
        // Set up navigation
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        
        prevBtn.addEventListener('click', () => this.prevStep());
        nextBtn.addEventListener('click', () => this.nextStep());
        
        // Update step indicator
        this.updateStepIndicator();
        
        // Set up step-specific event listeners
        this.setupStepEventListeners();
        
        // Update UI with i18n
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
    }

    loadInterests() {
        const interestsGrid = document.getElementById('interests-grid');
        const interests = [
            { id: 'games', label: 'Games', icon: '🎮' },
            { id: 'sci-fi', label: 'Sci-Fi', icon: '🚀' },
            { id: 'fantasy', label: 'Fantasia', icon: '🐉' },
            { id: 'animes', label: 'Animes', icon: '🀄' },
            { id: 'hqs', label: 'HQs', icon: '📚' },
            { id: 'boardgames', label: 'Board Games', icon: '🎲' },
            { id: 'rpg', label: 'RPG', icon: '🧙' },
            { id: 'retro-games', label: 'Retro Games', icon: '🕹️' },
            { id: 'movies', label: 'Filmes', icon: '🎬' },
            { id: 'series', label: 'Séries', icon: '📺' },
            { id: 'books', label: 'Livros', icon: '📖' },
            { id: 'tech', label: 'Tecnologia', icon: '💻' },
            { id: 'cosplay', label: 'Cosplay', icon: '👘' },
            { id: 'music', label: 'Música', icon: '🎵' },
            { id: 'art', label: 'Arte', icon: '🎨' },
            { id: 'esports', label: 'Esports', icon: '🏆' }
        ];
        
        interestsGrid.innerHTML = interests.map(interest => `
            <div class="interest-item" data-id="${interest.id}">
                <div class="interest-icon">${interest.icon}</div>
                <div class="interest-label">${interest.label}</div>
            </div>
        `).join('');
        
        // Add click listeners
        interestsGrid.querySelectorAll('.interest-item').forEach(item => {
            item.addEventListener('click', () => {
                const interestId = item.dataset.id;
                item.classList.toggle('selected');
                
                if (item.classList.contains('selected')) {
                    this.onboardingData.interests.push(interestId);
                } else {
                    this.onboardingData.interests = this.onboardingData.interests.filter(id => id !== interestId);
                }
            });
        });
    }

    setupStepEventListeners() {
        // Step 1: Welcome
        const startBtn = document.getElementById('start-onboarding');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.nextStep());
        }
        
        // Step 2: Basic Info
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const cityInput = document.getElementById('city');
        const bioInput = document.getElementById('bio');
        
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.onboardingData.basicInfo.name = e.target.value;
            });
        }
        
        if (ageInput) {
            ageInput.addEventListener('input', (e) => {
                this.onboardingData.basicInfo.age = parseInt(e.target.value);
            });
        }
        
        if (cityInput) {
            cityInput.addEventListener('input', (e) => {
                this.onboardingData.basicInfo.city = e.target.value;
            });
        }
        
        if (bioInput) {
            bioInput.addEventListener('input', (e) => {
                this.onboardingData.basicInfo.bio = e.target.value;
            });
        }
        
        // Step 4: Goals
        const goalOptions = document.querySelectorAll('#step-goals .quiz-option');
        goalOptions.forEach(option => {
            option.addEventListener('click', () => {
                goalOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.onboardingData.goals = [option.dataset.value];
            });
        });
        
        // Step 5: Quiz
        const quizOptions = document.querySelectorAll('#step-quiz .quiz-option');
        quizOptions.forEach(option => {
            option.addEventListener('click', () => {
                const questionContainer = option.closest('.quiz-container');
                const questionOptions = questionContainer.querySelectorAll('.quiz-option');
                
                questionOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                const questionIndex = Array.from(document.querySelectorAll('.quiz-container')).indexOf(questionContainer);
                this.onboardingData.quizAnswers[`q${questionIndex + 1}`] = option.dataset.value;
            });
        });
        
        // Step 6: Avatar
        const avatarBtn = document.getElementById('avatar-btn');
        const avatarInput = document.getElementById('avatar-input');
        
        if (avatarBtn && avatarInput) {
            avatarBtn.addEventListener('click', () => {
                avatarInput.click();
            });
            
            avatarInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const avatarImg = document.getElementById('avatar-img');
                        avatarImg.src = event.target.result;
                        this.onboardingData.avatar = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Step 7: Verification
        const startVerificationBtn = document.getElementById('start-verification');
        if (startVerificationBtn) {
            startVerificationBtn.addEventListener('click', () => {
                this.startVerification();
            });
        }
        
        // Step 8: Complete
        const completeBtn = document.getElementById('complete-onboarding');
        if (completeBtn) {
            completeBtn.addEventListener('click', () => {
                this.completeOnboarding();
            });
        }
    }

    prevStep() {
        if (this.onboardingData.step > 0) {
            this.onboardingData.step--;
            this.updateStep();
        }
    }

    nextStep() {
        // Validate current step before proceeding
        if (!this.validateCurrentStep()) {
            return;
        }
        
        if (this.onboardingData.step < this.onboardingData.totalSteps - 1) {
            this.onboardingData.step++;
            this.updateStep();
        }
    }

    validateCurrentStep() {
        const step = this.onboardingData.step;
        
        switch (step) {
            case 1: // Basic Info
                if (!this.onboardingData.basicInfo.name || 
                    !this.onboardingData.basicInfo.age || 
                    !this.onboardingData.basicInfo.city) {
                    this.showToast('Por favor, preencha todos os campos obrigatórios', 'error');
                    return false;
                }
                break;
                
            case 2: // Interests
                if (this.onboardingData.interests.length === 0) {
                    this.showToast('Selecione pelo menos um interesse', 'error');
                    return false;
                }
                break;
                
            case 3: // Goals
                if (this.onboardingData.goals.length === 0) {
                    this.showToast('Selecione pelo menos um objetivo', 'error');
                    return false;
                }
                break;
                
            case 4: // Quiz
                if (Object.keys(this.onboardingData.quizAnswers).length < 3) {
                    this.showToast('Responda todas as perguntas do quiz', 'error');
                    return false;
                }
                break;
        }
        
        return true;
    }

    updateStep() {
        // Hide all steps
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = document.getElementById(`step-${this.getStepId(this.onboardingData.step)}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update progress bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = ((this.onboardingData.step + 1) / this.onboardingData.totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Update step indicator
        this.updateStepIndicator();
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        
        if (prevBtn) {
            prevBtn.style.display = this.onboardingData.step === 0 ? 'none' : 'block';
        }
        
        if (nextBtn) {
            if (this.onboardingData.step === this.onboardingData.totalSteps - 1) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
            }
        }
    }

    getStepId(stepIndex) {
        const stepIds = [
            'welcome',
            'basic-info',
            'interests',
            'goals',
            'quiz',
            'avatar',
            'verification',
            'complete'
        ];
        return stepIds[stepIndex];
    }

    updateStepIndicator() {
        const currentStepElement = document.getElementById('current-step');
        const totalStepsElement = document.getElementById('total-steps');
        
        if (currentStepElement) {
            currentStepElement.textContent = this.onboardingData.step + 1;
        }
        
        if (totalStepsElement) {
            totalStepsElement.textContent = this.onboardingData.totalSteps;
        }
    }

    startVerification() {
        const verificationContainer = document.getElementById('verification-container');
        
        verificationContainer.innerHTML = `
            <div class="verification-process">
                <p data-i18n="onboarding.verification.cameraAccess">Precisamos acessar sua câmera para a verificação simulada.</p>
                <button class="btn btn-primary" id="enable-camera" data-i18n="onboarding.verification.enableCamera">Ativar câmera</button>
                <div class="camera-container" id="camera-container" style="display: none;">
                    <video id="verification-video" autoplay></video>
                    <canvas id="verification-canvas" style="display: none;"></canvas>
                    <div class="camera-actions">
                        <button class="btn btn-primary" id="capture-photo" data-i18n="onboarding.verification.capture">Capturar</button>
                        <button class="btn btn-outline" id="cancel-verification" data-i18n="onboarding.verification.cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        
        // Update i18n
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        
        // Set up event listeners
        const enableCameraBtn = document.getElementById('enable-camera');
        const cancelVerificationBtn = document.getElementById('cancel-verification');
        const capturePhotoBtn = document.getElementById('capture-photo');
        
        if (enableCameraBtn) {
            enableCameraBtn.addEventListener('click', () => {
                this.enableCamera();
            });
        }
        
        if (cancelVerificationBtn) {
            cancelVerificationBtn.addEventListener('click', () => {
                this.cancelVerification();
            });
        }
        
        if (capturePhotoBtn) {
            capturePhotoBtn.addEventListener('click', () => {
                this.captureVerificationPhoto();
            });
        }
    }

    async enableCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.getElementById('verification-video');
            const cameraContainer = document.getElementById('camera-container');
            
            video.srcObject = stream;
            cameraContainer.style.display = 'block';
            
            // Hide enable camera button
            document.getElementById('enable-camera').style.display = 'none';
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.showToast('Não foi possível acessar a câmera', 'error');
        }
    }

    cancelVerification() {
        const video = document.getElementById('verification-video');
        const cameraContainer = document.getElementById('camera-container');
        
        // Stop camera stream
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
        
        cameraContainer.style.display = 'none';
        
        // Reset verification container
        const verificationContainer = document.getElementById('verification-container');
        verificationContainer.innerHTML = `
            <button class="btn btn-primary" id="start-verification" data-i18n="onboarding.verification.start">Iniciar verificação</button>
        `;
        
        // Re-add event listener
        const startVerificationBtn = document.getElementById('start-verification');
        if (startVerificationBtn) {
            startVerificationBtn.addEventListener('click', () => {
                this.startVerification();
            });
        }
        
        // Update i18n
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
    }

    captureVerificationPhoto() {
        const video = document.getElementById('verification-video');
        const canvas = document.getElementById('verification-canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Stop camera stream
        video.srcObject.getTracks().forEach(track => track.stop());
        
        // Show success message
        const verificationContainer = document.getElementById('verification-container');
        verificationContainer.innerHTML = `
            <div class="verification-success">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h3 data-i18n="onboarding.verification.success">Verificação concluída!</h3>
                <p data-i18n="onboarding.verification.successMessage">Seu perfil foi verificado com sucesso. Você ganhou o selo de perfil verificado.</p>
            </div>
        `;
        
        // Update i18n
        window.dispatchEvent(new CustomEvent('i18nUpdate'));
        
        // Mark as verified
        this.onboardingData.verified = true;
    }

    async completeOnboarding() {
        try {
            // Generate badges based on interests and quiz answers
            const badges = this.generateBadges();
            
            // Create user profile
            const userData = {
                name: this.onboardingData.basicInfo.name,
                age: this.onboardingData.basicInfo.age,
                city: this.onboardingData.basicInfo.city,
                bio: this.onboardingData.basicInfo.bio,
                interests: this.onboardingData.interests,
                goals: this.onboardingData.goals,
                badges: badges,
                verified: this.onboardingData.verified,
                photos: this.onboardingData.avatar ? [this.onboardingData.avatar] : [],
                quizAnswers: this.onboardingData.quizAnswers
            };
            
            // Create user
            const user = await api.createUser(userData);
            
            // Mark onboarding as completed
            this.onboardingCompleted = true;
            
            // Show success message
            this.showToast('Perfil criado com sucesso!', 'success');
            
            // Navigate to discover page
            setTimeout(() => {
                window.location.hash = '#discover';
                window.dispatchEvent(new CustomEvent('pageLoaded', { detail: { page: 'discover' } }));
            }, 1000);
            
        } catch (error) {
            console.error('Error completing onboarding:', error);
            this.showToast('Erro ao criar perfil. Tente novamente.', 'error');
        }
    }

    generateBadges() {
        const badges = [];
        const interests = this.onboardingData.interests;
        const quizAnswers = this.onboardingData.quizAnswers;
        
        // Add badges based on interests
        if (interests.includes('rpg')) {
            badges.push('RPG Party');
        }
        
        if (interests.includes('sci-fi')) {
            badges.push('Sci-fi Master');
        }
        
        if (interests.includes('retro-games')) {
            badges.push('Retro Gamer');
        }
        
        if (interests.includes('boardgames')) {
            badges.push('Board Game Fan');
        }
        
        // Add badges based on quiz answers
        if (quizAnswers.q1 === 'star-wars' || quizAnswers.q1 === 'star-trek') {
            badges.push('Space Explorer');
        }
        
        if (quizAnswers.q2 === 'lider') {
            badges.push('Natural Leader');
        }
        
        // Add verified badge if verified
        if (this.onboardingData.verified) {
            badges.push('Verified');
        }
        
        return badges;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${message}</span>
        `;
        
        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (container.contains(toast)) {
                        container.removeChild(toast);
                    }
                }, 300);
            }, 3000);
        }
    }
}

// Initialize and export Auth
const auth = new Auth();
export const initAuth = () => auth.init();
export default auth;