
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

async function main() {
  let storms = await StormLoader.loadAllStorms()
  Util.populateStormSelector(Object.keys(storms))

  let currentStormName = $("#storm-selector").val().toLowerCase()
  let currentStorm = storms[currentStormName]

  console.log("Current storm: ", currentStorm)
  console.log("current storm overlays: ", currentStorm.overlays)
  new L.Control.Layers(baseLayers, currentStorm.overlays).addTo(map)
  $("#storm-selector").change(Util.changeStorm);
  Util.setSidebarTransition()
}

main()
