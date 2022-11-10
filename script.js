const gameBoard = (() => {
    let board = 
    [null, null, null,
     null, null, null,
     null, null, null]
    return {board}
})()

const displayController = (() => {})()

gameBoard.board = 
    ['X',  null, null,
     null, 'O',  null,
     null, null, 'X']