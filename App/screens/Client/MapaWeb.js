import React from 'react';
import { WebView } from 'react-native-webview';

export default function MapaWeb({ entrada, destino, ruta, carritoPosition, userLocation }) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <style>
        html, body { margin:0; padding:0; height:100%; }
        #map { height:100%; width:100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${entrada.latitud}, ${entrada.longitud}], 15);

        // Capa satelital gratuita (ESRI)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles © Esri &mdash; Source: Esri, Earthstar Geographics'
        }).addTo(map);

        // Marcador inicio (verde)
        L.marker([${entrada.latitud}, ${entrada.longitud}], {
          icon: L.icon({
            iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          })
        }).addTo(map).bindPopup("🚪 Punto de inicio");

        // Marcador destino (rojo)
        L.marker([${destino.latitud}, ${destino.longitud}], {
          icon: L.icon({
            iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          })
        }).addTo(map).bindPopup("📍 Destino");

        // Ubicación del usuario (amarillo/dorado)
        ${userLocation ? `
          L.marker([${userLocation.latitude}, ${userLocation.longitude}], {
            icon: L.icon({
              iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          }).addTo(map).bindPopup("👤 Tu ubicación");
        ` : ''}

        // Ruta con línea punteada
        ${ruta.length > 0 ? `
          var routeCoords = ${JSON.stringify(ruta.map(point => [point.latitude, point.longitude]))};
          var polyline = L.polyline(routeCoords, {
            color: '#0477BF',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10', // Línea punteada: 10px línea, 10px espacio
            dashOffset: '0'
          }).addTo(map);
          
          // Animación opcional de la línea punteada
          var dashOffset = 0;
          setInterval(function() {
            dashOffset -= 1;
            polyline.setStyle({dashOffset: dashOffset + 'px'});
          }, 50);
        ` : ''}

        // Carrito en tiempo real (azul)
        ${carritoPosition ? `
          L.marker([${carritoPosition.latitude}, ${carritoPosition.longitude}], {
            icon: L.icon({
              iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          }).addTo(map).bindPopup("🚐 Carrito en tiempo real");
        ` : ''}

        // Ajustar vista para incluir todos los puntos
        var bounds = L.latLngBounds([]);
        bounds.extend([${entrada.latitud}, ${entrada.longitud}]);
        bounds.extend([${destino.latitud}, ${destino.longitud}]);
        
        ${userLocation ? `bounds.extend([${userLocation.latitude}, ${userLocation.longitude}]);` : ''}
        ${carritoPosition ? `bounds.extend([${carritoPosition.latitude}, ${carritoPosition.longitude}]);` : ''}
        
        ${ruta.length > 0 ? `
          routeCoords.forEach(function(coord) {
            bounds.extend(coord);
          });
        ` : ''}
        
        // Si hay suficientes puntos, ajustar la vista
        if (bounds.isValid()) {
          map.fitBounds(bounds, { 
            padding: [50, 50],
            maxZoom: 16 // Limitar el zoom máximo para mantener contexto
          });
        }
      </script>
    </body>
    </html>
  `;

  return <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} />;
}