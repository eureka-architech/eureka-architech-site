// Contact Page JavaScript
// Unified contact page functionality

export function initializeContactPage() {
  // Initialize smooth scroll for all internal links
  initializeSmoothScroll();
  
  // Initialize contact form
  if (typeof initializeContactForm !== 'undefined') {
    initializeContactForm();
  }

  // Navigation functions
  window.startAIChat = function() {
    // Open the chatbot using the global function
    if (typeof window.openChatbot === 'function') {
      window.openChatbot();
    } else if (window.chatbotAI && window.chatbotAI.openChatbot) {
      // Fallback if the global function isn't ready yet
      window.chatbotAI.openChatbot();
    } else {
      // Last resort: try to open the modal directly
      const modal = document.getElementById('chatbotModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  };
  
  window.goToForm = function() {
    const formSection = document.getElementById('formSection');
    if (formSection) {
      // Add pre-animation class
      formSection.classList.add('section-entering');
      
      // Smooth scroll with offset
      const offset = 80;
      const elementPosition = formSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Remove animation class after scroll
      setTimeout(() => {
        formSection.classList.remove('section-entering');
        formSection.classList.add('section-entered');
      }, 800);
    }
  };

  // Mouse tracking effect for option cards
  initializeOptionCardEffects();

  // Animate elements on scroll
  initializeScrollAnimations();
  
  // Initialize parallax effects
  initializeParallaxEffects();
  
  // Initialize intersection observer for lazy animations
  initializeIntersectionObserver();
}

function initializeOptionCardEffects() {
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

function initializeScrollAnimations() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.opacity = '1';
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
}

// New smooth scroll function
function initializeSmoothScroll() {
  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced parallax effects
function initializeParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.orb, .hero-background');
  
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Enhanced intersection observer for smooth animations
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('in-view');
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }, index * 50);
      }
    });
  }, observerOptions);
  
  // Observe all animatable elements
  const animatableElements = document.querySelectorAll(
    '.option-card, .trust-card, .hero-content > *, .section-header > *'
  );
  
  animatableElements.forEach(element => {
    element.classList.add('observe-me');
    observer.observe(element);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeContactPage);