'use strict'

const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 500) //change to 1000 

}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        color: getRandomColor(),
        currCellContent: FOOD,
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}
function getGhostHTML(ghost) {
    var color = gPacman.isSuper ? 'gray' : ghost.color
    return `<span style="background-color:${color};">${GHOST}</span>`
} 

function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}


//{location: {…}, color: '#426B17', currCellContent: '▪'}
function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currLocation = gGhosts[i].location
        if (currLocation.i === location.i && currLocation.j === location.j) {
            var ghostRemove = gGhosts.splice(i, 1)[0]///?????
            console.log('ghostRemove', ghostRemove)
            checkGhostCell(ghostRemove)
            setTimeout(backGhost, 5000, ghostRemove)

        }
    }

}
function checkGhostCell(ghost) {
    if (ghost.currCellContent === FOOD)
        handleFood()
    ghost.currCellContent= EMPTY
}
function backGhost(ghost) {
    gGhosts.push(ghost)
}