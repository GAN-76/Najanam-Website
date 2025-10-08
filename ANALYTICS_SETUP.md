# Google Analytics 4 (GA4) Einrichtung für NAJANAM

## 📋 Schritt-für-Schritt Anleitung

### 1. Google Analytics Konto erstellen

1. Gehen Sie zu: [https://analytics.google.com](https://analytics.google.com)
2. Klicken Sie auf **"Messung starten"** oder **"Konto erstellen"**
3. Füllen Sie die Informationen aus:
   - **Kontoname**: NAJANAM
   - **Datenfreigabe-Einstellungen**: Nach Wunsch anpassen

### 2. Property erstellen

1. **Property-Name**: NAJANAM Website
2. **Zeitzone**: (GMT+01:00) Schweiz
3. **Währung**: Schweizer Franken (CHF)
4. **Erweiterte Optionen**: Lassen Sie "Google Analytics 4" ausgewählt

### 3. Unternehmensdetails

1. **Branche**: Einzelhandel > Bekleidung/Mode
2. **Unternehmensgrösse**: Klein (1-10 Mitarbeiter)
3. **Verwendungszweck**: 
   - ✅ Kundenverhalten verstehen
   - ✅ Marketingeffektivität messen

### 4. Datenstream einrichten

1. Wählen Sie **"Web"** als Plattform
2. **Website-URL**: `https://najanam.ch` (oder Ihre aktuelle Domain)
3. **Stream-Name**: NAJANAM Website
4. Klicken Sie auf **"Stream erstellen"**

### 5. Measurement ID kopieren

Nach der Erstellung sehen Sie Ihre **Measurement ID** (Format: `G-XXXXXXXXXX`)

**WICHTIG**: Kopieren Sie diese ID!

---

## 🔧 Integration in Ihre Website

### Option A: Automatische Integration (EMPFOHLEN)

1. Öffnen Sie die Datei: `js/analytics.js`
2. Ersetzen Sie `'G-XXXXXXXXXX'` mit Ihrer echten Measurement ID
3. Fügen Sie folgende Zeilen in **ALLE** HTML-Dateien ein (im `<head>`-Bereich):

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script src="js/analytics.js"></script>
```

**Dateien, die aktualisiert werden müssen:**
- ✅ index.html
- ✅ produkte.html
- ✅ ueber-uns.html
- ✅ galerie.html
- ✅ kontakt.html

### Option B: Ich mache es für Sie

Geben Sie mir einfach Ihre Measurement ID, und ich füge sie automatisch in alle Seiten ein.

---

## 📊 Was wird getrackt?

### Automatisches Tracking:
- ✅ **Seitenaufrufe** - Welche Seiten werden besucht
- ✅ **Besucherdauer** - Wie lange bleiben Besucher
- ✅ **Geräte** - Desktop, Tablet, Mobile
- ✅ **Standort** - Aus welchen Städten/Ländern kommen Besucher
- ✅ **Traffic-Quellen** - Google, Instagram, direkt, etc.

### Erweiterte Events (bereits konfiguriert):
- 📞 **Telefon-Klicks** - Wie oft wird Ihre Nummer angeklickt
- 💬 **WhatsApp-Klicks** - WhatsApp-Button Nutzung
- 📧 **Email-Klicks** - Kontakt per Email
- 📱 **Social Media** - Instagram/Facebook Klicks
- 🖼️ **Galerie-Ansichten** - Welche Bilder werden angeschaut
- 📏 **Scroll-Tiefe** - Wie weit scrollen Besucher (25%, 50%, 75%, 100%)
- ⏱️ **Zeit auf Seite** - Engagement-Messung (30 Sekunden+)
- 🔗 **Navigation** - Welche Menüpunkte werden geklickt

---

## 🎯 Wichtige Metriken für Najanam

### Woche 1-4: Basis-Analyse
1. **Besucher pro Tag** - Wie viele Personen besuchen die Website
2. **Beliebteste Seiten** - Welche Inhalte interessieren am meisten
3. **Traffic-Quellen** - Woher kommen die Besucher
4. **Geräte-Verteilung** - Mobile vs. Desktop

### Ab Woche 4: Conversion-Tracking
1. **Telefon-Anrufe** - Wie viele Klicks auf Telefonnummer
2. **WhatsApp-Kontakte** - WhatsApp-Button Nutzung
3. **Standort-Anfragen** - Google Maps Interaktionen
4. **Social Media Engagement** - Instagram-Klicks

---

## 🔒 DSGVO-Konformität

Die Analytics-Konfiguration ist bereits DSGVO-konform:

✅ **IP-Anonymisierung aktiviert** - Keine vollständigen IP-Adressen gespeichert  
✅ **Cookie-Consent bereit** - Kann mit Cookie-Banner kombiniert werden  
✅ **Datenminimierung** - Nur notwendige Daten werden erfasst  

### Optional: Cookie-Banner hinzufügen

Für vollständige DSGVO-Konformität empfehle ich einen Cookie-Banner.
Soll ich das auch einrichten?

---

## 📈 Nächste Schritte nach Setup

### Woche 1:
- ✅ Analytics testen (eigene Besuche ausschliessen)
- ✅ Erste Daten sammeln
- ✅ Dashboard einrichten

### Woche 2-4:
- ✅ Berichte analysieren
- ✅ Zielgruppe verstehen
- ✅ Schwachstellen identifizieren

### Ab Monat 2:
- ✅ Google Ads vorbereiten
- ✅ Conversion-Tracking optimieren
- ✅ ROI messen

---

## 🆘 Hilfe & Support

### Häufige Probleme:

**Problem**: Keine Daten sichtbar  
**Lösung**: Warten Sie 24-48 Stunden nach Installation

**Problem**: Eigene Besuche werden gezählt  
**Lösung**: IP-Adresse in GA4 ausschliessen (Einstellungen > Datenfilter)

**Problem**: Events werden nicht getrackt  
**Lösung**: Browser-Konsole öffnen (F12) und auf Fehler prüfen

---

## ✅ Checkliste

- [ ] Google Analytics Konto erstellt
- [ ] Measurement ID erhalten (G-XXXXXXXXXX)
- [ ] ID in `js/analytics.js` eingetragen
- [ ] Analytics-Script in alle HTML-Dateien eingefügt
- [ ] Website getestet (Echtzeit-Bericht prüfen)
- [ ] Eigene IP ausgeschlossen
- [ ] Dashboard eingerichtet
- [ ] Erste Woche Daten gesammelt

---

## 📞 Benötigen Sie Hilfe?

Geben Sie mir einfach Ihre Measurement ID, und ich:
1. ✅ Füge sie in alle Dateien ein
2. ✅ Teste die Integration
3. ✅ Richte ein Dashboard ein
4. ✅ Erkläre Ihnen die wichtigsten Berichte

**Ihre Measurement ID**: `G-__________` (hier eintragen)
