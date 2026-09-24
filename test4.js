require('esbuild-register');
const { farmaco_1_15 } = require("./src/farmaco_1_15.ts");
const { farmaco_16_30 } = require("./src/farmaco_16_30.ts");
const { farmaco_31_45 } = require("./src/farmaco_31_45.ts");
const { farmaco_40_55 } = require("./src/farmaco_40_55.ts");
const { farmaco_56_70 } = require("./src/farmaco_56_70.ts");
const { farmaco_71_81 } = require("./src/farmaco_71_81.ts");
const { farmaco_82_100 } = require("./src/farmaco_82_100.ts");
const { q1 } = require('./src/q1.ts');
const { q2 } = require('./src/q2.ts');
const { q3 } = require('./src/q3.ts');
const { q4 } = require('./src/q4.ts');
const { propedeutica } = require("./src/propedeutica.ts");
const { q11_40 } = require("./src/q11_40.ts");
const { q41_70 } = require("./src/q41_70.ts");
const { q71_100 } = require("./src/q71_100.ts");
const { gis2_all } = require('./src/gis2_all.ts');
const { basesCirurgicas } = require('./src/bc_all.ts');

const allArrays = [
  farmaco_1_15, farmaco_16_30, farmaco_31_45, farmaco_40_55, farmaco_56_70, farmaco_71_81, farmaco_82_100,
  q1, q2, q3, q4,
  propedeutica, q11_40, q41_70, q71_100,
  gis2_all, basesCirurgicas
];

let hasUndefined = false;
allArrays.forEach((arr, idx) => {
  if (!arr) {
    console.log(`Array ${idx} is undefined!`);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      console.log(`Array ${idx} has undefined at index ${i}`);
      hasUndefined = true;
    }
  }
});
if (!hasUndefined) console.log("No undefined items found in the arrays.");
