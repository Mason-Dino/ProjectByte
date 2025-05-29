function updateInfo() {
    projectName = document.getElementById("project-name").value
    icon = document.getElementById("project-icon").value

    if (!(icon === "none")) {
        changeIcon()
    }

    if (!(projectName === "")) {
        changeName()
    }
}

async function changeIcon() {
    icon = document.getElementById("project-icon").value
    await window.electronAPI.changeIcon(icon)
    console.log(icon)
}

async function changeName() {
    projectName = document.getElementById("project-name").value
    await window.electronAPI.changeName(projectName)
    console.log(projectName)
}