// ================================
// MODERN CONTACT FORM - 2025
// ================================

// Form State Management
class FormStateManager {
  constructor(formId) {
    this.formId = formId;
    this.form = document.getElementById(formId);
    this.currentStep = 1;
    this.totalSteps = 4;
    this.formData = this.loadFromStorage() || {};
    this.stepNames = {
      1: 'Información Básica',
      2: 'Detalles de Empresa',
      3: 'Desafíos',
      4: 'Detalles del Proyecto'
    };
  }

  // LocalStorage Management
  saveToStorage() {
    try {
      localStorage.setItem(`${this.formId}_data`, JSON.stringify(this.formData));
      localStorage.setItem(`${this.formId}_step`, this.currentStep.toString());
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  loadFromStorage() {
    try {
      const savedData = localStorage.getItem(`${this.formId}_data`);
      const savedStep = localStorage.getItem(`${this.formId}_step`);
      
      if (savedStep) {
        this.currentStep = parseInt(savedStep);
      }
      
      return savedData ? JSON.parse(savedData) : {};
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return {};
    }
  }

  clearStorage() {
    localStorage.removeItem(`${this.formId}_data`);
    localStorage.removeItem(`${this.formId}_step`);
  }

  // Form Data Management
  updateFormData(field, value) {
    this.formData[field] = value;
    this.saveToStorage();
  }

  getFieldValue(field) {
    return this.formData[field] || '';
  }
}

// Input Validation with Real-time Feedback
class InputValidator {
  constructor() {
    this.validators = {
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      tel: (value) => /^[\d\s\-\+\(\)]+$/.test(value) && value.length >= 10,
      required: (value) => value.trim().length > 0
    };
  }

  validateField(input) {
    const type = input.dataset.validate || input.type;
    const value = input.value;
    const isRequired = input.hasAttribute('required');
    const fieldContainer = input.closest('.form-field');

    // Reset state
    fieldContainer.classList.remove('valid', 'invalid');

    if (value.trim() === '') {
      if (isRequired) {
        return false;
      }
      return true;
    }

    let isValid = true;

    // Type-specific validation
    if (this.validators[type]) {
      isValid = this.validators[type](value);
    }

    // Required validation
    if (isRequired && !this.validators.required(value)) {
      isValid = false;
    }

    // Update UI
    if (isValid) {
      fieldContainer.classList.add('valid');
      this.showHelper(fieldContainer, '');
    } else {
      fieldContainer.classList.add('invalid');
      this.showHelper(fieldContainer, this.getErrorMessage(type));
    }

    return isValid;
  }

  showHelper(fieldContainer, message) {
    const helper = fieldContainer.querySelector('.helper-text');
    if (helper) {
      helper.textContent = message;
    }
  }

  getErrorMessage(type) {
    const messages = {
      email: 'Por favor ingresa un email válido',
      tel: 'Por favor ingresa un teléfono válido',
      required: 'Este campo es obligatorio'
    };
    return messages[type] || 'Por favor verifica este campo';
  }
}

// Enhanced Form Navigation with Animations
class FormNavigator {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.validator = new InputValidator();
  }

  nextStep() {
    if (!this.validateCurrentStep()) {
      this.shakeForm();
      return;
    }

    if (this.stateManager.currentStep < this.stateManager.totalSteps) {
      this.animateStepTransition('next');
      this.stateManager.currentStep++;
      this.updateUI();
      this.updateFormGradient();
      this.stateManager.saveToStorage();
    }
  }

  prevStep() {
    if (this.stateManager.currentStep > 1) {
      this.animateStepTransition('prev');
      this.stateManager.currentStep--;
      this.updateUI();
      this.updateFormGradient();
      this.stateManager.saveToStorage();
    }
  }

  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.stateManager.totalSteps) {
      const direction = stepNumber > this.stateManager.currentStep ? 'next' : 'prev';
      this.animateStepTransition(direction);
      this.stateManager.currentStep = stepNumber;
      this.updateUI();
      this.updateFormGradient();
      this.stateManager.saveToStorage();
    }
  }

  validateCurrentStep() {
    const currentStepElement = document.querySelector(`.modern-step[data-step="${this.stateManager.currentStep}"]`);
    const inputs = currentStepElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validator.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  animateStepTransition(direction) {
    const currentStep = document.querySelector('.modern-step.active');
    if (currentStep) {
      currentStep.classList.add('exiting');
      setTimeout(() => {
        currentStep.classList.remove('active', 'exiting');
      }, 300);
    }
  }

  updateUI() {
    // Update step visibility
    document.querySelectorAll('.modern-step').forEach(step => {
      step.classList.remove('active', 'entering');
      if (parseInt(step.dataset.step) === this.stateManager.currentStep) {
        setTimeout(() => {
          step.classList.add('active', 'entering');
        }, 350);
      }
    });

    // Update progress
    this.updateProgress();
    
    // Update step name
    const stepName = document.getElementById('stepName');
    if (stepName) {
      stepName.textContent = this.stateManager.stepNames[this.stateManager.currentStep];
    }
  }

  updateProgress() {
    const progress = (this.stateManager.currentStep / this.stateManager.totalSteps);
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      progressFill.style.setProperty('--progress', progress);
    }

    // Update progress text
    const currentStepElement = document.getElementById('currentStep');
    if (currentStepElement) {
      currentStepElement.textContent = this.stateManager.currentStep;
    }

    // Update percentage
    const progressPercent = document.getElementById('progressPercent');
    if (progressPercent) {
      progressPercent.textContent = `${Math.round(progress * 100)}%`;
    }

    // Update step dots
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
      const stepNum = index + 1;
      dot.classList.remove('active', 'completed');
      
      if (stepNum === this.stateManager.currentStep) {
        dot.classList.add('active');
      } else if (stepNum < this.stateManager.currentStep) {
        dot.classList.add('completed');
      }
    });

    // Update step lines
    document.querySelectorAll('.step-line').forEach((line, index) => {
      const stepNum = index + 1;
      line.classList.toggle('completed', stepNum < this.stateManager.currentStep);
    });
  }

  updateFormGradient() {
    const form = document.querySelector('.modern-form');
    if (form) {
      form.setAttribute('data-step', this.stateManager.currentStep);
    }
  }

  shakeForm() {
    const currentStep = document.querySelector('.modern-step.active');
    if (currentStep) {
      currentStep.style.animation = 'errorShake 0.5s ease-out';
      setTimeout(() => {
        currentStep.style.animation = '';
      }, 500);
    }
  }
}

// Microinteractions Handler
class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.initRippleEffect();
    this.initInputAnimations();
    this.initStepDotClicks();
  }

  initRippleEffect() {
    document.addEventListener('click', (e) => {
      const button = e.target.closest('.ripple-container');
      if (!button) return;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  initInputAnimations() {
    document.querySelectorAll('.modern-input').forEach(input => {
      // Character counter for textareas
      if (input.tagName === 'TEXTAREA') {
        const counter = input.closest('.form-field').querySelector('.character-count');
        if (counter) {
          const maxLength = input.getAttribute('maxlength') || 500;
          input.addEventListener('input', () => {
            counter.textContent = `${input.value.length}/${maxLength}`;
          });
        }
      }

      // Auto-resize for textareas
      if (input.tagName === 'TEXTAREA') {
        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = input.scrollHeight + 'px';
        });
      }
    });
  }

  initStepDotClicks() {
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const stepNum = index + 1;
        if (window.formNavigator && stepNum <= window.formNavigator.stateManager.currentStep) {
          window.formNavigator.goToStep(stepNum);
        }
      });
    });
  }
}

// Form Submission Handler
class FormSubmissionHandler {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  async submit() {
    const submitButton = document.querySelector('.modern-button[type="submit"]');
    
    try {
      // Show loading state
      submitButton.classList.add('loading');
      
      // Simulate API call
      await this.sendData(this.stateManager.formData);
      
      // Success state
      submitButton.classList.remove('loading');
      submitButton.classList.add('success');
      
      // Show celebration
      this.showCelebration();
      
      // Clear storage
      this.stateManager.clearStorage();
      
      // Redirect or show success message
      setTimeout(() => {
        this.showSuccessMessage();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      submitButton.classList.remove('loading');
      this.showError('Error al enviar el formulario. Por favor intenta de nuevo.');
    }
  }

  async sendData(data) {
    // Replace with actual API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data submitted:', data);
        resolve();
      }, 2000);
    });
  }

  showCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    
    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = ['#00F2A9', '#0066FF', '#8B5CF6', '#FFD700'][Math.floor(Math.random() * 4)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      celebration.appendChild(confetti);
    }
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 3000);
  }

  showSuccessMessage() {
    alert('¡Formulario enviado exitosamente! Te contactaremos pronto.');
    // In production, replace with a nice modal or redirect
  }

  showError(message) {
    alert(message);
    // In production, replace with a nice error modal
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const formId = 'advancedForm';
  const form = document.getElementById(formId);
  
  if (!form) return;

  // Initialize managers
  const stateManager = new FormStateManager(formId);
  const navigator = new FormNavigator(stateManager);
  const microInteractions = new MicroInteractions();
  const submissionHandler = new FormSubmissionHandler(stateManager);

  // Make navigator globally available for button clicks
  window.formNavigator = navigator;

  // Restore form data
  Object.keys(stateManager.formData).forEach(field => {
    const input = form.querySelector(`[name="${field}"]`);
    if (input) {
      input.value = stateManager.formData[field];
    }
  });

  // Set up event listeners
  form.addEventListener('input', (e) => {
    if (e.target.matches('input, textarea, select')) {
      stateManager.updateFormData(e.target.name, e.target.value);
    }
  });

  // Real-time validation
  form.addEventListener('blur', (e) => {
    if (e.target.matches('input, textarea')) {
      navigator.validator.validateField(e.target);
    }
  }, true);

  // Prevent form submission and handle it manually
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (navigator.validateCurrentStep()) {
      submissionHandler.submit();
    } else {
      navigator.shakeForm();
    }
  });

  // Initialize UI with saved step
  navigator.updateUI();
  navigator.updateFormGradient();

  // Add global functions for button clicks
  window.nextStep = () => navigator.nextStep();
  window.prevStep = () => navigator.prevStep();
  window.submitContactForm = () => form.dispatchEvent(new Event('submit'));
});