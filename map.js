/*

  This is the main script that contains all variables and method calls for loading the Leaflet map 
  as well the project specific global variables and most importantly, the main method which runs the application

*/


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

const baseLayers = {
  "Toner-lite": toner_lite,
  Watercolor: watercolor,
  Terrain: terrain,
};

// This storm objects holds all relevant storm data loaded in as layers to be added on the map
// when the respective storm is loaded
let storms = {}

// This variable is used to load the apporiate map control when changing storms
let layersControl = {} 

let currentStorm = {}

async function main() {

  storms = await Util.loadAllStorms()  
  Util.populateStormSelector(Object.keys(storms))

  let currentStormName = $("#storm-selector").val().toLowerCase()
  currentStorm = storms[currentStormName]

  layersControl = new L.Control.Layers(baseLayers, currentStorm.overlays).addTo(map)
  $("#storm-selector").change({control: layersControl, overlays: currentStorm.overlays}, Util.changeStorm);
  Util.setSidebarTransition()
  Util.showTestPopup()
}

main()
