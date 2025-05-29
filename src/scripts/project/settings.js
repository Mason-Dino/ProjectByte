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