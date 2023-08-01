'use strict'

const WALL = '🟫'
const FOOD = '▪'
const EMPTY = ' '
const SUPERFOOD = '🥙'
const CHERRY = '🍒'


var gIdIntervalSuperFood = 0
var gIdIntervalCherry = 0
var gCountFood = 0
const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    console.log('hello')

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    closeModal()
    gGame.isOn = true
    gGame.score = 0
    gCountFood = 60
    gIdIntervalCherry = setInterval(addCherry, 15000) //change timeeee after 
    // gIdIntervalSuperFood=setInterval(handleSuperFood,2000)  //clear interval
    playSound('soundpacman')

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gCountFood++

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gCountFood--
            }
            if ((i === 1 && j === size - 2) || (i === size - 2) && (j === 1) ||
                (i === size - 2 && j === size - 2) || (i === 1 && (j === 1))) board[i][j] = SUPERFOOD

        }
    }

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom

    // update model
    gGame.score += diff
    // update dom
    document.querySelector('.score').innerText = gGame.score
}

function isVictory() {
    if (gCountFood !== gGame.score) return false
    var msg = 'You Winner!!👏'
    openModal(msg)
    gGame.score = 0
    updateScore(0)
    gGame.isOn = true
    return true
}

function gameOver() {
    playSound('lozer')
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    var msg = 'Game Over! \n\r Click to Start Again'
    openModal(msg)
    gGame.isOn = false
}
var gEmptyPlaces = []

function addCherry() {
    var emptyLocation=getEmptyLocation(gBoard)
    if(!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell( emptyLocation , CHERRY)
}
 
function getEmptyLocation(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                gEmptyPlaces.push({ i, j })
            }
        }
    }
    if (!gEmptyPlaces.length) return null
    var randIdx = getRandomIntInclusive(0, gEmptyPlaces.length - 1)
    return gEmptyPlaces[randIdx]
}

