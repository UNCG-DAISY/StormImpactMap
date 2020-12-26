/*
  //////////////////// ISAIAS ///////////////////////////////
  */

 tileLayers = []
 etu = { errorTileUrl: "../dorian/images/clear.png" }
 
 for (image of images) {
   t = "https://storms.ngs.noaa.gov/storms/tileso/services/tileserver.php?/" + image + "-rgb.json"
   u = L.mapbox.tileLayer(t, etu);
   tileLayers.push(u);
 }

 /*
  //////////////////// DORIAN ///////////////////////////////
*/

tileLayers = []
etu = { errorTileUrl: "../dorian/images/clear.png" }

for (image of images) {
  t = "https://storms.ngs.noaa.gov/storms/tilesm/services/tileserver.php?/" + image + "-rgb.json"
  u = L.mapbox.tileLayer(t, etu);
  tileLayers.push(u);
}

/*
    //////////////////// MICHAEL ///////////////////////////////
*/

tileLayers = []
etu = { errorTileUrl: "../dorian/images/clear.png" }

for (image of images) {
  t = "https://storms.ngs.noaa.gov/storms/tilesj/services/tileserver.php?/" + image + "-rgb.json"
  u = L.mapbox.tileLayer(t, etu);
  tileLayers.push(u);
}

/*
//////////////////// FLORENCE ///////////////////////////////
*/

tileLayers = []
etu = { errorTileUrl: "../dorian/images/clear.png" }

for (image of images) {
  t = "https://storms.ngs.noaa.gov/storms/tilesi/services/tileserver.php?/" + image + "-rgb.json"
  u = L.mapbox.tileLayer(t, etu);
  tileLayers.push(u);
}