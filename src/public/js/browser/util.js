function load_tile_images(arr) {
    let layers = []
    for (let x of arr) {
        let url = "https://stormscdn.ngs.noaa.gov/" + x + "-rgb/{z}/{x}/{y}"
        let tmp = new L.TileLayer(url,{maxZoom: 20});
        layers.push(tmp)
    }
    return layers
}

function load_ml_predictions(path) {

}

function populate_storm_selector() {
  for (storm in storms) {
    storm = storm.charAt(0).toUpperCase() + storm.slice(1)
    $("#storm-selector").append(new Option(storm, storm.toLowerCase()))
  }
}

function load_storm(storm) {
  let test = storms[storm]
  a = test['USGS Predicted Overwash']
  b = test['USGS Measured Overwash']
  c = test['NOAA Images']

  let overlayLayers = {}
  for (key in test) {
    if (key.includes("Images")) {
      overlayLayers[key] = L.layerGroup(load_tile_images(test[key]))
    }
    else overlayLayers[key] = load_shapefile(test[key])
  }
  return overlayLayers
}

function changeStorm() {

  if (layersControl) {
    layersControl.remove()
  }

  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  map.addLayer(toner_lite);

  currentStorm = $("#storm-selector").val();
  overlayLayers = load_storm(currentStorm)

  layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(map);
}

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
}

function load_shapefile(path) {
    let tmp = new L.Shapefile(path, {
    style: (path.includes('overwash_pred') ? assignColor : null),
    });
    return tmp
}

function add_popup_link(id) {
  let newlink = document.createElement("a");
  newlink.classList.add("img-link");
  newlink.href = img_base_url + id + img_compressed;
  newlink.style.display = "block";
  newlink.target = "_blank";
  newlink.text = "View Image";
  return newlink
}

function add_popup_button(id) {
  let report_link = document.createElement("button");
  report_link.id = "report-link";
  report_link.innerHTML = "Tell us if there no washover in the image";
  report_link.style.cssText = `
    background-color: darkred;
    height: 50px;
    width: 100px;
    border: none;
    font-color: white;
    color: white;
  `;
  report_link.href = report_url + params;

  report_link.addEventListener("click", function () {
    postData(report_link.href);
  });  

}




img_base_url = "https://coastalimagelabeler.science/api/image/";
img_compressed = "/compressed";
img_original = "/original";
img_grad = "/gradcam";
report_url = "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec";

function postData(report_url, data = {}) {
  fetch(report_url) // Call the fetch function passing the url of the API as a parameter
    .then((response) => response.json())
    .then(function (data) {
      // This is where you run code if the server returns any errors
      console.log(data);
    });
}

function load_ml_pred(url) {
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

        const params = "?storm_id=" + storm_id + "&archive=" + archive + "&image=" + image + "&id=" + id + "&wash_pred=" + wash_pred;

        let popupContent = document.createElement("div");
        popupContent.innerText =
          "Storm ID: " +
          storm_id +
          "\n Image: " +
          image +
          "\n Date: " +
          date +
          "\n Washover Probability: " + (wash_pred != null ? wash_pred.substring(0, 4) : "");



        let ML_link = document.createElement("a");
        ML_link.classList.add("img-link");
        ML_link.href = img_base_url + id + img_grad;
        ML_link.style.display = "block";
        ML_link.target = "_blank";
        ML_link.text = "View ML Results";    

        if (wash_pred > 0.75) {
          const marker = L.marker([lat, lon]).bindPopup(popupContent, {
            // minWidth: 210,
          });

          popupContent.appendChild(popupLink);
          popupContent.appendChild(ML_link);
          popupContent.appendChild(report_link);
          markerGroup.addLayer(marker);
        }
      });
    });
}

