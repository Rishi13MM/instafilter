"use strict"

const imageInputEl = document.getElementById("image-input");
const imageCanvasEl = document.getElementById("image-canvas");
const canvasContext = imageCanvasEl.getContext("2d");
const filterContainerEl = document.querySelector(".filters");

let image = null;

const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    opacity: {
        value: 200,
        min: 0,
        max: 200,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
}


function createFilterElement(name, value, min, max) {
    const divEl = document.createElement("div");
    divEl.classList.add("filter");
    
    const paragraphEl = document.createElement("p");
    paragraphEl.textContent = name;

    const inputEl = document.createElement("input");
    inputEl.type = "range";
    inputEl.min = min;
    inputEl.max = max;
    inputEl.value = value;
    inputEl.id = name;

    inputEl.addEventListener("input", (e)=>{
        filters[name].value = inputEl.value;

        applyFilter(name, inputEl.value, filters[name].unit);
    });

    divEl.append(paragraphEl, inputEl);

    return divEl;
}



Object.keys(filters).forEach(key => {
    const filterEl = createFilterElement(key, filters[key].value, filters[key].min, filters[key].max);

    filterContainerEl.append(filterEl);
});




imageInputEl.addEventListener("change", (e) => {
    const file = e.target.files[0];

    image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
        document.querySelector(".placeholder").classList.add("hidden");
        imageCanvasEl.classList.remove("hidden");

        imageCanvasEl.width = image.width;
        imageCanvasEl.height = image.height;
        canvasContext.drawImage(image, 0, 0);
    }
});