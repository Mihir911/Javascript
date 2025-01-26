let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let draw = false;
let erase = false;
let deviceType = "";
const events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    }
};

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let width = parseInt(gridWidth.value);
    let height = parseInt(gridHeight.value);

    for (let i = 0; i < height; i++) {
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < width; j++) {
            let col = document.createElement("div");
            col.classList.add("gridCol");


            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });


            col.addEventListener(events[deviceType].move, (e) => {
                if (draw) {
                    if (erase) {
                        col.style.backgroundColor = "transparent";
                    } else {
                        col.style.backgroundColor = colorButton.value;
                    }
                }
            });


            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
    gridWidth.value = 10;
    gridHeight.value = 10;
    widthValue.innerHTML = gridWidth.value;
    heightValue.innerHTML = gridHeight.value;
    colorButton.value = "#000000";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
    paintBtn.classList.remove("active");
    eraseBtn.classList.add("active");
});

paintBtn.addEventListener("click", () => {
    erase = false;
    eraseBtn.classList.remove("active");
    paintBtn.classList.add("active");
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridWidth.value = 10;
    gridHeight.value = 10;
    widthValue.innerHTML = gridWidth.value;
    heightValue.innerHTML = gridHeight.value;
};
