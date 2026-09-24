const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldStr = `</div></div>   </div>  </div> </section> </main> </div>`;
const newStr = `</div> </section> </main> </div>`;
if (html.includes(oldStr)) {
    html = html.replace(oldStr, newStr);
    fs.writeFileSync('index.html', html);
    console.log("Fixed end tags");
} else {
    console.log("Could not find end tags");
}

