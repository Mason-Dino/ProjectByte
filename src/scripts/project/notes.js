async function saveNotes() {
    notes = document.getElementById("notes").value;

    result = await window.electronAPI.saveNotes(notes)
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

setInterval(saveNotes, 60000)