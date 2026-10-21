function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}import confetti from 'https://esm.sh/canvas-confetti';
import Color from 'https://esm.sh/color';

const styles = new CSSStyleSheet();
styles.replaceSync(`
  input {
    /* set this line height otherwise it will be 'normal' */
    line-height: var(--font-lineheight-3)
    outline-color: transparent;
    outline: transparent;
    background: hsl(0 0% 80% / 0.35);
    font-weight: var(--font-weight-9);
    border: var(--size-1) solid var(--surface-2);
  /* 	background: transparent; */
    backdrop-filter: blur(4px);
    padding: var(--size-2) var(--size-4);
    transition: transform calc(var(--speed, 0) * 1s);
    transform: translate(calc(var(--x, 0) * 0.5ch), calc(var(--y, 0) * 0.5ch));
  }

  @media(prefers-color-scheme: dark) {
    input {
      background: hsl(0 0% 20% / 0.35);
    }
  }
`);

class ConfettiInputElement extends HTMLElement {
  constructor() {
    super();_defineProperty(this, "_fire",

























    e => {
      if (
      e.type !== 'focus' &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
      e.keyCode !== 8 &&
      e.keyCode !== 32 &&
      e.keyCode !== 13)
      {
        const pos = getCaretPosition(e.currentTarget);
        this._resetInput();
        this._blast(pos);
      }
    });_defineProperty(this, "_resetInput",

    () => {var _this$shadowRoot;
      const input = (_this$shadowRoot = this.shadowRoot) === null || _this$shadowRoot === void 0 ? void 0 : _this$shadowRoot.querySelector('input');
      if (input) {
        input.removeEventListener('transitionend', this._resetInput);
        input.style.setProperty('--x', 0);
        input.style.setProperty('--y', 0);
      }
    });const root = this.attachShadow({ mode: 'open' });root.innerHTML = `
    	<input
        type=${this.getAttribute('type')}
      />
    `;root.adoptedStyleSheets.push(styles);}connectedCallback() {var _this$shadowRoot2;const input = (_this$shadowRoot2 = this.shadowRoot) === null || _this$shadowRoot2 === void 0 ? void 0 : _this$shadowRoot2.querySelector('input');if (input) {input.addEventListener('focus', this._fire);input.addEventListener('keydown', this._fire);}}disconnectedCallback() {var _this$shadowRoot3;const input = (_this$shadowRoot3 = this.shadowRoot) === null || _this$shadowRoot3 === void 0 ? void 0 : _this$shadowRoot3.querySelector('input');if (input) {input.removeEventListener('focus', this._fire);input.removeEventListener('keydown', this._fire);}}_blast(pos) {var _this$shadowRoot4;const input = (_this$shadowRoot4 = this.shadowRoot) === null || _this$shadowRoot4 === void 0 ? void 0 : _this$shadowRoot4.querySelector('input');if (input) {
      input.style.setProperty('--x', randomInRange(-1, 1));
      input.style.setProperty('--y', randomInRange(-1, 1));
      confetti({
        origin: {
          x: pos.x / window.innerWidth,
          y: pos.y / window.innerHeight },

        particleCount: randomInRange(10, 40),
        scalar: randomInRange(50, 120) / 100,
        disableForReducedMotion: true,
        gravity: randomInRange(35, 100) / 100,
        drift: 0,
        angle: 90,
        spread: 45,
        startVelocity: randomInRange(2, 25),
        ticks: randomInRange(20, 100),
        // colors: ['#e74c2c'],
        // colors,
        zIndex: -1,
        useWorker: false });

      if (this._bumpTimer) {
        clearTimeout(this._bumpTimer);
      }
      this._bumpTimer = setTimeout(() => this._resetInput(), 100);
      input.addEventListener('transitionend', this._resetInput);
    }
  }}


customElements.define('confetti-input', ConfettiInputElement);

/**
 * returns x, y coordinates for absolute positioning of a span within a given text input
 * at a given selection point
 * @param {object} input - the input element to obtain coordinates for
 * @param {number} selectionPoint - the selection point for the input
 */
const getCaretPosition = (input, selection = 'selectionStart') => {
  const { scrollLeft, scrollTop } = input;
  // This provides a hook for getSelection to reuse getCaretPosition.
  const selectionPoint = input[selection] || input.selectionStart;
  const { height, width, left, top } = input.getBoundingClientRect();
  // create a dummy element that will be a clone of our input
  const div = document.createElement('div');
  // get the computed style of the input and clone it onto the dummy element
  const copyStyle = getComputedStyle(input);
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }
  // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
  const swap = '.';
  const inputValue =
  input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value;
  // set the div content to that of the textarea up until selection
  const textContent = inputValue.substr(0, selectionPoint);
  // set the text content of the dummy element div
  div.textContent = textContent;
  if (input.tagName === 'TEXTAREA') div.style.height = 'auto';
  // if a single line input then the div needs to be single line and not break out like a text area
  if (input.tagName === 'INPUT') div.style.width = 'auto';
  // Apply absolute positioning to account for textarea resize, etc.
  div.style.position = 'absolute';
  // create a marker element to obtain caret position
  const span = document.createElement('span');
  // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
  span.textContent = inputValue.substr(selectionPoint) || '.';
  // append the span marker to the div
  div.appendChild(span);
  // append the dummy element to the body
  document.body.appendChild(div);
  // get the marker position, this is the caret position top and left relative to the input
  const { offsetLeft: spanX, offsetTop: spanY } = span;
  // lastly, remove that dummy element
  // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
  document.body.removeChild(div);
  // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
  let x = left + spanX;
  let y = top + spanY;
  const { lineHeight, paddingRight } = copyStyle;
  x = Math.min(x - scrollLeft, left + width - parseInt(paddingRight, 10));
  // Need to account for any scroll position for the window.
  y =
  Math.min(y - scrollTop, top + height - parseInt(lineHeight, 10)) +
  window.scrollY;
  return {
    x,
    y };

};

// End use-caret-position

const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
  const INPUT_RANGE = inputUpper - inputLower;
  const OUTPUT_RANGE = outputUpper - outputLower;
  return (value) =>
  outputLower + ((value - inputLower) / INPUT_RANGE * OUTPUT_RANGE || 0);
};

const clamp = (min, max, value) => Math.min(Math.max(value, min), max);

const randomInRange = (min, max) =>
Math.floor(
Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));


const colors = [];
const genPalette = seedHsl => {
  const seed = new Color(seedHsl);
  colors.push(seed.hex());
  for (let l = 0; l < 4; l++) colors.push(seed.lighten(l + 1 / 20).hex());
  for (let d = 0; d < 4; d++) colors.push(seed.darken(d + 1 / 20).hex());
};
genPalette('hsl(0 90% 50%)');