// ==================== STATE MANAGEMENT ====================
const app = {
    currentScreen: 'accept-screen',
    sounds: {
        enabled: true
    }
};

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Romantic Gift Website Loaded Successfully!');
    initializeApp();
});

// ==================== INITIALIZE APP ====================
function initializeApp() {
    // Start floating hearts animation
    startFloatingHearts();
    
    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', createSparkle);
    
    // Prevent right-click (optional - for gift experience)
    // document.addEventListener('contextmenu', e => e.preventDefault());
}

// ==================== SCREEN NAVIGATION ====================
function showScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);
    
    if (!nextScreen) {
        console.error(`Screen ${screenId} not found!`);
        return;
    }
    
    // Fade out current screen
    if (currentScreen) {
        currentScreen.style.animation = 'fadeOut 0.3s ease-out';
        
        setTimeout(() => {
            currentScreen.classList.remove('active');
            currentScreen.style.animation = '';
            
            // Show next screen
            nextScreen.classList.add('active');
            app.currentScreen = screenId;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    } else {
        nextScreen.classList.add('active');
        app.currentScreen = screenId;
    }
}

// ==================== BUTTON HANDLERS ====================
function handleAccept() {
    playSound('success');
    triggerConfetti();
    
    setTimeout(() => {
        showScreen('gift-screen');
    }, 500);
}

function handleReject() {
    playSound('error');
    shakeScreen();
    showScreen('reject-screen');
}

function handleTryAgain() {
    playSound('click');
    showScreen('accept-screen');
}

function openGift(giftType) {
    playSound('click');
    
    const screenMap = {
        'music': 'music-screen',
        'photos': 'photos-screen',
        'letter': 'letter-screen'
    };
    
    const screenId = screenMap[giftType];
    if (screenId) {
        showScreen(screenId);
        
        // Add celebration effect
        if (giftType === 'music') {
            createHeartExplosion();
        }
    }
}

function goBack() {
    playSound('back');
    showScreen('gift-screen');
}

function viewPhoto(element) {
    // Add zoom effect or lightbox here
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = '';
    }, 300);
}

// ==================== VISUAL EFFECTS ====================

// Confetti Effect
function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#f8b500', '#667eea'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-out forwards`;
            
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 15);
    }
}

// Floating Hearts
function startFloatingHearts() {
    const heartsContainer = document.getElementById('floating-hearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        const heartEmojis = ['💕', '💖', '💗', '💝', '❤️', '💓'];
        
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.opacity = '0.6';
        heart.style.zIndex = '0';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${5 + Math.random() * 3}s linear forwards`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 2000);
}

// Sparkle Effect
let sparkleTimeout;
function createSparkle(e) {
    clearTimeout(sparkleTimeout);
    
    sparkleTimeout = setTimeout(() => {
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('div');
            const sparkles = ['✨', '💫', '⭐', '🌟'];
            
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = e.pageX + 'px';
            sparkle.style.top = e.pageY + 'px';
            sparkle.style.fontSize = '24px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9998';
            sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }, 50);
}

// Heart Explosion Effect
function createHeartExplosion() {
    const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = center.x + 'px';
            heart.style.top = center.y + 'px';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 200 + Math.random() * 100;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;
            
            heart.style.animation = `explode 1s ease-out forwards`;
            heart.style.setProperty('--dx', dx + 'px');
            heart.style.setProperty('--dy', dy + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 20);
    }
}

// Screen Shake Effect
function shakeScreen() {
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// ==================== SOUND EFFECTS ====================
function playSound(type) {
    if (!app.sounds.enabled) return;
    
    // Web Audio API for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    switch(type) {
        case 'success':
            oscillator.frequency.setValueAtTime(523.25, now); // C5
            oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;
            
        case 'error':
            oscillator.frequency.setValueAtTime(200, now);
            oscillator.frequency.setValueAtTime(100, now + 0.1);
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            break;
            
        case 'click':
            oscillator.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            break;
            
        case 'back':
            oscillator.frequency.setValueAtTime(400, now);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;
    }
}

// ==================== UTILITY FUNCTIONS ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== CSS ANIMATIONS ====================
// Inject animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.95); }
    }
    
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            bottom: -50px;
            opacity: 0.6;
            transform: translateX(0);
        }
        50% {
            transform: translateX(${Math.random() > 0.5 ? '' : '-'}30px);
        }
        100% {
            bottom: 110vh;
            opacity: 0;
            transform: translateX(${Math.random() > 0.5 ? '-' : ''}30px);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-40px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.5);
        }
    }
    
    @keyframes explode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// ==================== CONSOLE ART ====================
console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║     💝 ROMANTIC GIFT WEBSITE 💝      ║
    ║                                      ║
    ║   Made with ❤️ by a loving person   ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    
    🎁 All features loaded successfully!
    ✨ Enjoy the magical experience!
`);

// Export for potential backend integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { app, showScreen, handleAccept, handleReject, openGift };
}