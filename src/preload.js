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
    projectAIChatGlobal: (message) => ipcRenderer.invoke("chat:ai:global", message),
    changeSetup: (setup) => ipcRenderer.invoke("change:setup", setup),
    changeName: (projectName) => ipcRenderer.invoke("change:name", projectName),
    changeIcon: (icon) => ipcRenderer.invoke("change:icon", icon),
    deleteLink: (id) => ipcRenderer.invoke("delete:link", id),
    deleteColor: (id) => ipcRenderer.invoke("delete:color", id),
    deleteMilestone: (id) => ipcRenderer.invoke("delete:milestone", id),
    deleteChatHistory: (id) => ipcRenderer.invoke("delete:ai:history"),
    loadChatHistory: () => ipcRenderer.invoke("load:ai:history"),
    loadGlobalChatHistory: () => ipcRenderer.invoke("load:ai:history:global"),
    checkAISetup: () => ipcRenderer.invoke("check:ai:setup"),
    loadIdeas: () => ipcRenderer.invoke("load:idea"),
    addIdea: (idea) => ipcRenderer.invoke("add:idea", idea),
    deleteIdea: (id) => ipcRenderer.invoke("delete:idea", id),
    loadIdeaNotes: (id) => ipcRenderer.invoke("load:idea:notes", id),
    saveIdeaNotes: (id, notes) => ipcRenderer.invoke("save:idea:notes", id, notes),
    addSubIdea: (id, subidea) => ipcRenderer.invoke("add:sub:idea", id, subidea),
    deleteSubIdea: (id) => ipcRenderer.invoke("delete:sub:idea", id),
    editIdea: (id, newName) => ipcRenderer.invoke("edit:idea", id, newName),
    deleteProject: (id) => ipcRenderer.invoke("delete:project", id),
    archiveProject: (id) => ipcRenderer.invoke("archive:project", id),
    restoreProject: (id) => ipcRenderer.invoke("restore:project", id),
    openArchiveProject: (id) => ipcRenderer.invoke("open:archive:project", id),
    disableProjectAI: () => ipcRenderer.invoke("disable:ai")
});