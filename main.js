const x_s = 64
const y_s = x_s
const g = document.getElementById.bind(document)
const c = document.createElement.bind(document)
const p = console.log.bind(console)
const e = document.addEventListener.bind(document)
const clr = [[[192,192,192,255],  [0,0,0,0],  [205,0,0,0],  [0,205,0,0],  [205,205,0,0],  [0,0,205,0], [205,0,205,0], [0,205,205,0], [229,229,229,0]],
                [[0,0,0,111], [127,127,127,0], [255,0,0,0], [0,255,0,0], [255,255,0,0], [0,0,255,0], [255,0,255,0], [0,255,255,0], [255,255,255,0]]] //term colors
let cur = [0,0,0,0]
let lpx = [0,0,g("0-0")]
let data = []
let m = false
function r(c) {return "rgb("+c[0]+","+c[1]+","+c[2]+")"}
function r2(c) {let op = "100%"; if (c[3] > 0) {op = "0%"}; return "rgb("+c[0]+" "+c[1]+" "+c[2]+" / "+op+")"}
function hover(y,x,el) {lpx = [y,x,el]; if (m) {g(y+"-"+x).style.backgroundColor = r(cur); data[y][x] = cur}}
function expo() {
    const ctx = g("cv").getContext("2d")
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            ctx.fillStyle = r2(data[y][x]);
            ctx.fillRect(x, y, 1, 1);
        }
    }
    const url = g("cv").toDataURL("image/png")
    p(url)
    g("a").href = url
    g("a").click()
}

function but(ind) {
    let b_row = clr[ind]
    p(b_row)
    let bd = g("buttons-div"+ind)
    for (let i = 0; i < b_row.length; i++) {
        b = c("button")
        b.id = ind+"b"+i
        b.class = "but"
        b.style.backgroundColor = r(b_row[i])
        bd.appendChild(b)
        if (b_row[i][3] == 111){let txt = document.createTextNode("↓");
            b.appendChild(txt);
            b.style.color = "white";
            b.addEventListener("mousedown",function(ev) {ev.stopPropagation(); expo()})} else {
        b.addEventListener("mousedown",Function("cur = ["+b_row[i]+"]; arguments[0].stopPropagation();p(cur)")) }

    }
}
function onload() {
    let t = Date.now()
    const tab = g("pixels")
    g("ui").style.width = 0.9*x_s+"rem"
    e("mousedown",function(ev) {m = true; hover(lpx[0],lpx[1],lpx[2]); p("lpx "+lpx)})
    e("mouseup",function(ev) {m = false})
    let row
    for (let i = 0; i < y_s; i++) {
        row = c("tr")
        let tmp = []
        row.id = i
        for (let j = 0; j < x_s; j++) {
            el = c("th")
            tmp.push([255,255,255,0])
            el.id = i+"-"+j
            el.class = i+" "+j+" th"
            el.style.backgroundColor = "white"
            let f = Function("hover("+i+","+j+",this)")
            if (i == j) {el.style.backgroundColor = r(clr[0][4]); tmp[tmp.length-1] = [255, 165, 0, 0]}
            row.appendChild(el)
            el.addEventListener("mouseover",f)

        }
        data.push(tmp)
        tab.appendChild(row)
    }
    p(Date.now()-t)
    but(0)
    but(1)
    g("cv").height = y_s
    g("cv").width = x_s
    p(Date.now()-t)
}

