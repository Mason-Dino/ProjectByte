async function newProject() {
    const result = await window.electronAPI.openDialog();
    console.log(result);
    location.reload()
}

async function loadProjects() {
    let result = await window.electronAPI.loadProjects();
    result = JSON.parse(result)

    //prints the projects in the electron application and now in the terminal
    console.log(result)

    projectDisplay = document.getElementById('projects').innerHTML;

    let svg = null;
    
    for (let i = 0; i < result.projects.length; i ++) {

        console.log(result.projects[i])

        if (result.projects[i].icon == null || result.projects[i].icon === 'desktop')
            svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;
    
        else if (result.projects[i].icon === "phone")
            svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-200v120h400v-120H280Zm200 100q17 0 28.5-11.5T520-180q0-17-11.5-28.5T480-220q-17 0-28.5 11.5T440-180q0 17 11.5 28.5T480-140ZM280-320h400v-400H280v400Zm0-480h400v-40H280v40Zm0 560v120-120Zm0-560v-40 40Z"/></svg>`;
    
        else if (result.projects[i].icon === 'server')
            svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-160v-160h720v160H120Zm80-40h80v-80h-80v80Zm-80-440v-160h720v160H120Zm80-40h80v-80h-80v80Zm-80 280v-160h720v160H120Zm80-40h80v-80h-80v80Z"/></svg>`;
    
        else
            svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;
        
        projectDisplay += `
        <div class="project-item">
            ${svg}
            <h3 style="width: 100%;">
                ${result.projects[i].projectName}
            </h3>
            <span style="float: right;">
                <button>Open</button>
            </span>
        </div>
        `

        svg = null
    }

    document.getElementById('projects').innerHTML = projectDisplay;
}