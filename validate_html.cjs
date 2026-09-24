const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sectionStart = html.indexOf('<section class="flex-1 bg-gray-50');
const sectionHtml = html.substring(sectionStart);

function findUnmatchedDivs(htmlStr) {
    const divRegex = /<\/?div[^>]*>/g;
    let match;
    let depth = 0;
    while ((match = divRegex.exec(htmlStr)) !== null) {
        if (match[0].startsWith('</div')) {
            depth--;
        } else if (!match[0].endsWith('/>')) {
            depth++;
        }
    }
    return depth;
}

console.log("Section div depth:", findUnmatchedDivs(sectionHtml));
