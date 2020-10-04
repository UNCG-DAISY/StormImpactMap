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

        let params = "?storm_id="+storm_id+"&archive="+archive+"&image="+image+"&id="+id;

                  report_url =
                    "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec";


// async function postData(url = report_url, data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     mode: "no-cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   })
//   return response.text(); // parses JSON response into native JavaScript objects
// }    


function postData(report_url, data = {})
{
    // fetch("https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec",{
    //     method:'GET',
    //     mode:'no-cors'
    // })
    // .then((response) => {
    //     // *** Check for HTTP failure
    //     if (!response.ok) {
    //         throw new Error("HTTP status " + response.status);
    //     }
    //     // *** Read the text of the response
    //     console.log(response);
    //     return response.text();
    // })
    // .then((message) => {
    //     // *** Use the text
    //     console.log('message: ', message);
    //     alert(message);
    // })
    // .catch((error) => {
    //     /* ...*** handle/report error, since this code doesn't return the promise chain...*/
    //     console.log(error);
    // });

fetch(
  "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec"
) // Call the fetch function passing the url of the API as a parameter
  .then(function () {
    // Your code for handling the data you get from the API
  })
  .catch(function () {
    // This is where you run code if the server returns any errors
  });    
}
        
        report_link.addEventListener("click", function () {
          postData();

          // fetch("https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec" + params, {mode: 'no-cors'})
          //   .then((response) => response.json())
          //   .then((data) => console.log(data));

        
          // let xhttp = new XMLHttpRequest();
          // xhttp.open(
          //   "GET",
          //   "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec" +
          //     params,
          //   true
          // );
          // xhttp.send();
        });



        if (wash_pred > 0.75) {
          const marker = L.marker([lat, lon]).bindPopup(popupContent, {
            // minWidth: 210,
          });
          marker.on("click", function () {
              popupContent.appendChild(popupLink);
              popupContent.appendChild(ML_link);
              popupContent.appendChild(report_link);

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
