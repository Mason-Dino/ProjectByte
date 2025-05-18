async function newProject() {
    folder = await window.showDirectoryPicker();
    console.log(folder.name)
}