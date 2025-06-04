async function displayIdea(id) {
    document.getElementById(`${id}-arrow`).innerHTML = `
    <svg id="${id}-arrow-button" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
    `
    
    document.getElementById(`${id}-arrow-button`).setAttribute("onclick", `displayCloseIdea('${id}')`)
    
    await loadNotes(id)

    document.getElementById(`${id}-add`).style = "display: flex;"
    document.getElementById(`${id}-delete`).style = "display: flex;"

}

function displayCloseIdea(id) {
    document.getElementById(`${id}-arrow`).innerHTML = `
    <svg id="${id}-arrow-button" onclick="displayIdea(0)" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
    `

    document.getElementById(`${id}-arrow-button`).setAttribute("onclick", `displayIdea('${id}')`)

    closeNotes()

    document.getElementById(`${id}-add`).style = "display: none;"
    document.getElementById(`${id}-delete`).style = "display: none;"
}

function displayAddIdea() {
    document.getElementById("idea-input").style = "display: flex"
    
    document.getElementById("idea-icon").innerHTML = `
    <svg id="idea-icon-button" class=add xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
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

async function loadIdeas() {
    result = await window.electronAPI.loadIdeas()

    console.log(result)

    for (i = 0; i < result.ideas.length; i ++) {
        id = result.ideas[i].id

        document.getElementById("idea-display").innerHTML += `
        <p id="${id}-idea">
            <span id="${id}-arrow">
                <svg id="${id}-arrow-button" onclick="displayIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </span>
            ${result.ideas[i].ideaName}
            <span id="${id}-add" style="display: none;">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </span>
            <span id="${id}-delete" style="display: none;">
                <svg onclick="deleteIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </span>
        </p>
        `
    }

    displayAddIdea()
    displayCloseAddIdea()
}

async function makeIdea() {
    idea = document.getElementById("idea-name").value
    display = document.getElementById("idea-display").innerHTML

    result = await window.electronAPI.addIdea(idea)
    console.log(result)
    displayCloseAddIdea()

    id = result.content.id

    document.getElementById("idea-display").innerHTML = `
    <p id="${id}-idea">
        <span id="${id}-arrow">
            <svg id="${id}-arrow-button" onclick="displayIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        </span>
        ${result.content.ideaName}
        <span id="${id}-add" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </span>
        <span id="${id}-delete" style="display: none;">
            <svg onclick="deleteIdea('${id}')" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </span>
    </p>
    ` + display

}

async function deleteIdea(id) {
    result = await window.electronAPI.deleteIdea(id)
    console.log(result)
    document.getElementById(`${id}-idea`).remove()
}

async function loadNotes(id) {
    result = await window.electronAPI.loadIdeaNotes(id)
    document.getElementById("notes").value = result.content
    document.getElementById("notes").disabled = false
    document.getElementById("notes").setAttribute("name", id)

    console.log(document.getElementById("notes").getAttribute("name"))
}

function closeNotes() {
    document.getElementById("notes").value = "Load an Idea to use the notes!"
    document.getElementById("notes").disabled = true
    document.getElementById("notes").setAttribute("name", "none")
}

async function saveNotes() {
    id = document.getElementById("notes").getAttribute("name")
    notes = document.getElementById("notes").value


    if (!(id == "none")) {
        result = await window.electronAPI.saveIdeaNotes(id, notes)
        console.log(result)
    }

    else {
        console.log("please load a idea item")
    }
}