const { load_file_content } = require("../utils/file");

const input = load_file_content("./input.txt", "\n");

const compute_fuel_for_mass = mass => Math.floor(mass / 3) - 2;
const compute_total_fuel = input =>
  input.reduce((total, current) => total + compute_fuel_for_mass(current), 0);

const fuel = compute_total_fuel(input);

console.log("Total fuel needed : ", fuel);
