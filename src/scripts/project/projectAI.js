async function userProjectAI() {
    userInput = document.getElementById("user-ai-input").value;

    document.getElementById("AI-display").innerHTML += `
        <p class="user">${userInput}</p>
    `
}