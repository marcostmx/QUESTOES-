const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '<!-- Footer Nav -->';
html = html.replace('<!-- closing feedback-area inner div -->', ''); // remove old comment
html = html.replace('<!-- Footer Nav -->', '</div>\n<!-- Footer Nav -->');
fs.writeFileSync('index.html', html);
console.log("Added closing div for flex-1");
