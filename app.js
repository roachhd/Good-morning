// Application data
const wellnessData = {
  quotes: [
    "The most effective way to do it, is to do it. â€” Amelia Earhart",
    "We are what we repeatedly do. Excellence, therefore, is not an act. But a habit. â€” Aristotle",
    "Believe you can and you're halfway there. â€” Theodore Roosevelt",
    "Take care of your body, it's the only place you have to live. â€” Jim Rohn", 
    "What drains your spirit drains your body. What fuels your spirit fuels your body. â€” Caroline Myss",
    "The ability to be in the present moment is a major component of mental wellness. â€” Abraham Maslow",
    "Every moment is a fresh beginning. â€” T. S. Eliot",
    "Just one small positive thought in the morning can change your whole day. â€” Dalai Lama",
    "Health is a state of body. Wellness is a state of being. â€” J. Stanford",
    "A healthy outside starts from the inside. â€” Unknown",
    "Self-care is how you take your power back. â€” Lalah Delia",
    "Wellness is the complete integration of body, mind, and spirit. â€” Greg Anderson"
  ],
  journal_prompts: [
    "What are three things I'm genuinely grateful for right now, and how do they make me feel?",
    "What limiting belief am I ready to release today, and what empowering thought will I choose instead?",
    "How did I show kindness to myself yesterday, and what act of self-care do I need today?",
    "What gives me energy and makes me feel most alive? How can I incorporate more of this into my day?",
    "What would I do today if I knew I couldn't fail?",
    "What emotions am I currently experiencing, and what might they be trying to tell me?",
    "How have I grown or changed in the past month, and what am I proud of about that growth?",
    "What boundaries do I need to set today to protect my energy and well-being?",
    "What mistake or challenge from yesterday can I learn from and use to grow today?",
    "If my future self could give me one piece of advice right now, what would it be?",
    "What does my ideal day look like, and what small step can I take toward making it reality?",
    "How can I be more present and mindful in my interactions today?",
    "What strength or talent do I possess that I haven't fully embraced yet?",
    "What would self-compassion look like for me in this moment?",
    "What pattern in my life do I want to change, and what's one small step I can take today?",
    "How do I want to feel at the end of today, and what actions will help me achieve that feeling?"
  ],
  inspirations: [
    "Today, embrace the power of small beginnings. Every expert was once a beginner, every master was once a disaster. Your willingness to start, even imperfectly, is the seed of all great accomplishments.",
    "Remember that you are both the sculptor and the clay. Each choice you make today shapes who you're becoming. Choose with intention, create with love, and trust the masterpiece you're creating.",
    "Your challenges are not roadblocksâ€”they're stepping stones. Each obstacle you overcome adds strength to your character and wisdom to your soul. You're not just surviving; you're evolving.",
    "Like a tree that bends in the wind but doesn't break, your flexibility and resilience are your superpowers. Today, bend when you need to, but rememberâ€”your roots run deep.",
    "You have within you right now everything you need to take the next step forward. Trust your inner wisdom, honor your journey, and know that you're exactly where you need to be to become who you're meant to be.",
    "Today is a blank canvas, and you hold the paintbrush. Every moment is an opportunity to add color, depth, and beauty to your life's masterpiece. Paint boldly, create fearlessly.",
    "Your presence in this world matters more than you know. The unique combination of your experiences, insights, and heart creates ripples of positive impact that extend far beyond what you can see.",
    "Like a seed that grows slowly underground before breaking through to the light, your efforts may seem invisible now, but they're building something beautiful. Trust the process of your own becoming.",
    "You don't have to have it all figured out. Sometimes the most profound growth comes from sitting comfortably with uncertainty and letting your path reveal itself one step at a time.",
    "Your body is your closest ally, your mind is your most powerful tool, and your spirit is your eternal compass. Honor all three today, and let them guide you toward your highest good.",
    "Every sunrise offers you a fresh start, a new chance to write your story differently. Yesterday's mistakes don't define youâ€”today's choices create who you're becoming.",
    "You are simultaneously a work of art and the artist creating it. Be patient with your process, celebrate your progress, and remember that masterpieces take time to unfold."
  ],
  morning_routines: [
    "**The Mindful Start (30 minutes)**: Wake up 30 minutes earlier â†’ Drink a large glass of water â†’ 5 minutes of deep breathing or meditation â†’ Write 3 gratitudes in your journal â†’ Gentle stretching or yoga â†’ Nutritious breakfast with protein â†’ Set 3 priorities for the day",
    "**The Energizer (45 minutes)**: Rise at the same time daily â†’ Make your bed immediately â†’ Drink water with lemon â†’ 20-minute walk or exercise â†’ Cold shower or face splash â†’ Healthy breakfast â†’ Review goals and visualize success",
    "**The Wellness Foundation (60 minutes)**: Early wake-up (6-7 AM) â†’ Hydrate first thing â†’ 10 minutes of journaling â†’ 15 minutes of movement (yoga, stretching, or exercise) â†’ Mindful breakfast preparation and eating â†’ 10 minutes planning the day â†’ Brief meditation or affirmations",
    "**The Simple Start (20 minutes)**: Consistent wake time â†’ Immediate water intake â†’ Make the bed â†’ 5 minutes of gratitude reflection â†’ Quick energizing shower â†’ Grab pre-prepared healthy breakfast â†’ One positive affirmation before leaving",
    "**The Holistic Morning (90 minutes)**: Wake up 90 minutes before needed â†’ Large glass of water â†’ 20 minutes of gentle exercise or yoga â†’ 15 minutes of meditation or prayer â†’ Nutritious breakfast mindfully eaten â†’ 10 minutes of reading something inspiring â†’ Plan top 3 priorities â†’ Brief nature connection",
    "**The Productivity Booster (50 minutes)**: Early rise â†’ Hydrate immediately â†’ 10 minutes of stretching â†’ Review and visualize daily goals â†’ Exercise for 20 minutes â†’ Protein-rich breakfast â†’ 10 minutes of learning (podcast, book, or article) â†’ Set daily intentions"
  ]
};

// Track current content to ensure we get different content on refresh
let currentContent = {
  quote: '',
  prompts: [],
  inspiration: '',
  routine: ''
};

// Utility functions
function getRandomItem(array, exclude = null) {
  let filteredArray = array;
  if (exclude) {
    filteredArray = array.filter(item => item !== exclude);
  }
  return filteredArray[Math.floor(Math.random() * filteredArray.length)];
}

function getTwoRandomItems(array, excludeItems = []) {
  let filteredArray = array;
  if (excludeItems.length > 0) {
    filteredArray = array.filter(item => !excludeItems.includes(item));
  }
  const shuffled = [...filteredArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

function formatDate() {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date().toLocaleDateString('en-US', options);
}

function parseRoutineContent(routine) {
  const parts = routine.split('**');
  if (parts.length >= 3) {
    const title = parts[1];
    const content = parts[2].replace(/^:\s*/, '');
    return { title, content };
  }
  return { title: 'Morning Routine', content: routine };
}

// Content loading functions
function loadInitialContent() {
  // Set current date
  document.getElementById('current-date').textContent = formatDate();
  
  // Load initial content
  loadNewContent(false); // false = initial load, don't avoid current content
}

function loadNewContent(avoidCurrent = true) {
  // Add loading state
  const contentElements = [
    'motivational-quote',
    'journal-prompt-1', 
    'journal-prompt-2',
    'spark-inspiration',
    'morning-routine'
  ];
  
  contentElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.closest('.card').classList.add('content-updating');
    }
  });
  
  // Simulate loading delay for smooth transition
  setTimeout(() => {
    try {
      // Load motivational quote (ensure it's different from current)
      const quote = getRandomItem(wellnessData.quotes, avoidCurrent ? currentContent.quote : null);
      document.getElementById('motivational-quote').textContent = quote;
      currentContent.quote = quote;
      
      // Load journal prompts (ensure they're different from current)
      const prompts = getTwoRandomItems(wellnessData.journal_prompts, avoidCurrent ? currentContent.prompts : []);
      document.getElementById('journal-prompt-1').textContent = prompts[0];
      document.getElementById('journal-prompt-2').textContent = prompts[1];
      currentContent.prompts = prompts;
      
      // Load spark of inspiration (ensure it's different from current)
      const inspiration = getRandomItem(wellnessData.inspirations, avoidCurrent ? currentContent.inspiration : null);
      document.getElementById('spark-inspiration').textContent = inspiration;
      currentContent.inspiration = inspiration;
      
      // Load morning routine (ensure it's different from current)
      const routine = getRandomItem(wellnessData.morning_routines, avoidCurrent ? currentContent.routine : null);
      const parsedRoutine = parseRoutineContent(routine);
      const routineElement = document.getElementById('morning-routine');
      routineElement.innerHTML = `
        <h3>${parsedRoutine.title}</h3>
        <p>${parsedRoutine.content}</p>
      `;
      currentContent.routine = routine;
      
      // Remove loading state and add updated state
      contentElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const card = element.closest('.card');
          card.classList.remove('content-updating');
          card.classList.add('content-updated');
          
          // Remove updated class after animation
          setTimeout(() => {
            card.classList.remove('content-updated');
          }, 300);
        }
      });
      
      console.log('Content updated successfully');
    } catch (error) {
      console.error('Error updating content:', error);
      // Remove loading states on error
      contentElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.closest('.card').classList.remove('content-updating');
        }
      });
    }
  }, 400);
}

// Copy to clipboard functionality
async function copyToClipboard(elementId) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found:', elementId);
      showCopyNotification('Error: Element not found');
      return;
    }
    
    let textToCopy = '';
    
    // Handle different element types and structures
    if (element.tagName === 'BLOCKQUOTE') {
      textToCopy = element.textContent.trim();
    } else if (element.tagName === 'P') {
      textToCopy = element.textContent.trim();
    } else if (element.tagName === 'DIV') {
      // For morning routine, get both title and content
      const title = element.querySelector('h3')?.textContent?.trim() || '';
      const content = element.querySelector('p')?.textContent?.trim() || '';
      textToCopy = title ? `${title}\n\n${content}` : content;
    } else {
      // Fallback - get all text content
      textToCopy = element.textContent.trim();
    }
    
    if (!textToCopy) {
      console.error('No text found to copy for element:', elementId);
      showCopyNotification('Error: No text to copy');
      return;
    }
    
    console.log('Attempting to copy text:', textToCopy.substring(0, 50) + '...');
    
    let copySuccess = false;
    
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copySuccess = true;
        console.log('Modern clipboard API succeeded');
      } catch (clipboardError) {
        console.warn('Modern clipboard API failed:', clipboardError);
      }
    }
    
    // Fallback to execCommand if modern API failed or isn't available
    if (!copySuccess) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('contenteditable', 'true');
        
        document.body.appendChild(textArea);
        
        // Focus and select
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, textArea.value.length);
        
        // Execute copy command
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          copySuccess = true;
          console.log('Fallback clipboard method succeeded');
        } else {
          console.error('execCommand copy failed');
        }
      } catch (fallbackError) {
        console.error('Fallback clipboard method failed:', fallbackError);
      }
    }
    
    // Show appropriate notification
    if (copySuccess) {
      showCopyNotification('Copied to clipboard!');
    } else {
      showCopyNotification('Failed to copy text');
    }
    
  } catch (err) {
    console.error('Copy function error:', err);
    showCopyNotification('Copy failed');
  }
}

function showCopyNotification(message = 'Copied to clipboard!') {
  const notification = document.getElementById('copy-notification');
  if (!notification) {
    console.error('Copy notification element not found');
    return;
  }
  
  const notificationText = notification.querySelector('span');
  if (notificationText) {
    notificationText.textContent = message;
  }
  
  console.log('Showing notification:', message);
  
  // Ensure notification is visible and reset any previous states
  notification.classList.remove('hidden', 'show');
  notification.style.display = 'block';
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(-100px)';
  
  // Force reflow and add show class with a small delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      notification.classList.add('show');
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    });
  });
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-100px)';
    
    setTimeout(() => {
      notification.classList.add('hidden');
      notification.style.display = 'none';
    }, 300);
  }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  loadInitialContent();
  
  // Refresh button functionality
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Refresh button clicked');
      
      // Add rotation animation to the refresh icon
      const svg = this.querySelector('svg');
      if (svg) {
        svg.style.transform = 'rotate(360deg)';
        
        // Reset rotation after animation
        setTimeout(() => {
          svg.style.transform = '';
        }, 500);
      }
      
      loadNewContent(true); // true = avoid current content
    });
  }
  
  // Add keyboard support for accessibility
  document.addEventListener('keydown', function(e) {
    // Press 'R' to refresh content
    if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      if (refreshBtn) {
        refreshBtn.click();
      }
    }
    
    // Press 'Escape' to close any notifications
    if (e.key === 'Escape') {
      const notification = document.getElementById('copy-notification');
      if (notification && notification.classList.contains('show')) {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.classList.add('hidden');
        }, 300);
      }
    }
  });
  
  console.log('Event listeners attached successfully');
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add intersection observer for subtle animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for entrance animations
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

// Make copyToClipboard globally available
window.copyToClipboard = copyToClipboard;

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getRandomItem,
    getTwoRandomItems,
    formatDate,
    parseRoutineContent,
    copyToClipboard,
    loadNewContent
  };
}
