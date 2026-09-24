const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const srsIdx = html.indexOf('<div id="self-assess-area"');
const footerIdx = html.indexOf('<!-- Footer Nav -->');
console.log(html.substring(srsIdx, footerIdx));
