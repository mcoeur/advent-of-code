const { load_file_content } = require("../utils/file");

const input = load_file_content("./input.txt", ",");

const compute = (operation, input_1, input_2) => {
  if (operation == 1) return input_1 + input_2;
  if (operation == 2) return input_1 * input_2;
  throw new Error("INVALID OPERATOR");
};

input[1] = 12;
input[2] = 2;
console.log("----- initial input -----");
console.log(input);

let pos = 0;
while (input[pos] != 99) {
  const operation = input[pos];
  const input_1_pos = input[pos + 1];
  const input_1_value = parseInt(input[input_1_pos]);
  const input_2_pos = input[pos + 2];
  const input_2_value = parseInt(input[input_2_pos]);
  const output_pos = input[pos + 3];
  input[output_pos] = compute(operation, input_1_value, input_2_value);
  pos += 4;
}
console.log("----- intcode result -----");
console.log(input);
