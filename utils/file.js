const fs = require("fs");

const load_file_content = (path, separator) => {
  const file_content = fs.readFileSync(path, "utf8");
  if (separator) return file_content.split(separator);
  return file_content;
};

module.exports = {
  load_file_content
};
