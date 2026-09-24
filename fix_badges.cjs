const fs = require('fs');
let main = fs.readFileSync('src/main.tsx', 'utf8');

// Filter arrays
main = main.replace(
    'const fisiopatologiaQuestions = [...q1, ...q2, ...q3, ...q4];',
    'const fisiopatologiaQuestions = [...q1, ...q2, ...q3, ...q4].filter(q => q && q.text);'
);
main = main.replace(
    'const farmacologiaQuestions: any[] = [...farmaco_1_15, ...farmaco_16_30, ...farmaco_31_45, ...farmaco_40_55, ...farmaco_56_70, ...farmaco_71_81, ...farmaco_82_100];',
    'const farmacologiaQuestions: any[] = [...farmaco_1_15, ...farmaco_16_30, ...farmaco_31_45, ...farmaco_40_55, ...farmaco_56_70, ...farmaco_71_81, ...farmaco_82_100].filter(q => q && q.text);'
);
main = main.replace(
    'const propedeuticaQuestions = [...propedeutica, ...q11_40, ...q41_70, ...q71_100];',
    'const propedeuticaQuestions = [...propedeutica, ...q11_40, ...q41_70, ...q71_100].filter(q => q && q.text);'
);
main = main.replace(
    'const basesCirurgicasQuestions = [...basesCirurgicas];',
    'const basesCirurgicasQuestions = [...basesCirurgicas].filter(q => q && q.text);'
);

// Fix total counts and badge logic
main = main.replace(
    "        { id: 'gis2', total: gis2_all.length }",
    "        { id: 'gis2', total: (gis2_all || []).filter(q => q && q.text).length }"
);

main = main.replace(
    "        if(badgeId === 'propedêutica') badgeId = 'propedeutica';\n        if(badgeId === 'bases_cirurgicas') badgeId = 'bases-cirurgicas';",
    ""
);

fs.writeFileSync('src/main.tsx', main);
console.log("Fixed badges and arrays");
