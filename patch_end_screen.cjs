const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I will replace `<div id="drive-export-container" class="mt-6 flex flex-col items-center">`
// with a div that also contains the Restart button.

html = html.replace(
    `<div id="drive-export-container" class="mt-6 flex flex-col items-center">`,
    `<div class="mt-8 flex flex-col sm:flex-row items-center gap-4">
    <button onclick="window.restartTest()" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-300 transition-colors flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        Reiniciar Módulo
    </button>
    <div id="drive-export-container" class="flex flex-col items-center">`
);

// We need to close that new `<div class="mt-8 flex flex-col sm:flex-row items-center gap-4">`.
// It wraps the drive-export-container. So let's replace `</button></div>   </div>  </div>` with `</button></div></div>   </div>  </div>`.
// Wait, the structure was:
// <div id="drive-export-container"> <button></button> </div>
// Now it's:
// <div class="..."> <button restart></button> <div id="drive-export"> <button drive></button> </div>
// So we just need an extra `</div>`.

html = html.replace(
    `        Salvar Progresso no Google Drive\n    </button>\n</div>`,
    `        Salvar Progresso no Google Drive\n    </button>\n</div>\n</div>`
);

fs.writeFileSync('index.html', html);
console.log("Patched End Screen HTML");
