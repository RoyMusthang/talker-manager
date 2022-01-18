const fs = require('fs').promises;

async function readFileContent() {
  try {
    const file = await fs.readFile('./talker.json');
    return JSON.parse(file);
  } catch (err) {
    console.error(err);
  }
}

module.exports = readFileContent;
