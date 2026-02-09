"use strict"

const downloadButtonEl = document.getElementById("download-btn");
const resetbuttonEl = document.getElementById("reset-btn");
const imageInputEl = document.getElementById("image-input");
const imageCanvasEl = document.getElementById("image-canvas");
const canvasContext = imageCanvasEl.getContext("2d");
const filterContainerEl = document.querySelector(".filters");
const presetContainerEl = document.querySelector(".presets");

let image = null;

let filters = getFilters();


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

    inputEl.addEventListener("input", (e) => {
        filters[name].value = inputEl.value;
        applyFilters();
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


function applyFilters() {
    // Clear previous drawing

    if (!(image instanceof HTMLImageElement) || !image.complete) return;

    canvasContext.clearRect(0, 0, imageCanvasEl.width, imageCanvasEl.height);

    canvasContext.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
    `.trim();

    // Draw image with canvas size (important)
    canvasContext.drawImage(
        image,
        0,
        0,
        imageCanvasEl.width,
        imageCanvasEl.height
    );
}



resetbuttonEl.addEventListener("click", (e) => {

    if (image) {
        canvasContext.clearRect(0, 0, imageCanvasEl.width,imageCanvasEl.height);

        canvasContext.filter = "none";
        canvasContext.drawImage(
            image,
            0,
            0,
            imageCanvasEl.width,
            imageCanvasEl.height
        );

        filters = getFilters();

        const inputsEl = document.querySelectorAll("input[type='range']");

        inputsEl.forEach((inputEl)=>{
            inputEl.value = filters[inputEl.id].value;
        });
    }
});


downloadButtonEl.addEventListener("click", (e)=>{
    const linkEl = document.createElement("a");
    linkEl.download = "edited-image.jpg";
    linkEl.href = imageCanvasEl.toDataURL();
    linkEl.click();
});



const presets = {
    normal: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 90,
        contrast: 140,
        saturation: 110,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 90,
        saturation: 85,
        hueRotation: 15,
        blur: 0,
        grayscale: 20,
        sepia: 60,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 95,
        contrast: 85,
        saturation: 70,
        hueRotation: 20,
        blur: 0,
        grayscale: 25,
        sepia: 80,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 120,
        hueRotation: 10,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 90,
        hueRotation: 200,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 105,
        contrast: 80,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        grayscale: 15,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 3,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    cyberpunk: {
        brightness: 110,
        contrast: 130,
        saturation: 140,
        hueRotation: 280,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};


Object.keys(presets).forEach((preset)=>{
    const presetEl = document.createElement("button");
    presetEl.classList.add("preset-btn", "btn");
    presetEl.textContent = preset;

    presetEl.addEventListener("click", (e)=>{
        
        for (const key in (presets[preset])) {
            filters[key].value = presets[preset][key];
            console.log(key ,filters[key].value);
        }
        applyFilters();

        document.querySelectorAll("input[type='range']").forEach(inputEl => {
        inputEl.value = filters[inputEl.id].value;
    });
    });

    presetContainerEl.append(presetEl);

});


function getFilters() {
    return {
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
}