"use strict"

const downloadButtonEl = document.getElementById("download-btn");
const resetbuttonEl = document.getElementById("reset-btn");
const imageInputEl = document.getElementById("image-input");
const imageCanvasEl = document.getElementById("image-canvas");
const canvasContext = imageCanvasEl.getContext("2d");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const filterContainerEl = document.querySelector(".filters");
const presetContainerEl = document.querySelector(".presets");

let image = null;
let presets = getPresets();
let filters = getFilters();
let imageExtensions = getImageExtensions();


initFiltersUI(); 2
initPresetsUI();


imageInputEl.addEventListener("change", (e) => {

    try {
        const file = e.target.files[0];

        if (!isImage(file.name)) {
            throw new Error("Invalid image type");
        }

        image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
            resetFiltersUI();

            document.querySelector(".placeholder").classList.add("hidden");
            imageCanvasEl.classList.remove("hidden");

            imageCanvasEl.width = image.width;
            imageCanvasEl.height = image.height;

            renderCanvas();
        }

    } catch (error) {
        console.error(error);
        alert(`${error.message}\nTry again with an image...`);
    }
});

resetbuttonEl.addEventListener("click", (e) => {
    renderCanvas();
    resetFiltersUI();
});

downloadButtonEl.addEventListener("click", (e) => {
    try {
        if (!(image instanceof Image) || !(image.complete)) {
            throw new Error("No image chosen");
        }

        const linkEl = document.createElement("a");
        linkEl.download = "edited-image.jpg";
        linkEl.href = imageCanvasEl.toDataURL();
        linkEl.click();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Remove active state
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanels.forEach(p => p.classList.remove("active"));

        // Activate clicked tab
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab)
        .classList.add("active");
    });
});


function createFilterElement(name, value, min, max) {
    const divEl = document.createElement("div");
    divEl.classList.add("filter");

    const paragraphEl = document.createElement("p");
    paragraphEl.textContent = name;
    paragraphEl.style.textTransform = "capitalize";

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
            value: 100,
            min: 0,
            max: 100,
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

function getPresets() {
    return {
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
    }
}

function getImageExtensions() {
    return [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "tiff",
        "webp",
        "svg",
        "heif",
        "heic"
    ];

}

function initFiltersUI() {
    Object.keys(filters).forEach(key => {
        const filterEl = createFilterElement(key, filters[key].value, filters[key].min, filters[key].max);

        filterContainerEl.append(filterEl);
    });
}

function initPresetsUI() {
    Object.keys(presets).forEach((preset) => {
        const presetEl = document.createElement("button");
        presetEl.classList.add("preset-btn", "btn");
        presetEl.textContent = preset;
        presetEl.style.textTransform = "capitalize";

        presetEl.addEventListener("click", (e) => {
            for (const key in (presets[preset])) {
                filters[key].value = presets[preset][key];
                console.log(key, filters[key].value);
            }

            applyFilters();
            document.querySelectorAll("input[type='range']").forEach(inputEl => {
                inputEl.value = filters[inputEl.id].value;
            });
        });

        presetContainerEl.append(presetEl);

    });
}

function resetFiltersUI() {
    filters = getFilters();
    const inputsEl = document.querySelectorAll("input[type='range']");
    inputsEl.forEach((inputEl) => {
        inputEl.value = filters[inputEl.id].value;
    });
}

function renderCanvas(filterStr) {
    if (filterStr) {
        canvasContext.filter = filterStr;
    } else {
        canvasContext.filter = "none";
    }

    // Clear previous drawing
    canvasContext.clearRect(0, 0, imageCanvasEl.width, imageCanvasEl.height);

    // Draw image with canvas size
    canvasContext.drawImage(
        image,
        0,
        0,
        imageCanvasEl.width,
        imageCanvasEl.height
    );
}

function applyFilters() {
    const filterStr = `
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

    renderCanvas(filterStr);
}

function isImage(filename) {
    const fileExtension = filename.split(".")[filename.split(".").length - 1]

    return imageExtensions.includes(fileExtension);
}