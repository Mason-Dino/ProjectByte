page = -1

async function projectButtons() {
    console.log("test")

    result = await window.electronAPI.loadProjects()
    result = JSON.parse(result)

    document.getElementById("notes-bar").innerHTML += `
        <button onclick="changePage(-1)">Global</button>
    `

    for (p = 0; p < result.projects.length; p ++) {
        document.getElementById("notes-bar").innerHTML += `
            <button onclick="changePage(${p})">${result.projects[p].projectName}</button>
        `
    }
}

async function changePage(num) {
    page = num
    notes = await window.electronAPI.getNotes(page)
    document.getElementById("notes").value = notes
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