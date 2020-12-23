img_base_url = "https://coastalimagelabeler.science/api/image/";
img_compressed = "/compressed";
img_original = "/original";
img_grad = "/gradcam";
report_url = "https://script.google.com/macros/s/AKfycbz8g3rBKzM3YD345fwKHj2do7OFBEcOPWZhqt2J5LgaNg11tHwT/exec";

function load_images(callback) {
    var ids = []
    url = "/data/HurricaneFlorenceSampleData.csv";
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
        callback(ids);
        console.log('done')
    });
   ;
}
