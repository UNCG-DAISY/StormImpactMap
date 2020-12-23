
function next_image() {
    img = document.createElement("img");
    img.setAttribute("src", "../public/images/test2.png")
    img.setAttribute("id", "image")
    imgContainer = document.getElementsByClassName("image")[0];
    imgContainer.replaceChild(img, document.getElementById("image"));
}

function prev_image() {
    img = document.createElement("img");
    img.setAttribute("src", "../public/images/test.png")
    img.setAttribute("id", "image")
    imgContainer = document.getElementsByClassName("image")[0];
    imgContainer.replaceChild(img, document.getElementById("image"));    
}

function report() {
    alert("you reported no washover");
}
