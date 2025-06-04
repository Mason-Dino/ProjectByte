page = -1

async function projectButtons() {
    console.log("test")

    result = await window.electronAPI.loadProjects()
    result = JSON.parse(result)

    document.getElementById("notes-bar").innerHTML += `
        <button id="-1-notes" onclick="changePage(-1)" class="active-notes-button">Global</button>
    `

    repeat = result.activity.length

    if (repeat > 4) {
        repeat = 4
    }

    for (p = 0; p < repeat; p ++) {
        document.getElementById("notes-bar").innerHTML += `
            <button id="${result.activity[p]}-notes" onclick="changePage(${result.activity[p]})">${result.projects[result.activity[p]].projectName}</button>
        `
    }
}

async function changePage(num) {
    
    last = page
    page = num
    
    notes = await window.electronAPI.getNotes(page)
    document.getElementById("notes").value = notes

    document.getElementById(`${last}-notes`).className = ""
    document.getElementById(`${page}-notes`).className = "active-notes-button"

    document.getElementById("notes").focus()
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

async function saveNotes() {
    notes = document.getElementById("notes").value;

    result = await window.electronAPI.saveNotesGlobal(page, notes)
    console.log(result)

    if (result === 200) {
        document.getElementById('notes-save-success').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('notes-save-success').style = 'display: none;'
        }, 5000);
    }
    else {
        document.getElementById('notes-save-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('notes-save-error').style = 'display: none;'
        }, 5000);
    }
}

setInterval(saveNotes, 60000*2)