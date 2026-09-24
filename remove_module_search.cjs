const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const targetStr = `            // 1. Search Modules
            const moduleButtons = modulesGrid.querySelectorAll('button');
            moduleButtons.forEach(button => {
                const titleEl = button.querySelector('h3');
                const descEl = button.querySelector('p');
                
                const title = titleEl ? titleEl.textContent?.toLowerCase() || '' : '';
                const desc = descEl ? descEl.textContent?.toLowerCase() || '' : '';

                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    button.style.display = 'flex';
                } else {
                    button.style.display = 'none';
                }
            });
            
            // 2. Search Questions`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, `            // 2. Search Questions`);
    fs.writeFileSync('src/main.tsx', code);
    console.log("Successfully removed module search logic.");
} else {
    console.log("Error: could not find targetStr");
}
