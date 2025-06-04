async function displayIdea(id) {
    document.getElementById(`${id}-arrow`).innerHTML = `
    <svg id="${id}-arrow-button" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
    `
    
    document.getElementById(`${id}-arrow-button`).setAttribute("onclick", `displayCloseIdea('${id}')`)
    
    await loadNotes(id)

    document.getElementById(`${id}-add`).style = "display: flex;"
    document.getElementById(`${id}-delete`).style = "display: flex;"
    document.getElementById(`${id}-edit`).style = "display: flex;"

    document.getElementById(`${id}-subidea`).style = "display: block;"

}

function displayCloseIdea(id) {
    document.getElementById(`${id}-arrow`).innerHTML = `
    <svg id="${id}-arrow-button" onclick="displayIdea(0)" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
    `

    document.getElementById(`${id}-arrow-button`).setAttribute("onclick", `displayIdea('${id}')`)

    closeNotes("auto")

    document.getElementById(`${id}-add`).style = "display: none;"
    document.getElementById(`${id}-delete`).style = "display: none;"
    document.getElementById(`${id}-edit`).style = "display: none;"
    document.getElementById(`${id}-subidea`).style = "display: none;"
}

function displayAddIdea() {
    document.getElementById("idea-input").style = "display: flex"
    
    document.getElementById("idea-icon").innerHTML = `
    <svg id="idea-icon-button" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    `
    
    document.getElementById("idea-icon-button").setAttribute("onclick", "displayCloseAddIdea()")
}

function displayCloseAddIdea() {
    document.getElementById("idea-input").style = "display: none"
    
    document.getElementById("idea-icon").innerHTML = `
    <svg id="idea-icon-button" class="add" xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    `
    
    document.getElementById("idea-icon-button").setAttribute("onclick", "displayAddIdea()")
    document.getElementById("idea-name").value = ""
}

function ideaInput(event) {
    if (event.key === 'Enter') {
        makeIdea()
    }
}

function preventTab(event) {
    if (event.key === "Tab") {
        event.preventDefault();

        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Insert tab character at caret
        textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

        // Move caret
        textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
}

async function loadIdeas() {
    result = await window.electronAPI.loadIdeas()

    console.log(result)

    for (i = 0; i < result.ideas.length; i ++) {
        id = result.ideas[i].id

        document.getElementById("idea-display").innerHTML += `
        <p id="${id}-idea">
            <span id="${id}-arrow" class="center">
                <svg id="${id}-arrow-button" onclick="displayIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </span>
            <span class="name">
                <span id="${id}-idea-name">
                    ${result.ideas[i].ideaName}
                </span>
                <span id="${id}-idea-edit" style="display: none">
                    <input type="text">
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg></button>
                </span>
            </span>
            <span id="${id}-edit" style="display: none;" class="center">
                <svg onclick="editIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </span>
            <span id="${id}-add" style="display: none;" class="center">
                <svg id="${id}-add-button" onclick="displayMakeSubidea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </span>
            <span id="${id}-delete" style="display: none;" class="center">
                <svg onclick="deleteIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </span>
        </p>
        <div id="${id}-subidea" class="subidea" style="display: none;">
            <div id="${id}-subidea-input" class="input" style="display: none;">
                <input type="text" id="${id}-subidea-input-txt" onkeydown="subIdeaInput(event, '${id}')">
                <button onclick="makeSubIdea('${id}')">
                    <svg class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                </button>
            </div>
        </div>
        `

        for (s = 0; s < result.ideas[i].subIdeas.length; s ++) {
            console.log(result.ideas[i].subIdeas[s])
            document.getElementById(`${id}-subidea`).innerHTML += `
                <p ondblclick="deleteSubIdea('${result.ideas[i].subIdeas[s].id}')" id="${result.ideas[i].subIdeas[s].id}">${result.ideas[i].subIdeas[s].value}</p>
            `
        }
    }

    displayAddIdea()
    displayCloseAddIdea()
}

async function makeIdea() {
    idea = document.getElementById("idea-name").value
    display = document.getElementById("idea-display").innerHTML
    result = await window.electronAPI.addIdea(idea)

    if (result.message == 200) {
        displayCloseAddIdea()
    
        id = result.content.id
    
        document.getElementById("idea-display").innerHTML = `
        <p id="${id}-idea">
            <span id="${id}-arrow">
                <svg id="${id}-arrow-button" onclick="displayIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </span>
            ${result.content.ideaName}
            <span id="${id}-edit" style="display: none;">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </span>
            <span id="${id}-add" style="display: none;">
                <svg id="${id}-add-button" onclick="displayMakeSubidea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </span>
            <span id="${id}-delete" style="display: none;">
                <svg onclick="deleteIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </span>
        </p>
        <div id="${id}-subidea" class="subidea" style="display: none;">
            <div id="${id}-subidea-input" class="input" style="display: none;">
                <input type="text" id="${id}-subidea-input-txt" onkeydown="subIdeaInput(event, '${id}')">
                <button onclick="makeSubIdea('${id}')">
                    <svg class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                </button>
            </div>
        </div>
        ` + display
    }

    else {
        document.getElementById('error-add-idea').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('error-add-idea').style = 'display: none;'
        }, 5000);
    }
}

async function deleteIdea(id) {
    result = await window.electronAPI.deleteIdea(id)

    if (result == 200) {
        document.getElementById(`${id}-idea`).remove()
        closeNotes("delete")
    }

    else {
        document.getElementById('error-delete-idea').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('error-delete-idea').style = 'display: none;'
        }, 5000);
    }

}

async function loadNotes(id) {
    result = await window.electronAPI.loadIdeaNotes(id)

    if (result.message == 200) {
        document.getElementById("notes").value = result.content
        document.getElementById("notes").disabled = false
        document.getElementById("notes").setAttribute("name", id)

        console.log(document.getElementById("notes").getAttribute("name"))
    }

    else {
        document.getElementById('error-loading-notes').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('error-loading-notes').style = 'display: none;'
        }, 5000);
    }
}

async function closeNotes(fun) {
    if (fun == "auto")
        result = await saveNotes()


    if (result == 200 || fun == "delete") {
        document.getElementById("notes").value = "Load an Idea to use the notes!"
        document.getElementById("notes").disabled = true
        document.getElementById("notes").setAttribute("name", "none")
    }

    else;
}

async function saveNotes() {
    id = document.getElementById("notes").getAttribute("name")
    notes = document.getElementById("notes").value


    if (!(id == "none")) {
        result = await window.electronAPI.saveIdeaNotes(id, notes)

        if (result == 200)  {
            document.getElementById('success-saving-notes').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('success-saving-notes').style = 'display: none;'
            }, 1500);

            return 200
        }

        else {
            document.getElementById('error-saving-notes').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('error-saving-notes').style = 'display: none;'
            }, 5000);

            return 404
        }
    }
}

setInterval(saveNotes, 60000*2)

async function displayMakeSubidea(id) {
    document.getElementById(`${id}-subidea-input`).style = "display: flex;"
    document.getElementById(`${id}-add`).innerHTML = `<svg id="${id}-add-button" class="add" xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="17px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`

    document.getElementById(`${id}-add-button`).setAttribute("onclick",`displayCloseMakeSubidea('${id}')`)
}

async function displayCloseMakeSubidea(id) {
    document.getElementById(`${id}-subidea-input`).style = "display: none;"
    document.getElementById(`${id}-add`).innerHTML = `<svg id="${id}-add-button" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>`

    document.getElementById(`${id}-add-button`).setAttribute("onclick",`displayMakeSubidea('${id}')`)

    document.getElementById(`${id}-subidea-input-txt`).value = null
}

function subIdeaInput(event, id) {
    if (event.key === 'Enter')
        makeSubIdea(id)
}

async function makeSubIdea(id) {
    subidea = document.getElementById(`${id}-subidea-input-txt`).value
    console.log(subidea)

    result = await window.electronAPI.addSubIdea(id, subidea)
    console.log(result)

    if (result.message == 200)
        document.getElementById(`${id}-subidea`).innerHTML += `
        <p id="${result.content.id}">${result.content.value}</p>
        `

    else;
}

async function deleteSubIdea(id) {
    result = await window.electronAPI.deleteSubIdea(id)
    
    if (result == 200)
        document.getElementById(id).remove()

    else;
}

function editIdea(id) {
    document.getElementById(`${id}-idea-name`).style = "display: none;"
    document.getElementById(`${id}-idea-edit`).style = "display: flex"
}