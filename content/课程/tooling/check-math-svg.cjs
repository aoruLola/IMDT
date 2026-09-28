const assert = require('node:assert/strict');

// KaTeX's stretchy glyphs contain multiline SVG paths. Text formatting must
// never insert HTML line breaks into these path attributes.
module.exports = function checkMathSvg(document, file) {
  for (const path of document.querySelectorAll('.katex svg path')) {
    assert.match(path.getAttribute('d') || '', /^[MmZzLlHhVvCcSsQqTtAa0-9eE+.,\s-]+$/, `Corrupt formula SVG path in ${file}`);
  }
};
