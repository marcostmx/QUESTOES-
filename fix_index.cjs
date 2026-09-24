const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newButton = `
        <button onclick="window.startSubject('gis2')" class="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-300 hover transition-all flex flex-col items-center text-center group cursor-pointer">
            <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">GIS 2</h3>
            <p class="text-xs text-gray-500 mt-2">Epidemiologia e Estudos</p>
        </button>
`;

if (!html.includes('GIS 2')) {
    html = html.replace(/<button onclick="window\.startSubject\('bases cirúrgicas'\)".*?<\/button>/s, '$&\n' + newButton);
    fs.writeFileSync('index.html', html);
    console.log("Button added successfully!");
} else {
    console.log("Button already exists");
}
