L.mapbox.accessToken =
  "pk.eyJ1IjoiamFtaXNvbnZhbGVudGluZSIsImEiOiJja2Vhbjd4ZzIwMGlpMnluaTl1ajE4Z3BkIn0.fJ6GnIsL0xMb4PpXw6LI7g";
const center = L.latLng(35, -75.69);
const initZoom = 6;
const map = L.mapbox.map("map").setView(center, initZoom);

//Mapbox basemap layers
const streets = L.mapbox.tileLayer("mapbox.streets");
const satellite = L.mapbox.tileLayer("mapbox.satellite");

// Stamen basemaps (terrain, toner-lite, watercolor)
const toner_lite = new L.StamenTileLayer("toner-lite");
const watercolor = new L.StamenTileLayer("watercolor");
const terrain = new L.StamenTileLayer("terrain");
map.addLayer(toner_lite);

map.addControl(
  L.mapbox.geocoderControl("mapbox.places", {
    autocomplete: true,
  })
);

/*
            //////////////////// ISAIAS ///////////////////////////////
        */

const aug03a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200803a-rgb.json",
  { errorTileUrl: "../isaias/images/clear.png" }
);
const aug04a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200804a-rgb.json",
  { errorTileUrl: "../isaias/images/clear.png" }
);
const aug05a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/20200805a-rgb.json",
  { errorTileUrl: "../isaias/images/clear.png" }
);

/*
            //////////////////// DORIAN ///////////////////////////////
        */

var sep04a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190904a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep05a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190905a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep05b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190905b-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep06a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190906a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep06b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190906b-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep07a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190907a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep07b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/20190907b-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep17a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190917a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep17b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190917b-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep18a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190918a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep18b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190918b-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep19a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190919a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);
var sep20a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesn/services/tileserver.php?/20190920a-rgb.json",
  { errorTileUrl: "../dorian/images/clear.png" }
);

/*
            //////////////////// MICHAEL ///////////////////////////////
        */

const oct11a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181011a-rgb.json",
  { errorTileUrl: "../michael/images/clear.png" }
);
const oct12a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181012a-rgb.json",
  { errorTileUrl: "../michael/images/clear.png" }
);
const oct12b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181012b-rgb.json",
  { errorTileUrl: "../michael/images/clear.png" }
);
const oct13a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181013a-rgb.json",
  { errorTileUrl: "../michael/images/clear.png" }
);
const oct14a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/20181014a-rgb.json",
  { errorTileUrl: "../michael/images/clear.png" }
);

/*
            //////////////////// FLORENCE ///////////////////////////////
        */

const sept15a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180915a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept16a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180916a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept16b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180916b-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept17a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180917a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept18a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180918a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept19a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180919a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept19b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180919b-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept19c = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180919c-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept20a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180920a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept20b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180920b-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept20c = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180920c-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept21a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180921a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept21b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180921b-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept22a = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180922a-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);
const sept22b = new L.mapbox.tileLayer(
  "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/20180922b-rgb.json",
  { errorTileUrl: "../florence/images/clear.png" }
);

/*
    ///////////////////////////////////////////////////////// SHAPEFILES
*/

assignColor = function (feature) {
  let povw = feature.properties.POVW;
  if (povw >= 80) {
    return { color: "#ff0000" };
  } else if (povw < 80 && povw >= 60) {
    return { color: "#ff3700" };
  } else if (povw < 60 && povw >= 40) {
    return { color: "#ff5703" };
  } else if (povw >= 20) {
    return { color: "#ffb477" };
  } else {
    return { color: "#ffd840" };
  }
};
const florence_pred = new L.Shapefile("data/shapefiles/Florence_2018.zip", {
  style: assignColor,
});

const michael_pred = new L.Shapefile("data/shapefiles/Michael_2018.zip", {
  style: assignColor,
});

const michael_wash = new L.Shapefile(
  "data/shapefiles/Michael_Overwash_Extent.zip"
);

const florence_wash = new L.Shapefile(
  "data/shapefiles/Florence_Overwash_Extent.zip"
);
//overlay layers

const isaias = L.layerGroup([aug03a, aug04a, aug05a]);
const florence = L.layerGroup([
  sept15a,
  sept16a,
  sept16b,
  sept17a,
  sept18a,
  sept19a,
  sept19b,
  sept19c,
  sept20a,
  sept20b,
  sept20c,
  sept21a,
  sept21b,
  sept22a,
  sept22b,
]);
const michael = L.layerGroup([oct11a, oct12a, oct12b, oct13a, oct14a]);
const dorian = L.layerGroup([
  sep04a,
  sep05a,
  sep05b,
  sep06a,
  sep06b,
  sep07a,
  sep07b,
  sep17a,
  sep17b,
  sep18a,
  sep18b,
  sep19a,
  sep20a,
]);

const baseLayers = {
  "Toner-lite": toner_lite,
  Watercolor: watercolor,
  Terrain: terrain,
};

const overlayLayers = {
  Florence: florence,
  Dorian: dorian,
  Michael: michael,
  Isaias: isaias,
  "Michael Prediction": michael_pred,
  "Florence Prediction": florence_pred,
  "Michael Overwash": michael_wash,
  "Florence Overwash": florence_wash,
};

/*
        //////////////////////////////////////////////////////////////////////////////////////
            ADDING MARKERS TO THE MAP
        //////////////////////////////////////////////////////////////////////////////////////
        */

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

getSampleData("data/HurricaneIsaiasSampleData.csv", 1);

function getSampleData(url, order) {
  let csv_data = "";
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      csv_data = text;
      markers = csv_data.split("\n");
      markers.shift();

      let markerGroup = L.markerClusterGroup();
      markers.forEach((element) => {
        vals = element.split(",");
        let lat = vals[0];
        let lon = vals[1];
        let wash = vals[2];

        if (wash > 0.5) {
          const marker = L.marker([lat, lon], {
            icon: wash == 1 ? greenIcon : redIcon,
          });

          markerGroup.addLayer(marker);
        }
      });

      if (order == 1) {
        overlayLayers["Isaias CSV"] = markerGroup;
        getSampleData("data/HurricaneMichaelSampleData.csv");
        console.log("next");
      } else {
        overlayLayers["Michael CSV"] = markerGroup;
        alert("done");
        const layersControl = new L.Control.Layers(
          baseLayers,
          overlayLayers
        ).addTo(map);
      }
    });
}
