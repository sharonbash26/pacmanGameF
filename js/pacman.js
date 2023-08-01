'use strict'

const PACMAN = '<img src="photos/pacman.gif"/>'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: 0
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gCountFood--
}

function onMovePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    isVictory()
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }
    else if (nextCell === FOOD) updateScore(1)
    else if (nextCell === CHERRY) updateScore(10)
    else if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
                handleSuperFood()
    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}

function getPacmanHTML(deg) {
    return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.deg = -90
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = 0
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = 90
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = 180
            nextLocation.j--
            break;
    }
    return nextLocation
}

function openModal(msg) {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elMsg = elModal.querySelector('.msg')
    elMsg.innerText = msg
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function handleSuperFood() {
    gPacman.isSuper = true
    renderGhosts()
    setTimeout(() => {
        gPacman.isSuper = false
        renderGhosts()
    }, 5000)
}

function handleFood() {
    gGame.foodCount--
    updateScore(1)
    isVictory()
}


