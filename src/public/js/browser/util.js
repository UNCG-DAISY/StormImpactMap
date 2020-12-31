function load_tile_images(arr) {
    let layers = []
    for (let x of arr) {
        let url = "https://stormscdn.ngs.noaa.gov/" + x + "-rgb/{z}/{x}/{y}"
        let tmp = new L.TileLayer(url,{maxZoom: 20, errorTileUrl:'images/clear.png'});
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

