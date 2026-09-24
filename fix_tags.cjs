const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `</div></div></div> <!-- closing feedback-area inner div --> <!-- Footer Nav -->`;
console.log(html.includes(targetStr));

if (html.includes(targetStr)) {
    // Actually wait, let's just inspect that exact part of the file.
    const idx = html.indexOf('<!-- Footer Nav -->');
    console.log(html.substring(idx - 50, idx + 100));
}
