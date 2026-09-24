const fs = require('fs');
let srs = JSON.parse(fs.readFileSync('pr1_srs.json', 'utf8') || '{}');
// Wait, I can't access localStorage from Node.
