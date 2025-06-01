async function projectButtons() {
    console.log("test")

    result = await window.electronAPI.loadProjects()
    result = JSON.parse(result)

    document.getElementById("notes-bar").innerHTML += `
        <button>Global</button>
    `

    for (p = 0; p < result.projects.length; p ++) {
        document.getElementById("notes-bar").innerHTML += `
            <button>${result.projects[p].projectName}</button>
        `
    }
}