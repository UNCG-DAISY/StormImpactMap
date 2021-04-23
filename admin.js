const axios = require('axios').default
const fs = require('fs');
const input = require('readline-sync')

re = /([0-9]{8}[abc])/g

 function get_storm_names(storm) {
    base = "https://storms.ngs.noaa.gov/storms/" + storm + "/";
    json_url = base + storm + ".json";
    src_url = base + "js/app.js";

    get_json(json_url)
    .catch((err) => {
        console.log("Unavailable in JSON format");
        get_src(src_url)
        .catch( (err) => {
            console.log('Unable to find images for given storm');
        })
    })
}

function get_json(url) {
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

function get_src(url) {
    console.log("attempting to get source code........")
    return axios.get(url)
        .then(function (res) {
            data = res.data;
            matches = new Set(data.match(re))
            console.log("matches found: ", matches)
            console.log(data);

            // try {
            //     server_id = data.match(/tiles([a-z])/)[1]
            //     console.log(server_id);
            // }
            // catch (e) {
            //     console.log(e)
            // }

        
            for (x of matches) {
                console.log(x);
            }

            matchesArray = Array.from(matches)
            save_images(matchesArray);
        });
    }

function save_images(images) {
    ex = input.question('export to file?: ');
    if (ex === 'yes' || ex ==='y') {
        try {
            obj = {
                "images": images
            }
            file = "./data/storms/" + storm + "/images.txt";
            fs.writeFile(file, JSON.stringify(obj), (err) => console.log(err));
            console.log('saved');
        }
        catch (e) {
            console.log('unable to write to file');
            console.log(e);
        }

    }
}


storm = input.question("enter storm name: ");
get_storm_names(storm);