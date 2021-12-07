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

function isWinningBoard(board, values) {
  for (let i = 0; i < board.length; i++) {
    if (isWinningLine(board, i, values)) return true;
    if (isWinningColumn(board, i, values)) return true;
  }
  return false;
}

function winningBoardSum(board, values) {
  const fullBoard = [].concat(...board);
  const drawCountToWin = getDrawCountToWin(board, values);
  const numbersUntilWin = values.slice(0, drawCountToWin);
  const unmarkedNumbers = fullBoard.filter(
    (number) => !numbersUntilWin.includes(number)
  );
  const unmarkedNumbersSum = unmarkedNumbers.reduce(
    (acc, curr) => acc + parseInt(curr),
    0
  );
  return unmarkedNumbersSum * numbersUntilWin.pop();
}

function getDrawCountToWin(board, values) {
  for (let i = 0; i < values.length; i++) {
    if (isWinningBoard(board, values.slice(0, i))) return i;
  }
  return 0;
}

function findBigestValueIndex(values) {
  let bigest = 0;
  let bigestIndex = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > bigest) {
      bigest = values[i];
      bigestIndex = i;
    }
  }
  return bigestIndex;
}

(async () => {
  const input = fs.readFileSync("./input_1.txt", "utf8").split("\n\n");

  const random = input[0].split(",");
  let boards = input
    .slice(1)
    .map((board) =>
      board
        .split("\n")
        .map((line) => line.split(" ").filter((value) => value != ""))
    );

  const drawCountsToWin = boards.map((board) =>
    getDrawCountToWin(board, random)
  );
  let latestWin = boards[findBigestValueIndex(drawCountsToWin)];

  const sum = winningBoardSum(latestWin, random);
  console.log({ latestWin, sum });
})();
