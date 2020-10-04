img_base_url = "https://coastalimagelabeler.science/api/image/";
img_compressed = "/compressed";
img_original = "/original";
img_grad = "/gradcam";


function postData(report_url, data = {}) {
  fetch(report_url) // Call the fetch function passing the url of the API as a parameter
    .then((response) => response.json())
    .then(function (data) {
      // This is where you run code if the server returns any errors
      console.log(data);
      alert(data);
    });
}


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
        let count = 0;

        let popupContent = document.createElement("div");
        popupContent.innerText =
          "Storm ID: " +
          storm_id +
          "\n Image: " +
          image +
          "\n Date: " +
          date +
          "\n Prediction: " + (wash_pred != null ? wash_pred.substring(0, 4) : "");

        let popupLink = document.createElement("a");
        popupLink.classList.add("img-link");
        popupLink.href = img_base_url + id + img_compressed;
        popupLink.style.display = "block";
        popupLink.target = "_blank";
        popupLink.text = "View Image";

        let ML_link = document.createElement("a");
        ML_link.classList.add("img-link");
        ML_link.href = img_base_url + id + img_grad;
        ML_link.style.display = "block";
        ML_link.target = "_blank";
        ML_link.text = "View ML Results";    
        count++;

        let report_link = document.createElement("button");
        report_link.id = "report-link";
        report_link.innerHTML = "No Washover in Image";
        report_link.style.cssText = `
          background-color: darkred;
          height: 50px;
          width: 100px;
          border: none;
          font-color: white;
          color: white;
        `;
        console.log('count: ', count);
        const params = "?storm_id="+storm_id+"&archive="+archive+"&image="+image+"&id="+id;
        console.log('params: ', params);
        report_url = "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec" + params;
        console.log(report_url);
        
        report_link.addEventListener("click", function () {
          postData(report_url);
        });



        if (wash_pred > 0.75) {
          const marker = L.marker([lat, lon]).bindPopup(popupContent, {
            // minWidth: 210,
          });
          marker.on("click", function () {
              popupContent.appendChild(popupLink);
              popupContent.appendChild(ML_link);
              popupContent.appendChild(report_link);
              console.log(++count);

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
