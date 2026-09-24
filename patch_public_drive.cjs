const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

// We need to import firebaseConfig to get the API key
if (!content.includes('import firebaseConfig')) {
    content = content.replace(
        "import { initAuth", 
        "import firebaseConfig from '../firebase-applet-config.json';\nimport { initAuth"
    );
}

const folderLogic = `
async function loadDriveFolder() {
    const container = document.getElementById('drive-files-container');
    if (!container) return;

    container.innerHTML = '<div class="text-sm text-gray-500 text-center py-4 flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Carregando arquivos públicos...</div>';

    try {
        const apiKey = firebaseConfig.apiKey;
        const qFolder = encodeURIComponent("mimeType='application/vnd.google-apps.folder' and name='topado da bahia' and trashed=false");
        
        // Try fetching without OAuth, using API Key for public files
        const folderRes = await fetch(\`https://www.googleapis.com/drive/v3/files?q=\${qFolder}&fields=files(id, name)&key=\${apiKey}\`);
        
        if (folderRes.status === 403) {
            container.innerHTML = '<div class="text-sm text-red-500 text-center py-4">Acesso negado. Certifique-se de que a API do Google Drive está ativada no Google Cloud e que a pasta está configurada como "Qualquer pessoa com o link".</div>';
            return;
        }

        const folderData = await folderRes.json();
        
        if (!folderData.files || folderData.files.length === 0) {
            container.innerHTML = '<div class="text-sm text-gray-500 text-center py-4">Pasta "topado da bahia" não encontrada publicamente. Certifique-se de que ela está compartilhada com "Qualquer pessoa com o link".</div>';
            return;
        }

        const folderId = folderData.files[0].id;

        const qFiles = encodeURIComponent(\`'\${folderId}' in parents and trashed=false\`);
        const filesRes = await fetch(\`https://www.googleapis.com/drive/v3/files?q=\${qFiles}&fields=files(id, name, mimeType, webViewLink, iconLink)&key=\${apiKey}\`);
        const filesData = await filesRes.json();

        if (!filesData.files || filesData.files.length === 0) {
            container.innerHTML = '<div class="text-sm text-gray-500 text-center py-4">A pasta está vazia.</div>';
            return;
        }

        let html = '<ul class="divide-y divide-gray-100">';
        for (const file of filesData.files) {
            html += \`
                <li class="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <div class="flex items-center min-w-0">
                        <img src="\${file.iconLink || 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'}" alt="icon" class="w-5 h-5 mr-3 shrink-0" onerror="this.style.display='none'" />
                        <a href="\${file.webViewLink}" target="_blank" class="text-sm font-medium text-gray-900 truncate hover:text-indigo-600">\${file.name}</a>
                    </div>
                    <a href="\${file.webViewLink}" target="_blank" class="ml-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors">ABRIR</a>
                </li>
            \`;
        }
        html += '</ul>';
        container.innerHTML = html;

    } catch (err) {
        console.error(err);
        container.innerHTML = '<div class="text-sm text-red-500 text-center py-4">Erro ao carregar arquivos. Verifique se a pasta é pública.</div>';
    }
}
`;

content = content.replace(/async function loadDriveFolder\(\) \{[\s\S]*?\n\}\n/, folderLogic + '\n');
fs.writeFileSync('src/main.tsx', content);
console.log("Patched main.tsx with public drive folder logic");
