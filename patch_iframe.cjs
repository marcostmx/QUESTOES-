const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

const iframeLogic = `
function loadDriveFolder() {
    const container = document.getElementById('drive-files-container');
    if (!container) return;

    // Using Google Drive's native iframe embed feature which bypasses the need for API keys entirely
    // The folder must simply be shared as "Anyone with the link can view".
    const folderId = '1M4XXYKo43Db531FwehPucpYKfQNwCWnA';
    container.innerHTML = \`<iframe src="https://drive.google.com/embeddedfolderview?id=\${folderId}#list" style="width:100%; height:400px; border:0; border-radius: 8px; overflow:hidden;" allow="autoplay"></iframe>\`;
}
`;

content = content.replace(/async function loadDriveFolder\(\) \{[\s\S]*?\n\}\n/, iframeLogic + '\n');
fs.writeFileSync('src/main.tsx', content);
