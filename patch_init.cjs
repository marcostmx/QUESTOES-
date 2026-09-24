const fs = require('fs');
let content = fs.readFileSync('src/main.tsx', 'utf8');

// Ensure loadDriveFolder is called immediately
if (!content.includes('// Call loadDriveFolder on startup')) {
    content += '\n// Call loadDriveFolder on startup\nloadDriveFolder();\n';
}

fs.writeFileSync('src/main.tsx', content);
console.log("Patched main.tsx to call loadDriveFolder on init");
