async function loadProject() {
    result = await window.electronAPI.loadWholeProject();
    console.log(result)

    document.getElementById("title").innerText += ` - ${result.projects.projectName}`
    document.getElementById("title").innerHTML += `
    <span style="float: right">
            <a href="project-setting.html">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
            </a>
    </span>
    `

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
                        <span style="float: right;" id="milestone-icon">
                            <svg onclick="addMilestoneDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </span>
                    </h3>
                    <div id="milestone-setup" class="milestone-setup" style="display: none">
                        <div style="width: 100%">
                            <input type="text" placeholder="Milestone Name" id="milestone-name">
                        </div>
                        <div style="width: 100%; margin-top: 5px; display: flex;">
                            <select id="milestone-task">
                                <option selected disabled hidden>Select a Task</option>
                            </select>
                            <button onclick="addMilestoneTask()" class="add-button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                                Add
                            </button>
                        </div>
                        <ul class="task-milestone" id="task-milestone"></ul>
                        <button class="make-milestone" onclick="makeMilestone()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                            Make Milestone
                        </button>
                    </div>
                    <div id="milestone-display" class="milestone-display" style="display: block">
                        
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
            <div style="grid-column-start: ${result.setup.colors.column[0]}; grid-row-start: ${result.setup.colors.row[0]}; grid-column-end: ${result.setup.colors.column[1]}; grid-row-end: ${result.setup.colors.row[1]};">
                <h3>
                    Colors
                    <span style="float: right;" id="color-icon">
                        <svg onclick="addColorDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </span>
                    <div class="colors" id="colors-display">
                        <input type="color" id="color-output" onchange="changeColor()" value="#2a2a2a" style="display: none;">
                        <p id="hex-display" style="display: none;">#2a2a2a</p>
                        <button id="color-add-button" onclick="addColorBackend()" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
                    </div>
                </h3>
            </div>
            `
        }

        else if (result.setup.features[i] === 'notes') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.notes.column[0]}; grid-row-start: ${result.setup.notes.row[0]}; grid-column-end: ${result.setup.notes.column[1]}; grid-row-end: ${result.setup.notes.row[1]};">
                <h3>
                    Notes
                    <span style="float: right;" id="notes-icon">
                        <svg onclick="saveNotes()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
                    </span>
                </h3>
                <div class="notes-display">
                    <textarea id="notes" onkeydown="preventTab(event)" spellcheck = "true"></textarea>
                </div>
            </div>
            `
        }

        else if (result.setup.features[i] === 'chatgpt') {
            projectSpace += `
            <div style="grid-column-start: ${result.setup.chatgpt.column[0]}; grid-row-start: ${result.setup.chatgpt.row[0]}; grid-column-end: ${result.setup.chatgpt.column[1]}; grid-row-end: ${result.setup.chatgpt.row[1]};">
                <h3 id="title-projectAI">
                    ProjectAI
                </h3>
                <div class="AI-display" id="AI-display"></div>
                <div id="AI-input" class="AI-input"></div>
            </div>
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

            for (m = 0; m < result.todo.milestones.length; m ++) {
                document.getElementById('milestone-display').innerHTML += `
                    <h4>
                        <span id="${result.todo.milestones[m].id}-icon">
                            <svg onclick="showTasks('${result.todo.milestones[m].id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                        </span>
                        ${result.todo.milestones[m].milestoneName}
                    </h4>
                    <div style="display: none;" class="milestone-display-task" id="${result.todo.milestones[m].id}-display-task">
                    </div>
                `

                for (t = 0; t < result.todo.milestones[m].tasks.length; t ++) {
                    document.getElementById(`${result.todo.milestones[m].id}-display-task`).innerHTML += `
                        <li>${result.todo.milestones[m].tasks[t][0]}</li>
                    `
                }

                document.getElementById(`${result.todo.milestones[m].id}-display-task`).innerHTML += `
                    <button onclick="completeMilestone('${result.todo.milestones[m].id}')">Complete Milestone</button>
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
            for (c = 0; c < result.color.colors.length; c ++) {
                document.getElementById("colors-display").innerHTML += `
                    <div class="hex" style="background-color: ${result.color.colors[c]};"></div>
                    <p>${result.color.colors[c]}</p>
                `
            }
        }

        else if (result.setup.features[i] === 'notes') {
            document.getElementById("notes").value = result.note;
        }

        else if (result.setup.features[i] === 'chatgpt') {
            if (result.AIsetup === false) {
                document.getElementById("AI-display").innerHTML = `
                    <div class="AI-false">
                        <p>ProjectAI is not setup!</p>
                        <p>Head to <a href="setting.html">settings</a> to setup ProjectAI</p>
                    </div>
                `
            }

            else if (result.AIsetup === true) {
                document.getElementById("AI-display").innerHTML = `
                `

                document.getElementById("AI-input").innerHTML = `
                <input type="text" id="user-ai-input" onkeydown="userInputAI(event)">
                <button onclick="userProjectAI()">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                </button>
                `

                document.getElementById("title-projectAI").innerHTML += `
                <span style="float: right;">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>
                </span>
                `
            }
        }
    }
}