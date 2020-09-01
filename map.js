
        L.mapbox.accessToken ='pk.eyJ1IjoiamFtaXNvbnZhbGVudGluZSIsImEiOiJja2Vhbjd4ZzIwMGlpMnluaTl1ajE4Z3BkIn0.fJ6GnIsL0xMb4PpXw6LI7g';
        const center = L.latLng(35, -75.69);
        const initZoom = 6;
        const map = L.mapbox.map('map').setView(center, initZoom);

        //Mapbox baselayers styled in Studio
        // var mbStreet = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cj7dbfjif0q8e2sqeli6sqsku').addTo(map);
        // var mbSat = new L.mapbox.styleLayer('mapbox://styles/jasonwool/ciobrxtg7005sainhniz3f5hx');
        L.mapbox.tileLayer('mapbox.streets').addTo(map);


        map.addControl(L.mapbox.geocoderControl('mapbox.places', {
                autocomplete: true
            }));

        const aug03a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200803a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});
        const aug04a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200804a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});
        const aug05a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200805a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});

        //Labels
        //var mbLabels = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cj7da72520pwf2rnywxzbhgil').addTo(map);
        // var mbLabels = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cjm80tfax3ngx2skbnr3375vl').addTo(map);

        //Layers
        const aug03 = L.layerGroup([aug03a]).addTo(map);
        const aug04 = L.layerGroup([aug04a]).addTo(map);
        const aug05 = L.layerGroup([aug05a]).addTo(map);


        const baseLayers = {

        // "MapBox Streets": mbStreet,
        // "MapBox Satellite": mbSat
        };

        const overlayLayers = {

        "August 03 2020" : aug03,
        "August 04 2020" : aug04,
        "August 05 2020" : aug05,
        // "Mapbox Labels": mbLabels
        };

        const layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(map);

        /*
        //////////////////////////////////////////////////////////////////////////////////////
            ADDING MARKERS TO THE MAP
        //////////////////////////////////////////////////////////////////////////////////////
        */

        var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });

        var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });        


        let csv_data = "";
        fetch("HurricaneMichaelSampleData.csv")
        .then(response => response.text())
        .then(text => {
        //Use CSV text
        console.log(text);
        csv_data = text;
        markers = csv_data.split("\n");
        markers.shift();
        console.log(markers.length);

        let markerGroup = L.markerClusterGroup();
        markers.forEach(element => {
            vals = element.split(",");
            let lat = vals[0];
            let lon = vals[1];
            let wash = vals[2];
            
            
            const marker = L.marker([lat,lon], {icon: (wash == 1 ? greenIcon : redIcon)});
            markerGroup.addLayer(marker);
        });

        map.addLayer(markerGroup);
        });