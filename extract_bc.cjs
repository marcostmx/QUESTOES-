const fs = require('fs');
const transcriptPath = '/.aistudio/artifacts/brain/1a41184c-89ee-4401-b3a4-7e88592476d7/.system_generated/logs/transcript.jsonl';
const data = fs.readFileSync(transcriptPath, 'utf8');
const lines = data.split('\n').filter(Boolean);
let bcText = "";
for (let line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.role === "user" && obj.content && obj.content.includes("bases cirurgicas")) {
       bcText = obj.content;
    }
  } catch(e) {}
}
if (!bcText) {
  console.log("Could not find the user message");
} else {
  fs.writeFileSync('bc_raw.txt', bcText);
  console.log("Wrote to bc_raw.txt, length:", bcText.length);
}
