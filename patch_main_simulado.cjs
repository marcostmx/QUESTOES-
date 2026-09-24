const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

main = main.replace('let simConfig = { q: 20, t: 30 };', 'let simConfig = { q: 20, t: 30, subject: "all" };');

const oldStart = `
(window as any).startSimulado = function() {
    // Collect all questions
    const allQ = [
        ...farmacologiaQuestions.map(q => ({...q, ogSubject: 'Farmacologia'})),
        ...propedeuticaQuestions.map(q => ({...q, ogSubject: 'Propedêutica'})),
        ...fisiopatologiaQuestions.map(q => ({...q, ogSubject: 'Fisiopatologia'})),
        ...basesCirurgicasQuestions.map(q => ({...q, ogSubject: 'Bases Cirúrgicas'})),
        ...gis2_all.map(q => ({...q, ogSubject: 'GIS 2'}))
    ];
`;

const newStart = `
(window as any).selectSimuladoSubject = function(val: string) {
    simConfig.subject = val;
};

(window as any).startSimulado = function() {
    // Collect all questions
    let allQ = [
        ...farmacologiaQuestions.map(q => ({...q, ogSubject: 'Farmacologia'})),
        ...propedeuticaQuestions.map(q => ({...q, ogSubject: 'Propedêutica'})),
        ...fisiopatologiaQuestions.map(q => ({...q, ogSubject: 'Fisiopatologia'})),
        ...basesCirurgicasQuestions.map(q => ({...q, ogSubject: 'Bases Cirúrgicas'})),
        ...gis2_all.map(q => ({...q, ogSubject: 'GIS 2'}))
    ];
    
    // Filter by selected subject
    if (simConfig.subject && simConfig.subject !== 'all') {
        allQ = allQ.filter(q => q.ogSubject === simConfig.subject);
    }
`;

main = main.replace(oldStart, newStart);
fs.writeFileSync('src/main.tsx', main);
console.log("Patched main.tsx for simulado subject logic");
