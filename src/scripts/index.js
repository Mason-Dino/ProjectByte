async function newProject() {
    const result = await window.electronAPI.openDialog();
    console.log(result);
}

async function loadProjects() {
    let result = await window.electronAPI.loadProjects();
    result = JSON.parse(result)
    console.log(result)
}