async function newProject() {
    const result = await window.electronAPI.openDialog();
    console.log(result);
}

async function loadProjects() {
    let result = await window.electronAPI.loadProjects();
    result = JSON.parse(result)

    //prints the projects in the electron application and now in the terminal
    console.log(result)

    projectDisplay = document.getElementById('projects').innerHTML;

    for (let i = 0; i < result.projects.length; i ++) {
        projectDisplay += `
        <div>
            <p>${result.projects[i].projectName}<p>
        </div>
        `
    }

    document.getElementById('projects').innerHTML = projectDisplay;
}