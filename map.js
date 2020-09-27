L.mapbox.accessToken =
  "pk.eyJ1IjoiamFtaXNvbnZhbGVudGluZSIsImEiOiJja2Vhbjd4ZzIwMGlpMnluaTl1ajE4Z3BkIn0.fJ6GnIsL0xMb4PpXw6LI7g";
const center = L.latLng(35, -75.69);
const initZoom = 6;
const map = L.map("map", {
  zoomControl: false,
}).setView(center, initZoom);

// Stamen basemaps (terrain, toner-lite, watercolor)
const toner_lite = new L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",
  {
    attribution:
      "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
  }
);
const watercolor = new L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
  {
    attribution:
      "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
  }
);
const terrain = new L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
  {
    attribution:
      "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
  }
);
map.addLayer(toner_lite);

map.addControl(
  L.control.zoom({
    position: "bottomright",
  })
);

//overlay layers

const fLayers = {
  "NOAA Images": florence,
  "USGS Predicted Overwash": florence_pred,
  "USGS Measured Overwash": florence_wash,
};

const mLayers = {
  "NOAA Images": michael,
  "USGS Predicted Overwash": michael_pred,
  "USGS Measured Overwash": michael_wash,
};

const iLayers = {
  "NOAA Images": isaias,
};

const dLayers = {
  "NOAA Images": dorian,
};

const baseLayers = {
  "Toner-lite": toner_lite,
  Watercolor: watercolor,
  Terrain: terrain,
};

getSampleData("data/HurricaneIsaiasSampleData.csv", 1);

$("#storm-selector").change(changeStorm);
