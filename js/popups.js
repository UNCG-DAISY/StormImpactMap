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
          "\n Prediction: " +
          wash_pred.substring(0, 4);
        // "\n Latitude: " +
        // lat +
        // "\n Longitude: " +
        // lon;
        // Archive: " +
        //           archive

        let popupLink = document.createElement("a");
        popupLink.href =
          "https://coastalimagelabeler.science/api/image/show/Compressed/" + id;
        popupLink.style.display = "block";
        popupLink.target = "_blank";
        popupLink.innerHTML =
          `
        <img src="https://coastalimagelabeler.science/api/image/show/Compressed/` +
          id +
          `" style="width: 200px;height:200px;"></img>`;

        let popupBtn = document.createElement("button");
        popupBtn.innerHTML = "View Image";
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
        popupBtn.style.cssText = `
        height: 25px;
        width: auto;
        display: block;
        `;

        //
        // popupLink.appendChild(popupBtn);

        imgLoad("http://i.imgur.com/YzkSFCW.png").then(
          function (response) {
            // The first runs when the promise resolves, with the request.reponse specified within the resolve() method.
            var imageURL = window.URL.createObjectURL(response);
            myImage.src = imageURL;
            body.appendChild(myImage);
            // The second runs when the promise is rejected, and logs the Error specified with the reject() method.
          },
          function (Error) {
            console.log(Error);
          }
        );

        if (wash_pred > 0.75) {
          const marker = L.marker([lat, lon]).bindPopup(popupContent, {
            // minWidth: 210,
          });
          marker.on("click", popupContent.appendChild(popupLink));

          markerGroup.addLayer(marker);
        }
      });

      if (order == 1) {
        iLayers["CSV"] = markerGroup;
        overlayLayers = iLayers;
        layersControl = new L.Control.Layers(baseLayers, overlayLayers).addTo(
          map
        );
        getSampleData("data/HurricaneFlorenceSampleData.csv", 2);
      } else if (order == 2) {
        fLayers["CSV"] = markerGroup;
        getSampleData("data/HurricaneMichaelSampleData.csv", 3);
      } else {
        mLayers["CSV"] = markerGroup;
      }
    });
}
