// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\r\n  margin: 0;\r\n  background: #151616;\r\n  font-family: roboto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\ncode {\r\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\r\n    monospace;\r\n}\r\n\r\n:root {\r\n  --bg: #242526;\r\n  --bg-accent: #484a4d;\r\n  --text-color: #dadce1;\r\n  --nav-size: 60px;\r\n  --border: 1px solid #474a4d;\r\n  --border-radius: 8px;\r\n  --speed: 500ms;\r\n}\r\nul {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\na {\r\n  color: var(--text-color);\r\n  text-decoration: none;\r\n}\r\n.app {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.scanMachine {\r\n  width: 100%;\r\n  height: 200px;\r\n  background-color: white;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.inputArea {\r\n  width: 50%;\r\n  height: 100%;\r\n  align-items: center;\r\n  justify-content: center;\r\n  resize: none;\r\n}\r\n\r\n.outputArea {\r\n  height: 100%;\r\n  width: 50%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: stretch;\r\n  justify-content: flex-start;\r\n}\r\n\r\n.toolbar {\r\n  height: var(--nav-size);\r\n  background-color: var(--bg);\r\n  padding: 0 1rem;\r\n  border-bottom: var(--border);\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.scannedLine {\r\n  background-color: white;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}