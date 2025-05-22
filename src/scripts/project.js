async function loadProject() {
    result = await window.electronAPI.loadWholeProject();
    console.log(result)

    document.getElementById("title").innerText += ` - ${result.projects.projectName}`

    projectSpace = document.getElementById('project-space').innerHTML;

    for (i = 0; i < result.setup.features.length; i ++) {
        console.log(result.setup.features[i])
        if (result.setup.features[i] === 'todolist') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.todolist.column[0]}; grid-row-start: ${result.setup.todolist.row[0]}; grid-column-end: ${result.setup.todolist.column[1]}; grid-row-end: ${result.setup.todolist.row[1]};">
                <h3>
                    Todo List
                    <span style="float: right;">
                        <svg class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </span>
                </h3>
                <div class="todolist" id="todolist">
                    <p class="value">test</p><p class="date">5/21/2025</p><button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                    <p class="value">test</p><p class="data">5/21/2025</p><button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                    <p class="value">test</p><p class="data">5/21/2025</p><button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                    <p class="value">test</p><p class="data">5/21/2025</p><button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                    <p class="value">test</p><p class="data">5/21/2025</p><button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                    <p class="value">test</p><p class="data">5/21/2025</p><button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                </div>
            </div>
            `
        }

        else if (result.setup.features[i] === 'milestones') {
            projectSpace += `
                <div style="grid-column-start: ${result.setup.milestones.column[0]}; grid-row-start: ${result.setup.milestones.row[0]}; grid-column-end: ${result.setup.milestones.column[1]}; grid-row-end: ${result.setup.milestones.row[1]};">
                    <h3>
                        Milestones
                        <span style="float: right;">
                            <svg class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </span>
                    </h3>
                </div>
            `
        }

        else if (result.setup.features[i] === 'links') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.links.column[0]}; grid-row-start: ${result.setup.links.row[0]}; grid-column-end: ${result.setup.links.column[1]}; grid-row-end: ${result.setup.links.row[1]};">Links</div>
            `
        }

        else if (result.setup.features[i] === 'colors') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.colors.column[0]}; grid-row-start: ${result.setup.colors.row[0]}; grid-column-end: ${result.setup.colors.column[1]}; grid-row-end: ${result.setup.colors.row[1]};">Colors</div>
            `
        }

        else if (result.setup.features[i] === 'notes') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.notes.column[0]}; grid-row-start: ${result.setup.notes.row[0]}; grid-column-end: ${result.setup.notes.column[1]}; grid-row-end: ${result.setup.notes.row[1]};">Notes</div>
            `
        }

        else if (result.setup.features[i] === 'chatgpt') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.chatgpt.column[0]}; grid-row-start: ${result.setup.chatgpt.row[0]}; grid-column-end: ${result.setup.chatgpt.column[1]}; grid-row-end: ${result.setup.chatgpt.row[1]};">AI</div>
            `
        }
    }

    document.getElementById('project-space').innerHTML = projectSpace;
}