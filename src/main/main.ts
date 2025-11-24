// src/main/main.ts
import { app, BrowserWindow, BrowserView, session } from 'electron';
import path from 'path';
import { registerIpc } from './ipc';

let mainWindow: BrowserWindow | null = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Selkies 控制台',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  registerIpc(mainWindow);

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
          "script-src 'self'; connect-src 'self' https: wss:;",
          "frame-src 'self' https:;"
        ].join(' ')
      }
    });
  });
}

app.whenReady().then(createMainWindow);
app.on('window-all-closed', () => app.quit());
