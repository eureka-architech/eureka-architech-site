// AI Chatbot functionality with intelligent conversation flow
export class ChatbotAI {
  constructor() {
    this.currentStep = 'initial';
    this.conversationHistory = [];
    this.userData = {};
    this.diagnosticResults = {};
    this.industryInsights = {};
    
    this.steps = {
      initial: 'initial',
      diagnostic: 'diagnostic',
      industry: 'industry',
      challenges: 'challenges',
      solutions: 'solutions',
      roi: 'roi',
      proposal: 'proposal'
    };

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.setupQuickActions();
    this.setupMessageHandling();
  }

  attachEventListeners() {
    // Floating button
    const floatingBtn = document.getElementById('floatingChatbotBtn');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', () => this.openChatbot());
    }

    // Close button
    const closeBtn = document.getElementById('closeChatbot');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeChatbot());
    }

    // Overlay click
    const overlay = document.querySelector('.chatbot-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeChatbot());
    }

    // Send button
    const sendBtn = document.getElementById('sendChatMessage');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

    // Input field
    const input = document.getElementById('chatbotInput');
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      // Character count
      input.addEventListener('input', () => {
        const charCount = document.getElementById('charCount');
        if (charCount) {
          charCount.textContent = `${input.value.length}/500`;
        }
      });
    }
  }

  setupQuickActions() {
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
      action.addEventListener('click', (e) => {
        const actionType = e.currentTarget.getAttribute('data-action');
        this.handleQuickAction(actionType);
      });
    });
  }

  setupMessageHandling() {
    // Auto-resize textarea
    const input = document.getElementById('chatbotInput');
    if (input) {
      input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
      });
    }
  }

  openChatbot() {
    const modal = document.getElementById('chatbotModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus input
      setTimeout(() => {
        const input = document.getElementById('chatbotInput');
        if (input) input.focus();
      }, 300);
    }
  }

  closeChatbot() {
    const modal = document.getElementById('chatbotModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  async sendMessage() {
    const input = document.getElementById('chatbotInput');
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    input.value = '';
    input.style.height = 'auto';

    // Add user message
    this.addMessage(message, 'user');

    // Show typing indicator
    this.showTypingIndicator();

    // Process message
    const response = await this.processMessage(message);

    // Hide typing indicator
    this.hideTypingIndicator();

    // Add bot response
    this.addMessage(response, 'bot');

    // Update progress if needed
    this.updateProgress();
  }

  async processMessage(message) {
    // Store in conversation history
    this.conversationHistory.push({ role: 'user', content: message });

    // Intelligent message processing based on current step
    switch (this.currentStep) {
      case 'initial':
        return this.processInitialMessage(message);
      case 'diagnostic':
        return this.processDiagnosticMessage(message);
      case 'industry':
        return this.processIndustryMessage(message);
      case 'challenges':
        return this.processChallengesMessage(message);
      case 'solutions':
        return this.processSolutionsMessage(message);
      case 'roi':
        return this.processROIMessage(message);
      default:
        return this.processGeneralMessage(message);
    }
  }

  async processInitialMessage(message) {
    // Extract intent from message
    const intent = this.extractIntent(message);

    if (intent.includes('diagnostic') || intent.includes('analisis')) {
      this.currentStep = 'diagnostic';
      return {
        text: "¡Excelente! Comencemos con un diagnóstico rápido de tu empresa. 🎯\n\n¿Cuál es el nombre de tu empresa y en qué industria operas?",
        options: ['Tecnología', 'Salud', 'Finanzas', 'Retail', 'Manufactura', 'Servicios']
      };
    } else if (intent.includes('roi') || intent.includes('costo')) {
      this.currentStep = 'roi';
      return {
        text: "Entiendo que quieres conocer el retorno de inversión. 📊\n\nPara darte números precisos, necesito saber: ¿Cuántos empleados tiene tu empresa?",
        options: ['1-10', '11-50', '51-200', '201-500', '500+']
      };
    } else {
      return {
        text: "¡Gracias por tu mensaje! Te puedo ayudar con:\n\n• 🔍 Diagnóstico gratuito de IA para tu empresa\n• 💡 Soluciones específicas para tu industria\n• 📊 Cálculo de ROI estimado\n• 📞 Conectarte con un experto\n\n¿Qué te interesa más?",
        quickActions: true
      };
    }
  }

  async processDiagnosticMessage(message) {
    // Industry detection
    const industries = ['tecnología', 'salud', 'finanzas', 'retail', 'manufactura', 'servicios'];
    const detectedIndustry = industries.find(ind => message.toLowerCase().includes(ind));

    if (detectedIndustry) {
      this.userData.industry = detectedIndustry;
      this.currentStep = 'challenges';
      
      return {
        text: `Perfecto, ${this.userData.companyName || 'tu empresa'} en ${detectedIndustry}. 🏢\n\n¿Cuáles son tus principales desafíos actuales?`,
        options: [
          '🤖 Automatización de procesos',
          '📊 Análisis de datos',
          '💬 Atención al cliente',
          '📈 Optimización de ventas',
          '⚡ Productividad del equipo',
          '💰 Reducción de costos'
        ]
      };
    }

    // Extract company name
    const companyMatch = message.match(/(?:empresa|compañía|company)\s+(?:es\s+)?([A-Za-z0-9\s]+)/i);
    if (companyMatch) {
      this.userData.companyName = companyMatch[1].trim();
    }

    return {
      text: "Gracias por la información. ¿En qué industria opera tu empresa principalmente?",
      options: industries.map(ind => ind.charAt(0).toUpperCase() + ind.slice(1))
    };
  }

  async processChallengesMessage(message) {
    // Store challenges
    const challenges = this.extractChallenges(message);
    this.userData.challenges = challenges;

    this.currentStep = 'solutions';

    // Generate industry-specific insights
    const insights = this.generateIndustryInsights(this.userData.industry, challenges);

    return {
      text: `Basándome en los desafíos de ${this.userData.industry}, he identificado oportunidades clave:\n\n${insights}\n\n¿Te gustaría ver las soluciones recomendadas?`,
      options: ['Sí, ver soluciones', 'Calcular ROI primero', 'Hablar con un experto']
    };
  }

  async processSolutionsMessage(message) {
    if (message.toLowerCase().includes('roi')) {
      this.currentStep = 'roi';
      return this.processROIMessage(message);
    }

    const solutions = this.generateSolutions(this.userData.industry, this.userData.challenges);

    return {
      text: `Aquí están las soluciones de IA recomendadas para ti:\n\n${solutions}\n\n¿Te gustaría ver el ROI estimado de estas soluciones?`,
      options: ['Ver ROI', 'Agendar consulta', 'Más detalles']
    };
  }

  async processROIMessage(message) {
    const roiData = this.calculateROI(this.userData);

    return {
      text: `📊 **Análisis de ROI para ${this.userData.companyName || 'tu empresa'}**\n\n${roiData}\n\n¿Te gustaría recibir un análisis detallado por correo?`,
      options: ['Sí, enviar análisis', 'Agendar llamada', 'Ver más beneficios']
    };
  }

  handleQuickAction(actionType) {
    switch (actionType) {
      case 'diagnostic':
        this.currentStep = 'diagnostic';
        this.sendPredefinedMessage('Quiero un diagnóstico gratuito');
        break;
      case 'solutions':
        this.currentStep = 'solutions';
        this.sendPredefinedMessage('Muéstrame las soluciones disponibles');
        break;
      case 'roi':
        this.currentStep = 'roi';
        this.sendPredefinedMessage('Quiero calcular el ROI');
        break;
      case 'contact':
        this.sendPredefinedMessage('Quiero hablar con un experto');
        break;
    }
  }

  sendPredefinedMessage(message) {
    const input = document.getElementById('chatbotInput');
    if (input) {
      input.value = message;
      this.sendMessage();
    }
  }

  addMessage(content, sender = 'bot') {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender} animate-slideUp`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'bot' 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C10.08 2 8.5 3.58 8.5 5.5C8.5 6.38 8.81 7.19 9.32 7.82C7.87 8.37 6.67 9.42 5.94 10.73C5.48 10.56 4.98 10.46 4.46 10.46C2.53 10.46 0.96 12.03 0.96 13.96C0.96 15.89 2.53 17.46 4.46 17.46C4.73 17.46 5 17.43 5.25 17.37C5.72 18.74 7.03 19.74 8.58 19.74H15.42C16.97 19.74 18.28 18.74 18.75 17.37C19 17.43 19.27 17.46 19.54 17.46C21.47 17.46 23.04 15.89 23.04 13.96C23.04 12.03 21.47 10.46 19.54 10.46C19.02 10.46 18.52 10.56 18.06 10.73C17.33 9.42 16.13 8.37 14.68 7.82C15.19 7.19 15.5 6.38 15.5 5.5C15.5 3.58 13.92 2 12 2Z"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Handle different content types
    if (typeof content === 'string') {
      contentDiv.innerHTML = `<p>${content}</p>`;
    } else if (content.text) {
      contentDiv.innerHTML = `<p>${content.text.split('\n').join('</p><p>')}</p>`;

      // Add options if present
      if (content.options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'message-options';
        content.options.forEach(option => {
          const button = document.createElement('button');
          button.className = 'option-button';
          button.textContent = option;
          button.onclick = () => {
            this.sendPredefinedMessage(option);
          };
          optionsDiv.appendChild(button);
        });
        contentDiv.appendChild(optionsDiv);
      }
    }

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.classList.remove('hidden');
    }
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
      indicator.classList.add('hidden');
    }
  }

  updateProgress() {
    const progressBar = document.getElementById('chatProgressBar');
    const steps = document.getElementById('progressSteps');
    if (!progressBar || !steps) return;

    const stepMap = {
      initial: 0,
      diagnostic: 25,
      industry: 25,
      challenges: 50,
      solutions: 75,
      roi: 75,
      proposal: 100
    };

    const progress = stepMap[this.currentStep] || 0;
    progressBar.style.width = `${progress}%`;

    // Update step indicators
    const stepElements = steps.querySelectorAll('.step');
    const currentStepIndex = Object.keys(this.steps).indexOf(this.currentStep);
    
    stepElements.forEach((step, index) => {
      if (index <= currentStepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  // Helper methods
  extractIntent(message) {
    const lowerMessage = message.toLowerCase();
    const intents = [];

    if (lowerMessage.includes('diagnostic') || lowerMessage.includes('análisis')) {
      intents.push('diagnostic');
    }
    if (lowerMessage.includes('roi') || lowerMessage.includes('costo') || lowerMessage.includes('precio')) {
      intents.push('roi');
    }
    if (lowerMessage.includes('solución') || lowerMessage.includes('solution')) {
      intents.push('solutions');
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('hablar') || lowerMessage.includes('expert')) {
      intents.push('contact');
    }

    return intents;
  }

  extractChallenges(message) {
    const challenges = [];
    const challengeMap = {
      'automatización': 'automation',
      'datos': 'analytics',
      'cliente': 'customer_service',
      'ventas': 'sales',
      'productividad': 'productivity',
      'costos': 'cost_reduction'
    };

    Object.keys(challengeMap).forEach(key => {
      if (message.toLowerCase().includes(key)) {
        challenges.push(challengeMap[key]);
      }
    });

    return challenges;
  }

  generateIndustryInsights(industry, challenges) {
    const insights = {
      'tecnología': {
        automation: '• Reducción del 40% en tiempo de desarrollo con IA generativa',
        analytics: '• Mejora del 35% en predicción de bugs con ML',
        productivity: '• Aumento del 50% en velocidad de deployment'
      },
      'salud': {
        automation: '• 60% menos tiempo en documentación clínica',
        analytics: '• 45% mejor precisión en diagnósticos',
        customer_service: '• 70% reducción en tiempos de espera'
      },
      'finanzas': {
        automation: '• 80% reducción en procesamiento de documentos',
        analytics: '• 55% mejora en detección de fraude',
        cost_reduction: '• 30% ahorro en costos operativos'
      }
    };

    const industryInsights = insights[industry] || insights['tecnología'];
    return Object.values(industryInsights).slice(0, 3).join('\n');
  }

  generateSolutions(industry, challenges) {
    const solutions = [
      '🤖 **Asistente IA Personalizado**\nAutomatiza respuestas y procesos específicos de tu industria',
      '📊 **Analytics Dashboard Inteligente**\nVisualiza y predice tendencias con IA avanzada',
      '🔄 **Automatización de Workflows**\nOptimiza procesos repetitivos con RPA inteligente',
      '💡 **Sistema de Recomendaciones**\nMejora decisiones con insights basados en datos'
    ];

    return solutions.slice(0, 3).join('\n\n');
  }

  calculateROI(userData) {
    const employees = parseInt(userData.employees) || 50;
    const savings = employees * 2000; // Average savings per employee
    const investment = employees * 500; // Average investment per employee
    const roi = ((savings - investment) / investment * 100).toFixed(0);

    return `💰 **Inversión estimada**: $${investment.toLocaleString()} MXN\n📈 **Ahorros anuales**: $${savings.toLocaleString()} MXN\n🎯 **ROI**: ${roi}% en el primer año\n⏱️ **Tiempo de retorno**: ${(12 * investment / savings).toFixed(1)} meses`;
  }
}

// Initialize chatbot when DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.chatbotAI = new ChatbotAI();
    
    // Make openChatbot available globally
    window.openChatbot = () => {
      if (window.chatbotAI) {
        window.chatbotAI.openChatbot();
      }
    };
  });
}