// NAJANAM - JavaScript Funktionen

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileToggle && mainMenu) {
        mobileToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // ARIA-Attribute aktualisieren
            const isExpanded = mainMenu.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
            mobileToggle.setAttribute('aria-label', isExpanded ? 'Menü schließen' : 'Menü öffnen');
            
            // Body-Scroll verhindern wenn Menü offen ist
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Menü schließen beim Klick auf einen Link
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Menü öffnen');
                document.body.style.overflow = '';
            });
        });
        
        // Menü schließen bei Klick außerhalb
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !mainMenu.contains(event.target)) {
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Menü öffnen');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Move hero content up when scrolling
            heroContent.style.transform = `translateY(${rate}px)`;
        });
    }

    // Deutsche Übersetzungen laden
    loadGermanTranslations();

    // Funktion zum Laden der deutschen Übersetzungen
    function loadGermanTranslations() {
        // Sprache im HTML-Element auf Deutsch setzen
        const htmlDoc = document.getElementById('html-doc');
        if (htmlDoc) {
            htmlDoc.lang = 'de';
        }
        
        // Deutsche Übersetzungsdatei laden
        fetch('translations/de.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Deutsche Übersetzungsdatei konnte nicht geladen werden. Status: ' + response.status);
                }
                return response.json();
            })
            .then(translations => {
                // Alle Elemente mit data-i18n Attribut übersetzen
                const elements = document.querySelectorAll('[data-i18n]');
                
                elements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    
                    if (translations[key]) {
                        // Prüfen, ob es sich um ein Eingabefeld handelt
                        if (element.tagName === 'INPUT' && element.type === 'submit') {
                            element.value = translations[key];
                        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
                            element.placeholder = translations[key];
                        } else {
                            element.innerHTML = translations[key];
                        }
                    }
                });
                
                // Title übersetzen
                if (translations['page_title']) {
                    document.title = translations['page_title'];
                }
                
                // Meta-Description übersetzen
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription && translations['meta_description']) {
                    metaDescription.setAttribute('content', translations['meta_description']);
                }
            })
            .catch(error => {
                console.error('Fehler beim Laden der deutschen Übersetzungen:', error);
            });
    }

    // Kontaktformular-Validierung
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let errorMessages = {
                name_required: 'Bitte geben Sie Ihren Namen ein',
                email_invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
                message_required: 'Bitte geben Sie eine Nachricht ein',
                privacy_required: 'Bitte stimmen Sie den Datenschutzbestimmungen zu',
                form_success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'
            };
            
            // Deutsche Fehlermeldungen aus der Übersetzungsdatei laden
            fetch('translations/de.json')
                .then(response => response.json())
                .then(translations => {
                    if (translations.errors) {
                        errorMessages = {...errorMessages, ...translations.errors};
                    }
                    validateForm();
                })
                .catch(error => {
                    console.error('Fehler beim Laden der deutschen Übersetzungen:', error);
                    validateForm();
                });
            
            function validateForm() {
                // Name validieren
                const nameInput = document.getElementById('name');
                const nameError = document.getElementById('nameError');
                if (nameInput.value.trim() === '') {
                    nameError.textContent = errorMessages.name_required;
                    isValid = false;
                } else {
                    nameError.textContent = '';
                }
                
                // E-Mail validieren
                const emailInput = document.getElementById('email');
                const emailError = document.getElementById('emailError');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    emailError.textContent = errorMessages.email_invalid;
                    isValid = false;
                } else {
                    emailError.textContent = '';
                }
                
                // Nachricht validieren
                const messageInput = document.getElementById('message');
                const messageError = document.getElementById('messageError');
                if (messageInput.value.trim() === '') {
                    messageError.textContent = errorMessages.message_required;
                    isValid = false;
                } else {
                    messageError.textContent = '';
                }
                
                // Datenschutz validieren
                const privacyInput = document.getElementById('privacy');
                const privacyError = document.getElementById('privacyError');
                if (!privacyInput.checked) {
                    privacyError.textContent = errorMessages.privacy_required;
                    isValid = false;
                } else {
                    privacyError.textContent = '';
                }
                
                // Wenn das Formular gültig ist, könnte hier ein AJAX-Request erfolgen
                if (isValid) {
                    const formSuccess = document.getElementById('formSuccess');
                    formSuccess.textContent = errorMessages.form_success;
                    contactForm.reset();
                    
                    // Nach 3 Sekunden die Erfolgsmeldung ausblenden
                    setTimeout(() => {
                        formSuccess.textContent = '';
                    }, 3000);
                }
            }
        });
    }
});
