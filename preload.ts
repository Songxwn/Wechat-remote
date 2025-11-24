// src/preload/preload.ts
import { contextBridge, ipcRenderer } from 'electron';
import { SelkiesConnection } from '../main/types';

contextBridge.exposeInMainWorld('api', {
  listConfigs: (): Promise<SelkiesConnection[]> => ipcRenderer.invoke('config:list'),
  getConfig: (id: string): Promise<SelkiesConnection | undefined> => ipcRenderer.invoke('config:get', id),
  saveConfig: (conn: SelkiesConnection): Promise<void> => ipcRenderer.invoke('config:save', conn),
  deleteConfig: (id: string): Promise<void> => ipcRenderer.invoke('config:delete', id),
  launchSession: (id: string): Promise<{ ok: boolean }> => ipcRenderer.invoke('session:launch', id),
  closeSession: (): void => ipcRenderer.send('session:close'),
  openExternal: (url: string): Promise<void> => ipcRenderer.invoke('external:open', url)
});
