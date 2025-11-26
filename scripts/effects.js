// E-ZOOS.BIZ JavaScript Effects
// Made with love and a 28.8k modem

// Classic visitor counter (fake but authentic!)
function updateVisitorCounter() {
    var counter = document.querySelector('.visitor-counter');
    if (counter) {
        // Get a "random" visitor number based on the date
        var baseNumber = 1337;
        var today = new Date();
        var dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        var visitorNumber = baseNumber + (dayOfYear * 7) + today.getHours();
        counter.textContent = String(visitorNumber).padStart(8, '0');
    }
}

// Status bar message scroller (classic 90s effect!)
var statusMessages = [
    "Welcome to E-ZOOS.BIZ!",
    "The Internet's #1 Virtual Zoo!",
    "Press Ctrl+D to bookmark us!",
    "Sign our guestbook!",
    "Over 1,000,000 visitors served!",
    "Now featuring CHINCHILLAS!",
    "Y2K Compliant!"
];

var currentMessageIndex = 0;
function scrollStatusMessage() {
    if (window.status !== undefined) {
        window.status = statusMessages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % statusMessages.length;
    }
}

// Cursor sparkle trail effect (very 90s!)
var sparkles = [];
var sparkleColors = ['#FFD700', '#FF69B4', '#00FFFF', '#FF0000', '#00FF00'];

function createSparkle(x, y) {
    var sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.opacity = '1';
    document.body.appendChild(sparkle);

    sparkles.push({
        element: sparkle,
        life: 1
    });
}

function updateSparkles() {
    for (var i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].life -= 0.05;
        sparkles[i].element.style.opacity = sparkles[i].life;

        if (sparkles[i].life <= 0) {
            sparkles[i].element.remove();
            sparkles.splice(i, 1);
        }
    }
}

// Mouse trail handler
var lastSparkleTime = 0;
function handleMouseMove(e) {
    var now = Date.now();
    if (now - lastSparkleTime > 50) { // Limit sparkle creation rate
        createSparkle(e.clientX, e.clientY);
        lastSparkleTime = now;
    }
}

// Classic alert on right-click (very authentic!)
function handleRightClick(e) {
    alert('Hey! No stealing our animal pictures! :-)');
    e.preventDefault();
    return false;
}

// Initialize all effects
function initEffects() {
    // Update visitor counter
    updateVisitorCounter();

    // Start status message scroller
    setInterval(scrollStatusMessage, 3000);

    // Start sparkle animation loop
    setInterval(updateSparkles, 50);

    // Enable cursor sparkles (comment out if too annoying)
    // document.addEventListener('mousemove', handleMouseMove);

    // Enable right-click protection (very 90s!)
    // document.addEventListener('contextmenu', handleRightClick);

    console.log('E-ZOOS.BIZ loaded successfully!');
    console.log('Best viewed in Netscape Navigator 4.0');
}

// Wait for page to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEffects);
} else {
    initEffects();
}

// Easter egg: Konami code!
var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('KONAMI CODE ACTIVATED! You found the secret! Mr. Whiskers would be proud.');
            document.body.style.transform = 'rotate(180deg)';
            setTimeout(function() {
                document.body.style.transform = '';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
