img_base_url = "https://coastalimagelabeler.science/api/image/";
img_compressed = "/compressed";
img_original = "/original";
img_grad = "/gradcam";

function getSampleData(url, order) {
  let csv_data = "";
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      csv_data = text;
      markers = csv_data.split("\n");
      markers.shift();

      let markerGroup = L.markerClusterGroup();
      markers.forEach((element) => {
        vals = element.split(",");
        let storm_id = vals[0];
        let archive = vals[1];
        let image = vals[2];
        let date = vals[3];
        let wash_pred = vals[4];
        let id = vals[5];
        let lat = vals[6];
        let lon = vals[7];

        let popupContent = document.createElement("div");
        popupContent.innerText =
          "Storm ID: " +
          storm_id +
          "\n Image: " +
          image +
          "\n Date: " +
          date +
          "\n Prediction: " + (wash_pred != null ? wash_pred.substring(0, 4) : "");
        // "\n Latitude: " +
        // lat +
        // "\n Longitude: " +
        // lon;
        // Archive: " +
        //           archive

        let popupLink = document.createElement("a");
        popupLink.classList.add("img-link");
        popupLink.href = "imageviewer.html";
        popupLink.addEventListener("click", function () {
            console.log("clicked");
                    window.sessionStorage.img_src =
                      img_base_url + id + img_compressed;
                    console.log(window.sessionStorage.img_src);

        });
        popupLink.style.display = "block";
        popupLink.target = "_blank";
        popupLink.text = "View Image";

        let ML_link = document.createElement("a");
        ML_link.classList.add("img-link");
        ML_link.href = "imageviewer.html";
        ML_link.addEventListener("click", function () {
          console.log("clicked");
          window.sessionStorage.img_src = img_base_url + id + img_grad;
          console.log(window.sessionStorage.img_src);
        });
        ML_link.style.display = "block";
        ML_link.target = "_blank";
        ML_link.text = "View ML Results Link";        


        // ML_link.innerHTML =
        //   '<img src="' +
        //   img_base_url +
        //   id +
        //   '" style="width: 200px;height:200px;"></img>';

        // let popupBtn = document.createElement("button");
        // popupBtn.innerHTML = "View Image";
        // popupBtn.onclick = function () {
        // let popupImg = document.createElement("img");
        // popupImg.src =
        //   "https://coastalimagelabeler.science/api/image/show/Compressed/" +
        //   id;
        // popupImg.style.cssText = `
        //   height: 200px;
        //   width: 200px;
        //   `;
        // popupBtn.appendChild(popupImg);
        // };
        // popupBtn.style.cssText = `
        // height: 25px;
        // width: auto;
        // display: block;
        // `;

        //
        // ML_link.appendChild(popupBtn);

        if (wash_pred > 0.75) {
          const marker = L.marker([lat, lon]).bindPopup(popupContent, {
            // minWidth: 210,
          });
          marker.on("click", function () {
              popupContent.appendChild(popupLink);
              popupContent.appendChild(ML_link);
          });

          markerGroup.addLayer(marker);
        }
      });

      if (order == 1) {
        iLayers["ML Predicted Overwash"] = markerGroup;
        overlayLayers = iLayers;
        layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(
          map
        );
        getSampleData("data/HurricaneFlorenceSampleData.csv", 2);
      } else if (order == 2) {
        fLayers["ML Predicted Overwash"] = markerGroup;
        getSampleData("data/HurricaneMichaelSampleData.csv", 3);
      } else {
        mLayers["ML Predicted Overwash"] = markerGroup;
      }
    });
}
