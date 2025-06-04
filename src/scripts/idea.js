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