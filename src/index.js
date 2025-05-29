const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const shell = require('electron').shell;
const path = require('node:path');
const fs = require('fs');
const hidefile = require('hidefile');
const { json } = require('node:stream/consumers');
const { marked } = require('marked')
const { OpenAI } = require("openai")

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1100,
		height: 675,
		minWidth: 1100,
		minHeight: 675,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // Open all external links in the default browser
        shell.openExternal(url);
        return { action: 'deny' }; // Prevent opening in Electron
    });
    
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const currentURL = mainWindow.webContents.getURL();
        const isExternal = new URL(url).origin !== new URL(currentURL).origin;
    
        if (isExternal) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
	
	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'index.html'));
	
	// Open the DevTools.
	mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();
	
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

async function getLoadedProject() {
	data = await fs.promises.readFile('project.json', 'utf8')
	data = JSON.parse(data)

	result = {
		loaded: data.loaded,
		projectName: data.projects[data.loaded].projectName,
		location: data.projects[data.loaded].location
	}

	return result
}

function genTaskID() {
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('dialog:open', async () => {
	const result = await dialog.showOpenDialog({
		properties: ['openDirectory']
	});

	const filepath = result.filePaths[0];

	if (!fs.existsSync('project.json')) {
		data = {
			projects: [],
			loaded: 0,
			AIsetup: false
		}
	
		fs.writeFile('project.json', JSON.stringify(data, null, 4), (err) => {
			if (err) {
				console.error(err);
			}
			else {
				console.log("File made!")
			}
		});
	}

	projectbyte = path.join(filepath, `.projectbyte`)
	fs.mkdirSync(path.join(filepath, `.projectbyte`), { recursive: true })

	fs.readFile('project.json', 'utf8', (err, data) => {
		if (err) {
			console.error("Failed to read file: ", err);
		}

		projects = JSON.parse(data)

		pName = path.basename(result.filePaths[0])

		console.log("projects: ", projects)

		projectData = {
			projectName: pName,
			location: result.filePaths[0],
			icon: null
		}

		projectList = projects['projects']
		projectList.push(projectData)

		//projects['projects'].push(projectData)

		console.log(projectList)

		fs.writeFile('project.json', JSON.stringify(projects, null, 4), (err) => {
			if (err) {
				console.error(err);
			}
			else {
				console.log("File wrote!")
			}
		});
	})

	setup = {
		"features": ["todolist", "milestones", "links", "colors", "notes", "chatgpt"],
		"todolist": {
			"column": [1, 3],
			"row": [1, 2]
		},
		"milestones": {
			"column": [3, 4],
			"row": [1, 3]
		},
		"links": {
			"column": [1, 2],
			"row": [2, 3]
		},
		"colors": {
			"column": [2, 3],
			"row": [2, 3]
		},
		"notes": {
			"column": [1, 3],
			"row": [3, 5]
		},
		"chatgpt": {
			"column": [3, 4],
			"row": [3, 5]
		}
	}

	fs.writeFile(path.join(path.join(filepath, `.projectbyte`), 'setup.json'), JSON.stringify(setup, null, 4), (err) => {
		if (err)
			console.error(err)
		else
			console.log('Setup')
	})

	tasks = {
		task: [
			{
				value: "First Task",
				date: "2025-05-22",
				id: "F1r3tTAsK!"
			}
		],
		milestones: []
	}

	fs.writeFile(path.join(path.join(filepath, `.projectbyte`), 'task.json'), JSON.stringify(tasks, null, 4), (err) => {
		if (err)
			console.error(err)
		else
			console.log('Task')
	})

	links = {
		links: [
			{
				link: "https://github.com/Mason-Dino/ProjectByte",
				value: "Github"
			},
			{
				link: "https://google.com",
				value: "Google"
			},
			{
				link: "https://chatgpt.com/",
				value: "ChatGPT"
			},
			{
				link: "https://makecode.microbit.org/",
				value: "Microbit"
			}
		]
	}

	fs.writeFile(path.join(path.join(filepath, `.projectbyte`), 'link.json'), JSON.stringify(links, null, 4), (err) => {
		if (err)
			console.error(err)
		else
			console.log('Links')
	})

	colors = {
		colors: [

		]
	}

	fs.writeFile(path.join(path.join(filepath, `.projectbyte`), 'color.json'), JSON.stringify(colors, null, 4), (err) => {
		if (err)
			console.error(err)
		else
			console.log('Colors')
	})

	notes = "Hello World!"

	fs.writeFile(path.join(path.join(filepath, `.projectbyte`), 'note.txt'), notes, (err) => {
		if (err)
			console.error(err)
		else
			console.log('Notes')
	})

	if (process.platform === 'win32') {
		hidefile.hide(path.join(filepath, `.projectbyte`),  (err, newPath) => {
			if (err) {
				return console.error('Error hiding folder:', err);
			}
			console.log(`Hidden folder: ${newPath}`);
		});
	}

	return result;
});

ipcMain.handle("load:projects", async () => {
	console.log("test")

	if (!fs.existsSync('project.json')) {
		return 404;
	}

	data = await fs.promises.readFile('project.json', 'utf8')
	
	return data;
});

ipcMain.handle("ready:project", async (event, number) => {
	fs.readFile('project.json', 'utf8', (err, data) => {
		if (err) {
			console.error("Failed to read file: ", err);
		}

		projects = JSON.parse(data)
		projects.loaded = number

		fs.writeFile('project.json', JSON.stringify(projects, null, 4), (err) => {
			if (err) {
				console.error(err);
			}
			else {
				console.log("File wrote!")
			}
		});
	})

	return number;
})

ipcMain.handle("load:whole:project", async () => {
	data = await fs.promises.readFile('project.json', 'utf8')
	data = JSON.parse(data)
	console.log(data)
	
	projectbyte = String(path.join(data.projects[data.loaded].location, '.projectbyte'))

	setupfilename = path.join(projectbyte, 'setup.json')
	setup = await fs.promises.readFile(setupfilename, 'utf8')
	setup = JSON.parse(setup)
	console.log(setup)

	projectData = {
		projects: data.projects[data.loaded],
		AIsetup: data.AIsetup,
		setup: setup
	}

	for (i = 0; i < setup.features.length; i ++) {
		if (setup.features[i] === "todolist") {
			todo = await fs.promises.readFile(path.join(projectbyte, 'task.json'), 'utf8')
			todo = JSON.parse(todo)

			todo.task.sort((a, b) => {
				date1 = new Date(a.date)
				date2 = new Date(b.date)

				if (date1 > date2)
					return 1

				else if (date1 < date2)
					return -1

				return 0
			})

			console.log(todo)

			projectData.todo = todo
		}

		if (setup.features[i] === "links") {
			links = await fs.promises.readFile(path.join(projectbyte, 'link.json'), 'utf8')
			links = JSON.parse(links)

			projectData.link = links
		}

		if (setup.features[i] === 'colors') {
			color = await fs.promises.readFile(path.join(projectbyte, 'color.json'), 'utf8')
			color = JSON.parse(color)

			projectData.color = color
		}

		if (setup.features[i] === 'notes') {
			notes = await fs.promises.readFile(path.join(projectbyte, 'note.txt'), 'utf8')
			
			projectData.note = notes
		}
	}


	return projectData;
})

ipcMain.handle("add:task", async (event, value, date) => {
	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')
	if (!fs.existsSync(path.join(projectFolder, 'task.json'))) {
		data = {
			task: []
		}

		fs.writeFileSync(path.join(projectFolder, 'task.json'), JSON.stringify(data, null, 4), (err) => {
			if (err) {
				console.error(err);
			}
			else {
				console.log("File made!")
			}
		});
	}

	taskList = await fs.promises.readFile(path.join(projectFolder, 'task.json'), 'utf8')
	taskList = JSON.parse(taskList)

	task = {
		value: value,
		date: date,
		id: genTaskID()
	}

	taskList['task'].push(task)

	taskList.task.sort((a, b) => {
		date1 = new Date(a.date)
		date2 = new Date(b.date)

		if (date1 > date2)
			return 1

		else if (date1 < date2)
			return -1

		return 0
	})

	await fs.promises.writeFile(path.join(projectFolder, 'task.json'), JSON.stringify(taskList, null, 4))

	return taskList
})

ipcMain.handle("complete:task", async (event, id) => {
	console.log(id)

	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')

	taskList = await fs.promises.readFile(path.join(projectFolder, 'task.json'), 'utf8')
	taskList = JSON.parse(taskList)

	remove = null
	for (i = 0; i < taskList.task.length; i ++) {
		if (taskList.task[i].id === id)
			remove = i
	}

	taskList.task.splice(remove, 1)

	console.log(taskList)

	fs.writeFile(path.join(projectFolder, 'task.json'), JSON.stringify(taskList, null, 4), (err) => {
		if (err) {
			console.error(err);
		}
		else {
			console.log("File updated!")
		}
	});

	console.log("tasks: ", taskList)

	return taskList
})

ipcMain.handle("add:link", async (event, link, value) => {
	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')
	if (!fs.existsSync(path.join(projectFolder, 'link.json'))) {
		data = {
			task: [],
			milestones: []
		}

		fs.writeFileSync(path.join(projectFolder, 'link.json'), JSON.stringify(data, null, 4), (err) => {
			if (err) {
				console.error(err);
			}
			else {
				console.log("File made!")
			}
		});
	}

	data = await fs.promises.readFile(path.join(projectFolder, 'link.json'), 'utf8')
	data = JSON.parse(data)

	link = {
		link: link,
		value: value
	}

	data["links"].push(link)

	await fs.promises.writeFile(path.join(projectFolder, 'link.json'), JSON.stringify(data, null, 4))

	return data
})

ipcMain.handle("add:milestone", async (event, milestone) => {
	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')
	if (!fs.existsSync(path.join(projectFolder, 'task.json'))) {
		data = {
			task: [],
			milestones: []
		}

		fs.writeFileSync(path.join(projectFolder, 'task.json'), JSON.stringify(data, null, 4), (err) => {
			if (err) {
				console.error(err);
			}
			else {
				console.log("File made!")
			}
		});
	}

	data = await fs.promises.readFile(path.join(projectFolder, 'task.json'), 'utf8')
	console.log(data)
	data = JSON.parse(data)

	milestone.id = genTaskID()

	data.milestones.push(milestone)

	await fs.promises.writeFile(path.join(projectFolder, 'task.json'), JSON.stringify(data, null, 4))

	return data
})

ipcMain.handle("complete:milestone", async (event, id) => {
	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')

	data = await fs.promises.readFile(path.join(projectFolder, 'task.json'), 'utf8')
	data = JSON.parse(data)

	m = 0
	complete = null
	while (m < data.milestones.length && complete === null) {
		if (data.milestones[m].id === id) {
			complete = data.milestones[m]
			complete.index = m;
		}

		m += 1;
	}

	console.log(data)

	for (t = 0; t < complete.tasks.length; t ++) {
		console.log("test")
		try {
			for (i = 0; i < data.task.length; i ++) {
				if (data.task[i].id === complete.tasks[t][1].split("-")[0]) {
					data.task.splice(i, 1)
				}
			}
		}

		catch {}
	}

	data.milestones.splice(complete.index, 1)

	await fs.promises.writeFile(path.join(projectFolder, 'task.json'), JSON.stringify(data, null, 4))

	return data
})

ipcMain.handle("add:color", async (event, color) => {
	console.log(color)

	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')

	data = await fs.promises.readFile(path.join(projectFolder, 'color.json'), 'utf8')
	data = JSON.parse(data)

	data.colors.push(color)

	await fs.promises.writeFile(path.join(projectFolder, 'color.json'), JSON.stringify(data, null, 4))

	return data
})

ipcMain.handle("save:notes", async (event, notes) => {
	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')

	try {
		fs.promises.writeFile(path.join(projectFolder, 'note.txt'), notes)
		return 200
	}

	catch {
		return 404
	}
})

ipcMain.handle("setup:ai", async (event, apiKey) => {
	try {
		data = await fs.promises.readFile("project.json", "utf8")
		data = JSON.parse(data)
	
		data.AIkey = apiKey
		data.AIsetup = true

		const client = new OpenAI({
			apiKey: apiKey
		});
		
		const completion = await client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					"role": "system",
					"content": `You are a AI Assistant where you assist with different projects, you have these items are a todo list: 'Add Featre' due 5/17/2025, 'Remove spelling' due 5/19/2025
								Assists the user with what they need in relation to those.
					`
				},
				{
					"role": "user",
					"content": "Which task should I do next?"
				}
			],
		});
	
		await fs.promises.writeFile("project.json", JSON.stringify(data, null, 4))
		return 200
	}

	catch {
		return 404
	}
})

ipcMain.handle("load:settings", async () => {
	data = await fs.promises.readFile("project.json", "utf8")
	data = JSON.parse(data)

	return data
})

ipcMain.handle("chat:ai", async (event, chat) => {
	try {
		data = await fs.promises.readFile("project.json", "utf8")
		data = JSON.parse(data)

		const client = new OpenAI({
			apiKey: data.AIkey
		});
		
		const completion = await client.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					"role": "system",
					"content": `You are a AI Assistant where you assist with different projects, you have these items are a todo list: 'Add Featre' due 5/17/2025, 'Remove spelling' due 5/19/2025
								Assists the user with what they need in relation to those.
					`
				},
				{
					"role": "user",
					"content": chat
				}
			],
		});
	
		return marked(completion.choices[0].message.content)
	}

	catch {
		return 404
	}
})

ipcMain.handle("change:setup", async (event, setup) => {
	project = await getLoadedProject()
	projectFolder = path.join(project.location, '.projectbyte')

	await fs.promises.writeFile(path.join(projectFolder, "setup.json"), JSON.stringify(setup, null, 4))
})