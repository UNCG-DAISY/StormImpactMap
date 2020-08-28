function read_text(url, mime) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    if (request.overrideMimeType) {
        request.overrideMimeType(mime);
    }
    try {
        request.send();
        if (request.status != 0) {
            console.log('read_text', request.status, request.responseText);
        }
    } catch (e) {
        console.log('read_text', e.code);
    }
    return request.responseText;
}

function read_metadata() {
    var tilemap_txt = read_text("metadata.json", "application/json");
    if (tilemap_txt == null) {
        error('Cannot read tilemap.json');
        return null;
    }
    return JSON.parse(tilemap_txt);
}