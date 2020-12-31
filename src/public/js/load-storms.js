const fs = require('fs');
const storm_dir = "public/data/storms/"

function get_image_names(storm) {
  // read the respective json object from file
  let path = storm_dir + storm + "/images"
  data = JSON.parse(fs.readFileSync(path))
  return data.images
}

function load_storms() {
storms = fs.readdirSync(storm_dir)

    let storm_list = {}

    for (let s of storms) {

      if (s.includes("config")) continue
      let path = storm_dir + s
      let fe_path = "data/storms/" + s + "/"
      var storm_obj = {}

      let files = fs.readdirSync(path)
          if (files) {
            for (let f of files) {
              if (f.includes("ext")) {
                storm_obj['USGS Measured Overwash'] = fe_path + f
              }
              if (f.includes("pred")) {
                storm_obj['USGS Predicted Overwash'] = fe_path + f
              }        
              if (f.includes("track")) {
                storm_obj['NOAA Tracks'] = fe_path + f
              }   
              storm_obj['NOAA Images'] = get_image_names(s) 
              // storm_obj['ML Predictions'] = fe_path + f                               

          }
          }
      storm_list[s] = storm_obj
    }
      // console.log(storm_list)
      return(storm_list)
}

exports.load_storms = load_storms