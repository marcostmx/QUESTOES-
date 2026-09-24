const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

const backToHomeRegex = /\(window as any\)\.backToHome = function\(\) \{\n    appScreenEl\.classList\.add\('hidden'\);\n    appScreenEl\.classList\.remove\('flex'\);\n    homeScreenEl\.classList\.remove\('hidden'\);\n\};/;

const dashLogic = `(window as any).updateDashboardStats = function() {
    const subjects = [
        { id: 'farmacologia', total: farmacologiaQuestions.length },
        { id: 'propedêutica', total: propedeuticaQuestions.length },
        { id: 'fisiopatologia', total: fisiopatologiaQuestions.length },
        { id: 'bases_cirurgicas', total: basesCirurgicasQuestions.length, internal: 'bases cirúrgicas' },
        { id: 'gis2', total: gis2_all.length }
    ];

    let globalAnswered = 0;
    let globalCorrect = 0;
    let globalTotal = 0;

    subjects.forEach(sub => {
        globalTotal += sub.total;
        
        let subAnswered = 0;
        let subCorrect = 0;
        
        const internalId = sub.internal || sub.id;
        const saved = localStorage.getItem('pr1_progress_' + internalId);
        
        if (saved) {
            try {
                const data = JSON.parse(saved);
                subAnswered = data.answered ? data.answered.length : 0;
                subCorrect = data.correct ? data.correct.length : 0;
            } catch(e) {}
        }
        
        globalAnswered += subAnswered;
        globalCorrect += subCorrect;
        
        // Update badge
        let badgeId = sub.id;
        if(badgeId === 'propedêutica') badgeId = 'propedeutica';
        if(badgeId === 'bases_cirurgicas') badgeId = 'bases-cirurgicas';
        
        const badgeEl = document.getElementById('badge-' + badgeId);
        if (badgeEl) {
            badgeEl.textContent = \`\${subAnswered} / \${sub.total}\`;
        }
    });

    const dashTotal = document.getElementById('dash-total-answered');
    if (dashTotal) dashTotal.textContent = globalAnswered.toString();

    const dashAcc = document.getElementById('dash-accuracy');
    if (dashAcc) {
        if (globalAnswered === 0) {
            dashAcc.textContent = '0%';
        } else {
            dashAcc.textContent = Math.round((globalCorrect / globalAnswered) * 100) + '%';
        }
    }

    const sbProgress = document.getElementById('sidebar-progress');
    const sbProgressText = document.getElementById('sidebar-progress-text');
    const sbProgressFrac = document.getElementById('sidebar-progress-fraction');
    
    if (sbProgress && sbProgressText && sbProgressFrac && globalTotal > 0) {
        const pct = Math.round((globalAnswered / globalTotal) * 100);
        sbProgress.style.width = pct + '%';
        sbProgressText.textContent = pct + '% concluído';
        sbProgressFrac.textContent = \`\${globalAnswered}/\${globalTotal}\`;
    }
};

(window as any).backToHome = function() {
    appScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('flex');
    homeScreenEl.classList.remove('hidden');
    
    endScreenEl.classList.add('hidden');
    endScreenEl.classList.remove('flex');
    
    (window as any).updateDashboardStats();
};
`;

content = content.replace(backToHomeRegex, dashLogic);

const initCallRegex = /loadDriveFolder\(\);/;
content = content.replace(initCallRegex, `loadDriveFolder();\n\nsetTimeout(() => {\n    if((window as any).updateDashboardStats) {\n        (window as any).updateDashboardStats();\n    }\n}, 500);\n`);

fs.writeFileSync('src/main.tsx', content);
console.log("Patched main.tsx for dashboard logic");
