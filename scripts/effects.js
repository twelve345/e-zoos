// E-ZOOS.BIZ JavaScript Effects
// Compatible with Netscape Navigator 4.0 and Internet Explorer 5.5
// Made with love and a 28.8k modem

// Classic visitor counter (fake but authentic!)
function updateVisitorCounter() {
    var counter = document.getElementById('visitor-counter');
    if (counter) {
        // Get a "random" visitor number based on the date
        var baseNumber = 1337;
        var today = new Date();
        var dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        var visitorNumber = baseNumber + (dayOfYear * 7) + today.getHours();
        var paddedNumber = String(visitorNumber);
        while (paddedNumber.length < 8) {
            paddedNumber = '0' + paddedNumber;
        }
        counter.innerHTML = paddedNumber;
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
    window.status = statusMessages[currentMessageIndex];
    currentMessageIndex = currentMessageIndex + 1;
    if (currentMessageIndex >= statusMessages.length) {
        currentMessageIndex = 0;
    }
}

// Initialize effects when page loads
function initEffects() {
    // Update visitor counter
    updateVisitorCounter();

    // Start status message scroller (every 3 seconds)
    setInterval(scrollStatusMessage, 3000);
}

// Wait for page to load - compatible with old browsers
if (document.readyState) {
    if (document.readyState == 'complete') {
        initEffects();
    } else {
        // For browsers that support onreadystatechange
        document.onreadystatechange = function() {
            if (document.readyState == 'complete') {
                initEffects();
            }
        };
    }
} else {
    // Fallback for very old browsers
    window.onload = initEffects;
}
