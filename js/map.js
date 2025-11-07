// Google Maps Integration für NAJANAM
// Standort: Schulstrasse 18, 3604 Thun, Schweiz

let map;
let marker;
let infoWindow;
let directionsService;
let directionsRenderer;

// NAJANAM Standort
const najanamLocation = {
    lat: 46.758202,
    lng: 7.628202
};

// Map initialisieren
function initMap() {
    // Map erstellen
    map = new google.maps.Map(document.getElementById("map"), {
        center: najanamLocation,
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
            }
        ]
    });

    // Benutzerdefinierter Marker für NAJANAM
    marker = new google.maps.Marker({
        position: najanamLocation,
        map: map,
        title: "NAJANAM - Tamilisches Modegeschäft",
        animation: google.maps.Animation.DROP,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(50, 50)
        }
    });

    // Info-Fenster mit Geschäftsinformationen
    const contentString = `
        <div style="padding: 10px; max-width: 300px;">
            <h3 style="margin: 0 0 10px 0; color: #8B4513; font-family: 'Playfair Display', serif;">NAJANAM</h3>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Adresse:</strong><br>Schulstrasse 18<br>3604 Thun, Schweiz</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Telefon:</strong><br><a href="tel:+41782287019">078 228 70 19</a></p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Öffnungszeiten:</strong><br>
            Di-Fr: 14:00 – 18:00</p>
            <p style="margin: 10px 0 0 0;">
                <a href="https://www.google.com/maps/dir/?api=1&destination=Schulstrasse+18,+3604+Thun,+Switzerland" 
                   target="_blank" 
                   style="color: #8B4513; text-decoration: none; font-weight: bold;">
                   📍 Route in Google Maps öffnen
                </a>
            </p>
        </div>
    `;

    infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    // Info-Fenster beim Klick auf Marker öffnen
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    // Info-Fenster standardmässig öffnen
    infoWindow.open(map, marker);

    // Directions Service initialisieren
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: "#8B4513",
            strokeWeight: 5
        }
    });

    // Event-Listener für Route-Button
    const directionsButton = document.getElementById("getDirections");
    if (directionsButton) {
        directionsButton.addEventListener("click", calculateRoute);
    }
}

// Route vom aktuellen Standort zu NAJANAM berechnen
function calculateRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const request = {
                    origin: userLocation,
                    destination: najanamLocation,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                directionsService.route(request, (result, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(result);
                        
                        // Route-Informationen anzeigen
                        const route = result.routes[0].legs[0];
                        const distance = route.distance.text;
                        const duration = route.duration.text;
                        
                        // Info-Fenster mit Route-Details aktualisieren
                        const routeInfo = `
                            <div style="padding: 10px; max-width: 300px;">
                                <h3 style="margin: 0 0 10px 0; color: #8B4513;">Route zu NAJANAM</h3>
                                <p style="margin: 5px 0;"><strong>Entfernung:</strong> ${distance}</p>
                                <p style="margin: 5px 0;"><strong>Fahrzeit:</strong> ${duration}</p>
                                <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
                                    Die Route wird auf der Karte angezeigt.
                                </p>
                            </div>
                        `;
                        
                        infoWindow.setContent(routeInfo);
                        infoWindow.open(map, marker);
                    } else {
                        alert("Route konnte nicht berechnet werden: " + status);
                    }
                });
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        handleLocationError(false);
    }
}

// Fehlerbehandlung für Geolocation
function handleLocationError(browserHasGeolocation) {
    const errorMessage = browserHasGeolocation
        ? "Fehler: Der Geolocation-Service konnte Ihren Standort nicht ermitteln. Bitte erlauben Sie den Standortzugriff in Ihren Browser-Einstellungen."
        : "Fehler: Ihr Browser unterstützt keine Geolocation.";
    
    alert(errorMessage + "\n\nSie können die Route auch direkt in Google Maps öffnen, indem Sie auf den Marker klicken.");
}

// Map bei Fenstergrössenänderung neu zentrieren
window.addEventListener('resize', () => {
    if (map) {
        map.setCenter(najanamLocation);
    }
});
