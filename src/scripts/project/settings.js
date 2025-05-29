async function updateInfo() {
    projectName = document.getElementById("project-name").value
    icon = document.getElementById("project-icon").value

    updateNumber = [null, null]

    if (!(icon === "none")) {
        result = await changeIcon()
        if (result == 200)
            updateNumber[0] = 200

        else
            updateNumber[0] = 404
    }

    if (!(projectName === "")) {
        result = await changeName()
        if (result == 200)
            updateNumber[1] = 200

        else
            updateNumber[1] = 404
    }

    if (updateNumber[0] == updateNumber[1]) {
        if (updateNumber[0] == 200) {
            document.getElementById('update-both').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('update-both').style = 'display: none;'
            }, 5000);
        }

        else if (updateNumber[0] == 404) {
            document.getElementById('error-both').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('error-both').style = 'display: none;'
            }, 5000);
        }
    }
    else {
        if (updateNumber[0] == 200) {
            document.getElementById('update-icon').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('update-icon').style = 'display: none;'
            }, 5000);
        }
    
        else if (updateNumber[0] == 404) {
            document.getElementById('error-icon').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('error-icon').style = 'display: none;'
            }, 5000);
        }
    
        if (updateNumber[1] == 200) {
            document.getElementById('update-name').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('update-name').style = 'display: none;'
            }, 5000);
        }
    
        else if (updateNumber[1] == 404) {
            document.getElementById('error-name').style = 'display: flex;'
            setTimeout(function () {
                document.getElementById('error-name').style = 'display: none;'
            }, 5000);
        }
    }
}

async function changeIcon() {
    icon = document.getElementById("project-icon").value
    result = await window.electronAPI.changeIcon(icon)
    
    return result
}

async function changeName() {
    projectName = document.getElementById("project-name").value
    result = await window.electronAPI.changeName(projectName)
    console.log(result)
    return result
}

async function loadSettings() {
    result = await window.electronAPI.loadWholeProject();
    console.log(result)
    
    for (c = 0; c < result.color.colors.length; c ++ ) {
        document.getElementById("colors").innerHTML += `
        <div id="${c}-color-display" class="hex" style="background-color: ${result.color.colors[c]};"></div>
        <p id="${c}-color-hex">${result.color.colors[c]}</p>
        <button id="${c}-color-delete"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        `
    }

    for (l = 0; l < result.link.links.length; l ++) {
        document.getElementById("links").innerHTML += `
        <a href="${result.link.links[l].link}" target="_blank" id="${l}-link-link">
            <button class="link-value">${result.link.links[l].value}</button>
        </a>
        <div class="delete-parent" id="${l}-link-delete">
            <button><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </div>
        `
    }

    for (m = 0; m < result.todo.milestones.length; m ++) {
        document.getElementById("milestones").innerHTML += `
        <p id="${m}-milestone-name">${result.todo.milestones[m].milestoneName}</p>
        <button id="${m}-milestone-delete"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        `
    }
}