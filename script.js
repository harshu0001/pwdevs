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
const downloadPayslipBtn = document.getElementById('download-payslip-btn');
const printPayslipBtn = document.getElementById('print-payslip-btn');

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
if (printPayslipBtn) printPayslipBtn.addEventListener('click', handlePrint);
if (downloadPayslipBtn) downloadPayslipBtn.addEventListener('click', handlePrint);

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

// Payslip Auth
const payslipAuthForm = document.getElementById('payslip-auth-form');
const payslipPwIdInput = document.getElementById('payslip-pw-id');
const payslipPasswordInput = document.getElementById('payslip-password');
const payslipErrorMsg = document.getElementById('payslip-error-message');
const payslipAuthContainer = document.getElementById('payslip-auth-container');
const payslipContentContainer = document.getElementById('payslip-content-container');

if (payslipAuthForm) {
    payslipAuthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pwId = payslipPwIdInput.value.trim();
        const pwd = payslipPasswordInput.value.trim();
        
        if (pwId === 'Lx240104' && pwd === 'ph@19nov') {
            payslipErrorMsg.textContent = '';
            payslipAuthContainer.style.display = 'none';
            payslipContentContainer.style.display = 'flex'; // It matches .certificate-container display style
            
            // Render lucide icons again for the revealed content
            if (window.lucide) {
                window.lucide.createIcons();
            }
        } else {
            payslipErrorMsg.textContent = 'Invalid PW ID or Password. Please try again.';
            const card = payslipAuthContainer.querySelector('.login-card');
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        }
    });
}

// Database Cards Access Denied
const dbCards = document.querySelectorAll('.db-card');
dbCards.forEach(card => {
    card.addEventListener('click', () => {
        alert('Access Denied: You do not have the required permissions to view this database.');
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
    });
});

// JSON Cards Access Denied except Platform
const jsonCards = document.querySelectorAll('.json-card');
jsonCards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.id === 'json-platform') {
            window.open('platform_students.json', '_blank');
        } else {
            alert('Access Denied: You do not have the required permissions to view this JSON file.');
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        }
    });
});

/* ═══════════════════════════════════════════════════════
   ATTENDANCE MODULE
═══════════════════════════════════════════════════════ */
(function AttendanceModule() {
    const MAX_ATTEMPTS = 10;
    const TARGET_NAME  = 'harsh pratap singh';   // lowercased for comparison

    // DOM refs
    const markBtn        = document.getElementById('mark-attendance-btn');
    const overlay        = document.getElementById('attendance-modal');
    const closeBtn       = document.getElementById('att-close-btn');
    const doneBtn        = document.getElementById('att-done-btn');

    // QR Panel
    const qrPanel        = document.getElementById('att-qr-panel');
    const video          = document.getElementById('att-video');
    const canvas         = document.getElementById('att-canvas');
    const cameraStatus   = document.getElementById('att-camera-status');
    const statusMsg      = document.getElementById('att-status-msg');
    const dotsWrap       = document.getElementById('att-dots');
    const attemptsNum    = document.getElementById('att-attempts-num');
    const retryBtn       = document.getElementById('att-retry-btn');
    const manualLink     = document.getElementById('att-manual-link');

    // Success Panel
    const successPanel   = document.getElementById('att-success-panel');
    const successTime    = document.getElementById('att-success-time');

    // Manual Panel
    const manualPanel    = document.getElementById('att-manual-panel');
    const manualNotice   = document.getElementById('att-manual-notice-text');
    const manualForm     = document.getElementById('att-manual-form');
    const manualError    = document.getElementById('att-manual-error');
    const backBtn        = document.getElementById('att-back-btn');

    // Internal state
    let stream          = null;
    let scanRAF         = null;
    let attemptsLeft    = MAX_ATTEMPTS;
    let scanning        = false;
    let cooldown        = false;    // brief pause between scan attempts

    /* ─── Dots init ─── */
    function buildDots() {
        dotsWrap.innerHTML = '';
        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            const dot = document.createElement('span');
            dot.className = 'att-dot';
            dotsWrap.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsWrap.querySelectorAll('.att-dot');
        const used = MAX_ATTEMPTS - attemptsLeft;
        dots.forEach((dot, i) => {
            dot.classList.remove('used', 'last-three');
            if (i < used) {
                dot.classList.add('used');
            } else if (attemptsLeft <= 3) {
                dot.classList.add('last-three');
            }
        });

        attemptsNum.textContent = attemptsLeft;
        attemptsNum.classList.remove('warning', 'danger');
        if (attemptsLeft <= 3)      attemptsNum.classList.add('danger');
        else if (attemptsLeft <= 5) attemptsNum.classList.add('warning');
    }

    /* ─── Camera ─── */
    async function startCamera() {
        cameraStatus.classList.remove('hidden');
        cameraStatus.querySelector('span').textContent = 'Starting camera…';

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 1280 } }
            });
            video.srcObject = stream;
            await video.play();
            cameraStatus.classList.add('hidden');
            setStatus('Scanning… hold your QR code steady inside the frame.', 'scanning');
            startScanning();
        } catch (err) {
            cameraStatus.querySelector('span').textContent = 'Camera access denied. Please allow camera permission.';
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
            stream = null;
        }
        if (scanRAF) {
            cancelAnimationFrame(scanRAF);
            scanRAF = null;
        }
        scanning = false;
    }

    /* ─── QR Scanning loop ─── */
    function startScanning() {
        scanning = true;
        tick();
    }

    function tick() {
        if (!scanning) return;

        if (video.readyState === video.HAVE_ENOUGH_DATA && !cooldown) {
            canvas.width  = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert'
            });

            if (code) {
                handleQRResult(code.data);
                return; // stop loop — will restart or end depending on result
            }
        }

        scanRAF = requestAnimationFrame(tick);
    }

    /* ─── QR Result Handler ─── */
    function handleQRResult(data) {
        cooldown = true;

        if (data.toLowerCase().includes(TARGET_NAME)) {
            // ✅ SUCCESS
            stopCamera();
            showSuccess();
        } else {
            // ❌ WRONG QR
            attemptsLeft--;
            updateDots();

            if (attemptsLeft <= 0) {
                // Out of attempts → switch to manual
                stopCamera();
                scanning = false;
                setStatus('', '');
                showManualPanel(true);
            } else {
                setStatus(`QR not recognized — "${data.substring(0, 40)}${data.length > 40 ? '…' : ''}". Please try again. (${attemptsLeft} left)`, 'error');
                retryBtn.style.display = 'flex';

                // Resume scanning after 2s cooldown
                setTimeout(() => {
                    cooldown = false;
                    retryBtn.style.display = 'none';
                    setStatus('Scanning… hold your QR code steady inside the frame.', 'scanning');
                    scanRAF = requestAnimationFrame(tick);
                }, 2000);
            }
        }
    }

    /* ─── Status helper ─── */
    function setStatus(msg, type) {
        statusMsg.textContent = msg;
        statusMsg.className   = 'att-status-msg' + (type ? ` ${type}` : '');
    }

    /* ─── Show / Hide panels ─── */
    function showSuccess() {
        qrPanel.style.display     = 'none';
        manualPanel.style.display = 'none';
        successPanel.style.display = 'block';

        const now = new Date();
        successTime.textContent = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
            + ' · ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        lucide.createIcons();
    }

    function showManualPanel(exhausted) {
        qrPanel.style.display     = 'none';
        successPanel.style.display = 'none';
        manualPanel.style.display = 'block';

        if (exhausted) {
            manualNotice.textContent = 'QR scan failed after 10 attempts. Please enter your credentials to mark attendance.';
        } else {
            manualNotice.textContent = 'Enter your credentials to mark attendance manually.';
        }

        backBtn.style.display = exhausted ? 'none' : 'flex';
        lucide.createIcons();
    }

    function showQRPanel() {
        manualPanel.style.display  = 'none';
        successPanel.style.display = 'none';
        qrPanel.style.display      = 'block';
    }

    /* ─── Open / Close Modal ─── */
    function openModal() {
        attemptsLeft = MAX_ATTEMPTS;
        cooldown     = false;
        manualError.textContent = '';
        manualForm.reset();
        retryBtn.style.display = 'none';

        showQRPanel();
        buildDots();
        updateDots();
        setStatus('', '');
        cameraStatus.classList.remove('hidden');
        cameraStatus.querySelector('span').textContent = 'Starting camera…';

        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        lucide.createIcons();

        startCamera();
    }

    function closeModal() {
        stopCamera();
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
    }

    /* ─── Event Wiring ─── */
    if (markBtn) markBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);
    doneBtn.addEventListener('click', closeModal);

    // Click outside modal closes it
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Retry: just resume (cooldown already clears, but user can click early)
    retryBtn.addEventListener('click', () => {
        if (attemptsLeft > 0 && scanning) {
            cooldown = false;
            retryBtn.style.display = 'none';
            setStatus('Scanning… hold your QR code steady inside the frame.', 'scanning');
            scanRAF = requestAnimationFrame(tick);
        }
    });

    // "Enter manually" from QR panel
    manualLink.addEventListener('click', () => {
        stopCamera();
        showManualPanel(false);
    });

    // Back to QR scan (only shown when not exhausted)
    backBtn.addEventListener('click', () => {
        attemptsLeft = MAX_ATTEMPTS;
        cooldown     = false;
        buildDots();
        updateDots();
        setStatus('', '');
        showQRPanel();
        startCamera();
    });

    // Manual form submission
    manualForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email    = document.getElementById('att-email').value.trim();
        const password = document.getElementById('att-password').value.trim();

        if (email === VALID_EMAIL && password === VALID_PASS) {
            manualError.textContent = '';
            showSuccess();
        } else {
            manualError.textContent = 'Invalid credentials. Please try again.';
            const form = manualForm;
            form.style.animation = 'none';
            form.offsetHeight;
            form.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        }
    });

    // Keyboard escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });

})();

