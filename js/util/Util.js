class Util {

    static populateStormSelector(stormNames) {
        for (let name of stormNames) {
            let displayName = name.charAt(0).toUpperCase() + name.slice(1)
            $("#storm-selector").append(new Option(displayName, name))
        }
    }

    static changeStorm() {

        if (layersControl) layersControl.remove()
      
        map.eachLayer((layer) => {
          map.removeLayer(layer);
        });
      
        map.addLayer(toner_lite);
      
        currentStorm = $("#storm-selector").val().toLowerCase();
        layersControl = new L.Control.Layers(baseLayers, controls[currentStorm]).addTo(map);
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
      
      static createPopupLink(id, img_type, text) {
        let newlink = document.createElement('a');
        newlink.classList.add("img-link");
        newlink.href = CIL_API_Driver.generate_url(id, img_type)
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
        report_button.href = CIL_API_Driver.REPORT_URL + params;
      
        report_button.addEventListener("click", () => {
          let result = confirm("Are you sure you want to report no washover?")
          
          if (result) {
            appendSheet(report_button.href);
            appendFile(params)
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
      
          let popupLink = create_popup_link(id, "compressed", "View Image")
          let ML_link = create_popup_link(id, "grad", "View ML Results")
          let report_button = create_popup_button(params)
      
          const marker = L.marker([lat, lon]).bindPopup(popupContent);
          popupContent.appendChild(popupLink);
          popupContent.appendChild(ML_link);
          popupContent.appendChild(report_button);
          return marker
        }
      }    

}