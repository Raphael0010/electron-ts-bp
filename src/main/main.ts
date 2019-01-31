import { isDevelopment } from "common/env";
import { BrowserWindow } from "electron";

export default class Main {

  public static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("activate", Main.onActivate);
    Main.application.on("ready", Main.onReady);
  }

  private static mainWindow: Electron.BrowserWindow | null;
  private static application: Electron.App;
  // tslint:disable-next-line:variable-name
  private static BrowserWindow: typeof Electron.BrowserWindow;

  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      Main.application.quit();
    }
  }

  private static onActivate() {
    if (Main.mainWindow === null) {
      Main.onReady();
    }
  }

  private static onClose() {
    Main.mainWindow = null;
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      center: true,
      frame: process.platform === "darwin" ? true : false,
      height: 900,
      minHeight: 600,
      minWidth: 800,
      titleBarStyle: process.platform === "darwin" ? "hidden" : "default",
      webPreferences: {
        nodeIntegration: true,
      },
      width: 1600,
    });
    const url = isDevelopment
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : `file://${__dirname}/index.html`;

    if (isDevelopment) {
      Main.mainWindow.webContents.openDevTools();
    }
    Main.mainWindow.loadURL(url);
    Main.mainWindow.on("closed", Main.onClose);
    Main.mainWindow.webContents.on("devtools-opened", () => {
      Main.mainWindow!.focus();
    });
  }
}
