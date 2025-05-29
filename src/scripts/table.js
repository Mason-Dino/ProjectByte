starting = [null, null]
hover = [null, null]
ending = [null, null]
working = true
clicks = 0

document.addEventListener("click", function (event) {
    console.log(event.target.id)

    if (event.target.id.split(",").length > 1) {
        document.getElementById(event.target.id).classList = "selected-item";

        
        if (starting[0] != null && starting[1] != null && clicks % 2 == 1) {
            ending[0] = parseInt(event.target.id.split(",")[0])
            ending[1] = parseInt(event.target.id.split(",")[1])
            working = false
        }

        else {
            starting[0] = parseInt(event.target.id.split(",")[0])
            starting[1] = parseInt(event.target.id.split(",")[1])
            working = true;
        }
        
        console.log(starting, ending)
        clicks += 1;
    }
})

document.addEventListener("mouseover", function (event) {
    if (event.target.id.split(",").length > 1 && working == true) {
        hover[0] = parseInt(event.target.id.split(",")[0])
        hover[1] = parseInt(event.target.id.split(",")[1])

        rval = 1;
        cval = 1;

        if (starting[0] > hover[0])
            rval = -1

        if (starting[1] > hover[1])
            cval = -1


        for (r = 1; r <= 4; r += 1) {
            for (c = 1; c <= 3; c += 1) {
                if (!(document.getElementById(`${r},${c}`).classList.value === "disabled-item")) {
                    document.getElementById(`${r},${c}`).classList = "project-space-item";
                }
            }
        }

        document.getElementById(`${starting[0]},${starting[1]}`).classList = "selected-item";
        
        for (r = starting[0]; rval > 0 ? r <= hover[0] : r >= hover[0] ; r += rval) {
            for (c = starting[1]; cval > 0 ? c <= hover[1] : c >= hover[1] ; c += cval) {
                if (!(document.getElementById(`${r},${c}`).classList.value === "disabled-item")) {
                    console.log(r, c)
                    document.getElementById(`${r},${c}`).classList = "selected-item";
                }
            }
        }
        console.log("--------------------------------")
    }
})

async function addFeature() {
    select = document.getElementById("feature").value
    console.log(select)

    if (!(starting[0] === null) && !(ending[0] === null)) {
        if (starting[0] > ending[0])
            rval = -1

        if (starting[1] > ending[1])
            cval = -1

        for (r = starting[0]; rval > 0 ? r <= hover[0] : r >= hover[0] ; r += rval) {
            for (c = starting[1]; cval > 0 ? c <= hover[1] : c >= hover[1] ; c += cval) {
                document.getElementById(`${r},${c}`).classList = "disabled-item"
            }
        }

        starting = [null, null]
        ending = [null, null]
    }
}