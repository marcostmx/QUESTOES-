const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '<!-- closing feedback-area inner div --> <!-- Footer Nav -->';
if (html.includes(targetStr)) {
    html = html.replace(targetStr, '<!-- closing feedback-area inner div --> </div> <!-- Footer Nav -->');
    fs.writeFileSync('index.html', html);
    console.log("Added closing div for flex-1");
} else {
    console.log("Not found target string");
}
