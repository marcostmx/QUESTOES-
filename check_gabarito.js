import fs from 'fs';

const files = fs.readdirSync('src').filter(f => f.endsWith('.ts'));
let totalMCQ = 0;
let failing = 0;

for (const file of files) {
  const content = fs.readFileSync('src/' + file, 'utf8');
  const qs = content.split('type: "MÚLTIPLA ESCOLHA"');
  for (let i = 1; i < qs.length; i++) {
    totalMCQ++;
    const str = qs[i];
    const gabIndex = str.indexOf('gabarito:');
    if (gabIndex > -1) {
      const gabPortion = str.substring(gabIndex, gabIndex + 200);
      if (!gabPortion.match(/Alternativa\s+([A-E])/i)) {
        console.log("Failed in " + file + ":", gabPortion);
        failing++;
      }
    } else {
       console.log("No gabarito block found:", file);
       failing++;
    }
  }
}
console.log("Total:", totalMCQ, "Failing:", failing);
