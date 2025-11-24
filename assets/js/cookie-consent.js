// Cookie Consent Popup
// Compliant with GDPR (EU law)

document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    if (!getCookie('cookie_consent')) {
        showCookieConsent();
    }
});

function showCookieConsent() {
    // Create cookie consent banner
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <div class="cookie-consent-content">
            <p>
                🍪 This website uses cookies to enhance your browsing experience and analyze site traffic.
                By clicking "Accept", you consent to our use of cookies.
                <a href="privacy.html">Learn more</a>
            </p>
            <div class="cookie-consent-buttons">
                <button id="cookie-accept" class="btn-accept">Accept</button>
                <button id="cookie-decline" class="btn-decline">Decline</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookie-accept').addEventListener('click', acceptCookies);
    document.getElementById('cookie-decline').addEventListener('click', declineCookies);
}

function acceptCookies() {
    setCookie('cookie_consent', 'accepted', 365);
    hideCookieBanner();

    // Initialize Google Analytics if accepted
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

function declineCookies() {
    setCookie('cookie_consent', 'declined', 365);
    hideCookieBanner();

    // Disable Google Analytics if declined
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
        banner.style.animation = 'slideDown 0.4s ease-out forwards';
        setTimeout(() => banner.remove(), 400);
    }
}

// Cookie utility functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
