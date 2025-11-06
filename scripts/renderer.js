const { ipcRenderer } = require("electron");

const logDiv = document.getElementById("log");
const chooseBtn = document.getElementById("choose-folder");

chooseBtn.addEventListener("click", () => {
  ipcRenderer.send("choose-folder");
});

ipcRenderer.on("log", (_, msg) => {
  logDiv.textContent += msg + "\n";
});
