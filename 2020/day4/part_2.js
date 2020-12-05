const readFile = require("../utils/readFile");

function format_input(line) {
  const passports = line
    .match(/(([a-z]+:[a-z0-9#]+[\n ]?)+)/gm)
    .map((passport) => passport.replace(/\n/g, " "))
    .map((passport) => passport.trim());
  return passports;
}

const validators = {
  byr: (value) =>
    /^[0-9]{4}$/.test(value) &&
    parseInt(value) >= 1920 &&
    parseInt(value) <= 2002,
  iyr: (value) =>
    /^[0-9]{4}$/.test(value) &&
    parseInt(value) >= 2010 &&
    parseInt(value) <= 2020,
  eyr: (value) =>
    /^[0-9]{4}$/.test(value) &&
    parseInt(value) >= 2020 &&
    parseInt(value) <= 2030,
  hgt: (value) => {
    if (!/^[0-9]{2,3}(cm|in)$/.test(value)) return false;
    const [_, number, unit] = value.match(/^([0-9]{2,3})(cm|in)$/);
    if (unit === "cm" && parseInt(value) >= 150 && parseInt(value) <= 193)
      return true;
    if (unit === "in" && parseInt(value) >= 59 && parseInt(value) <= 76)
      return true;
    return false;
  },
  hcl: (value) => /^#[0-9a-f]{6}$/.test(value),
  ecl: (value) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
  pid: (value) => /^[0-9]{9}$/.test(value),
  cid: (value) => true,
};

function isValidPassport(passport) {
  const requiredData = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const passportKeys = Object.keys(passport);
  const hasAllRequiredFields = requiredData.every((key) =>
    passportKeys.includes(key)
  );
  if (!hasAllRequiredFields) return false;

  const isValid = Object.entries(passport).every(([key, value]) => {
    return validators[key](value);
  });

  return isValid;
}

(async function run() {
  const input = await readFile("./input.txt");

  const passports = format_input(input);
  const passportObjects = passports
    .map((passport) => passport.split(" "))
    .map((passport) =>
      passport.reduce((obj, data) => {
        const [key, value] = data.split(":");
        return {
          ...obj,
          [key]: value,
        };
      }, {})
    );
  const passportCount = passportObjects.reduce((sum, passport) => {
    if (isValidPassport(passport)) return sum + 1;
    return sum;
  }, 0);
  console.log(passportObjects.length);
  console.log({ passportCount });
})();
