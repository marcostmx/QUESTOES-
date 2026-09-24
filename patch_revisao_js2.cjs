const fs = require('fs');
let code = fs.readFileSync('public/revisao-espacada.js', 'utf8');

const target = `  function lerSRS()    { var s = ler(SRS_KEY, {}); Object.keys(s).forEach(function(k) { var m = k.split("|")[0]; if (m === "null" || m.indexOf("revis") > -1 || m.indexOf("simulado") > -1) delete s[k]; }); return s; }`;

const replacement = `  function lerSRS() {
    var s = ler(SRS_KEY, {});
    var flat = {};
    Object.keys(s).forEach(function(m) {
      if (m === "null" || m.indexOf("revis") > -1 || m.indexOf("simulado") > -1) return;
      var obj = s[m];
      if (typeof obj === "object") {
        Object.keys(obj).forEach(function(idx) {
          var qData = obj[idx];
          if (qData && (qData.nextReview || qData.due)) {
            var nextD = qData.nextReview || qData.due;
            if (!isNaN(nextD) && nextD !== null) {
                flat[m + "|" + idx] = { due: nextD, level: qData.level || 0 };
            }
          }
        });
      } else if (m.indexOf("|") > -1) {
        flat[m] = s[m];
      }
    });
    return flat;
  }`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('public/revisao-espacada.js', code);
    console.log("Success");
} else {
    console.log("Target string not found. Please review the file.");
}
