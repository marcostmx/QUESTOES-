const fs = require('fs');
let text = fs.readFileSync('src/bc_all.ts', 'utf8');
const lastIndex = text.lastIndexOf('gabarito: `Alternativa BPor que B está certa:');
if (lastIndex !== -1) {
  let truncated = text.substring(0, text.indexOf('`', lastIndex + 60) + 1);
  truncated += '\n    }\n];\n';
  fs.writeFileSync('src/bc_all.ts', truncated);
}
