
        L.mapbox.accessToken ='pk.eyJ1IjoiamFtaXNvbnZhbGVudGluZSIsImEiOiJja2Vhbjd4ZzIwMGlpMnluaTl1ajE4Z3BkIn0.fJ6GnIsL0xMb4PpXw6LI7g';
        const center = L.latLng(35, -75.69);
        const initZoom = 6;
        const map = L.mapbox.map('map').setView(center, initZoom);

        //Mapbox baselayers styled in Studio
        // var mbStreet = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cj7dbfjif0q8e2sqeli6sqsku').addTo(map);
        // var mbSat = new L.mapbox.styleLayer('mapbox://styles/jasonwool/ciobrxtg7005sainhniz3f5hx');
        // L.mapbox.tileLayer('mapbox.streets').addTo(map);

        // Stamen basemaps (terrain, toner, watercolor)
        const toner = new L.StamenTileLayer("toner");
        const watercolor = new L.StamenTileLayer("watercolor");
        const terrain = new L.StamenTileLayer("terrain");
        map.addLayer(toner);


        map.addControl(L.mapbox.geocoderControl('mapbox.places', {
                autocomplete: true
            }));


        /*
            //////////////////// ISAIAS ///////////////////////////////
        */

        const aug03a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200803a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});
        const aug04a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200804a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});
        const aug05a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200805a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});

        

        /*
            //////////////////// DORIAN ///////////////////////////////
        */        

       var sep04a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190904a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep05a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190905a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep05b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190905b-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep06a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190906a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep06b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190906b-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep07a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190907a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep07b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190907b-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep17a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190917a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep17b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190917b-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep18a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190918a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep18b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190918b-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep19a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190919a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});
       var sep20a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190920a-rgb.json', {errorTileUrl:'../dorian/images/clear.png'});

        /*
            //////////////////// MICHAEL ///////////////////////////////
        */

       const oct11a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181011a-rgb.json', {errorTileUrl:'../michael/images/clear.png'});
       const oct12a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181012a-rgb.json', {errorTileUrl:'../michael/images/clear.png'});
       const oct12b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181012b-rgb.json', {errorTileUrl:'../michael/images/clear.png'});
       const oct13a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181013a-rgb.json', {errorTileUrl:'../michael/images/clear.png'});
       const oct14a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181014a-rgb.json', {errorTileUrl:'../michael/images/clear.png'});


        /*
            //////////////////// FLORENCE ///////////////////////////////
        */

       const sept15a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180915a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept16a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180916a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept16b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180916b-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept17a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180917a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept18a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180918a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept19a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180919a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept19b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180919b-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept19c = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180919c-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept20a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180920a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept20b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180920b-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept20c = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180920c-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept21a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180921a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept21b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180921b-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept22a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180922a-rgb.json', {errorTileUrl:'../florence/images/clear.png'});
       const sept22b = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180922b-rgb.json', {errorTileUrl:'../florence/images/clear.png'});        

       //Labels
       //var mbLabels = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cj7da72520pwf2rnywxzbhgil').addTo(map);
       // var mbLabels = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cjm80tfax3ngx2skbnr3375vl').addTo(map);

       //overlay layers

       const isaias = L.layerGroup([aug03a, aug04a, aug05a]).addTo(map);
       const florence = L.layerGroup([sept15a, sept16a, sept16b, sept17a, sept18a, sept19a, sept19b, sept19c, sept20a, sept20b,
       sept20c, sept21a, sept21b, sept22a, sept22b]);
       const michael = L.layerGroup([oct11a, oct12a, oct12b, oct13a, oct14a]);
       const dorian = L.layerGroup([sep04a, sep05a, sep05b, sep06a, sep06b, sep07a, sep07b, sep17a, sep17b, sep18a, sep18b, sep19a, sep20a]);


       const baseLayers = {
            "Toner": toner,
            "Watercolor": watercolor,
            "Terrain": terrain
        // "MapBox Streets": mbStreet,
        // "MapBox Satellite": mbSat
        };

        const overlayLayers = {
            "Florence": florence,
            "Dorian": dorian,
            "Michael": michael,
            "Isaias": isaias
        // "Mapbox Labels": mbLabels
        };

        const layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(map);

        /*
        //////////////////////////////////////////////////////////////////////////////////////
            ADDING MARKERS TO THE MAP
        //////////////////////////////////////////////////////////////////////////////////////
        */

        const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });

        const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });        


        // let csv_data = "";
        // fetch("HurricaneMichaelSampleData.csv")
        // .then(response => response.text())
        // .then(text => {
        // //Use CSV text
        // console.log(text);
        // csv_data = text;
        // markers = csv_data.split("\n");
        // markers.shift();
        // console.log(markers.length);

        // let markerGroup = L.markerClusterGroup();
        // markers.forEach(element => {
        //     vals = element.split(",");
        //     let lat = vals[0];
        //     let lon = vals[1];
        //     let wash = vals[2];
            
            
        //     const marker = L.marker([lat,lon], {icon: (wash == 1 ? greenIcon : redIcon)});
        //     markerGroup.addLayer(marker);
        // });

        // map.addLayer(markerGroup);
        // });