import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import $ from "jquery";
import App from "./App.jsx";

window.$ = $;
window.jQuery = $;

// JS
import "./js/bootstrap.min.js";
import "./js/swiper-bundle.min.js";
import "./js/carousel.js";
import "./js/jquery.nice-select.min.js";
import "./js/animation_heading.js";
import "./js/rangle-slider.js";
import "./js/shortcodes.js";
import "./js/lazysize.min.js";

// CSS
import "./fonts/fonts.css";
import "./fonts/font-icons.css";
import "./css/bootstrap.min.css";
import "./css/swiper-bundle.min.css";
import "./css/animate.css";
import "./css/styles.css";

createRoot(document.getElementById("root")).render(
  <App />
);
