var socket;
var colors = [];

console.log("press R to toggle Red")
console.log("press G to toggle Green")
console.log("press B to toggle Blue")
console.log("click to ink 1 pixel")

socket = io.connect();

socket.on("srv_color", function(color) {
    colors.push(color)
    drawPixel(color.x, color.y, color.r, color.g, color.b, 255);
    g.putImageData(canvasData,0,0)
})

var keyRed = false;
var keyBlue = false;
var keyGreen = false;

document.onkeypress = function(evt) {
    if (evt.keyCode == 'r'.charCodeAt(0)) { keyRed = !keyRed; }
    if (evt.keyCode == 'g'.charCodeAt(0)) { keyGreen = !keyGreen; }
    if (evt.keyCode == 'b'.charCodeAt(0)) { keyBlue = !keyBlue; }
}

document.onmousedown = function(evt) {
    if (!keyRed && !keyBlue && !keyGreen) {
        newColor({x:evt.offsetX, y:evt.offsetY, r:255, g:255, b:255});
    } else {
        newColor({x:evt.offsetX, y:evt.offsetY, r:keyRed?255:0, b:keyBlue?255:0, g:keyGreen?255:0});
    }
}

function newColor(color) {
    socket.emit("cli_color",color);
}

var canvas = document.getElementById("canvas");
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;
var g = canvas.getContext("2d");
var canvasData = g.getImageData(0, 0, canvas.width, canvas.height);

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvas.width) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

