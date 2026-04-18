import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import $ from "jquery";

window.$ = $;
window.jQuery = $;

// Load plugins AFTER jQuery is set
await import("./js/bootstrap.min.js");
await import("./js/swiper-bundle.min.js");
await import("./js/carousel.js");
await import("./js/jquery.nice-select.min.js");
await import("./js/animation_heading.js");
await import("./js/rangle-slider.js");
await import("./js/shortcodes.js");
await import("./js/lazysize.min.js");

// CSS
import "./fonts/fonts.css";
import "./fonts/font-icons.css";
import "./css/bootstrap.min.css";
import "./css/swiper-bundle.min.css";
import "./css/animate.css";
import "./css/styles.css";

createRoot(document.getElementById("root")).render(<App />);
