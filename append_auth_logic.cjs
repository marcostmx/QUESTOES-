const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

// Insert import at the top
content = `import { initAuth, googleSignIn, logout, getAccessToken } from './auth';\n` + content;

// Append the auth logic at the bottom
const logic = `
// --- Authentication & Drive Logic ---

const authContainer = document.getElementById('auth-container');
const btnExportDrive = document.getElementById('btn-export-drive');

let currentUser = null;

function renderAuthUI() {
    if (!authContainer) return;
    
    if (currentUser) {
        authContainer.innerHTML = \`
            <div class="flex items-center space-x-3 bg-white p-1.5 pr-4 rounded-full shadow-sm border border-gray-200">
                <img src="\${currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=mp'}" alt="User" class="w-8 h-8 rounded-full">
                <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-800 leading-tight">\${currentUser.displayName || 'Usuário'}</span>
                    <button onclick="window.handleLogout()" class="text-[10px] text-gray-500 hover:text-red-500 text-left transition-colors font-medium">Sair</button>
                </div>
            </div>
        \`;
    } else {
        authContainer.innerHTML = \`
            <button onclick="window.handleLogin()" class="gsi-material-button shadow-sm hover:shadow-md transition-all">
              <div class="gsi-material-button-state"></div>
              <div class="gsi-material-button-content-wrapper flex items-center bg-white border border-gray-200 rounded-md p-1.5 px-3">
                <div class="gsi-material-button-icon mr-2">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block; width: 18px; height: 18px;">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span class="gsi-material-button-contents text-sm font-medium text-gray-700">Sign in</span>
              </div>
            </button>
        \`;
    }
}

(window as any).handleLogin = async () => {
    try {
        const result = await googleSignIn();
        if (result) {
            currentUser = result.user;
            renderAuthUI();
        }
    } catch (err) {
        console.error('Login failed:', err);
        alert('Erro ao fazer login com o Google.');
    }
};

(window as any).handleLogout = async () => {
    try {
        await logout();
        currentUser = null;
        renderAuthUI();
    } catch (err) {
        console.error('Logout failed:', err);
    }
};

initAuth(
    (user, token) => {
        currentUser = user;
        renderAuthUI();
    },
    () => {
        currentUser = null;
        renderAuthUI();
    }
);

if (btnExportDrive) {
    btnExportDrive.addEventListener('click', async () => {
        const token = await getAccessToken();
        if (!token) {
            alert('Por favor, faça login com o Google primeiro para salvar no Drive.');
            return;
        }
        
        const confirmed = window.confirm("Deseja exportar seu progresso atual para o Google Drive?");
        if (!confirmed) return;
        
        try {
            btnExportDrive.disabled = true;
            btnExportDrive.innerHTML = 'Salvando...';
            
            // Gather stats
            const subjects = [
                { id: 'farmacologia', name: 'Farmaco' },
                { id: 'propedêutica', name: 'Propedêutica' },
                { id: 'fisiopatologia', name: 'Fisiopato' },
                { id: 'gis2', name: 'GIS 2' },
                { id: 'bases cirúrgicas', name: 'Bases Cir.' }
            ];
            
            let reportStr = "Relatório de Progresso - Banco de Questões PR1\\n\\n";
            
            subjects.forEach(sub => {
                const saved = localStorage.getItem(\`pr1_progress_\${sub.id}\`);
                let score = 0;
                let corrects = 0;
                let answered = 0;
                if (saved) {
                    try {
                        const state = JSON.parse(saved);
                        corrects = state.correctAnswers ? state.correctAnswers.length : 0;
                        answered = state.answeredQuestions ? state.answeredQuestions.length : 0;
                        if (answered > 0) {
                            score = Math.round((corrects / answered) * 100);
                        }
                    } catch(e) {}
                }
                reportStr += \`Matéria: \${sub.name}\\nRespondidas: \${answered}\\nAcertos: \${corrects}\\nAproveitamento: \${score}%\\n\\n\`;
            });
            
            // Create a file in Drive
            const metadata = {
                name: \`Progresso_Simulado_\${new Date().toISOString().split('T')[0]}.txt\`,
                mimeType: 'text/plain'
            };
            
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', new Blob([reportStr], { type: 'text/plain' }));
            
            const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {
                    'Authorization': \`Bearer \${token}\`
                },
                body: form
            });
            
            if (!res.ok) {
                const errData = await res.text();
                throw new Error('Falha ao fazer upload: ' + errData);
            }
            
            alert('Progresso salvo com sucesso no Google Drive!');
            
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar no Drive: ' + error.message);
        } finally {
            btnExportDrive.disabled = false;
            btnExportDrive.innerHTML = \`
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 3.5h13.12l-3.43 6H6.3M15.73 21L22.28 9.5l-3.42-6-6.56 11.5"></path></svg>
                Salvar Progresso no Google Drive
            \`;
        }
    });
}
`;

content += logic;
fs.writeFileSync('src/main.tsx', content);
console.log("Appended auth and drive logic");
