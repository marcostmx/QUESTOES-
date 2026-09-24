#!/bin/bash
cat << 'INNER_EOF' > script.cjs
const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const targetStart = "const calendarEl = document.getElementById('srs-calendar-list');";
const targetEnd = "} // end renderSRSCalendar"; // I will just match the block end properly by parsing the logic

const startIdx = code.indexOf(targetStart);
const partialCode = code.substring(startIdx);
const endIdxRaw = partialCode.indexOf("};\n\n(window as any).selectSimuladoSubject = function(val: string) {"); 
// wait, let's just find "    }\n}\n" after startIdx.
INNER_EOF
node script.cjs
