const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the sequence of multiple </div> before </section> with a single </div>
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>\s*<\/main>\s*<\/div>/, '</div> </section> </main> </div>');
fs.writeFileSync('index.html', html);
console.log("Fixed end tags via regex");
