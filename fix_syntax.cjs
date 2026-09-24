const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const strToRemove = `               <span class="text-xs text-gray-400 font-bold">\${dayName}</span>
                       <span class="text-xl font-black text-gray-400 leading-tight">\${dayNum}</span>
                       <div class="mt-1 w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                    </div>
                \`;
            }
        }`;

code = code.replace(strToRemove, '');
fs.writeFileSync('src/main.tsx', code);
console.log("Fixed syntax");
