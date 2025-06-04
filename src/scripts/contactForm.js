// Multi-step form functionality
export function initializeContactForm() {
  // Show specific step
  function showStep(form, stepNumber) {
    const steps = form.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const currentStepEl = document.getElementById('currentStep');
    
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Show target step
    const targetStep = form.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
      targetStep.classList.add('active');
    }
    
    // Update progress
    const totalSteps = steps.length;
    const progress = (stepNumber / totalSteps) * 100;
    
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    
    if (currentStepEl) {
      currentStepEl.textContent = stepNumber.toString();
    }
  }
  
  // Validate current step
  function validateStep(stepEl) {
    if (!stepEl) return false;
    
    const requiredFields = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        
        // Remove error styling on input
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    
    // Check for at least one checkbox in challenges
    const checkboxGroups = stepEl.querySelectorAll('.challenges-grid');
    checkboxGroups.forEach(group => {
      const checkboxes = group.querySelectorAll('input[type="checkbox"]');
      const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
      
      if (checkboxes.length > 0 && checkedBoxes.length === 0) {
        isValid = false;
        // Highlight the group
        group.style.border = '2px solid rgba(239, 68, 68, 0.5)';
        group.style.borderRadius = 'var(--radius-lg)';
        group.style.padding = 'var(--space-4)';
        
        setTimeout(() => {
          group.style.border = '';
          group.style.padding = '';
        }, 3000);
      }
    });
    
    return isValid;
  }
  
  // Next step
  window.nextStep = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const currentStepEl = form.querySelector('.form-step.active');
    const currentStep = parseInt(currentStepEl?.getAttribute('data-step') || '1');
    
    // Validate current step
    if (!validateStep(currentStepEl)) {
      return;
    }
    
    // Move to next step
    showStep(form, currentStep + 1);
  }
  
  // Previous step
  window.prevStep = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const currentStepEl = form.querySelector('.form-step.active');
    const currentStep = parseInt(currentStepEl?.getAttribute('data-step') || '1');
    
    // Move to previous step
    showStep(form, currentStep - 1);
  }
  
  // Submit form
  window.submitContactForm = async function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const currentStepEl = form.querySelector('.form-step.active');
    if (!validateStep(currentStepEl)) {
      return;
    }
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      
      // Collect challenges
      const challenges = [];
      form.querySelectorAll('input[name="challenges"]:checked').forEach(checkbox => {
        challenges.push(checkbox.value);
      });
      
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        industry: formData.get('industry'),
        employees: formData.get('employees'),
        challenges: challenges,
        timeline: formData.get('timeline'),
        budget: formData.get('budget'),
        message: formData.get('message')
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      showSuccessMessage(form);
      
      // Reset form
      form.reset();
      showStep(form, 1);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      submitButton.textContent = 'Error. Intenta de nuevo';
      submitButton.disabled = false;
    }
  }
  
  // Show success message
  function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div class="success-icon">✅</div>
      <h3>¡Mensaje enviado con éxito!</h3>
      <p>Nos pondremos en contacto contigo pronto.</p>
    `;
    
    form.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
  
  // Initialize AI chat
  window.startAIChat = function() {
    const chatSection = document.getElementById('aiChatSection');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const input = chatSection.querySelector('.chat-input');
      if (input) {
        input.focus();
      }
    }
  }
  
  // Go to options
  window.goToOptions = function() {
    const optionsSection = document.getElementById('contactOptions');
    if (optionsSection) {
      optionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Success message styles
const style = document.createElement('style');
style.textContent = `
  .success-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-card);
    padding: var(--space-8);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
    text-align: center;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  }
  
  .success-icon {
    font-size: 3rem;
    margin-bottom: var(--space-4);
  }
  
  .success-message h3 {
    font-size: var(--text-xl);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }
  
  .success-message p {
    color: var(--text-secondary);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;
document.head.appendChild(style);