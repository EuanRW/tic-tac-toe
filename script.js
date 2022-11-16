//#region Player logic.
const player = (_sign) => {

  getSign = () => {
    return _sign
  }

  swapSign = () => {
    _sign = (_sign == 'X') ? 'O' : 'X'
  }

  setSign = (newSign) => {
    _sign = newSign
  }

  return { getSign, swapSign, setSign};
};
//#endregion

//#region Board Logic.
const gameBoard = (() => {
  let _board = new Array(9).fill(null);

  const getField = (index) => {
    return _board[index];
  };

  const setField = (index, sign) => {
    _board[index] = sign;
  };

  const resetBoard = () => _board.fill(null);

  const checkAllAreNotNull = () => {
    return _board.every(el => el !== null);
  }

  return { getField, setField, resetBoard, checkAllAreNotNull };
})();
//#endregion

//#region Display Logic.
const displayController = (() => {
  //UI Elements.
  const boardFields = document.querySelectorAll(".field");
  const finishedGameModal = document.getElementById("finished-game-modal");
  const finishedGameModalText = document.getElementById("finished-game-modal-text");
  const newGameBtn = document.getElementById("new-game-btn")
  const xBtn = document.getElementById("x-btn")
  const oBtn = document.getElementById("o-btn")

  boardFields.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (e.target.textContent !== "") {
        return;
      } else {
        gameController.nextGo(parseInt(e.target.dataset.index));
        updateBoard();
      }
    })
  );

  const updateBoard = () => {
    for (let i = 0; i < boardFields.length; i++) {
      boardFields[i].textContent = gameBoard.getField(i);
    }
  };

  xBtn.onclick = () => {
    if (gameController.currentPlayer.getSign() == 'O') {
      gameController.swapPlayerSigns()
      updateBoard()
    }

    xBtn.classList.add("current-player-sign")
    oBtn.classList.remove("current-player-sign")
  }

  oBtn.onclick = () => {
    if (gameController.currentPlayer.getSign() == 'X') {
      gameController.swapPlayerSigns()
      updateBoard()
    }

    xBtn.classList.remove("current-player-sign")
    oBtn.classList.add("current-player-sign")
  }

  // Modal Logic.
  // When the user clicks on close span, close the modal
  newGameBtn.onclick = function () {
    gameBoard.resetBoard()
    finishedGameModal.style.display = "none";
    updateBoard()
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == finishedGameModal) {
      finishedGameModal.style.display = "none";
      gameBoard.resetBoard()
      updateBoard()
    }
  };

  const displayFinishedGameModal = () => {
    finishedGameModal.style.display = "block";
  }

  const updateFinishedGameModalText = (text) => {
    finishedGameModalText.innerText = text
  }

  updateBoard();
  return {displayFinishedGameModal, updateFinishedGameModalText}
})();
//#endregion

//#region Game Logic.
const gameController = (() => {
  const humanPlayer = player("X");
  const computerPlayer = player("O");
  let currentPlayer = humanPlayer;

  const nextGo = (fieldIndex) => {
    gameBoard.setField(fieldIndex, currentPlayer.getSign());
    if (checkWinner(fieldIndex)) {
      displayController.updateFinishedGameModalText(currentPlayer.getSign() + ' Wins!')
      displayController.displayFinishedGameModal()
    } else if (checkDraw()) {
      displayController.updateFinishedGameModalText('Draw!')
      displayController.displayFinishedGameModal()
    } else {
      currentPlayer =
        currentPlayer == humanPlayer ? computerPlayer : humanPlayer;
    }
  };

  const swapPlayerSigns = () => {
    humanPlayer.swapSign()
    computerPlayer.swapSign()
    gameBoard.resetBoard()
  }

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === currentPlayer.getSign()
        )
      );
  };

  const checkDraw = () => {
    return gameBoard.checkAllAreNotNull()
  }

  return { nextGo, swapPlayerSigns, currentPlayer };
})();
//#endregion

//#region Finished Game Modal

//#endregion
