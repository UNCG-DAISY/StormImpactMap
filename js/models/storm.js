class Storm {

    constructor(name, resources) {
        this.name = name
        this.resources = resources
        this.STORM_DIR_PATH = "./data/storms/" + name + "/"
    }
    
    async init() {

        this.noaaImageLayer = await this.loadTileImages()

        if (this.resources["ov_ext.zip"] ) {
            this.overwashExtentLayer = this.loadShapefile(this.STORM_DIR_PATH + "ov_ext.zip")
        }
        if (this.resources["ov_pred.zip"] ) {
            this.overwashPredictionLayer = this.loadShapefile(this.STORM_DIR_PATH + "ov_pred.zip")  
        }
        if (this.resources["ml_pred.csv"] ) {
            // Util.load_images(this.STORM_DIR_PATH + "ml_pred.csv")
            this.MLPredictionLayer = await this.loadMLPredictions(this.STORM_DIR_PATH + "ml_pred.csv")
        }
        if (this.resources["track.zip"] ) {
            this.noaaTrackLayer = this.loadShapefile(this.STORM_DIR_PATH + "track.zip") 
        }
        
        this.overlays = this.getOverlayLayers()
        return this
    }

    async loadTileImages() {
        let res = await fetch(this.STORM_DIR_PATH + "images.json")
        let tmp = await res.json()
        let images = tmp.images

        let layers = []
        for (let x of images) {
            let url = "https://stormscdn.ngs.noaa.gov/" + x + "-rgb/{z}/{x}/{y}"
            let layer = new L.TileLayer(url,{maxZoom: 20});
            layers.push(layer)
        }
        return L.layerGroup(layers)
    }

    loadShapefile(path) {
        let layer = new L.Shapefile(path, {
        style: (path.includes('ov_pred') ? Util.assignColor : null),
        });
        return layer
    }

    async loadMLPredictions(path) {
        let res = await fetch(path)
        let content = await res.text()
        let rows = content.split("\n");
        rows.shift();
        let markerGroup = L.markerClusterGroup();
        rows.forEach((element) => {
        let marker = Util.createMarker(element)
        if (marker) markerGroup.addLayer(marker);
        })
        return markerGroup
      }

      getOverlayLayers() {
        let overlayLayers = {}
        overlayLayers["NOAA Images"] = this.noaaImageLayer
        if (this.overwashExtentLayer) {
            overlayLayers["USGS Measured Overwash"] = this.overwashExtentLayer
        }
        if (this.overwashPredictionLayer) {
            overlayLayers["USGS Predicted Overwash"] = this.overwashPredictionLayer
        }
        if (this.MLPredictionLayer) {
            overlayLayers["ML Predictions"] = this.MLPredictionLayer
        }
        if (this.noaaTrackLayer) {
            overlayLayers["NOAA Tracks"] = this.noaaTrackLayer
        }
        
        return overlayLayers
      }
}