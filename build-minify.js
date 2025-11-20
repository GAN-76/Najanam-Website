// Build-Script für CSS/JS Minifizierung
const fs = require('fs');
const path = require('path');

console.log('🚀 Starte Minifizierung...\n');

// CSS Minifizierung (manuell - einfache Version)
function minifyCSS(css) {
    return css
        // Kommentare entfernen
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Mehrfache Leerzeichen entfernen
        .replace(/\s+/g, ' ')
        // Leerzeichen um Sonderzeichen entfernen
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Leerzeichen vor { entfernen
        .replace(/\s*{\s*/g, '{')
        // Leerzeichen nach } entfernen
        .replace(/}\s*/g, '}')
        // Leerzeichen um : entfernen
        .replace(/\s*:\s*/g, ':')
        // Leerzeichen um ; entfernen
        .replace(/\s*;\s*/g, ';')
        // Letzte Semikolons vor } entfernen
        .replace(/;}/g, '}')
        // Trim
        .trim();
}

// JavaScript Minifizierung (einfache Version)
function minifyJS(js) {
    return js
        // Kommentare entfernen (// und /* */)
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Mehrfache Leerzeichen zu einem
        .replace(/\s+/g, ' ')
        // Leerzeichen um Operatoren
        .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
        // Trim
        .trim();
}

try {
    // CSS minifizieren
    console.log('📦 Minifiziere CSS...');
    const cssPath = path.join(__dirname, 'css', 'style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const minifiedCSS = minifyCSS(cssContent);
    const cssMinPath = path.join(__dirname, 'css', 'style.min.css');
    fs.writeFileSync(cssMinPath, minifiedCSS);
    
    const cssOriginalSize = (cssContent.length / 1024).toFixed(2);
    const cssMinifiedSize = (minifiedCSS.length / 1024).toFixed(2);
    const cssSavings = ((1 - minifiedCSS.length / cssContent.length) * 100).toFixed(1);
    
    console.log(`   ✅ style.css: ${cssOriginalSize} KB → ${cssMinifiedSize} KB (${cssSavings}% kleiner)`);
    
    // Cookie Consent CSS minifizieren
    const cookieCSSPath = path.join(__dirname, 'css', 'cookie-consent.css');
    if (fs.existsSync(cookieCSSPath)) {
        const cookieCSSContent = fs.readFileSync(cookieCSSPath, 'utf8');
        const minifiedCookieCSS = minifyCSS(cookieCSSContent);
        const cookieCSSMinPath = path.join(__dirname, 'css', 'cookie-consent.min.css');
        fs.writeFileSync(cookieCSSMinPath, minifiedCookieCSS);
        
        const cookieCSSOriginalSize = (cookieCSSContent.length / 1024).toFixed(2);
        const cookieCSSMinifiedSize = (minifiedCookieCSS.length / 1024).toFixed(2);
        const cookieCSSSavings = ((1 - minifiedCookieCSS.length / cookieCSSContent.length) * 100).toFixed(1);
        
        console.log(`   ✅ cookie-consent.css: ${cookieCSSOriginalSize} KB → ${cookieCSSMinifiedSize} KB (${cookieCSSSavings}% kleiner)`);
    }
    
    // JavaScript minifizieren
    console.log('\n📦 Minifiziere JavaScript...');
    const jsPath = path.join(__dirname, 'js', 'main.js');
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    const minifiedJS = minifyJS(jsContent);
    const jsMinPath = path.join(__dirname, 'js', 'main.min.js');
    fs.writeFileSync(jsMinPath, minifiedJS);
    
    const jsOriginalSize = (jsContent.length / 1024).toFixed(2);
    const jsMinifiedSize = (minifiedJS.length / 1024).toFixed(2);
    const jsSavings = ((1 - minifiedJS.length / jsContent.length) * 100).toFixed(1);
    
    console.log(`   ✅ main.js: ${jsOriginalSize} KB → ${jsMinifiedSize} KB (${jsSavings}% kleiner)`);
    
    // Cookie Consent JS minifizieren
    const cookieJSPath = path.join(__dirname, 'js', 'cookie-consent.js');
    if (fs.existsSync(cookieJSPath)) {
        const cookieJSContent = fs.readFileSync(cookieJSPath, 'utf8');
        const minifiedCookieJS = minifyJS(cookieJSContent);
        const cookieJSMinPath = path.join(__dirname, 'js', 'cookie-consent.min.js');
        fs.writeFileSync(cookieJSMinPath, minifiedCookieJS);
        
        const cookieJSOriginalSize = (cookieJSContent.length / 1024).toFixed(2);
        const cookieJSMinifiedSize = (minifiedCookieJS.length / 1024).toFixed(2);
        const cookieJSSavings = ((1 - minifiedCookieJS.length / cookieJSContent.length) * 100).toFixed(1);
        
        console.log(`   ✅ cookie-consent.js: ${cookieJSOriginalSize} KB → ${cookieJSMinifiedSize} KB (${cookieJSSavings}% kleiner)`);
    }
    
    // Analytics JS minifizieren
    const analyticsJSPath = path.join(__dirname, 'js', 'analytics.js');
    if (fs.existsSync(analyticsJSPath)) {
        const analyticsJSContent = fs.readFileSync(analyticsJSPath, 'utf8');
        const minifiedAnalyticsJS = minifyJS(analyticsJSContent);
        const analyticsJSMinPath = path.join(__dirname, 'js', 'analytics.min.js');
        fs.writeFileSync(analyticsJSMinPath, minifiedAnalyticsJS);
        
        const analyticsJSOriginalSize = (analyticsJSContent.length / 1024).toFixed(2);
        const analyticsJSMinifiedSize = (minifiedAnalyticsJS.length / 1024).toFixed(2);
        const analyticsJSSavings = ((1 - minifiedAnalyticsJS.length / analyticsJSContent.length) * 100).toFixed(1);
        
        console.log(`   ✅ analytics.js: ${analyticsJSOriginalSize} KB → ${analyticsJSMinifiedSize} KB (${analyticsJSSavings}% kleiner)`);
    }
    
    // Map JS minifizieren
    const mapJSPath = path.join(__dirname, 'js', 'map.js');
    if (fs.existsSync(mapJSPath)) {
        const mapJSContent = fs.readFileSync(mapJSPath, 'utf8');
        const minifiedMapJS = minifyJS(mapJSContent);
        const mapJSMinPath = path.join(__dirname, 'js', 'map.min.js');
        fs.writeFileSync(mapJSMinPath, minifiedMapJS);
        
        const mapJSOriginalSize = (mapJSContent.length / 1024).toFixed(2);
        const mapJSMinifiedSize = (minifiedMapJS.length / 1024).toFixed(2);
        const mapJSSavings = ((1 - minifiedMapJS.length / mapJSContent.length) * 100).toFixed(1);
        
        console.log(`   ✅ map.js: ${mapJSOriginalSize} KB → ${mapJSMinifiedSize} KB (${mapJSSavings}% kleiner)`);
    }
    
    console.log('\n✨ Minifizierung erfolgreich abgeschlossen!\n');
    console.log('📝 Nächste Schritte:');
    console.log('   1. Ersetzen Sie in Ihren HTML-Dateien:');
    console.log('      css/style.css → css/style.min.css');
    console.log('      js/main.js → js/main.min.js');
    console.log('   2. Testen Sie die Webseite');
    console.log('   3. Deployen Sie die minifizierten Dateien\n');
    
} catch (error) {
    console.error('❌ Fehler bei der Minifizierung:', error.message);
    process.exit(1);
}
