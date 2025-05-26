//color display and function all complete
function changeColor() {
    color = document.getElementById("color-output").value;
    document.getElementById("hex-display").innerText = color;
}

function addColorDisplay() {
    document.getElementById("color-output").style = 'display: grid';
    document.getElementById("hex-display").style = 'display: grid';
    document.getElementById("color-add-button").style = 'display: grid';
    document.getElementById("color-icon").innerHTML = '<svg onclick="closeColorDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
}

function closeColorDisplay() {
    document.getElementById("color-output").style = 'display: none';
    document.getElementById("hex-display").style = 'display: none';
    document.getElementById("color-add-button").style = 'display: none';
    document.getElementById("color-icon").innerHTML = '<svg onclick="addColorDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';
}

async function addColorBackend() {
    color = document.getElementById("color-output").value;
    data = await window.electronAPI.addColor(color)

    console.log(data)

    document.getElementById("colors-display").innerHTML = `
    <input type="color" id="color-output" onchange="changeColor()" value="#2a2a2a" style="display: none;">
    <p id="hex-display" style="display: none;">#2a2a2a</p>
    <button id="color-add-button" onclick="addColorBackend()" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
    `

    for (c = 0; c < data.colors.length; c ++) {
        document.getElementById("colors-display").innerHTML += `
            <div class="hex" style="background-color: ${data.colors[c]};"></div>
            <p>${data.colors[c]}</p>
        `
    }
}