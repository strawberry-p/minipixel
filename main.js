function onload() {
    let t = Date.now()
    const g = document.getElementById.bind(document)
    const c = document.createElement.bind(document)
    const tab = g("pixels")
    const x_s = 64
    const y_s = x_s
    let row
    for (let i = 0; i < y_s; i++) {
        row = c("tr")
        row.id = i
        for (let j = 0; j < x_s; j++) {
            el = c("th")
            el.id = i+"-"+j
            el.class = i+" "+j+" th"
            el.style.backgroundColor = "white"
            if (i == j) {el.style.backgroundColor = "orange"}
            row.appendChild(el)

        }
        tab.appendChild(row)
    }
    console.log(Date.now()-t)
}
