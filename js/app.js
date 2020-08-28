L.mapbox.accessToken ='pk.eyJ1IjoiamFtaXNvbnZhbGVudGluZSIsImEiOiJja2Vhbjd4ZzIwMGlpMnluaTl1ajE4Z3BkIn0.fJ6GnIsL0xMb4PpXw6LI7g';

$(document).ready(function() {

//center point and initial zoom for map
var center = L.latLng(27.1080,-80.1672);
var initZoom = 9;

var map = L.mapbox.map('map').setView(center, initZoom);

//Mapbox baselayers styled in Studio
var mbStreet = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cj7dbfjif0q8e2sqeli6sqsku').addTo(map);
var mbSat = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cjm71vs2p4akw2sntmzmx48wd');

//var mbSat = new L.mapbox.styleLayer('mapbox://styles/jasonwool/ciobrxtg7005sainhniz3f5hx');

//Geocoder
map.addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
}));

var aug03a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200803a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});
var aug04a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200804a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});
var aug05a = new L.mapbox.tileLayer('https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200805a-rgb.json', {errorTileUrl:'../isaias/images/clear.png'});

//Labels
//var mbLabels = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cj7da72520pwf2rnywxzbhgil').addTo(map);
var mbLabels = new L.mapbox.styleLayer('mapbox://styles/jasonwool/cjm80tfax3ngx2skbnr3375vl').addTo(map);

//Layers
var aug03 = L.layerGroup([aug03a]).addTo(map);
var aug04 = L.layerGroup([aug04a]).addTo(map);
var aug05 = L.layerGroup([aug05a]).addTo(map);


var baseLayers = {

	"MapBox Streets": mbStreet,
	"MapBox Satellite": mbSat
};

var overlayLayers = {

	"August 03 2020" : aug03,
  "August 04 2020" : aug04,
  "August 05 2020" : aug05,
	"Mapbox Labels": mbLabels
};

var layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(map);
var hash = new L.Hash(map);
L.control.mousePosition({emptyString:'Mouseover to View Coordinates', prefix: 'Lat/Lon: '}).addTo(map);

/*Workaround for https://github.com/Leaflet/Leaflet/issues/2308. Layers out of order when toggling the layer group */
     //moves the nadir tiles under the oblique fps
	 function restackLayers() {
                var layers = [];
				map.eachLayer(function(layer) {
					//console.log(layer.options);
    				if( layer instanceof L.TileLayer && layer.options.type == "xyz" ){
        				layers.push(layer);
        				//layer.setZIndex(100);
        				layer.bringToFront();
        			}

				});
     }

map.on('overlayadd', restackLayers);


/* Fix Map Size */

function resizeMap() {
  var div = $('#map');
  div.height(
    //Math.max( div.height() + ($(window).height() - $('body').height()),300)
    Math.max(div.height() + ($(window).height() - $('body').height()))
  );
  map.invalidateSize();
}

});  //end doc ready
