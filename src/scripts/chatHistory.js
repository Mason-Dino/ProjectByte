async function loadHistory() {
    result = await window.electronAPI.loadChatHistory()
    console.log(result)
}