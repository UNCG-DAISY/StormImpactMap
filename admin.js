const axios = require('axios').default
const fs = require('fs');
const input = require('readline-sync')

re = /([0-9]{8}[abc])/g

const STORM_DATA_DIR = "./data/storms/"

 function getStormNames(storm) {
    base = "https://storms.ngs.noaa.gov/storms/" + storm + "/";
    json_url = base + storm + ".json";
    src_url = base + "js/app.js";

    getJSON(json_url)
    .catch((err) => {
        console.log("Unavailable in JSON format");
        getSrc(src_url)
        .catch( (err) => {
            console.log('Unable to find images for given storm');
        })
    })
}

function getJSON(url) {
    console.log("attempting to get json........")
    return axios.get(url)
        .then(function (res) {
            data = JSON.stringify(res.data);
            matches = new Set(data.match(re))
            
            console.log("number of images found: ", matches.size)
            if (matches.size == 0) throw "no images available in JSON format"
            console.log(matches)
            save_images(Array.from(matches));
        });
    }

function getSrc(url) {
    console.log("attempting to get source code........")
    return axios.get(url)
        .then(function (res) {
            data = res.data;
            matches = new Set(data.match(re))
            console.log("matches found: ", matches)
            console.log(data);
        
            for (x of matches) {
                console.log(x);
            }

            matchesArray = Array.from(matches)
            saveImages(matchesArray);
        });
    }

function saveImages(images) {
    ex = input.question('export to file?: ');
    if (ex === 'yes' || ex ==='y') {
        try {
            obj = {
                "images": images
            }
            let newStormDir = STORM_DATA_DIR + storm + "/"
           

            if (!fs.existsSync(newStormDir)) {
                fs.mkdirSync(newStormDir);
            }

            let newImageFile = newStormDir + "images.json"
            console.log(newImageFile)
            

            fs.writeFileSync(newImageFile, JSON.stringify(obj), (err) => console.log(err));
            console.log('saved');
        }
        catch (e) {
            console.log('unable to write to file');
            console.log(e);
        }

    }
}

function updateMapContents() {

    // new storms config object
    let stormConfig = {}



    let storms = fs.readdirSync(STORM_DATA_DIR)

    storms.forEach( (storm) => {
        let resourceObj = {
            "ov_ext.zip": false,
            "ov_pred.zip": false,
            "ml_pred.csv": false,
            "track.zip": false
        }
        let resourceList = fs.readdirSync(STORM_DATA_DIR + storm + "/")
        resourceList.forEach((resource) => { 

            if (Object.keys(resourceObj).includes(resource))
            resourceObj[resource] = true;
        })
        console.log(resourceObj)
        stormConfig[storm] = resourceObj
    })

    fs.writeFileSync("./data/storms_config.json", JSON.stringify(stormConfig, null, 2));
}


let userResponse = input.question("add or update: ");

if (userResponse === 'add') {
    let storm = input.question("enter storm to add: ")
    getStormNames(storm);
}

if (userResponse === "update") {
    updateMapContents();
}

