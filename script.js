// App State
const state = {
    isLoggedIn: false,
    userEmail: '',
    currentPage: 'home'
};

// Selectors
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');
const userDisplay = document.getElementById('user-display');

// Nav Selectors
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');

// Action Buttons
const downloadLaptopBtn = document.getElementById('download-laptop-btn');
const printLaptopBtn = document.getElementById('print-laptop-btn');
const downloadTradeinBtn = document.getElementById('download-tradein-btn');
const printTradeinBtn = document.getElementById('print-tradein-btn');

// Credentials
const VALID_EMAIL = 'harsh.240104@pw.live';
const VALID_PASS = 'ph@19nov';

// Initialization
function init() {
    // Check if session exists (local storage mock)
    const savedEmail = localStorage.getItem('pw_user_email');
    if (savedEmail) {
        showDashboard(savedEmail);
    }

    // Setup Navigation Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            switchPage(pageId);
        });
    });
}

// Login Handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (email === VALID_EMAIL && password === VALID_PASS) {
        errorMessage.textContent = '';
        localStorage.setItem('pw_user_email', email);
        showDashboard(email);
    } else {
        errorMessage.textContent = 'Invalid email or password. Please try again.';
        // Shake animation for error
        const card = document.querySelector('.login-card');
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
    }
});

// Logout Handler
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});

function logout() {
    localStorage.removeItem('pw_user_email');
    dashboardSection.classList.remove('active');
    loginSection.classList.add('active');
    loginForm.reset();
}

// UI Transition
function showDashboard(email) {
    userDisplay.textContent = email;
    loginSection.classList.remove('active');
    dashboardSection.classList.add('active');
    
    // Always default to home page on login
    switchPage('home');
}

// Page Navigation Logic
function switchPage(pageId) {
    state.currentPage = pageId;
    
    // Update nav links styling
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update visible pages
    pages.forEach(page => {
        if (page.id === `page-${pageId}`) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

// Print & Download Handlers
// For a generated HTML receipt, printing is the best way to "save" as PDF in a browser context
const handlePrint = () => {
    window.print();
};

if (printLaptopBtn) printLaptopBtn.addEventListener('click', handlePrint);
if (downloadLaptopBtn) downloadLaptopBtn.addEventListener('click', handlePrint);
if (printTradeinBtn) printTradeinBtn.addEventListener('click', handlePrint);
if (downloadTradeinBtn) downloadTradeinBtn.addEventListener('click', handlePrint);

// Add CSS animation for shake
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
`;
document.head.appendChild(style);

// Run Initialization
init();
