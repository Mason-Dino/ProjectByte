async function loadProject() {
    result = await window.electronAPI.loadWholeProject();
    console.log(result)
}