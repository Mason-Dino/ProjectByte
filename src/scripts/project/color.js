function addColor() {
    console.log(document.getElementById("color-output").value)
}

function changeColor() {
    color = document.getElementById("color-output").value;
    document.getElementById("hex-display").innerText = color;
}