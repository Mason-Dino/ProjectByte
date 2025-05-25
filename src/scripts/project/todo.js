//task list is done with both display and function
function addTodoDisplay() {
    document.getElementById("todo-value").style = 'display: block';
    document.getElementById("todo-date").style = 'display: block';
    document.getElementById("todo-add-button").style = 'display: block';
    document.getElementById("todolist-icon").innerHTML = '<svg onclick="closeTodoDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
}

function closeTodoDisplay() {
    document.getElementById("todo-value").style = 'display: none';
    document.getElementById("todo-date").style = 'display: none';
    document.getElementById("todo-add-button").style = 'display: none';
    document.getElementById("todolist-icon").innerHTML = '<svg onclick="addTodoDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';
}

async function addTodoBackend() {
    value = document.getElementById("todo-value").value;
    date = document.getElementById("todo-date").value;

    console.log(value, date)

    if (!(value === '' || date === '')) {
        tasks = await window.electronAPI.addTodoTask(value, date);


        document.getElementById("todolist").innerHTML = `<input type="text" class="value" id="todo-value" style="display: block;"><input type="date" class="date" id="todo-date" style="display: block;"><button onclick="addTodoBackend()" id="todo-add-button" style="display: block;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>`
        document.getElementById("milestone-task").innerHTML = `<option selected disabled hidden>Select a Task</option>`

        today = new Date()
        today.setHours(0, 0, 0, 0);

        for (t = 0; t < tasks.task.length; t ++) {
            console.log(tasks.task[t])
            checkDate = new Date(tasks.task[t].date)
            checkDate.setDate(checkDate.getDate() + 1)
            checkDate.setHours(0, 0, 0, 0)
            date = tasks.task[t].date.split("-")

            document.getElementById('todolist').innerHTML += `
            <p class="value" id="${tasks.task[t].id}-value">${tasks.task[t].value}</p>
            <p class="date" id="${tasks.task[t].id}-date">${date[1]}/${date[2]}/${date[0]}</p>
            <button id="${tasks.task[t].id}" onclick="completeTask(this.id)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
            `
            
            document.getElementById("milestone-task").innerHTML += `
                <option id="${tasks.task[t].id}-milestone">${tasks.task[t].value}</option>
            `

            if (checkDate < today && checkDate != today) {
                console.log(tasks.task[t].id)
                console.log(today, checkDate)
                document.getElementById(`${tasks.task[t].id}-date`).style = "color: var(--error)"
            }
        }
    }

    else {
        document.getElementById('task-value-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('task-value-error').style = 'display: none;'
        }, 5000);
    }
}

async function completeTask(id) {
    console.log(id)
    await window.electronAPI.completeTask(id)

    document.getElementById(`${id}-value`).remove()
    document.getElementById(`${id}-date`).remove()
    document.getElementById(`${id}`).remove()
}