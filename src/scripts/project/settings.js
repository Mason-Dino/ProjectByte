function updateInfo() {
    projectName = document.getElementById("project-name").value
    icon = document.getElementById("project-icon").value

    updateNumber = [null, null]

    if (!(icon === "none")) {
        result = changeIcon()
        if (result === 200)
            updateNumber[0] = 200

        else
            updateNumber[0] = 404
    }

    if (!(projectName === "")) {
        result = changeName()
        if (result === 200)
            updateNumber[1] = 200

        else
            updateNumber[1] = 404
    }

    if (updateNumber[0] == updateNumber[1]) {
        if (updateNumber[0] == 200) {

        }

        else if (updateNumber[0] == 404) {
            
        }
    }
    else {
        if (updateNumber[0] == 200) {
    
        }
    
        else if (updateNumber[0] == 404) {
    
        }
    
        if (updateNumber[1] == 200) {
    
        }
    
        else if (updateNumber[1] == 404) {
    
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
    
    return result
}