// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openDialog: () => ipcRenderer.invoke('dialog:open'),
    loadProjects: () => ipcRenderer.invoke('load:projects'),
    loadRecentProject: () => ipcRenderer.invoke("load:recent:project"),
    readyProject: (number) => ipcRenderer.invoke('ready:project', number),
    loadWholeProject: () => ipcRenderer.invoke('load:whole:project'),
    addTodoTask: (value, date) => ipcRenderer.invoke('add:task', value, date),
    completeTask: (id) => ipcRenderer.invoke("complete:task", id),
    addLink: (link, value) => ipcRenderer.invoke('add:link', link, value),
    addMilestone: (data) => ipcRenderer.invoke("add:milestone", data),
    completeMilestone: (id) => ipcRenderer.invoke("complete:milestone", id),
    addColor: (color) => ipcRenderer.invoke("add:color", color),
    saveNotes: (notes) => ipcRenderer.invoke("save:notes", notes),
    saveNotesGlobal: (num, notes) => ipcRenderer.invoke("save:notes:global", num, notes),
    getNotes: (num) => ipcRenderer.invoke("get:notes", num),
    loadSetup: () => ipcRenderer.invoke("load:settings"),
    aiSetup: (apiKey) => ipcRenderer.invoke("setup:ai", apiKey),
    projectAIChat: (message) => ipcRenderer.invoke("chat:ai", message),
    changeSetup: (setup) => ipcRenderer.invoke("change:setup", setup),
    changeName: (projectName) => ipcRenderer.invoke("change:name", projectName),
    changeIcon: (icon) => ipcRenderer.invoke("change:icon", icon),
    deleteLink: (id) => ipcRenderer.invoke("delete:link", id),
    deleteColor: (id) => ipcRenderer.invoke("delete:color", id),
    deleteMilestone: (id) => ipcRenderer.invoke("delete:milestone", id),
    deleteChatHistory: (id) => ipcRenderer.invoke("delete:ai:history")
});