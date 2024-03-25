const slider = document.getElementById('myRange');
const reset = document.getElementById('reset');
const rainbow = document.getElementById('rainbow');
const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById("color-picker");

canvas.width = canvas.height = Math.min(1000, window.innerWidth);

const ctx = canvas.getContext('2d');


// Initial dimension of canvas in drawable pixels and paint colour
let cells = 20;
let cellPixelLength = (canvas.height / cells);

paintColour = 'black';
colorPicker.style.border = "10px solid #E75480";
rainbow.style.border = "10px solid black";

// Hue used for rainbow mode
let hue = 0;
let rainbowMode = false;
// Satart with an empty grid
resetBoard();

reset.addEventListener('mouseenter', function( event ) {   
    event.target.style.background = "lightpink";
  }, false);

reset.addEventListener('mouseleave', function( event ) {
    event.target.style.background = "";
    }, false);

rainbow.addEventListener('mouseenter', function( event ) {
    event.target.style.background = "lightpink";
    }, false);

rainbow.addEventListener('mouseleave', function( event ) {
    event.target.style.background = "";
    }, false);

rainbow.addEventListener('click', function( event ) {
    event.target.style.border = "10px solid #E75480";
    colorPicker.style.border = "10px solid black";
    }, false);

colorPicker.addEventListener('click', function( event ) {
    event.target.style.border = "10px solid #E75480";
    rainbow.style.border = "10px solid black";
    rainbowMode = false;

    }, false);




canvas.addEventListener('mousedown', function(e) { 
    drawOnMouseDown(e);
    canvas.addEventListener('mousemove', drawOnMouseDown);
});

canvas.addEventListener('mouseup', function(e) {
    //We remove the mousemove listener when the mouse is up to allow the user to stop drawing.
    canvas.removeEventListener('mousemove', drawOnMouseDown);
});

reset.addEventListener('click', resetBoard);

rainbow.addEventListener('click', function() {
    rainbowMode = true;
});


function rainbowColor() {
  // increment hue by a fixed amount
  hue += 3;

  // wrap hue back to 0 when it reaches 360
  if (hue >= 360) {
    hue = 0;
  }

  // convert HSL values to RGB color
  const rgbColor = `hsl(${hue}, 100%, 50%)`;

  return rgbColor;
}

function drawOnMouseDown(e) {

    const canvasBoundingRect = canvas.getBoundingClientRect();

    // The scale is required because the canvas element can be scaled differently from it's otiginal 
    // size which could cause the mouse coordinates to be off.
    scaleX = canvas.width / canvasBoundingRect.width;
    scaleY = canvas.height / canvasBoundingRect.height;

    const x = (e.clientX - canvasBoundingRect.left) * scaleX;
    const y = (e.clientY - canvasBoundingRect.top) * scaleY;

    fillCell(Math.floor(x / cellPixelLength), Math.floor(y / cellPixelLength));
}

function fillCell(x,y){
    if (rainbowMode){
        ctx.fillStyle = rainbowColor();
    } else {
        ctx.fillStyle = paintColour;
    }
    ctx.fillRect(x * cellPixelLength, y * cellPixelLength, cellPixelLength, cellPixelLength);
}

function resetBoard(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

function drawGrid(){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
  
    //pixel size used as offset for each line
    let offsetX = (canvas.width / cells);
    let offsetY = (canvas.height / cells);
  
    //lines in x direction
    for (let x = offsetX; x < canvas.width; x += offsetX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    
    //ines in y direction
    for (let y = offsetY; y < canvas.height; y += offsetY) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    
    //actually draw the lines
    ctx.stroke();
}

colorPicker.addEventListener("change", function() {
    var selectedColor = colorPicker.value;
    paintColour = selectedColor;
    colorPickerDialog.setAttribute("hidden", true);
});

slider.oninput = function() {
    //slider is used to resize the canvas
    cells = this.value;
    cellPixelLength = (canvas.height / cells);
    resetBoard();
}