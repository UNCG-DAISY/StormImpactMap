const axios = require('axios').default
const fs = require('fs');
const input = require('readline-sync')

re = /([0-9]{8}[abc])/g

 function get_storm_names(storm) {
    ep = "https://storms.ngs.noaa.gov/storms/" + storm + "/";
    x = ep + storm + ".json";
    y = ep + "js/app.js";
    console.log(x)
    console.log(y)
    get_json(x)
    .catch((err) => {
        console.log("Unavailable in JSON format");
        get_src(y)
        .catch( (err) => {
            console.log('Unable to find images for given storm');
        })
    })
}

function get_json(url) {
    return axios.get(url)
        .then(function (res) {
            data = JSON.stringify(res.data);
            matches = new Set(data.match(re))
            save_images(Array.from(matches), "leaflet");
        });
    }

function get_src(url) {
    return axios.get(url)
        .then(function (res) {
            data = res.data;
            matches = new Set(data.match(re))
            console.log("matches found: ", matches)
            console.log(data);
            try {
                server_id = data.match(/tiles([a-z])/)[1]
                console.log(server_id);
            }
            catch (e) {
                console.log(e)
            }

        
            for (x of matches) {
                console.log(x);
            }

            tmp = Array.from(matches)
            save_images(tmp, "mapbox");
        });
    }

function save_images(images, api) {
    ex = input.question('export to file?: ');
    if (ex === 'yes' || ex ==='y') {
        try {
            obj = {
                "images": images
            }
            file = "../data/storms/" + storm + "/images";
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


