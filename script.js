// ===== PREVIOUS CODE (Keep all this) =====

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Add active class to clicked link
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-container');
    if (window.scrollY > 50) {
        header.style.top = '0';
        header.style.borderRadius = '0';
        header.style.margin = '0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.top = '10px';
        header.style.borderRadius = '0 0 15px 15px';
        header.style.margin = '0 20px';
        header.style.boxShadow = 'var(--shadow)';
    }
});

// Animate manifesto cards on scroll
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

// Observe manifesto cards
document.querySelectorAll('.manifesto-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe polling items
document.querySelectorAll('.polling-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// Image loading handler
document.addEventListener('DOMContentLoaded', function() {
    const candidateImg = document.querySelector('.photo-main img');
    
    if(candidateImg) {
        candidateImg.addEventListener('load', function() {
            console.log('Candidate image loaded successfully');
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
        
        candidateImg.addEventListener('error', function() {
            console.log('Image failed to load, using fallback');
        });
    }
    
    // Add current date to polling info
    const pollingDate = new Date('2025-12-11');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = pollingDate.toLocaleDateString('te-IN', options);
    
    const dateElement = document.querySelector('.polling-item:nth-child(1) p:first-child');
    if(dateElement) {
        dateElement.textContent = dateString;
    }
});

// Countdown to polling day
function updateCountdown() {
    const pollingDate = new Date('2025-12-11').getTime();
    const now = new Date().getTime();
    const distance = pollingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        // Update countdown display if element exists
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = 
                `<strong>${days}</strong> రోజులు <strong>${hours}</strong> గంటలు మాత్రమే మిగిలాయి!`;
        }
    }
}

// Create countdown element
const countdownDiv = document.createElement('div');
countdownDiv.id = 'countdown';
countdownDiv.style.cssText = `
    background: linear-gradient(135deg, var(--accent), #c62828);
    color: white;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 1.2rem;
    margin: 20px auto;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    font-weight: bold;
`;

// Insert countdown after polling details
document.addEventListener('DOMContentLoaded', function() {
    const pollingDetails = document.querySelector('.polling-details');
    if (pollingDetails) {
        pollingDetails.parentNode.insertBefore(countdownDiv, pollingDetails.nextSibling);
        updateCountdown();
        setInterval(updateCountdown, 3600000); // Update every hour
    }
});

// Add hover effect to photo frame
document.addEventListener('DOMContentLoaded', function() {
    const photoFrame = document.querySelector('.photo-frame');
    if(photoFrame) {
        photoFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        photoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Add parallax effect to sections
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if(heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.backgroundPosition = `center ${rate}px`;
    }
});

// ===== NEW MOBILE-SPECIFIC CODE (Add this at the end) =====

// Mobile-Specific Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    // Interactive vote animation
    const voteAnimation = document.querySelector('.vote-animation-container');
    const fingerTouch = document.querySelector('.finger-touch');
    const voteScissor = document.querySelector('.vote-scissor');
    const voteText = document.querySelector('.vote-text');
    
    if (voteAnimation) {
        voteAnimation.addEventListener('click', function() {
            // Animate finger touching scissors
            fingerTouch.style.animation = 'touchMove 0.5s forwards';
            voteScissor.style.animation = 'scissorPulse 0.3s 3';
            
            // Change text
            voteText.textContent = 'ఓటు వేసినారు! ✅';
            voteText.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            voteText.style.color = 'white';
            
            // Reset after animation
            setTimeout(() => {
                fingerTouch.style.animation = 'touchMove 4s infinite ease-in-out';
                voteScissor.style.animation = 'scissorPulse 4s infinite ease-in-out';
                voteText.textContent = 'మళ్లీ టచ్ చేయండి!';
                voteText.style.background = 'var(--white)';
                voteText.style.color = 'var(--dark-green)';
            }, 2000);
        });
        
        // Touch feedback for mobile
        voteAnimation.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        voteAnimation.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Hide swipe indicator after first scroll
    const swipeIndicator = document.querySelector('.swipe-indicator');
    let scrolled = false;
    
    window.addEventListener('scroll', function() {
        if (!scrolled && window.scrollY > 100) {
            scrolled = true;
            if (swipeIndicator) {
                swipeIndicator.style.opacity = '0';
                setTimeout(() => {
                    swipeIndicator.style.display = 'none';
                }, 500);
            }
        }
    });
    
    // Enhanced touch interactions for manifesto cards
    const manifestoCards = document.querySelectorAll('.manifesto-card');
    
    manifestoCards.forEach(card => {
        let touchStartY = 0;
        let touchEndY = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            this.style.transition = 'none';
        });
        
        card.addEventListener('touchmove', function(e) {
            touchEndY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchEndY;
            
            if (touchDiff > 10) { // Swipe up
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('touchend', function() {
            this.style.transition = 'var(--transition)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Vibration on vote (if supported)
    document.querySelectorAll('.cta-button, .phone-link').forEach(button => {
        button.addEventListener('click', function() {
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
        
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Mobile parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const manifestoSection = document.querySelector('.manifesto-section');
        
        if (manifestoSection) {
            const rate = scrolled * 0.1;
            manifestoSection.style.backgroundPosition = `center ${rate}px`;
        }
    });
    
    // Mobile-optimized image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" for better mobile performance
        img.setAttribute('loading', 'lazy');
    });
    
    // Touch device detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add touch-specific classes
        document.body.classList.add('touch-device');
        
        // Adjust scroll behavior for touch
        document.documentElement.style.scrollBehavior = 'smooth';
    }
});
