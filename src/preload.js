// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openDialog: () => ipcRenderer.invoke('dialog:open'),
    loadProjects: () => ipcRenderer.invoke('load:projects'),
    readyProject: (number) => ipcRenderer.invoke('ready:project', number),
    loadWholeProject: () => ipcRenderer.invoke('load:whole:project'),
    addTodoTask: (value, date) => ipcRenderer.invoke('add:task', value, date)
});