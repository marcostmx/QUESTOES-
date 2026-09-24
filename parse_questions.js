const fs = require('fs');
const transcriptPath = '/.aistudio/artifacts/brain/1a41184c-89ee-4401-b3a4-7e88592476d7/.system_generated/logs/transcript.jsonl';
const data = fs.readFileSync(transcriptPath, 'utf8');

const lines = data.split('\n').filter(Boolean);
let farmacoText = "";
for (let line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.role === "user" && obj.content && obj.content.includes("tire o temporizador e adicione agora as 100 questoes de farmacologia que estão no arquivo enviado")) {
       farmacoText = obj.content;
    }
  } catch(e) {}
}

if (!farmacoText) {
  console.log("Could not find the user message with 100 questions");
} else {
  // Try to write it to a temp file to inspect
  fs.writeFileSync('farmaco_raw.txt', farmacoText);
  console.log("Wrote to farmaco_raw.txt, length:", farmacoText.length);
}
