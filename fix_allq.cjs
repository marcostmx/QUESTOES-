const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

const oldCode = `    let allQ = [
        ...farmacologiaQuestions.map(q => ({...q, ogSubject: 'Farmacologia'})),
        ...propedeuticaQuestions.map(q => ({...q, ogSubject: 'Propedêutica'})),
        ...fisiopatologiaQuestions.map(q => ({...q, ogSubject: 'Fisiopatologia'})),
        ...basesCirurgicasQuestions.map(q => ({...q, ogSubject: 'Bases Cirúrgicas'})),
        ...gis2_all.map(q => ({...q, ogSubject: 'GIS 2'}))
    ];
    
    // Filter by selected subject
    if (simConfig.subject && simConfig.subject !== 'all') {
        allQ = allQ.filter(q => q.ogSubject === simConfig.subject);
    }`;

const newCode = `    let allQ = [
        ...(farmacologiaQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Farmacologia'})),
        ...(propedeuticaQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Propedêutica'})),
        ...(fisiopatologiaQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Fisiopatologia'})),
        ...(basesCirurgicasQuestions || []).filter(q => q).map(q => ({...q, ogSubject: 'Bases Cirúrgicas'})),
        ...(gis2_all || []).filter(q => q).map(q => ({...q, ogSubject: 'GIS 2'}))
    ].filter(q => q && q.text); // Filter out any empty mapped items
    
    // Filter by selected subject
    if (simConfig.subject && simConfig.subject !== 'all') {
        allQ = allQ.filter(q => q && q.ogSubject === simConfig.subject);
    }`;

main = main.replace(oldCode, newCode);
fs.writeFileSync('src/main.tsx', main);
console.log("Fixed allQ to handle undefined questions");
