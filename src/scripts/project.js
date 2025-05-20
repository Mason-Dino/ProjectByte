async function loadProject() {
    result = await window.electronAPI.loadWholeProject();
    console.log(result)

    document.getElementById("title").innerText += ` - ${result.projects.projectName}`
}