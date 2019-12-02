const { load_file_content } = require("../utils/file");
const input = load_file_content("./input.txt", ",");

const compute = (operation, input_1, input_2) => {
  if (operation == 1) return input_1 + input_2;
  if (operation == 2) return input_1 * input_2;
  throw new Error("INVALID OPERATOR");
};

const run_intcode = (input, verb, noun) => {
  const memory = [...input];
  memory[1] = verb;
  memory[2] = noun;
  let instruction_pointer = 0;
  while (memory[instruction_pointer] != 99) {
    const operation = memory[instruction_pointer];
    const input_1_address = memory[instruction_pointer + 1];
    const input_1_value = parseInt(memory[input_1_address]);
    const input_2_address = memory[instruction_pointer + 2];
    const input_2_value = parseInt(memory[input_2_address]);
    const output_address = memory[instruction_pointer + 3];
    memory[output_address] = compute(operation, input_1_value, input_2_value);
    instruction_pointer += 4;
  }
  console.log(`Intcode (verb : ${verb}, noun : ${noun}) -> ${memory[0]}`);
  return memory[0];
};

const expected_output = 19690720;
let noun = 0;
let verb = 0;
while (run_intcode(input, noun, verb) != expected_output) {
  verb++;
  if (verb > 99) {
    verb = 0;
    noun++;
  }
}
console.log("100 * noun + verb = ", 100 * noun + verb);
