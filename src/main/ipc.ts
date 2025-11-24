// src/main/ipc.ts
import { BrowserWindow, BrowserView, shell, ipcMain } from 'electron';
import { ConfigRepo } from './config';

export function registerIpc(mainWindow: BrowserWindow) {
  ipcMain.handle('config:list', () => ConfigRepo.list());
  ipcMain.handle('config:get', (_e, id: string) => ConfigRepo.get(id));
  ipcMain.handle('config:save', (_e, conn) => ConfigRepo.upsert(conn));
  ipcMain.handle('config:delete', (_e, id: string) => ConfigRepo.remove(id));
  ipcMain.handle('external:open', (_e, url: string) => shell.openExternal(url));

  ipcMain.handle('session:launch', (_e, id: string) => {
    const conn = ConfigRepo.get(id);
    if (!conn) throw new Error('未找到连接配置');

    const view = new BrowserView({
      webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
    });
    mainWindow.setBrowserView(view);

    const bounds = mainWindow.getContentBounds();
    view.setBounds({ x: 320, y: 60, width: bounds.width - 340, height: bounds.height - 80 });

    const url = new URL(conn.signalingUrl);
    if (conn.token) url.searchParams.set('token', conn.token);
    if (conn.username) url.searchParams.set('u', conn.username);
    if (conn.password) url.searchParams.set('p', conn.password);
    url.searchParams.set('video_bitrate', String(conn.video.bitrateKbps ?? 2500));
    url.searchParams.set('fps', String(conn.video.fps ?? 30));
    url.searchParams.set('audio', String(conn.audio.enabled ?? true));

    view.webContents.loadURL(url.toString());

    ipcMain.once('session:close', () => {
      mainWindow.removeBrowserView(view);
      view.destroy();
    });

    return { ok: true };
  });
}
