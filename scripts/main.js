const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");

  ipcMain.on("choose-folder", async (event) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });

    if (result.canceled || !result.filePaths.length) return;
    const folderPath = result.filePaths[0];

    event.sender.send("log", `选择的文件夹：${folderPath}`);

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".svg"));
    if (files.length === 0) {
      event.sender.send("log", "⚠️ 未找到任何 SVG 文件。");
      return;
    }

    const outDir = path.join(folderPath, "png_output");
    fs.mkdirSync(outDir, { recursive: true });

    for (const file of files) {
      const inputPath = path.join(folderPath, file);
      const outputPath = path.join(outDir, file.replace(/\.svg$/, ".png"));
      try {
        await sharp(inputPath).png().toFile(outputPath);
        event.sender.send("log", `✅ 已转换：${file}`);
      } catch (err) {
        event.sender.send("log", `❌ 转换失败：${file} (${err.message})`);
      }
    }

    event.sender.send("log", `\n✅ 全部完成！输出路径：${outDir}`);
  });
}

app.whenReady().then(createWindow);
