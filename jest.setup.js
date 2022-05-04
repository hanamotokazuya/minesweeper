import "@testing-library/jest-dom/extend-expect";
// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}
// hide error messages about act() being unsupported in production build
const ignoredErrors = [/act(...) is not supported in production builds of React./];
const consoleError = global.console.error;
global.console.error = (...args) => {
  if (ignoredErrors.some((el) => el.test(args[0]))) {
    return consoleError(...args);
  }
};
