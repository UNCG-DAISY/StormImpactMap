fs = require('fs');
// prompt = require('prompt')

/*

NOAA NGS Emergency Response Imagery tiles
USGS overwash predictions
USGS overwash observations
NOAA NHC Hurricane Tracks
ML observations of washover

*/

const storm_dir_path = 'src/public/data/storms';

fs.readdir(storm_dir_path, (err, files) => {
    console.log(files);
});

function add_overwash_extents() {

}

function add_overwash_predictions() {
    
}

function add_hurricane_tracks() {
    
}

function add_ml_observations() {
    
}


