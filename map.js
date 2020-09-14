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

//overlay layers

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
        let storm_id = vals[0];
        let archive = vals[1];
        let image = vals[2];
        let date = vals[3];
        let wash_pred = vals[4];
        let lat = vals[5];
        let lon = vals[6];

        let popupContent = document.createElement("div");
        popupContent.innerText =
          "Storm ID: " +
          storm_id +
          "\n Archive: " +
          archive +
          "\n Image: " +
          image +
          "\n Data: " +
          date +
          "\n Prediction: " +
          wash_pred +
          "\n Latitude: " +
          lat +
          "\n Longitude: " +
          lon;
        popupContent.class = "popup";

        if (wash_pred > 0.5) {
          const marker = L.marker([lat, lon], {
            icon: wash_pred == 1 ? greenIcon : redIcon,
          }).bindPopup(popupContent);

          markerGroup.addLayer(marker);
        }
      });

      if (order == 1) {
        overlayLayers["Isaias CSV"] = markerGroup;
        getSampleData("data/HurricaneMichaelSampleData.csv");
      } else {
        overlayLayers["Michael CSV"] = markerGroup;
        const layersControl = new L.Control.Layers(
          baseLayers,
          overlayLayers
        ).addTo(map);
      }
    });
}
