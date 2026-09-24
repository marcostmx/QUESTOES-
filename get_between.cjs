const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sIdx = html.indexOf('<!-- Footer Nav -->');
const eIdx = html.indexOf('<!-- End Screen -->');
console.log(html.substring(sIdx, eIdx));
