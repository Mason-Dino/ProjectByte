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
                    <span style="float: right;" id="todolist-icon">
                        <svg onclick="addTodoDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </span>
                </h3>
                <div class="todolist" id="todolist">
                    <input type="text" class="value" id="todo-value" style="display: none;"><input type="date" class="date" id="todo-date" style="display: none;"><button onclick="addTodoBackend()" id="todo-add-button" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
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
                    <div class="milestone-setup">
                        <div style="width: 100%">
                            <input type="text">
                        </div>
                        <div style="width: 100%; margin-top: 5px; display: flex;">
                            <select id="milestone-task">
                                <option selected disabled hidden>Select a Task</option>
                            </select>
                            <button onclick="addMilestoneTask()">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            `
        }

        else if (result.setup.features[i] === 'links') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.links.column[0]}; grid-row-start: ${result.setup.links.row[0]}; grid-column-end: ${result.setup.links.column[1]}; grid-row-end: ${result.setup.links.row[1]};">
                <h3>
                    Links
                    <span style="float: right;" id="link-icon">
                        <svg onclick="addLinkDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </span>
                </h3>
                <div id="links">
                    <div class="links-add" id="links-add">
                        <input type="text" id="link-link" style="display: none;" class="link" placeholder="Link"><input type="text" id="link-value" style="display: none;" class="value" placeholder="Value"><button onclick="addLinkBackend()" id="link-add-button" style="display: none;" class="add-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
                    </div>
                    <div class="links" style="margin-top: 5px;" id="display-links">
                    </div>
                </div>
            </div>
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

    for (i = 0; i < result.setup.features.length; i ++) {
        //console.log(result.setup.features[i])
        if (result.setup.features[i] === 'todolist') {
            today = new Date()
            today.setHours(0, 0, 0, 0);

            for (t = 0; t < result.todo.task.length; t ++) {
                checkDate = new Date(result.todo.task[t].date)
                checkDate.setDate(checkDate.getDate() + 1)
                checkDate.setHours(0, 0, 0, 0)
                date = result.todo.task[t].date.split("-")

                document.getElementById('todolist').innerHTML += `
                <p class="value" id="${result.todo.task[t].id}-value">${result.todo.task[t].value}</p>
                <p class="date" id="${result.todo.task[t].id}-date">${date[1]}/${date[2]}/${date[0]}</p>
                <button id="${result.todo.task[t].id}" onclick="completeTask(this.id)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                `

                if (checkDate < today && checkDate != today) {
                    console.log(result.todo.task[t].id)
                    console.log(today, checkDate)
                    document.getElementById(`${result.todo.task[t].id}-date`).style = "color: var(--error)"
                }
            }
        }

        else if (result.setup.features[i] === 'milestones') {
            document.getElementById("milestone-task").innerHTML = `<option selected disabled hidden id="none">Select a Task</option>`
            
            for (m = 0; m < result.todo.task.length; m ++) {
                document.getElementById("milestone-task").innerHTML += `
                    <option id="${result.todo.task[m].id}-milestone">${result.todo.task[m].value}</option>
                `
            }
        }

        else if (result.setup.features[i] === 'links') {
            for (l = 0; l < result.link.links.length; l ++) {
                document.getElementById("display-links").innerHTML += `
                <a href="${result.link.links[l].link}" target="_blank">
                    <button>${result.link.links[l].value}</button>
                </a>
                `
            }
        }

        else if (result.setup.features[i] === 'colors') {

        }

        else if (result.setup.features[i] === 'notes') {

        }

        else if (result.setup.features[i] === 'chatgpt') {

        }
    }
}