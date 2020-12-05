const readLines = require("../utils/readLines");

function format_line(value) {
  [_, rowCode, columnCode] = value.match(/^([FB]+)([LR]+)$/);
  return {
    rowCode,
    columnCode,
  };
}

function findMissingSeat(seats) {
  const sortedSeatsIds = seats.map((seat) => seat.id).sort((a, b) => a - b);

  const firstSeat = sortedSeatsIds[0];
  const lastSeat = sortedSeatsIds[sortedSeatsIds.length - 1];
  for (let i = firstSeat; i < lastSeat; i++) {
    if (
      !sortedSeatsIds.includes(sortedSeatsIds[i] + 1) &&
      sortedSeatsIds.includes(sortedSeatsIds[i] + 2)
    )
      return sortedSeatsIds[i] + 1;
  }
  return false;
}

function bisect(code, min, max) {
  const char = code.charAt(0);
  const isLower = char === "F" || char === "L";
  if (code.length === 1) return isLower ? min : max;
  const pivot = (min + max) / 2;
  const newMin = isLower ? min : Math.ceil(pivot);
  const newMax = isLower ? Math.floor(pivot) : max;
  return bisect(code.substring(1), newMin, newMax);
}

(async function run() {
  const input = await readLines("./input.txt", undefined, format_line);

  const seats = input.map((boardingPass) => {
    const row = bisect(boardingPass.rowCode, 0, 127);
    const column = bisect(boardingPass.columnCode, 0, 7);
    const id = row * 8 + column;
    return {
      ...boardingPass,
      row,
      column,
      id,
    };
  });

  const missingSeat = findMissingSeat(seats);

  console.log({ missingSeat });
})();
