

async function newProject() {
    const result = await window.electronAPI.openDialog();
    console.log(result);
}