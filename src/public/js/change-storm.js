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
  layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(map);
}
