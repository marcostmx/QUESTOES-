const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sectionStart = html.indexOf('<section class="flex-1 bg-gray-50');
const endScreenIdx = html.indexOf('<div id="end-screen"');
const sectionHtml = html.substring(sectionStart, endScreenIdx);

console.log(sectionHtml);
