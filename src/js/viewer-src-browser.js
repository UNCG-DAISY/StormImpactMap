function next_image() {
    index++;
    set_image(index);
}

function prev_image() {
    if (index > 0) {
        index--;
        set_image(index);
    }
}

function report() {
    alert("you reported no washover");
}

function set_image(new_index) {
    img = document.getElementById("image");
    img.setAttribute("src", img_base_url + images[new_index] + img_compressed);    
}