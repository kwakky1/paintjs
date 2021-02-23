const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const lineWidth = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5

let painting = false;
let filling = false;

const onMouseUp = () => {
    painting = false;
}
function onMouseMove(e) {
    const x = e.offsetX
    const y = e.offsetY
    if(!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}

const stopPainting = (e) => {
    painting = false;
}

const onMouseDown = (e) => {
    painting = true;
}

const handleColorClick = (e) => {
    let color = e.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

const handleLineWidth = (e) => {
    ctx.lineWidth = e.target.value;
}

const handleModeClick = () => {
    if(filling) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

const handleCanvasClick = () => {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

const handleSaveClick = () => {
    const image = canvas.toDataURL()
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint"
    link.click();
};

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown)
    canvas.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
lineWidth.addEventListener("change", handleLineWidth)
mode.addEventListener("click", handleModeClick)
save.addEventListener("click", handleSaveClick)