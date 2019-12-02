const { load_file_content } = require("../utils/file");

const input = load_file_content("./input.txt", "\n");

const compute_fuel_for_mass = mass => Math.floor(mass / 3) - 2;

const compute_additional_fuel = mass => {
  const additional_fuel = compute_fuel_for_mass(mass);
  if (additional_fuel < 0) return 0;
  console.log("- additional_fuel : ", additional_fuel);
  return additional_fuel + compute_additional_fuel(additional_fuel);
};

const compute_fuel_for_module = mass => {
  console.log("---------------------------");
  console.log("Module mass : ", mass);
  const initial_fuel = compute_fuel_for_mass(mass);
  console.log("- initial fuel : ", initial_fuel);
  const additional_fuel = compute_additional_fuel(initial_fuel);
  console.log("- additional_fuel_total : ", additional_fuel);
  console.log("Total fuel for module : ", initial_fuel + additional_fuel);
  return initial_fuel + additional_fuel;
};

const compute_total_fuel = input =>
  input.reduce((total, current) => total + compute_fuel_for_module(current), 0);

const fuel = compute_total_fuel(input);
console.log("");
console.log("Total fuel needed : ", fuel);
