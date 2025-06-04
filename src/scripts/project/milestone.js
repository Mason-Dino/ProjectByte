function addMilestoneDisplay() {
    document.getElementById("milestone-setup").style = 'display: block;';
    document.getElementById("milestone-display").style = 'display: none;'
    document.getElementById("milestone-icon").innerHTML = '<svg onclick="closeMilestoneDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

    document.getElementById("milestone-name").focus()
}

function closeMilestoneDisplay() {
    document.getElementById("milestone-setup").style = 'display: none;';
    document.getElementById("milestone-display").style = 'display: block'
    document.getElementById("milestone-icon").innerHTML = '<svg onclick="addMilestoneDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';
}

function addMilestoneTask() {
    selection = document.getElementById("milestone-task")
    options = selection.options
    selected = options[selection.selectedIndex]
    console.log(selected.value)
    console.log(selected.id.split("-")[0])

    id = selected.id.split("-")[0]

    if (!(id === 'none')) {
        element = document.getElementById('task-milestone').innerHTML

        element = `<li id="${id}-milestone-task" onclick="removeMilestoneTask(this.id)">${selected.value}</li>` + element;

        document.getElementById('task-milestone').innerHTML = element

    }
    else {
        document.getElementById('milestone-value-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('milestone-value-error').style = 'display: none;'
        }, 5000);
    }
}

function removeMilestoneTask(id) {
    document.getElementById(id).remove();
}

async function makeMilestone() {
    tasks = document.getElementById("task-milestone")
    milestone = document.getElementById("milestone-name").value

    if (tasks.childElementCount === 0) {
        document.getElementById('milestone-value-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('milestone-value-error').style = 'display: none;'
        }, 5000);
        return 1
    }
    else if (milestone === '') {
        document.getElementById('milestone-name-value-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('milestone-name-value-error').style = 'display: none;'
        }, 5000);
    }
    else {
        data = {
            milestoneName: milestone,
            tasks: []
        }

        for (t = 0; t < tasks.childElementCount; t ++) {
            child = document.getElementById(tasks.childNodes[t].id)
            console.log(child.innerText, child.id)
            data.tasks.push([child.innerText, child.id])
        }

        console.log(data)
        data = await window.electronAPI.addMilestone(data)
        console.log(data)

        document.getElementById("milestone-name").value = "";
        document.getElementById("task-milestone").innerHTML = "";


        closeMilestoneDisplay()

        milestone = document.getElementById("milestone-display").innerHTML = ``;
        document.getElementById("milestone-task").innerHTML = `<option selected disabled hidden id="none">Select a Task</option>`
            
        for (m = 0; m < data.task.length; m ++) {
            document.getElementById("milestone-task").innerHTML += `
                <option id="${data.task[m].id}-milestone">${data.task[m].value}</option>
            `
        }

        for (m = 0; m < data.milestones.length; m ++) {
            document.getElementById('milestone-display').innerHTML += `
                <h4>
                    <span id="${data.milestones[m].id}-icon">
                        <svg onclick="showTasks('${data.milestones[m].id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                    </span>
                    ${data.milestones[m].milestoneName}
                </h4>
                <div style="display: none;" class="milestone-display-task" id="${data.milestones[m].id}-display-task">
                </div>
            `

            for (t = 0; t < data.milestones[m].tasks.length; t ++) {
                document.getElementById(`${data.milestones[m].id}-display-task`).innerHTML += `
                    <li>${data.milestones[m].tasks[t][0]}</li>
                `
            }

            document.getElementById(`${data.milestones[m].id}-display-task`).innerHTML += `
                <button onclick="completeMilestone('${data.milestones[m].id}')">Complete Milestone</button>
            `
        }
    }
}

function showTasks(id) {
    document.getElementById(`${id}-display-task`).style = 'display: block;'
    document.getElementById(`${id}-icon`).innerHTML = `
    <svg onclick="hideTasks('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
    `
}

function hideTasks(id) {
    document.getElementById(`${id}-display-task`).style = 'display: none;'
    document.getElementById(`${id}-icon`).innerHTML = `
    <svg onclick="showTasks('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
    `
}

async function completeMilestone(id) {
    data = await window.electronAPI.completeMilestone(id)
    console.log(data)

    todolist = document.getElementById("todolist").innerHTML = `<input type="text" class="value" id="todo-value" style="display: none;"><input type="date" class="date" id="todo-date" style="display: none;"><button onclick="addTodoBackend()" id="todo-add-button" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>`;
    milestone = document.getElementById("milestone-display").innerHTML = ``;

    today = new Date()
    today.setHours(0, 0, 0, 0);

    for (t = 0; t < data.task.length; t ++) {
        checkDate = new Date(data.task[t].date)
        checkDate.setDate(checkDate.getDate() + 1)
        checkDate.setHours(0, 0, 0, 0)
        date = data.task[t].date.split("-")

        document.getElementById('todolist').innerHTML += `
        <p class="value" id="${data.task[t].id}-value">${data.task[t].value}</p>
        <p class="date" id="${data.task[t].id}-date">${date[1]}/${date[2]}/${date[0]}</p>
        <button id="${data.task[t].id}" onclick="completeTask(this.id)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
        `

        if (checkDate < today && checkDate != today) {
            console.log(result.todo.task[t].id)
            console.log(today, checkDate)
            document.getElementById(`${result.todo.task[t].id}-date`).style = "color: var(--error)"
        }
    }

    document.getElementById("milestone-task").innerHTML = `<option selected disabled hidden id="none">Select a Task</option>`
            
    for (m = 0; m < data.task.length; m ++) {
        document.getElementById("milestone-task").innerHTML += `
            <option id="${data.task[m].id}-milestone">${data.task[m].value}</option>
        `
    }

    for (m = 0; m < data.milestones.length; m ++) {
        document.getElementById('milestone-display').innerHTML += `
            <h4>
                <span id="${data.milestones[m].id}-icon">
                    <svg onclick="showTasks('${data.milestones[m].id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                </span>
                ${data.milestones[m].milestoneName}
            </h4>
            <div style="display: none;" class="milestone-display-task" id="${data.milestones[m].id}-display-task">
            </div>
        `

        for (t = 0; t < data.milestones[m].tasks.length; t ++) {
            document.getElementById(`${data.milestones[m].id}-display-task`).innerHTML += `
                <li>${data.milestones[m].tasks[t][0]}</li>
            `
        }

        document.getElementById(`${data.milestones[m].id}-display-task`).innerHTML += `
            <button onclick="completeMilestone('${data.milestones[m].id}')">Complete Milestone</button>
        `
    }
}