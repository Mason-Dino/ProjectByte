async function loadSettings() {
    data = await window.electronAPI.loadSetup()

    if (data.AIsetup === true) {
        document.getElementById("API-key").value = data.AIkey;
    }

    for (p = 0; p < data.projects.length; p ++) {
        document.getElementById("project-select-edit").innerHTML += `
            <option value="${p}-${data.projects[p].projectName}" id="${p}-${data.projects[p].projectName}">${data.projects[p].projectName}</option>
        `

        if (data.projects[p].archive == true)
            document.getElementById("project-select-archive").innerHTML += `
                <option value="${p}-${data.projects[p].projectName}" id="${p}-${data.projects[p].projectName}">${data.projects[p].projectName}</option>
            `
    }
}

async function resetSelection() {
    data = await window.electronAPI.loadSetup()

    document.getElementById("project-select-edit").innerHTML = `<option value="none" selected disabled hidden>Select a Project</option>`
    document.getElementById("project-select-archive").innerHTML = `<option value="none" selected disabled hidden>Select a Project</option>`

    for (p = 0; p < data.projects.length; p ++) {
        document.getElementById("project-select-edit").innerHTML += `
            <option value="${p}-${data.projects[p].projectName}" id="${p}-${data.projects[p].projectName}">${data.projects[p].projectName}</option>
        `

        if (data.projects[p].archive == true)
            document.getElementById("project-select-archive").innerHTML += `
                <option value="${p}-${data.projects[p].projectName}" id="${p}-${data.projects[p].projectName}">${data.projects[p].projectName}</option>
            `
    }
}

function show() {
    document.getElementById("API-key").type = "text";
    document.getElementById("showhideAI").setAttribute('onclick', 'hide()')
    document.getElementById("showhideAI").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>`
}

function hide() {
    document.getElementById("API-key").type = "password";
    document.getElementById("showhideAI").setAttribute('onclick', 'show()')
    document.getElementById("showhideAI").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>`
}

async function AIsetup() {
    apiKey = document.getElementById("API-key").value
    result = await window.electronAPI.aiSetup(apiKey)

    if (result === 200) {
        document.getElementById('ai-setup-success').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('ai-setup-success').style = 'display: none;'
        }, 5000);
    }
    else if (result === 404) {
        document.getElementById('ai-setup-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('ai-setup-error').style = 'display: none;'
        }, 5000);
    }
}

async function deleteProject() {
    selection = document.getElementById("project-select-edit")
    projects = selection.options
    selected = projects[selection.selectedIndex]

    console.log(selected.value)

    if (!(selected.value == "none")) {
    result = await window.electronAPI.deleteProject(selected.value)
    await resetSelection()
    console.log(result)

    //reset select here
    //add error codes
    }

    else {

    }
}

async function archiveProject() {
    selection = document.getElementById("project-select-edit")
    projects = selection.options
    selected = projects[selection.selectedIndex]

    if (!(selected.value == "none")) {
        result = await window.electronAPI.archiveProject(selected.value)
        await resetSelection()
        console.log(result)

        //reset select here
        //add error codes
    }

    else {

    }
}

async function restoreProject() {
    selection = document.getElementById("project-select-archive")
    projects = selection.options
    selected = projects[selection.selectedIndex]

    console.log(selected.value)

    if (!(selected.value == "none")) {
        result = await window.electronAPI.restoreProject(selected.value)
        await resetSelection()
        console.log(result)

        //reset select here
        //add error codes
    }

    else {

    }
}

async function openArchiveProject() {
    selection = document.getElementById("project-select-archive")
    projects = selection.options
    selected = projects[selection.selectedIndex]

    console.log(selected.value)

    if (!(selected.value == "none")) {
        result = await window.electronAPI.openArchiveProject(selected.value)
        console.log(result)

        location.href = "project.html";
        //reset select here
        //add error codes
    }

    else {

    }
}