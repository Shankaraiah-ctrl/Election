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