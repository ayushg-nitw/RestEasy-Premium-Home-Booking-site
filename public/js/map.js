    
    mapboxgl.accessToken =mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    

    
    const el = document.createElement('div');
    el.id = 'marker';

    const marker= new mapboxgl.Marker(el,{color:"red"})
    .setLngLat(coordinates)
    .setPopup( new mapboxgl.Popup({offset: 10}).setHTML("<p>Exact Location will be provided after booking </p>"))
    .addTo(map)
    //adding home icon

    map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('mapSection')}));