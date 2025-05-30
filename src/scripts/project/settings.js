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
        <button id="${c}-color-delete" onclick="deleteColor(${c})"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        `
    }

    for (l = 0; l < result.link.links.length; l ++) {
        document.getElementById("links").innerHTML += `
        <a href="${result.link.links[l].link}" target="_blank" id="${l}-link-link">
            <button class="link-value">${result.link.links[l].value}</button>
        </a>
        <div class="delete-parent" id="${l}-link-delete-div">
            <button onclick="deleteLink(${l})" id="${l}-link-delete"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </div>
        `
    }

    for (m = 0; m < result.todo.milestones.length; m ++) {
        document.getElementById("milestones").innerHTML += `
        <p id="${m}-milestone-name">${result.todo.milestones[m].milestoneName}</p>
        <button id="${m}-milestone-delete" onclick="deleteMilestone(${m})"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        `
    }
}

async function deleteLink(id) {
    result = await window.electronAPI.deleteLink(id)

    console.log(result)
    document.getElementById(`${id}-link-link`).remove()
    document.getElementById(`${id}-link-delete-div`).remove()

    parent = document.getElementById("links")

    for (l = 0; l < parent.childElementCount; l += 2) {
        document.getElementById(parent.children[l].id).id = `${Math.floor(l/2)}-link-link`
        document.getElementById(parent.children[l+1].id).id = `${Math.floor(l/2)}-link-delete-div`
        document.getElementById(parent.children[l+1].children[0].id).setAttribute("onclick", `deleteLink(${Math.floor(l/2)})`)
    }
}

async function deleteColor(id) {
    result = await window.electronAPI.deleteColor(id)
    console.log(result)
    
    document.getElementById(`${id}-color-display`).remove()
    document.getElementById(`${id}-color-hex`).remove()
    document.getElementById(`${id}-color-delete`).remove()

    parent = document.getElementById("colors")

    for (c = 0; c < parent.childElementCount; c += 3) {
        document.getElementById(parent.children[c].id).id = `${Math.floor(c/3)}-color-display`
        document.getElementById(parent.children[c+1].id).id = `${Math.floor(c/3)}-color-hex`
        document.getElementById(parent.children[c+2].id).id = `${Math.floor(c/3)}-color-delete`
        document.getElementById(parent.children[c+2]).setAttribute("onclick", `deleteColor(${Math.floor(c/3)})`)
    }
}

async function deleteMilestone(id) {
    result = await window.electronAPI.deleteMilestone(id)
    console.log(result)

    document.getElementById(`${id}-milestone-name`).remove()
    document.getElementById(`${id}-milestone-delete`).remove()

    console.log(document.getElementById("milestones"))

    parent = document.getElementById("milestones")

    for (m = 0; m < parent.childElementCount; m += 2) {
        document.getElementById(parent.children[m].id).id = `${Math.floor(m/2)}-milestone-name`
        document.getElementById(parent.children[m+1].id).id = `${Math.floor(m/2)}-milestone-delete`
        document.getElementById(parent.children[m+1].id).setAttribute("onclick", `deleteMilestone(${Math.floor(m/2)})`)
    }
}