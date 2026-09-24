require('esbuild-register');
const { farmacologiaQuestions } = require('./src/farmacologia.ts');
const { propedeuticaQuestions } = require('./src/propedeutica.ts');
const { fisiopatologiaQuestions } = require('./src/fisiopatologia.ts');
const { basesCirurgicasQuestions } = require('./src/bases_cirurgicas.ts');
const { gis2_all } = require('./src/gis2_all.ts');

const allArrays = [farmacologiaQuestions, propedeuticaQuestions, fisiopatologiaQuestions, basesCirurgicasQuestions, gis2_all];

allArrays.forEach((arr, idx) => {
  if (!arr) {
    console.log(`Array ${idx} is undefined`);
    return;
  }
  for(let i=0; i<arr.length; i++) {
    if (arr[i] === undefined) {
      console.log(`Array ${idx} has undefined at index ${i}`);
    }
  }
});
console.log("Done checking");
