const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const endScreenIdx = html.indexOf('<div id="end-screen"');
const endScreenSection = html.substring(endScreenIdx);
console.log(endScreenSection);
