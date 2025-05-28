// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openDialog: () => ipcRenderer.invoke('dialog:open'),
    loadProjects: () => ipcRenderer.invoke('load:projects'),
    readyProject: (number) => ipcRenderer.invoke('ready:project', number),
    loadWholeProject: () => ipcRenderer.invoke('load:whole:project'),
    addTodoTask: (value, date) => ipcRenderer.invoke('add:task', value, date),
    completeTask: (id) => ipcRenderer.invoke("complete:task", id),
    addLink: (link, value) => ipcRenderer.invoke('add:link', link, value),
    addMilestone: (data) => ipcRenderer.invoke("add:milestone", data),
    completeMilestone: (id) => ipcRenderer.invoke("complete:milestone", id),
    addColor: (color) => ipcRenderer.invoke("add:color", color),
    saveNotes: (notes) => ipcRenderer.invoke("save:notes", notes),
    loadSetup: () => ipcRenderer.invoke("load:settings"),
    aiSetup: (apiKey) => ipcRenderer.invoke("setup:ai", apiKey),
});