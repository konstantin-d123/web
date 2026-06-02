const spots = [
    {
        name: 'Красная площадь', 
        lat: 55.7537,
        lng: 37.6213,
        info: 'Главная площадь Москвы'
    },
    {
        name: 'Статуя свободы', 
        lat: 40.6892,
        lng: -74.0445,
        info: 'Символ свободы'
    },

];


let map;
let markers = [];

function initMap(){
    map = L.map('map').setView([30, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);


    addMarkers();
}


function addMarkers(){
    spots.forEach(i => {
        const marker = L.marker([i.lat, i.lng])
        .addTo(map)
        .bindPopup(
            `<b>${i.name}</b><br>${i.info}`
        );

        markers.push(marker);
    });

    const g = L.featureGroup(markers);
    map.fitBounds(g.getBounds());
}


function showPlace(i){
    map.setView([i.lat, i.lng, 12]);
    const marker = markers[spots.indexOf(i)];
    marker.openPopup();
}


initMap();