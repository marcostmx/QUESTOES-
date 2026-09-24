const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const footerIdx = html.indexOf('<!-- Footer Nav -->');
const endScreenIdx = html.indexOf('<!-- End Screen -->');
console.log(html.substring(footerIdx, endScreenIdx));
