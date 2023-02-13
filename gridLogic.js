const slider = document.getElementById('myRange');
const reset = document.getElementById('reset');
const rainbow = document.getElementById('rainbow');

const canvas = document.getElementById('canvas');
canvas.width = canvas.height = Math.min(1000, window.innerWidth);

const ctx = canvas.getContext('2d');
let cells = 20;
let cellPixelLength = (canvas.height / cells);

paintColour = 'black';

resetBoard();

canvas.addEventListener('mousedown', function(e) { 
    drawOnMouseDown(e);
    canvas.addEventListener('mousemove', drawOnMouseDown);
});
canvas.addEventListener('mouseup', function(e) {
    canvas.removeEventListener('mousemove', drawOnMouseDown);
});
reset.addEventListener('click', function() {
    resetBoard();
});


function drawOnMouseDown(e) {

    const canvasBoundingRect = canvas.getBoundingClientRect();

    scaleX = canvas.width / canvasBoundingRect.width;
    scaleY = canvas.height / canvasBoundingRect.height;


    const x = (e.clientX - canvasBoundingRect.left) * scaleX;
    const y = (e.clientY - canvasBoundingRect.top) * scaleY;

    fillCell(Math.floor(x / cellPixelLength), Math.floor(y / cellPixelLength));

}

function fillCell(x,y){
    ctx.fillStyle = paintColour;
    ctx.fillRect(x * cellPixelLength, y * cellPixelLength, cellPixelLength, cellPixelLength);

}


rainbow.addEventListener('click', function() {
    paintColour = 'yellow';
    var grid = document.getElementById('grid');

});

function resetBoard(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


var colorPickerButton = document.getElementById("custom");
var colorPickerDialog = document.getElementById("color-picker-dialog");
var colorPicker = document.getElementById("color-picker");

colorPickerButton.addEventListener("click", function() {
    colorPickerDialog.removeAttribute("hidden");
});

colorPicker.addEventListener("change", function() {
    var selectedColor = colorPicker.value;
    // Do something with the selected color
    paintColour = selectedColor;
    colorPickerDialog.setAttribute("hidden", true);
});



