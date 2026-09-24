const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const targetOld = `    const calendarEl = document.getElementById('srs-calendar-list');
    if (calendarEl) {
        calendarEl.innerHTML = '';
        
        const timestamps = Object.keys(futureCounts).map(Number).sort((a, b) => a - b);

        if (timestamps.length === 0) {
            calendarEl.innerHTML = \`<p class="text-sm text-gray-500 font-medium italic">Nenhuma revisão agendada para os próximos dias.</p>\`;
        } else {
            timestamps.forEach(ts => {
                const dateObj = new Date(ts);
                const row = document.createElement('div');
                row.className = 'flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50';
                
                const diffTime = Math.abs(ts - todayStart);
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                const dayOfWeek = dateObj.getDay();
                
                const dateSub = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                let dateDisplay = dateObj.toLocaleDateString('pt-BR');
                
                if (diffDays === 1) {
                    dateDisplay = 'Amanhã';
                } else if (diffDays <= 7) {
                    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                    dateDisplay = days[dayOfWeek];
                }

                row.innerHTML = \`
                    <div class="flex items-center text-sm font-bold text-gray-700">
                        <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        \${dateDisplay} <span class="text-xs text-gray-400 font-normal ml-2">(\${dateSub})</span>
                    </div>
                    <span class="bg-gray-200 text-gray-700 text-xs font-black px-2.5 py-1 rounded-full">\${futureCounts[ts]} Qs</span>
                \`;
                calendarEl.appendChild(row);
            });
        }
    }
}`;

const targetNew = `    const calendarEl = document.getElementById('srs-calendar-list');
    if (calendarEl) {
        calendarEl.innerHTML = '';
        
        // Generate the next 14 days
        const daysToGenerate = 14;
        let html = '';
        
        for (let i = 1; i <= daysToGenerate; i++) {
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
                       <div class="mt-1 w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                    </div>
                \`;
            }
        }
        
        calendarEl.innerHTML = html;
    }
}`;

if (code.includes(targetOld)) {
    code = code.replace(targetOld, targetNew);
    fs.writeFileSync('src/main.tsx', code);
    console.log("Calendar logic updated!");
} else {
    console.log("Could not find the old calendar logic block.");
}
