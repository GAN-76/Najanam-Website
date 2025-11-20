// NAJANAM - Cookie Consent Banner
// DSGVO-konform mit hoher Akzeptanzrate

(function() {
    'use strict';
    
    const COOKIE_NAME = 'najanam_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
    
    // Cookie-Funktionen
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Google Analytics aktivieren/deaktivieren
    function enableAnalytics() {
        window['ga-disable-G-H7XV8W0R1B'] = false;
        
        // GA4 laden wenn noch nicht geladen
        if (typeof gtag === 'undefined') {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-H7XV8W0R1B';
            document.head.appendChild(script);
            
            script.onload = function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-H7XV8W0R1B', {
                    'anonymize_ip': true,
                    'cookie_flags': 'SameSite=Lax;Secure'
                });
            };
        }
    }
    
    function disableAnalytics() {
        window['ga-disable-G-H7XV8W0R1B'] = true;
    }
    
    // Cookie-Banner erstellen
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie-Einwilligung');
        banner.setAttribute('aria-live', 'polite');
        
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <p><strong>🍪 Wir verwenden Cookies</strong></p>
                    <p>Wir verwenden Cookies, um unsere Website für Sie zu optimieren und anonyme Statistiken zu sammeln. 
                    Mit einem Klick auf „Alle akzeptieren" stimmen Sie der Nutzung zu. 
                    Ihre Auswahl können Sie jederzeit ändern.</p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary" aria-label="Alle Cookies akzeptieren">
                        Alle akzeptieren
                    </button>
                    <button id="cookie-accept-necessary" class="cookie-btn cookie-btn-secondary" aria-label="Nur notwendige Cookies">
                        Nur notwendige
                    </button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn-link" aria-label="Cookie-Einstellungen anzeigen">
                        Einstellungen
                    </button>
                </div>
            </div>
            
            <div class="cookie-settings-panel" id="cookie-settings-panel" style="display: none;">
                <h3>Cookie-Einstellungen</h3>
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <label>
                            <input type="checkbox" checked disabled>
                            <strong>Notwendige Cookies</strong>
                        </label>
                    </div>
                    <p class="cookie-category-description">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                    </p>
                </div>
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <label>
                            <input type="checkbox" id="analytics-toggle">
                            <strong>Analyse-Cookies (Google Analytics)</strong>
                        </label>
                    </div>
                    <p class="cookie-category-description">
                        Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                        indem Informationen anonym gesammelt und gemeldet werden. Alle Daten werden anonymisiert.
                    </p>
                </div>
                <div class="cookie-settings-actions">
                    <button id="cookie-save-settings" class="cookie-btn cookie-btn-primary">
                        Auswahl speichern
                    </button>
                    <button id="cookie-settings-back" class="cookie-btn cookie-btn-secondary">
                        Zurück
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Event Listeners
        document.getElementById('cookie-accept-all').addEventListener('click', function() {
            acceptAllCookies();
        });
        
        document.getElementById('cookie-accept-necessary').addEventListener('click', function() {
            acceptNecessaryCookies();
        });
        
        document.getElementById('cookie-settings').addEventListener('click', function() {
            showSettings();
        });
        
        document.getElementById('cookie-settings-back').addEventListener('click', function() {
            hideSettings();
        });
        
        document.getElementById('cookie-save-settings').addEventListener('click', function() {
            saveSettings();
        });
        
        // Banner anzeigen mit Animation
        setTimeout(function() {
            banner.classList.add('show');
        }, 500);
    }
    
    function acceptAllCookies() {
        setCookie(COOKIE_NAME, 'all', COOKIE_EXPIRY_DAYS);
        enableAnalytics();
        hideBanner();
    }
    
    function acceptNecessaryCookies() {
        setCookie(COOKIE_NAME, 'necessary', COOKIE_EXPIRY_DAYS);
        disableAnalytics();
        hideBanner();
    }
    
    function showSettings() {
        document.querySelector('.cookie-banner-content').style.display = 'none';
        document.getElementById('cookie-settings-panel').style.display = 'block';
        
        // Aktuellen Status setzen
        const consent = getCookie(COOKIE_NAME);
        document.getElementById('analytics-toggle').checked = (consent === 'all');
    }
    
    function hideSettings() {
        document.querySelector('.cookie-banner-content').style.display = 'flex';
        document.getElementById('cookie-settings-panel').style.display = 'none';
    }
    
    function saveSettings() {
        const analyticsEnabled = document.getElementById('analytics-toggle').checked;
        
        if (analyticsEnabled) {
            setCookie(COOKIE_NAME, 'all', COOKIE_EXPIRY_DAYS);
            enableAnalytics();
        } else {
            setCookie(COOKIE_NAME, 'necessary', COOKIE_EXPIRY_DAYS);
            disableAnalytics();
        }
        
        hideBanner();
    }
    
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(function() {
                banner.remove();
            }, 300);
        }
    }
    
    // Cookie-Einstellungen im Footer öffnen
    function addFooterLink() {
        // Link zu Cookie-Einstellungen im Footer hinzufügen
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom && !document.getElementById('cookie-settings-link')) {
            const separator = document.createTextNode(' | ');
            const link = document.createElement('a');
            link.href = '#';
            link.id = 'cookie-settings-link';
            link.textContent = 'Cookie-Einstellungen';
            link.addEventListener('click', function(e) {
                e.preventDefault();
                reopenBanner();
            });
            
            footerBottom.appendChild(separator);
            footerBottom.appendChild(link);
        }
    }
    
    function reopenBanner() {
        // Entferne alten Banner falls vorhanden
        const oldBanner = document.getElementById('cookie-consent-banner');
        if (oldBanner) {
            oldBanner.remove();
        }
        
        // Erstelle neuen Banner
        createCookieBanner();
    }
    
    // Initialisierung
    function init() {
        const consent = getCookie(COOKIE_NAME);
        
        if (!consent) {
            // Kein Cookie gesetzt - Banner anzeigen
            createCookieBanner();
            disableAnalytics(); // Standardmässig deaktiviert
        } else if (consent === 'all') {
            // Alle Cookies akzeptiert
            enableAnalytics();
        } else {
            // Nur notwendige Cookies
            disableAnalytics();
        }
        
        // Footer-Link hinzufügen
        addFooterLink();
    }
    
    // Warten bis DOM geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
