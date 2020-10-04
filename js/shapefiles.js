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

const dorian_track = new L.Shapefile("data/shapefiles/al052019_best_track.zip");

const michael_track = new L.Shapefile("data/shapefiles/al142018_best_track.zip");

const florence_track = new L.Shapefile("data/shapefiles/al062018_best_track.zip");