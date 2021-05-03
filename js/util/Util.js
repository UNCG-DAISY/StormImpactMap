class Util {

  static img_base_url = "https://coastalimagelabeler.science/api/image/";
  static img_compressed = "/compressed";
  static img_original = "/original";
  static img_grad = "/gradcam";
  static REPORT_URL = "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec";

  static generate_url(id, img_type) {
    if (img_type == "compressed") {
        return this.IMG_BASE_URL + id + this.IMG_COMPRESSED;
    }
    else return this.IMG_BASE_URL + id + this.IMG_GRAD;
}

static load_images() {
    let ids = []
    let url = "https://raw.githubusercontent.com/UNCG-DAISY/StormImpactMap/master/data/HurricaneFlorenceSampleData.csv";
    let csv_data = "";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        csv_data = text;
        images = csv_data.split("\n");
        images.shift();

        images.forEach((element) => {
            vals = element.split(",");
            let id = vals[5];
            ids.push(id);            
        });  
        // callback(ids);
        console.log(ids)
        
        console.log('done')
    });
  }

  static async loadAllStorms() {
    let storms = {}
    let res = await fetch("data/storms_config.json")
    let stormData = await res.json()
  
    for (const stormName in stormData) {
        let storm = await (new Storm(stormName, stormData[stormName])).init()
        storms[stormName] = storm
    }
    return storms
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
    static populateStormSelector(stormNames) {
        for (let name of stormNames) {
            let displayName = name.charAt(0).toUpperCase() + name.slice(1)
            $("#storm-selector").append(new Option(displayName, name))
        }
    }
      
    static setSidebarTransition() {
        let collapsed = true;
        $(".hamburger").click(function () {
          $('.hamburger').toggleClass("is-active");
          if (collapsed) {
            $("#sidenav").css("width", "200");
            $("#sidenav").css("transition", "width .5s");
            setTimeout(() => {
              $(".menu-title").css("display", "inline");
              collapsed = false;
            }, 500);
          } else {
            $("#sidenav").css("width", "70");
            $(".menu-title").css("display", "none");
            collapsed = true;
          }
        });
      }
      
      static assignColor (feature) {
        let povw = feature.properties.POVW;
        if (povw >= 80) {
            return { color: "#ff0000" };
        } else if (povw < 80 && povw >= 60) {
            return { color: "#ff3700" };
        } else if (povw < 60 && povw >= 40) {
            return { color: "#ff5703" };
        } else if (povw >= 20) {
            return { color: "#ffb477" };
        } else {
            return { color: "#ffd840" };
        }
      }

      static appendSheet(report_url) {
        fetch(report_url) // Call the fetch function passing the url of the API as a parameter
          .then((response) => response.json())
          .then(function (data) {
            // This is where you run code if the server returns any errors
            // console.log(data);
          });
    }
    
    /*
      sends a GET request to the main backend endpoint w/ required parameters
    */
    
    static async appendFile(params) {
      let url = "/feedback" + params
      const res = await fetch(url)
      data = await res.text()
      alert(data)
    }
      
      static createPopupLink(id, img_type, text) {
        let newlink = document.createElement('a');
        newlink.classList.add("img-link");
        newlink.href = this.generate_url(id, img_type)
        newlink.style.display = "block";
        newlink.target = "_blank";
        newlink.text = text;
        return newlink
      }
      
      static createPopupButton(params) {
        var report_button = document.createElement("button");
        report_button.id = "report-link";
        report_button.innerHTML = "Tell us if there no washover in the image";
        report_button.style.cssText = `
            background-color: darkred;
            height: 60px;
            width: 140px;
            border: none;
            box-sizing: border-box;
            border-color: black;
            border-style: solid;
            border-radius: 2px;
            font-color: white;
            color: white;
        `;
        report_button.href = this.REPORT_URL + params;
      
        report_button.addEventListener("click", () => {
          let result = confirm("Are you sure you want to report no washover?")
          
          if (result) {
            console.log(report_button.href)
            this.appendSheet(report_button.href);
            this.appendFile(params)
          }
        });  
        return report_button
      }
      
      static createMarker(element) {
        let vals = element.split(",");
        let storm_id = vals[0];
        let archive = vals[1];
        let image = vals[2];
        let date = vals[3];
        let wash_pred = vals[4];
        let id = vals[5];
        let lat = vals[6];
        let lon = vals[7];
      
        if (wash_pred > 0.75) {
      
          const params = "?storm_id=" + storm_id + "&archive=" + archive + "&image=" + image + "&id=" + id + "&wash_pred=" + wash_pred;
      
          let popupContent = document.createElement("div");
          popupContent.innerText =
            "Storm ID: " +
            storm_id +
            "\n Image: " +
            image +
            "\n Date: " +
            date +
            "\n Washover Probability: " + (wash_pred != null ? wash_pred.substring(0, 4) : "");
      
          let popupLink = this.createPopupLink(id, "compressed", "View Image")
          let ML_link = this.createPopupLink(id, "grad", "View ML Results")
          let report_button = this.createPopupButton(params)
      
          const marker = L.marker([lat, lon]).bindPopup(popupContent);
          popupContent.appendChild(popupLink);
          popupContent.appendChild(ML_link);
          popupContent.appendChild(report_button);
          return marker
        }
      }    

}