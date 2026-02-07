"use strict"

const filterContainerEl = document.querySelector(".filters");

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
    exposure: {
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
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    sepia: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    invert: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
}


function createFilterElement(name, value, min, max) {
    const divEl = document.createElement("div");
    divEl.classList.add("filter");
    divEl.innerHTML =
        `<p>${name}</p>
    <input type="range" min="${min}" max="${max}" value="${value}" name="${name}">`

    return divEl;
}



Object.keys(filters).forEach(key => {
    const filterEl = createFilterElement(key, filters[key].value, filters[key].min, filters[key].max);

    filterContainerEl.append(filterEl);
}); 