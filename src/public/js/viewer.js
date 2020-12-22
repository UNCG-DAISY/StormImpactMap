images = [
    "../public/images/test1",
    "../public/images/test2"
];



function load_images() {



}

function next_image() {

    img = document.createElement("img");
    img.setAttribute("src", "../public/images/test2.png")
    img.setAttribute("id", "image")

    imgContainer = document.getElementsByClassName("image")[0];
    console.log(img);
    console.log(typeof imgContainer)
    imgContainer.replaceChild(img, document.getElementById("image"));

}

function prev_image() {

    img = document.createElement("img");
    img.setAttribute("src", "../public/images/test.png")
    img.setAttribute("id", "image")

    imgContainer = document.getElementsByClassName("image")[0];
    console.log(img);
    console.log(typeof imgContainer)
    imgContainer.replaceChild(img, document.getElementById("image"));    
}

function report() {

}