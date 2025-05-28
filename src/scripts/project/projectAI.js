function genID() {
	id = ''

	lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	upperLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

	for (i = 0; i < 10; i ++) {
		option = Math.floor(Math.random() * 3)

		if (option === 0) {
			id += lowerLetters[Math.floor(Math.random() * 26)]
		}
		else if (option === 1) {
			id += upperLetters[Math.floor(Math.random() * 26)]
		}
		
		else if (option === 2) {
			id += String(number[Math.floor(Math.random() * 10)])
		}
	}

	return id
}

async function userProjectAI() {
    userInput = document.getElementById("user-ai-input").value;

    idUser = genID()

    document.getElementById("AI-display").innerHTML += `
    <div style="padding-left: 10px">
        <p class="user" id="${idUser}">${userInput}</p>
    </div>
    `

    document.getElementById(idUser).scrollIntoView();



    id = genID()

    document.getElementById("AI-display").innerHTML += `
    <div style="padding-right: 10px;">
        <p id="${id}" class="dot-loader projectAI"></p>
    </div>
    `

    ai = await window.electronAPI.projectAIChat(userInput)

    console.log(ai.choices[0].message.content)

    document.getElementById(id).classList = ["projectAI"]
    document.getElementById(id).innerText = ai.choices[0].message.content
    document.getElementById(id).scrollIntoView();

    document.getElementById("user-ai-input").value = "";
}