function displayIdea(id) {
    document.getElementById(`${id}-arrow`).innerHTML = `
    <svg id="${id}-arrow-button" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
    `

    document.getElementById(`0-arrow-button`).setAttribute("onclick", "displayCloseIdea(0)")

    document.getElementById(`${id}-add`).style = "display: flex;"
    document.getElementById(`${id}-delete`).style = "display: flex;"
}

function displayCloseIdea(id) {
    document.getElementById(`${id}-arrow`).innerHTML = `
    <svg id="0-arrow-button" onclick="displayIdea(0)" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e3e3e3"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
    `

    document.getElementById(`${id}-arrow-button`).setAttribute("onclick", "displayIdea(0)")

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
}

function ideaInput(event) {
    if (event.key === 'Enter') {
        makeIdea()
    }
}

async function makeIdea() {
    idea = document.getElementById("idea-name").value

    result = await window.electronAPI.addIdea(idea)
    console.log(result)
}