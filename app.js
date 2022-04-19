var tabEle = document.getElementById("table");
var msgEle = document.getElementById("message");

var newArr = Array.prototype.slice.call(tabEle.children);

var clickCount = 0;
var isBingo = false;

newArr.forEach(ele => {
    ele.addEventListener("click", (e) => { eventHandler(e) })
})

function eventHandler(e) {
    if (!e.target.innerText) {
        clickCount++;
        if (clickCount % 2 != 0) {
            e.target.innerText = "X"
        } else {
            e.target.innerText = "O";
        }
        checkBingo(e);
    }
}

function checkBingo(e) {
    let cindex = newArr.indexOf(e.target);
    let match = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    let filteredMatch = match.filter(ar => {
        return ar.includes(cindex);
    })

    filteredMatch.forEach(ele => {
        if ((newArr[ele[0]].innerText === newArr[ele[1]].innerText) && (newArr[ele[1]].innerText === newArr[ele[2]].innerText)) {
            success(ele[0], ele[1], ele[2])
        } else {
            draw()
        }
    })
}

function success(...ar) {
    ar.forEach((n) => {
        newArr[n].style.cssText = "color:red"
    })
    msgEle.innerText = `${newArr[ar[0]].innerText} has won`;
    isBingo = true;
    setTimeout(clearCells, 5000);
}

function clearCells() {
    clickCount = 0;
    isBingo = false;
    msgEle.innerText = "";
    newArr.forEach(ar => {
        ar.innerText = "";
        ar.style.cssText = "color:white"
    })
}

function draw() {
    var allCellsFilled = newArr.every(ele => {
        return ele.innerText != "";
    })
    if (allCellsFilled && !isBingo) {
        msgEle.innerText = "Draw match";
        setTimeout(clearCells, 3000)
    }
}