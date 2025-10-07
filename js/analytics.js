// Google Analytics 4 (GA4) Configuration für NAJANAM
// Ersetzen Sie 'G-XXXXXXXXXX' mit Ihrer echten Measurement ID

// Google Analytics initialisieren
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// GA4 Konfiguration mit erweiterten Tracking-Optionen
gtag('config', 'G-H7XV8W0R1B', {
    'send_page_view': true,
    'cookie_flags': 'SameSite=None;Secure',
    'anonymize_ip': true  // DSGVO-konform: IP-Anonymisierung
});

// Event-Tracking für wichtige Aktionen

// 1. Telefon-Klicks tracken
document.addEventListener('DOMContentLoaded', function() {
    // Alle Telefon-Links tracken
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'phone_call', {
                'event_category': 'Contact',
                'event_label': 'Phone Click',
                'value': this.getAttribute('href')
            });
        });
    });

    // 2. WhatsApp-Klicks tracken
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp Click'
            });
        });
    });

    // 3. Email-Klicks tracken
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'email_click', {
                'event_category': 'Contact',
                'event_label': 'Email Click',
                'value': this.getAttribute('href')
            });
        });
    });

    // 4. Social Media Klicks tracken
    const socialLinks = document.querySelectorAll('.social-icon, a[href*="instagram"], a[href*="facebook"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('instagram') ? 'Instagram' : 
                           this.href.includes('facebook') ? 'Facebook' : 'Social';
            gtag('event', 'social_click', {
                'event_category': 'Social Media',
                'event_label': platform
            });
        });
    });

    // 5. Navigation-Klicks tracken
    const navLinks = document.querySelectorAll('nav a, .main-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'navigation_click', {
                'event_category': 'Navigation',
                'event_label': this.textContent.trim()
            });
        });
    });

    // 6. CTA-Button Klicks tracken
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            gtag('event', 'cta_click', {
                'event_category': 'CTA',
                'event_label': this.textContent.trim()
            });
        });
    });

    // 7. Galerie-Bilder Klicks tracken
    const galleryItems = document.querySelectorAll('.gallery-item, .product-card');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            gtag('event', 'gallery_view', {
                'event_category': 'Gallery',
                'event_label': 'Image Click'
            });
        });
    });

    // 8. Scroll-Tiefe tracken (25%, 50%, 75%, 100%)
    let scrollTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent >= 25 && !scrollTracked['25']) {
            scrollTracked['25'] = true;
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '25%'
            });
        }
        if (scrollPercent >= 50 && !scrollTracked['50']) {
            scrollTracked['50'] = true;
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '50%'
            });
        }
        if (scrollPercent >= 75 && !scrollTracked['75']) {
            scrollTracked['75'] = true;
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '75%'
            });
        }
        if (scrollPercent >= 100 && !scrollTracked['100']) {
            scrollTracked['100'] = true;
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': '100%'
            });
        }
    });

    // 9. Zeit auf Seite tracken (nach 30 Sekunden)
    setTimeout(function() {
        gtag('event', 'time_on_page', {
            'event_category': 'Engagement',
            'event_label': '30_seconds'
        });
    }, 30000);

    // 10. Externe Links tracken
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="najanam.ch"])');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'outbound_link', {
                'event_category': 'Outbound',
                'event_label': this.href
            });
        });
    });
});

// Conversion-Events für Google Ads (später aktivieren)
function trackConversion(conversionType) {
    gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Später ersetzen
        'event_category': 'Conversion',
        'event_label': conversionType
    });
}

// E-Commerce Tracking (für zukünftigen Online-Shop)
function trackPurchase(transactionId, value, currency = 'CHF') {
    gtag('event', 'purchase', {
        'transaction_id': transactionId,
        'value': value,
        'currency': currency
    });
}

// Formular-Tracking (falls Kontaktformular hinzugefügt wird)
function trackFormSubmit(formName) {
    gtag('event', 'form_submit', {
        'event_category': 'Form',
        'event_label': formName
    });
}
