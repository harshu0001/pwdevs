// App State
const state = {
    isLoggedIn: false,
    userEmail: '',
    certificateFile: 'laptop_receipt.jpg' // We'll check if this exists
};

// Selectors
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');
const userDisplay = document.getElementById('user-display');
const certificateView = document.getElementById('certificate-view');
const downloadBtn = document.getElementById('download-btn');
const printBtn = document.getElementById('print-btn');

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
logoutBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    logout();
});

logoutBtn.onclick = logout;

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
    
    // Load certificate content
    loadCertificate();
}

function loadCertificate() {
    // The receipt is now hardcoded in HTML for this demo
    // We can add logic here if we want to fetch real data
}

// Actions
downloadBtn.onclick = () => {
    // For a generated HTML receipt, printing is the best way to "save" as PDF
    window.print();
};

printBtn.onclick = () => {
    window.print();
};

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

init();
