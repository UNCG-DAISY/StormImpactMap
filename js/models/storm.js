class Storm {

    constructor(name, resources) {
        this.name = name
        this.resources = resources
        this.STORM_DIR_PATH = "./data/storms/" + name + "/"

        this.init()
        // for (const [resource, enabled] in Object.entries(resources)) {
        //     if (resource == "ov_ext.zip") { 
        //      this.overwashExtentLayer = this.loadShapefile(resource)  
        //     }
        //     if (resource == "ov_pred.zip") { 
        //         this.overwashPredictionLayer = this.loadShapefile(resource)             
        //     }                
        //     if (resource == "ml_pred.zip") { 
        //         this.MLPredictionLayer = this.loadShapefile(resource) 
        //     }                
        //     if (resource == "track.zip") { 
        //         this.noaaTrackLayer = this.loadShapefile(resource) 
        //     }
        // }
    }


    async init() {
        
        this.test = "test"
        this.noaaImageLayer = await this.loadTileImages()

        if (this.resources["ov_ext.zip"] ) {
            this.overwashExtentLayer = this.loadShapefile(this.STORM_DIR_PATH + "ov_ext.zip")
        }
        if (this.resources["ov_pred.zip"] ) {
            this.overwashPredictionLayer = this.loadShapefile(this.STORM_DIR_PATH + "ov_pred.zip")   
        }
        if (this.resources["ml_pred.zip"] ) {
            this.MLPredictionLayer = this.loadShapefile(this.STORM_DIR_PATH + "ml_pred.zip") 
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
        style: (path.includes('ov_pred') ? assignColor : null),
        });
        return layer
    }

    async loadMLPredictions() {
        let res = await fetch(this.STORM_DIR_PATH + "ml_pred.csv")
        let rows = await res.text()
        markers = rows.split("\n");
        markers.shift();
        let markerGroup = L.markerClusterGroup();
        markers.forEach((element) => {
        marker = create_marker(element)
        if (marker) markerGroup.addLayer(marker);
        })
        return MarkerGroup
      }


      getOverlayLayers() {
        let overlayLayers = {}
        overlayLayers["NOAA Images"] = this.noaaImageLayer
        if (this.overwashExtentLayer) overlayLayers["USGS Measured Overwash"] = this.overwashExtentLayer
        if (this.overwashExtentLayer) overlayLayers["USGS Predicted Overwash"] = this.overwashPredictionLayer
        if (this.overwashExtentLayer) overlayLayers["ML Predictions"] = this.MLPredictionLayer
        if (this.overwashExtentLayer) overlayLayers["NOAA Tracks"] = this.noaaTrackLayerLayer
        
        return overlayLayers
      }
}