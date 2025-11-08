const { ipcRenderer } = require("electron");

const logDiv = document.getElementById("log");
const chooseFolderBtn = document.getElementById("choose-folder");
const chooseFilesBtn = document.getElementById("choose-files");
const choosePngFolderBtn = document.getElementById("choose-png-folder");
const choosePngFilesBtn = document.getElementById("choose-png-files");

chooseFolderBtn.addEventListener("click", () => {
  ipcRenderer.send("choose-folder");
});

chooseFilesBtn.addEventListener("click", () => {
  ipcRenderer.send("choose-files");
});

choosePngFolderBtn.addEventListener("click", () => {
  ipcRenderer.send("choose-png-folder");
});

choosePngFilesBtn.addEventListener("click", () => {
  ipcRenderer.send("choose-png-files");
});

ipcRenderer.on("log", (_, msg) => {
  logDiv.textContent += msg + "\n";
});
