import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, get, set, update } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// ===== Nature Wallpapers for Timer =====
const natureWallpapers = [
    'wallpapers/nature1.jpg',
    'wallpapers/nature2.jpg',
    'wallpapers/nature3.jpg',
    'wallpapers/nature4.jpg',
    'wallpapers/nature5.jpg',
    'wallpapers/nature6.jpg',
    'wallpapers/nature7.jpg',
    'wallpapers/nature8.jpg',
    'wallpapers/nature9.jpg',
    'wallpapers/nature10.jpg'
];

function getRandomWallpaper() {
    return natureWallpapers[Math.floor(Math.random() * natureWallpapers.length)];
}

// ===== Global Variables =====
let timerDuration = 0; // in seconds
let timeRemaining = 0;
let timerInterval = null;
let isPaused = false;
let selectedStyle = 'digital';
let userId = null;
let userPoints = 0;
let isTimerRunning = false;

// ===== Motivational Quotes =====
const motivationalQuotes = [
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
    { text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.", author: "Richard Feynman" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" }
];

// ===== Study Tips =====
const studyTips = [
    "Take a moment to review what you've learned so far.",
    "Remember to stay hydrated! A glass of water can help with focus.",
    "Stretch your arms and shoulders to release tension.",
    "You're doing great! Keep up the momentum.",
    "Try the Feynman Technique: explain what you're learning in simple terms.",
    "Take notes by hand - it helps with retention!",
    "Break complex topics into smaller chunks.",
    "Connect new information to what you already know.",
    "Almost there! The final push is often the most productive.",
    "You've got this! Focus on one thing at a time."
];

// ===== Initialize App =====
const auth = getAuth();
const database = getDatabase();

onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid;
        loadUserData();
    } else {
        // Check for PIN login
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            userId = storedUserId;
            loadUserData();
        } else {
            window.location.href = 'index.html';
        }
    }
});

// ===== Load User Data =====
async function loadUserData() {
    try {
        const loginMethod = localStorage.getItem('loginMethod');
        let userRef;
        
        if (loginMethod === 'pin') {
            userRef = ref(database, 'pinUsers/' + userId);
        } else {
            userRef = ref(database, 'users/' + userId);
        }
        
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            userPoints = userData.totalPoints || 0;
            updatePointsDisplay();
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// ===== Update Points Display =====
function updatePointsDisplay() {
    document.getElementById('userPoints').textContent = `${userPoints} pts`;
}

// ===== Logout =====
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('userId');
        localStorage.removeItem('loginMethod');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// ===== Timer Setup =====
const timerSetup = document.getElementById('timerSetup');
const timerDisplay = document.getElementById('timerDisplay');
const completionScreen = document.getElementById('completionScreen');

// Duration buttons
document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timerDuration = parseInt(btn.dataset.minutes) * 60;
        document.getElementById('customMinutes').value = '';
    });
});

// Custom duration input
document.getElementById('customMinutes').addEventListener('input', (e) => {
    document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
    const minutes = parseInt(e.target.value);
    if (minutes >= 10 && minutes <= 180) {
        timerDuration = minutes * 60;
    }
});

// Timer style selector
document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedStyle = btn.dataset.style;
    });
});

// Start timer
document.getElementById('startTimerBtn').addEventListener('click', () => {
    if (timerDuration === 0) {
        alert('Please select a duration first!');
        return;
    }
    
    timeRemaining = timerDuration;
    isTimerRunning = true;
    timerSetup.style.display = 'none';
    timerDisplay.style.display = 'block';
    
    // Set random nature wallpaper
    const wallpaper = getRandomWallpaper();
    timerDisplay.style.backgroundImage = `url('${wallpaper}')`;
    
    // Show selected timer style
    document.getElementById('digitalTimer').style.display = selectedStyle === 'digital' ? 'block' : 'none';
    document.getElementById('analogTimer').style.display = selectedStyle === 'analog' ? 'block' : 'none';
    document.getElementById('progressTimer').style.display = selectedStyle === 'progress' ? 'block' : 'none';
    
    startTimer();
});

// ===== Timer Functions =====
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            
            // Check for study tips
            const halfTime = Math.floor(timerDuration / 2);
            if (timeRemaining === halfTime || timeRemaining === 300) { // 300 = 5 minutes
                showStudyTip();
            }
            
            if (timeRemaining <= 0) {
                completeSession();
            } else {
                updateTimerDisplay();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    // Digital timer
    if (selectedStyle === 'digital') {
        document.getElementById('minutesDisplay').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('secondsDisplay').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Analog timer
    if (selectedStyle === 'analog') {
        const totalSeconds = timerDuration;
        const elapsedSeconds = totalSeconds - timeRemaining;
        const minuteAngle = (elapsedSeconds / totalSeconds) * 360;
        const secondAngle = (seconds / 60) * 360;
        
        document.getElementById('minuteHand').style.transform = `rotate(${minuteAngle}deg)`;
        document.getElementById('secondHand').style.transform = `rotate(${secondAngle}deg)`;
    }
    
    // Progress timer
    if (selectedStyle === 'progress') {
        document.getElementById('progressMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('progressSeconds').textContent = seconds.toString().padStart(2, '0');
        
        const percentage = (timeRemaining / timerDuration) * 100;
        const circumference = 2 * Math.PI * 80; // radius = 80
        const offset = circumference - (percentage / 100) * circumference;
        
        document.getElementById('progressCircle').style.strokeDashoffset = offset;
        document.getElementById('progressPercentage').textContent = `${Math.round(percentage)}%`;
    }
}

// Pause/Resume
document.getElementById('pauseBtn').addEventListener('click', () => {
    isPaused = !isPaused;
    document.getElementById('pauseBtn').textContent = isPaused ? 'Resume' : 'Pause';
});

// Reset
document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset? Your progress will be lost.')) {
        resetTimer();
    }
});

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = false;
    timerDisplay.style.display = 'none';
    timerSetup.style.display = 'block';
    document.getElementById('pauseBtn').textContent = 'Pause';
}

// ===== Tab Visibility Detection =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isTimerRunning && !isPaused) {
        // User switched tabs or minimized browser
        alert('You switched tabs! Timer has been reset. Stay focused to earn points!');
        resetTimer();
    }
});

// Window close/beforeunload
window.addEventListener('beforeunload', (e) => {
    if (isTimerRunning) {
        e.preventDefault();
        e.returnValue = 'Your timer is running. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// ===== Complete Session =====
async function completeSession() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    
    // Calculate points
    const minutes = timerDuration / 60;
    const earnedPoints = calculatePoints(minutes);
    userPoints += earnedPoints;
    
    // Save to database
    try {
        const loginMethod = localStorage.getItem('loginMethod');
        let userRef;
        
        if (loginMethod === 'pin') {
            userRef = ref(database, 'pinUsers/' + userId);
        } else {
            userRef = ref(database, 'users/' + userId);
        }
        
        const snapshot = await get(userRef);
        const currentData = snapshot.val() || {};
        
        await update(userRef, {
            totalPoints: userPoints,
            sessionsCompleted: (currentData.sessionsCompleted || 0) + 1,
            lastSessionDate: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error saving points:', error);
    }
    
    // Show completion screen
    timerDisplay.style.display = 'none';
    completionScreen.style.display = 'block';
    
    document.getElementById('earnedPoints').textContent = earnedPoints;
    
    // Random motivational quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('quoteText').textContent = `"${randomQuote.text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${randomQuote.author}`;
    
    updatePointsDisplay();
}

// ===== Calculate Points =====
function calculatePoints(minutes) {
    // Points formula based on requirements
    const pointsMap = {
        10: 5, 15: 8, 20: 10, 25: 13, 30: 15, 35: 18, 40: 20, 45: 23,
        50: 25, 55: 28, 60: 30, 70: 35, 80: 40, 90: 45, 100: 50,
        110: 55, 120: 60, 130: 65, 140: 70, 150: 75, 160: 80, 170: 85, 180: 100
    };
    
    // Round to nearest 5 minutes for lookup
    const roundedMinutes = Math.round(minutes / 5) * 5;
    return pointsMap[roundedMinutes] || Math.round(minutes * 0.5);
}

// ===== Study Tips =====
function showStudyTip() {
    const studyTip = document.getElementById('studyTip');
    const tipText = document.getElementById('tipText');
    
    const randomTip = studyTips[Math.floor(Math.random() * studyTips.length)];
    tipText.textContent = randomTip;
    
    studyTip.style.display = 'block';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        studyTip.style.display = 'none';
    }, 10000);
}

// Close tip manually
document.querySelector('.tip-close').addEventListener('click', () => {
    document.getElementById('studyTip').style.display = 'none';
});

// ===== New Session =====
document.getElementById('newSessionBtn').addEventListener('click', () => {
    completionScreen.style.display = 'none';
    timerSetup.style.display = 'block';
});

// ===== AI Chatbot =====
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessageToChat('user', message);
    chatInput.value = '';
    
    // Show loading
    addMessageToChat('bot', 'Thinking...');
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful study assistant. The user is studying and needs help. Please provide a clear, concise answer to: ${message}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            })
        });
        
        const data = await response.json();
        
        // Remove loading message
        chatMessages.removeChild(chatMessages.lastChild);
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            addMessageToChat('bot', data.candidates[0].content.parts[0].text);
        } else {
            addMessageToChat('bot', 'Sorry, I couldn\'t process that. Please try again.');
        }
    } catch (error) {
        console.error('Chatbot error:', error);
        // Remove loading message
        chatMessages.removeChild(chatMessages.lastChild);
        addMessageToChat('bot', 'Sorry, I encountered an error. Please check your API key and try again.');
    }
}

function addMessageToChat(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});
