const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div class="pt-2 mt-2 border-t border-gray-100"></div>`;
const button = `
<button onclick="window.switchTab('favorites')" id="tab-favorites" class="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
    <span>Questões Favoritas</span>
</button>
<div class="pt-2 mt-2 border-t border-gray-100"></div>
`;

if (html.includes(target)) {
    html = html.replace(target, button);
    fs.writeFileSync('index.html', html);
    console.log("Nav button added!");
} else {
    console.log("Target not found!");
}
