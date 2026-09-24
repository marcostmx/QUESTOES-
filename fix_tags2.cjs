const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('<!-- Footer Nav -->');
console.log(html.substring(idx - 150, idx + 100));
