function addMilestoneTask() {
    selection = document.getElementById("milestone-task")
    options = selection.options
    selected = options[selection.selectedIndex]
    console.log(selected.value)
    console.log(selected.id.split("-")[0])

    id = selected.id.split("-")[0]

    if (!(id === 'none')) {}
    else {
        document.getElementById('milestone-value-error').style = 'display: flex;'
        setTimeout(function () {
            document.getElementById('milestone-value-error').style = 'display: none;'
        }, 5000);
    }
}
