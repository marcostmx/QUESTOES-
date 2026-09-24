const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

const themeBtn = `
        <button onclick="window.toggleTheme()" class="absolute top-6 right-6 text-gray-500 dark:text-gray-400 hover:text-gray-800 hover:dark:text-gray-300 transition-colors flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#222]" title="Alternar tema">
            <svg id="theme-icon-light-home" class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg id="theme-icon-dark-home" class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
`;

indexHtml = indexHtml.replace(
    /<div id="home-screen"[^>]*>/,
    '$&\n' + themeBtn
);

fs.writeFileSync('index.html', indexHtml);
