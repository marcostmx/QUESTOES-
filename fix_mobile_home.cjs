const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
    /id="home-screen" class="absolute inset-0 z-50 bg-\[#F3F4F6\] flex flex-col items-center justify-center p-6 fade-in"/,
    'id="home-screen" class="absolute inset-0 z-50 bg-[#F3F4F6] flex flex-col items-center justify-start md:justify-center p-6 py-12 md:py-6 overflow-y-auto fade-in"'
);

// Decrease the gap and padding on mobile for the cards to fit better without much scrolling if possible
indexHtml = indexHtml.replace(
    /<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">/,
    '<div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">'
);

// Make the cards slightly smaller on mobile
indexHtml = indexHtml.replace(
    /class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm/g,
    'class="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm'
);

fs.writeFileSync('index.html', indexHtml);
