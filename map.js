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
  Images: florence,
  Prediction: florence_pred,
  Overwash: florence_wash,
};

const mLayers = {
  Images: michael,
  Prediction: michael_pred,
  Overwash: michael_wash,
};

const iLayers = {
  Images: isaias,
};

const dLayers = {
  Images: dorian,
};

const baseLayers = {
  "Toner-lite": toner_lite,
  Watercolor: watercolor,
  Terrain: terrain,
};

// const overlayLayers = {
//   Florence: florence,
//   Dorian: dorian,
//   Michael: michael,
//   Isaias: isaias,
//   "Michael Prediction": michael_pred,
//   "Florence Prediction": florence_pred,
//   "Michael Overwash": michael_wash,
//   "Florence Overwash": florence_wash,
// };

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
        let id = vals[5];
        let lat = vals[6];
        let lon = vals[7];

        // let temp = vals[0];
        // let storm_id = vals[1];
        // let archive = vals[2];
        // let image = vals[3];
        // let date = vals[4];
        // let wash_pred = vals[5];
        // let id = vals[6];
        // let lat = vals[7];
        // let lon = vals[8];

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

        let popupLink = document.createElement("a");
        popupLink.href =
          "https://coastalimagelabeler.science/api/image/show/Compressed/" + id;
        popupLink.style.display = "block";
        popupLink.target = "_blank";
        // popupLink.innerHTML =
        //   `
        // <img src="https://coastalimagelabeler.science/api/image/show/Compressed/` +
        //   id +
        //   `" style="width: 200px;height:200px;"></img>`;

        let popupBtn = document.createElement("button");
        popupBtn.innerHTML = "View Image";
        // popupBtn.onclick = function () {
        // let popupImg = document.createElement("img");
        // popupImg.src =
        //   "https://coastalimagelabeler.science/api/image/show/Compressed/" +
        //   id;
        // popupImg.style.cssText = `
        //   height: 200px;
        //   width: 200px;
        //   `;
        // popupBtn.appendChild(popupImg);
        // };
        popupBtn.style.cssText = `
        height: 25px;
        width: auto;
        display: block;
        `;

        popupContent.appendChild(popupLink);
        popupLink.appendChild(popupBtn);

        if (wash_pred > 0.5) {
          const marker = L.marker([lat, lon], {
            icon: wash_pred > 0.75 ? greenIcon : redIcon,
          }).bindPopup(popupContent, {
            minWidth: 210,
          });

          markerGroup.addLayer(marker);
        }
      });

      if (order == 1) {
        iLayers["CSV"] = markerGroup;
        overlayLayers = iLayers;
        layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(
          map
        );
        getSampleData("data/HurricaneFlorenceSampleData.csv", 2);
      } else if (order == 2) {
        fLayers["CSV"] = markerGroup;
        getSampleData("data/HurricaneMichaelSampleData.csv", 3);
      } else {
        mLayers["CSV"] = markerGroup;
      }
    });
}

// const fControl = new L.Control.Layers();
// const mControl;
// const iControl;
// const dControl;

function changeStorm() {
  layersControl.remove();
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  map.addLayer(toner_lite);

  const selected_value = $("#storm-selector").val();
  switch (selected_value) {
    case "Dorian":
      overlayLayers = dLayers;
      break;
    case "Florence":
      overlayLayers = fLayers;
      break;
    case "Michael":
      overlayLayers = mLayers;
      break;
    case "Isaias":
      overlayLayers = iLayers;
      break;
  }
  console.log(selected_value);
  console.log(overlayLayers);
  layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(map);
}

$("#storm-selector").change(changeStorm);
