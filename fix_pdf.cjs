const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf-8');

const regex = /(const qTextLines = doc\.splitTextToSize\(q\.text \|\| "Sem texto\.", pageWidth - 28\);\s*qTextLines\.forEach\(\(line: string\) => \{\s*checkPageBreak\(6\);\s*doc\.text\(line, 14, yPos\);\s*yPos \+= 5;\s*\}\);)/g;

const replacement = `$1
                             
                             if (q.options && Array.isArray(q.options)) {
                                 yPos += 2;
                                 q.options.forEach((opt: any) => {
                                     const optLines = doc.splitTextToSize(opt, pageWidth - 32);
                                     optLines.forEach((line: string) => {
                                         checkPageBreak(6);
                                         doc.text(line, 18, yPos);
                                         yPos += 5;
                                     });
                                     yPos += 2;
                                 });
                             }
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/main.tsx', code);
