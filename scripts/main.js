const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// 简单 PNG -> SVG 嵌入转换
async function pngToSvg(inputPath, outputPath) {
  const buffer = fs.readFileSync(inputPath);
  const base64 = buffer.toString("base64");
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
<image href="data:image/png;base64,${base64}" width="500" height="500"/>
</svg>`;
  fs.writeFileSync(outputPath, svgContent);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");

  // ---------------- SVG -> PNG ----------------
  ipcMain.on("choose-folder", async (event) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });
    if (result.canceled || !result.filePaths.length) return;

    const folderPath = result.filePaths[0];
    let files = fs.readdirSync(folderPath).filter(f => f.endsWith(".svg"));
    if (files.length === 0) {
      event.sender.send("log", "⚠️ 文件夹内未找到 SVG 文件。");
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

  ipcMain.on("choose-files", async (event) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "SVG 文件", extensions: ["svg"] }],
    });
    if (result.canceled || !result.filePaths.length) return;

    const files = result.filePaths.filter(f => f.endsWith(".svg"));
    if (files.length === 0) {
      event.sender.send("log", "⚠️ 未选择任何 SVG 文件。");
      return;
    }

    const outDir = path.join(path.dirname(files[0]), "png_output");
    fs.mkdirSync(outDir, { recursive: true });

    for (const filePath of files) {
      const fileName = path.basename(filePath);
      const outputPath = path.join(outDir, fileName.replace(/\.svg$/, ".png"));
      try {
        await sharp(filePath).png().toFile(outputPath);
        event.sender.send("log", `✅ 已转换：${fileName}`);
      } catch (err) {
        event.sender.send("log", `❌ 转换失败：${fileName} (${err.message})`);
      }
    }
    event.sender.send("log", `\n✅ 全部完成！输出路径：${outDir}`);
  });

  // ---------------- PNG -> SVG ----------------
  ipcMain.on("choose-png-folder", async (event) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });
    if (result.canceled || !result.filePaths.length) return;

    const folderPath = result.filePaths[0];
    let files = fs.readdirSync(folderPath).filter(f => f.endsWith(".png"));
    if (files.length === 0) {
      event.sender.send("log", "⚠️ 文件夹内未找到 PNG 文件。");
      return;
    }

    const outDir = path.join(folderPath, "svg_output");
    fs.mkdirSync(outDir, { recursive: true });

    for (const file of files) {
      const inputPath = path.join(folderPath, file);
      const outputPath = path.join(outDir, file.replace(/\.png$/, ".svg"));
      try {
        await pngToSvg(inputPath, outputPath);
        event.sender.send("log", `✅ 已转换：${file}`);
      } catch (err) {
        event.sender.send("log", `❌ 转换失败：${file} (${err.message})`);
      }
    }
    event.sender.send("log", `\n✅ 全部完成！输出路径：${outDir}`);
  });

  ipcMain.on("choose-png-files", async (event) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "PNG 文件", extensions: ["png"] }],
    });
    if (result.canceled || !result.filePaths.length) return;

    const files = result.filePaths.filter(f => f.endsWith(".png"));
    if (files.length === 0) {
      event.sender.send("log", "⚠️ 未选择任何 PNG 文件。");
      return;
    }

    const outDir = path.join(path.dirname(files[0]), "svg_output");
    fs.mkdirSync(outDir, { recursive: true });

    for (const filePath of files) {
      const fileName = path.basename(filePath);
      const outputPath = path.join(outDir, fileName.replace(/\.png$/, ".svg"));
      try {
        await pngToSvg(filePath, outputPath);
        event.sender.send("log", `✅ 已转换：${fileName}`);
      } catch (err) {
        event.sender.send("log", `❌ 转换失败：${fileName} (${err.message})`);
      }
    }
    event.sender.send("log", `\n✅ 全部完成！输出路径：${outDir}`);
  });
}

app.whenReady().then(createWindow);
