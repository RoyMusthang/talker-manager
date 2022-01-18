const fs = require('fs').promises;

async function readFileContent() {
  const file = await fs.readFile('./talker.json');
  return JSON.parse(file);
}

module.exports = readFileContent;
