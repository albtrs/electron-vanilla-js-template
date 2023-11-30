import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('apis', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  simpleDialog: async (message) => await ipcRenderer.invoke('open-simple-dialog', message),
})
