const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
    /<h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">Banco de questões PR1<\/h1>/,
    '<h1 class="text-2xl md:text-5xl font-extrabold text-gray-900 mb-2 mt-4 md:mt-0 tracking-tight">Banco de questões PR1</h1>'
);

indexHtml = indexHtml.replace(
    /<p class="text-gray-600 mb-10 text-center max-w-md">Selecione o módulo que deseja praticar hoje\.<\/p>/,
    '<p class="text-sm md:text-base text-gray-600 mb-6 md:mb-10 text-center max-w-md">Selecione o módulo que deseja praticar hoje.</p>'
);

fs.writeFileSync('index.html', indexHtml);
