function addMilestoneDisplay() {
    document.getElementById("milestone-setup").style = 'display: block;';
    document.getElementById("milestone-display").style = 'display: none;'
    document.getElementById("milestone-icon").innerHTML = '<svg onclick="closeMilestoneDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
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
        await window.electronAPI.addMilestone(data)
        closeMilestoneDisplay()
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

function completeMilestone(id) {
    
}