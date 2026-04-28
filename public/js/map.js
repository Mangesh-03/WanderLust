console.log("Inside map.js", window.lat, window.lon);

const map = L.map('map').setView([window.lat, window.lon], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([window.lat, window.lon]).addTo(map)
    .bindPopup("Exact location provided after booking.")
    .openPopup();