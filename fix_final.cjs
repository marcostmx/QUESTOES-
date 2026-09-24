const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the three divs with two divs
const target1 = '</div> </div> </div> \n<!-- End Screen -->';
if (html.includes(target1)) {
    html = html.replace(target1, '</div> </div> \n<!-- End Screen -->');
}

// Ensure end-screen is closed before </section>
const target2 = '</div> </section> </main> </div>';
if (html.includes(target2)) {
    html = html.replace(target2, '</div> </div> </section> </main> </div>');
}

fs.writeFileSync('index.html', html);
console.log("Fixed final");
