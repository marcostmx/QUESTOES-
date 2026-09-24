const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const oldLoop = `        for (let i = 1; i <= daysToGenerate; i++) {
            const targetDate = new Date(todayStart + (i * 24 * 60 * 60 * 1000));
            const ts = targetDate.getTime();
            
            const qCount = futureCounts[ts] || 0;
            const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const dayName = days[targetDate.getDay()];
            const dayNum = targetDate.getDate();
            const isTomorrow = i === 1;
            
            if (qCount > 0) {
                // Active day card
                html += \`
                    <div class="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-2xl w-16 h-20 shrink-0 relative shadow-sm">
                       \${isTomorrow ? '<span class="absolute -top-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Amanhã</span>' : ''}
                       <span class="text-xs text-red-600 font-bold">\${dayName}</span>
                       <span class="text-xl font-black text-red-700 leading-tight">\${dayNum}</span>
                       <div class="mt-1 flex items-center justify-center bg-red-100 text-red-700 text-[10px] font-bold px-1.5 rounded-full">
                           \${qCount}
                       </div>
                    </div>
                \`;
            } else {
                // Inactive day card
                html += \`
                    <div class="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl w-16 h-20 shrink-0 opacity-60">
                       \${isTomorrow ? '<span class="absolute -top-2 bg-gray-200 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Amanhã</span>' : ''}
                       <span class="text-xs text-gray-400 font-bold">\${dayName}</span>
                       <span class="text-xl font-black text-gray-400 leading-tight">\${dayNum}</span>
                    </div>
                \`;
            }
        }`;

const newLoop = `        for (let i = 0; i < daysToGenerate; i++) {
            const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
            const ts = targetDate.getTime();
            
            const qCount = i === 0 ? todayCount : (futureCounts[ts] || 0);
            const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const dayName = days[targetDate.getDay()];
            const dayNum = targetDate.getDate();
            
            let activeBadge = '';
            let inactiveBadge = '';
            if (i === 0) {
                activeBadge = '<span class="absolute -top-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Hoje</span>';
                inactiveBadge = '<span class="absolute -top-2 bg-gray-300 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Hoje</span>';
            } else if (i === 1) {
                activeBadge = '<span class="absolute -top-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Amanhã</span>';
                inactiveBadge = '<span class="absolute -top-2 bg-gray-200 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Amanhã</span>';
            }
            
            if (qCount > 0) {
                // Active day card
                html += \`
                    <div class="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-2xl w-16 h-20 shrink-0 relative shadow-sm">
                       \${activeBadge}
                       <span class="text-xs text-red-600 font-bold">\${dayName}</span>
                       <span class="text-xl font-black text-red-700 leading-tight">\${dayNum}</span>
                       <div class="mt-1 flex items-center justify-center bg-red-100 text-red-700 text-[10px] font-bold px-1.5 rounded-full">
                           \${qCount}
                       </div>
                    </div>
                \`;
            } else {
                // Inactive day card
                html += \`
                    <div class="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl w-16 h-20 shrink-0 opacity-60">
                       \${inactiveBadge}
                       <span class="text-xs text-gray-400 font-bold">\${dayName}</span>
                       <span class="text-xl font-black text-gray-400 leading-tight">\${dayNum}</span>
                    </div>
                \`;
            }
        }`;

if (code.includes(oldLoop)) {
    code = code.replace(oldLoop, newLoop);
    fs.writeFileSync('src/main.tsx', code);
    console.log("Successfully patched SRS calendar generation");
} else {
    console.log("Error: could not find old loop");
}
