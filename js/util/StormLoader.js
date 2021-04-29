class StormLoader {

    constructor() {
    }
    
    static FILE_TO_RESOURCE_MAP = {
        "ov_ext.zip": "USGS Measured Overwash",
        "ov_pred.zip": "USGS Predicted Overwash",
        "ml_pred.csv": "ML Predictions",
        "track.zip": "NOAA Tracks",
        "images.json": "NOAA Images"
      }

    static async loadAllStorms() {

        let storms = {}
        let res = await fetch("../../data/storms_config.json")
        let stormData = await res.json()

        for (const stormName in stormData) {
            let storm = await (new Storm(stormName, stormData[stormName])).init()
            storms[stormName] = storm
        }

        return storms
    }

    static async loadStorm(stormName) {
        
        for (let file of Object.keys(this.FILE_TO_RESOURCE_MAP)) {
            let url = "data/storms/" + stormName + "/" + file;
            let res = await fetch("none")

            if (!res.ok) console.log("no " + file + " found for (storm: " +stormName + ")........")
        }
    }
    
    static changeStorm(event) {

        if (layersControl) {
          layersControl.remove()
        }
      
        map.eachLayer((layer) => {
          map.removeLayer(layer);
        });
      
        map.addLayer(toner_lite);
      
        let currentStormName = $("#storm-selector").val().toLowerCase();
        let currentStorm = storms[currentStormName]
        layersControl = new L.Control.Layers(baseLayers, currentStorm.overlays).addTo(map);
      }
}