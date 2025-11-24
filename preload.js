const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getConnections: () => ipcRenderer.invoke('get-connections'),
  saveConnections: (connections) => ipcRenderer.invoke('save-connections', connections)
});
