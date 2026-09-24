const fs = require('fs');
let code = fs.readFileSync('src/bc_all.ts', 'utf8');
let stripped = code.replace(/`([^`\\]|\\.)*`/g, function(match) { return '`' + ' '.repeat(match.length-2) + '`'; })
                   .replace(/"([^"\\]|\\.)*"/g, function(match) { return '"' + ' '.repeat(match.length-2) + '"'; })
                   .replace(/'([^'\\]|\\.)*'/g, function(match) { return "'" + ' '.repeat(match.length-2) + "'"; });

let stack = [];
for (let i = 0; i < stripped.length; i++) {
  if (stripped[i] === '(') stack.push(i);
  if (stripped[i] === ')') {
    if (stack.length > 0) stack.pop();
    else console.log("Unmatched ) at", i);
  }
}
for (let i of stack) {
  let line = code.substring(0, i).split('\n').length;
  console.log("Unmatched ( at line", line, code.substring(i - 20, i + 20));
}
