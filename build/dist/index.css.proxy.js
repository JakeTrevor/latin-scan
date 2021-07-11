// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\r\n  margin: 0;\r\n  background: #ffffff;\r\n  font-family: roboto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\ncode {\r\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\r\n    monospace;\r\n}\r\n\r\n:root {\r\n  --emphasis: #6b6b6bff;\r\n  --highlight: #c99797ff;\r\n  --background: #544e4eff;\r\n  --dark: #1f0707ff;\r\n  --davys-grey: #575656ff;\r\n\r\n  --font: roboto;\r\n  --fontSize: 150%;\r\n}\r\n\r\nul {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.app {\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.toolbar {\r\n  height: 54px;\r\n  background-color: var(--background);\r\n  padding: 0 1rem;\r\n  border: 2px solid transparent;\r\n  border-bottom-color: var(--dark);\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.scanModule {\r\n  width: 100%;\r\n  height: 90vh;\r\n  background-color: white;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.inputArea {\r\n  width: 50%;\r\n  height: 100%;\r\n  align-items: center;\r\n  justify-content: center;\r\n  resize: none;\r\n  font-size: var(--fontSize);\r\n  line-height: 1.5;\r\n  outline: none;\r\n  border-width: 1px;\r\n  border-color: #242526;\r\n  padding: 2px 10px;\r\n  margin: 0 0 0 10px;\r\n}\r\n\r\n.outputArea {\r\n  height: 100%;\r\n  width: 50%;\r\n  padding: 2px;\r\n  margin: 0 10px 0 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: stretch;\r\n  justify-content: flex-start;\r\n  border-style: solid;\r\n  border-width: 1px;\r\n  border-color: #1a1a1a;\r\n}\r\n\r\n.line {\r\n  padding: 10px;\r\n  margin: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: #fff;\r\n  font-size: var(--fontSize);\r\n}\r\n\r\n.lineSelection {\r\n  padding: 3px;\r\n  margin: 3px;\r\n  border-bottom: 3px solid rgb(102, 102, 102);\r\n}\r\n\r\n.option {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n}\r\n\r\n.naturalQ {\r\n  background-color: rgb(255, 192, 181);\r\n}\r\n\r\n.fullScan {\r\n  background-color: rgb(144, 255, 149);\r\n}\r\n\r\n.info {\r\n  position: relative;\r\n  font-size: 50%;\r\n  margin: 10px;\r\n}\r\n\r\n.info::before,\r\n.info::after {\r\n  --scale: 0;\r\n  --arrow-size: 10px;\r\n  --arrow-color: var(--emphasis);\r\n  position: absolute;\r\n  top: -0.25rem;\r\n  left: 50%;\r\n  transform: translateX(-50%) translateY(var(--translate-y, 0))\r\n    scale(var(--scale));\r\n  transition: 100ms transform;\r\n}\r\n\r\n.info::before {\r\n  --translate-y: calc(-100% - var(--arrow-size));\r\n\r\n  transform-origin: bottom center;\r\n  background-color: var(--arrow-color);\r\n  width: max-content;\r\n  content: attr(data-tooltip);\r\n  padding: 0.25rem;\r\n  border-radius: 5px;\r\n  text-align: center;\r\n  font-family: roboto;\r\n  font-size: 125%;\r\n}\r\n\r\n.info::after {\r\n  --translate-y: calc(-1.1 * var(--arrow-size));\r\n\r\n  content: \"\";\r\n  border: var(--arrow-size) solid transparent;\r\n  border-top-color: var(--arrow-color);\r\n}\r\n\r\n.info:hover::after,\r\n.info:hover::before {\r\n  --scale: 1;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}