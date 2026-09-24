const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/dark:[A-Za-z0-9_/\-#[\]]+/g, '');
indexHtml = indexHtml.replace(/\s{2,}/g, ' '); // collapse extra spaces
fs.writeFileSync('index.html', indexHtml);

let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');
mainTsx = mainTsx.replace(/dark:[A-Za-z0-9_/\-#[\]]+/g, '');
mainTsx = mainTsx.replace(/,\s*''/g, ''); // Fix array cases if any empty strings were left
fs.writeFileSync('src/main.tsx', mainTsx);
