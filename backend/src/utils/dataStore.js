const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/caterers.json");

const readData = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { readData, writeData };
