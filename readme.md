# InstaFilter 🎨

InstaFilter is a client-side image editing web application that allows users to apply real-time filters and preset effects directly in the browser using the HTML5 Canvas API.

The application provides adjustable filter controls, a tab-based interface for filters and presets, image validation, download functionality, and a fully responsive layout — built entirely with vanilla JavaScript (no external libraries or frameworks).

---

## 🚀 Live Demo

🚧 Deployment in progress

---

## ✨ Features

* 📂 Upload images (JPG, JPEG, PNG, WEBP, GIF, etc.)
* 🎛 Adjustable image filters:

  * Brightness
  * Contrast
  * Saturation
  * Hue Rotation
  * Blur
  * Grayscale
  * Sepia
  * Opacity
  * Invert
* 🎨 One-click preset effects (Retro, Vintage, Noir, Cyberpunk, etc.)
* 🧠 Tab-based navigation for switching between Filters and Presets
* 🔄 Reset filters to default values
* 💾 Download edited image as JPG
* ⚠️ Image type validation with error handling
* 📱 Fully responsive design (desktop, tablet, mobile)

---

## 🛠 Tech Stack

* **HTML5**
* **CSS3**

  * Flexbox
  * CSS Variables (Design Tokens)
  * Media Queries for responsiveness
* **JavaScript (ES6+)**

  * DOM Manipulation
  * Event Handling
  * HTML5 Canvas API

No frameworks. No libraries. Pure frontend implementation.

---

## 📁 Project Structure

```
InstaFilter/
│
├── index.html
├── README.md
├── .gitignore
│
└── src/
    ├── css/
    │   ├── theme.css
    │   └── style.css
    │
    ├── js/
    │   └── script.js
    │
    └── assets/
        └── favicon.png
```

---

## 🧩 How It Works

1. The user selects an image from their device.
2. A temporary object URL is created and loaded into an `HTMLImageElement`.
3. The image is drawn onto an HTML5 `<canvas>` element.
4. Filter values are stored in a centralized `filters` state object.
5. When a filter is adjusted:

   * A filter string is dynamically generated (e.g., `brightness(120%) contrast(110%)`).
   * The filter string is applied using `CanvasRenderingContext2D.filter`.
   * The canvas is re-rendered with the updated filter values.
6. Presets update multiple filter values at once.
7. The final edited image is exported using `canvas.toDataURL()` and downloaded.

---

## 🧠 Architecture Highlights

* Centralized filter state management
* Data-driven preset configuration
* Dynamic UI generation for filters and presets
* Tab-based content switching using class state
* Clean separation of concerns (HTML / CSS / JS)
* Reusable design tokens via CSS variables
* Defensive programming with image validation

---

## 🖥️ How to Run Locally

1. Clone the repository:

```
git clone https://github.com/rishi13mm/instafilter.git
```

2. Navigate to the project folder.
3. Open `index.html` in your browser.

No build tools required.

---

## 📌 Future Improvements

* Drag & drop image upload
* Undo / redo functionality
* Crop / resize support
* Dark / light theme toggle
* Improved accessibility

---

## 👨‍💻 Author

**Rishi**
MCA Student

---