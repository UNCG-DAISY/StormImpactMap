const axios = require('axios').default
const fs = require('fs');
const input = require('readline-sync')

re = /([0-9]{8}[abc])/g

//approach 1:
//    - make request at zeta_url
//    - 
//
//approach 2:
//   - go to main_url + "storms" + %%storm%% + "js/app.js"
//   - search for regex matches
//   - print matches

 function get_storm_names(storm) {
    ep = "https://storms.ngs.noaa.gov/storms/" + storm + "/";
    x = ep + storm + ".json";
    y = ep + "js/app.js";

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
            save_images(Array.from(matches).join());
        });
    }

function get_src(url) {
    return axios.get(url)
        .then(function (res) {
            data = res.data;
            matches = new Set(data.match(re))
        
            for (x of matches) {
                console.log(x);
            }
            save_images(Array.from(matches).join());
        });
    }

function save_images(content) {
    ex = input.question('export to file?: ');
    if (ex === 'yes' || ex ==='y') {
        try {
            file = "../data/storms/" + storm + "/images";
            fs.writeFile(file, content, (err) => console.log(err));
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

