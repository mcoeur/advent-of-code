const fs = require("fs");

function isWinningLine(board, lineIndex, values) {
  const line = board[lineIndex];
  for (let i = 0; i < line.length; i++) {
    if (!values.includes(line[i])) return false;
  }
  return true;
}

function isWinningColumn(board, columnIndex, values) {
  const column = board.map((line) => line[columnIndex]);
  for (let i = 0; i < column.length; i++) {
    if (!values.includes(column[i])) return false;
  }
  return true;
}

function winningBoardSum(board, values) {
  const fullBoard = [].concat(...board);
  const unmarkedNumbers = fullBoard.filter(
    (number) => !values.includes(number)
  );
  const unmarkedNumbersSum = unmarkedNumbers.reduce(
    (acc, curr) => acc + parseInt(curr),
    0
  );
  return unmarkedNumbersSum * values.pop();
}

function isWinningBoard(board, values) {
  for (let i = 0; i < board.length; i++) {
    if (isWinningLine(board, i, values)) return true;
    if (isWinningColumn(board, i, values)) return true;
  }
  return false;
}

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n\n");

  const random = input[0].split(",");
  const boards = input
    .slice(1)
    .map((board) =>
      board
        .split("\n")
        .map((line) => line.split(" ").filter((value) => value != ""))
    );

  let randomBucket = [];
  for (let i = 0; i < random.length; i++) {
    randomBucket.push(random[i]);
    const winningBoards = boards.filter((board) =>
      isWinningBoard(board, randomBucket)
    );
    if (winningBoards.length > 0) {
      console.log("winning board found : ", winningBoards[0]);
      const sum = winningBoardSum(winningBoards[0], randomBucket);
      console.log({ sum });
      return;
    }
  }
})();
