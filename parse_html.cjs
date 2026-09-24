const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sectionStart = html.indexOf('<section class="flex-1 bg-gray-50 overflow-y-auto');
const sectionEnd = html.indexOf('</section>', sectionStart) + 10;
const sectionStr = html.substring(sectionStart, sectionEnd);

const regex = /<(\/)?div([^>]*)>/g;
let match;
let depth = 0;
let log = [];

while ((match = regex.exec(sectionStr)) !== null) {
    if (match[1] === '/') {
        depth--;
        log.push(`CLOSE div (depth now ${depth}) @ ` + match.index);
    } else {
        if (!match[0].endsWith('/>')) {
            const idMatch = match[2].match(/id="([^"]+)"/);
            const classMatch = match[2].match(/class="([^"]+)"/);
            const idStr = idMatch ? `#${idMatch[1]}` : '';
            const classStr = classMatch ? `.${classMatch[1].split(' ').join('.')}` : '';
            log.push(`OPEN div${idStr}${classStr} (depth now ${depth+1}) @ ` + match.index);
            depth++;
        }
    }
}

console.log(log.join('\n'));
console.log("Final depth:", depth);
