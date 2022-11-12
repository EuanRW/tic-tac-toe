//#region Player logic.
const player = (_sign) => {
  return { _sign };
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

  return { getField, setField, resetBoard };
})();
//#endregion

//#region Display Logic.
const displayController = (() => {
  //UI Elements.
  const boardFields = document.querySelectorAll(".field");
  const finishedGameModal = document.getElementById("finished-game-modal");
  const closeModalSpan = document.getElementsByClassName("close")[0];
  const finishedGameModalText = document.getElementById("finished-game-modal-text");
  const newGameBtn = document.getElementById("new-game-btn")

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

  // Modal Logic.
  // When the user clicks on close span, close the modal
  closeModalSpan.onclick = function () {
    finishedGameModal.style.display = "none";
  };

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

  const updateFinishedGameModalText = (player) => {
    finishedGameModalText.innerText = `${player} wins!`
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

  const getCurrentPlayerSign = () => {
    return currentPlayer._sign;
  };

  const nextGo = (fieldIndex) => {
    gameBoard.setField(fieldIndex, currentPlayer._sign);
    if (checkWinner(fieldIndex)) {
      displayController.updateFinishedGameModalText(currentPlayer._sign)
      displayController.displayFinishedGameModal()
    } else {
      currentPlayer =
        currentPlayer == humanPlayer ? computerPlayer : humanPlayer;
    }
  };

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
          (index) => gameBoard.getField(index) === getCurrentPlayerSign()
        )
      );
  };

  return { nextGo };
})();
//#endregion

//#region Finished Game Modal

//#endregion
