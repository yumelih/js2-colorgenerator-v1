"use strict";

const generateBtn = document.querySelector(".main__btn");
const row = document.querySelector(".row");
const copiedText = document.querySelector(".copied");

const rgbMax = 255;
const rgbMin = 0;

const palette = [];

const generateRGBColor = function () {
  let rgb1 = Math.floor(Math.random() * (rgbMax - rgbMin + 1) + rgbMin);
  let rgb2 = Math.floor(Math.random() * (rgbMax - rgbMin + 1) + rgbMin);
  let rgb3 = Math.floor(Math.random() * (rgbMax - rgbMin + 1) + rgbMin);

  return [rgb1, rgb2, rgb3];

  //   return `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
};

const valueToHex = function (c) {
  const hex = c.toString(16);
  return hex;
};

const rgbToHex = function (r, g, b) {
  let hexr = valueToHex(r);
  let hexg = valueToHex(g);
  let hexb = valueToHex(b);

  if (hexr.length === 1) {
    hexr = "0" + hexr;
  }
  if (hexg.length === 1) {
    hexg = "0" + hexg;
  }
  if (hexb.length === 1) {
    hexb = "0" + hexb;
  }

  return hexr + hexg + hexb;
};

const generateColorComponent = function (color, colorText) {
  const html = `
    <div class="col-1-of-6">
        <div class="main__color-component" >
        <span class="main--color-circle" style="background:${color};" data-color=${colorText}></span>
        <p class="main--color-code u-small-text u-text-center" data-color=${colorText}>
            ${colorText}
        </p>
        </div>
    </div>`;

  row.insertAdjacentHTML("beforeend", html);
};

const generateColor = function (e) {
  // console.log(e.type, e);
  if ((e.type === "keydown" && e.key === " ") || e.type === "click") {
    const rgbColor = generateRGBColor();
    const [r, g, b] = rgbColor;
    const rgbColorText = `rgb(${r}, ${g}, ${b})`;
    const HexColor = rgbToHex(r, g, b);
    palette.push(HexColor);
    generateColorComponent(rgbColorText, `#${HexColor}`);
  }
};

const copyPalette = function (e) {
  // console.log(e.keyCode);
  if (e.code === "KeyC") {
    const newPalette = JSON.stringify(palette);
    navigator.clipboard.writeText(newPalette);
  }
};

row.addEventListener("click", function (e) {
  const colorCode = e.target.closest(".main--color-circle");

  if (!colorCode) return;

  let colorData = colorCode.dataset.color;
  navigator.clipboard.writeText(colorData);
  copiedText.style.opacity = "1";

  setTimeout(function () {
    copiedText.style.opacity = "0";
  }, 1100);
});

generateBtn.addEventListener("click", generateColor);
document.addEventListener("keydown", generateColor);
document.addEventListener("keydown", copyPalette);
