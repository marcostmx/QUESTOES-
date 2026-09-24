const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove remaining stats
indexHtml = indexHtml.replace(/<div class="bg-white border border-green-200 rounded-xl p-4 flex flex-col items-center">[\s\S]*?<\/div>/g, '');
indexHtml = indexHtml.replace(/<div class="bg-white border border-red-200 rounded-xl p-4 flex flex-col items-center">[\s\S]*?<\/div>/g, '');

// There is a weird `:bg-[#222]` left by my previous regex that removed `dark:`.
indexHtml = indexHtml.replace(/:bg-\[#[a-zA-Z0-9]+\]/g, '');
indexHtml = indexHtml.replace(/:bg-[a-zA-Z0-9\/-]+/g, '');
fs.writeFileSync('index.html', indexHtml);
