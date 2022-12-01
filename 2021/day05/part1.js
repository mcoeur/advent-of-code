const fs = require("fs");

(async () => {
  const input = fs.readFileSync("./input_example.txt", "utf8").split("\n");
  console.log(input);
})();
