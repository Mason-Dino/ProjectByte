//link display and function complete
function addLinkDisplay() {
    document.getElementById("link-link").style = 'display: grid';
    document.getElementById("link-value").style = 'display: grid';
    document.getElementById("link-add-button").style = 'display: grid';
    document.getElementById("link-icon").innerHTML = '<svg onclick="closeLinkDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

    document.getElementById("link-link").focus()
}

function closeLinkDisplay() {
    document.getElementById("link-link").style = 'display: none';
    document.getElementById("link-value").style = 'display: none';
    document.getElementById("link-add-button").style = 'display: none';
    document.getElementById("link-icon").innerHTML = '<svg onclick="addLinkDisplay()" class="add" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>';
}

async function addLinkBackend() {
    link = document.getElementById("link-link").value
    value = document.getElementById("link-value").value

    console.log(link, value)

    if (!(link === '' || value === '')) {
        links = await window.electronAPI.addLink(link, value);

        document.getElementById("display-links").innerHTML = ''

        for (l = 0; l < links.links.length; l ++) {

            document.getElementById('display-links').innerHTML += `
            <a href="${links.links[l].link}" target="_blank">
                <button>${links.links[l].value}</button>
            </a>
            `
        }
    }

    else {
        document.getElementById('link-value-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('link-value-error').style = 'display: none;'
        }, 5000);
    }
}