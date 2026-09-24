import os

with open("src/main.tsx", "r", encoding="utf-8") as f:
    text = f.read()

old_filter = """function isCompleteClinicalCaseQuestion(q: any): boolean {    if (!q || !q.text) return false;    const text = q.text.trim();    const lowerText = text.toLowerCase();    if (lowerText.includes('prinzmetal') || lowerText.includes('prinz')) return false;    if (lowerText.includes('gaveta anterior') || lowerText.includes('ligamentos cruzados') || lowerText.includes('lachman') || lowerText.includes('mcmurray')) return false;"""

new_filter = """function isCompleteClinicalCaseQuestion(q: any): boolean {    if (!q || !q.text) return false;    const text = q.text.trim();    const lowerText = text.toLowerCase();    if (lowerText.includes('prinzmetal') || lowerText.includes('prinz')) return false;    if (lowerText.includes('gaveta anterior') || lowerText.includes('ligamentos cruzados') || lowerText.includes('lachman') || lowerText.includes('mcmurray')) return false;

    // Filter out all questions involving pain classifications
    const combinedContent = (q.text + ' ' + (q.gabarito || '') + ' ' + (q.explanation || '') + ' ' + (q.options ? q.options.join(' ') : '')).toLowerCase();
    const painClassificationTerms = [
        'classificação da dor', 'classificar a dor', 'tipos de dor', 
        'dor nociceptiva', 'dor neuropática', 'dor somática', 'dor visceral',
        'dor referida', 'dor aguda e crônica', 'dor crônica e aguda',
        'nociceptores', 'alodinia', 'hiperalgesia'
    ];
    if (painClassificationTerms.some(term => combinedContent.includes(term))) {
        return false;
    }"""

if old_filter in text:
    text = text.replace(old_filter, new_filter, 1)
    print("Filter updated!")
else:
    print("Old filter not found!")

old_state = "let answeredQuestions = new Set<number>();"
new_state = """let answeredQuestions = new Set<number>();
let eliminatedOptionsMap = new Map<number, Set<number>>();

(window as any).toggleEliminateOption = function(qIndex: number, optIndex: number) {
    if (!eliminatedOptionsMap.has(qIndex)) {
        eliminatedOptionsMap.set(qIndex, new Set<number>());
    }
    const set = eliminatedOptionsMap.get(qIndex)!;
    if (set.has(optIndex)) {
        set.delete(optIndex);
    } else {
        set.add(optIndex);
    }
    loadQuestion(qIndex);
};"""

if old_state in text:
    text = text.replace(old_state, new_state, 1)
    print("State variables added!")
else:
    print("Old state not found!")

text = text.replace("answeredQuestions.clear();", "answeredQuestions.clear();\n    eliminatedOptionsMap.clear();")

if "q.options.forEach" in text:
    pos_loop = text.find("q.options.forEach")
    pos_end = text.find("});", pos_loop) + 3
    
    new_loop = """        const eliminatedSet = eliminatedOptionsMap.get(index) || new Set<number>();

        q.options.forEach((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i);
            const isEliminated = eliminatedSet.has(i);

            let labelClasses = 'mcq-label flex items-start p-4 border rounded-xl cursor-pointer transition-all group shadow-sm relative ';
            let letterClasses = 'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-bold mr-4 transition-all ';
            let textClasses = 'mt-1 transition-all flex-grow ';

            if (isEliminated) {
                labelClasses += ' border-gray-200 bg-gray-50 opacity-40 line-through ';
                letterClasses += ' border-gray-300 bg-gray-200 text-gray-400 ';
                textClasses += ' text-gray-400 line-through ';
            } else if (isAnswered) {
                labelClasses += ' pointer-events-none ';
                if (i === correctIndex) {
                    labelClasses += 'border-green-500 bg-green-50';
                    letterClasses += 'border-green-600 bg-green-600 text-white';
                    textClasses += 'text-green-900 font-medium';
                } else {
                    labelClasses += 'border-gray-200 bg-white opacity-50';
                    letterClasses += 'border-gray-300 text-gray-400';
                    textClasses += 'text-gray-500';
                }
            } else {
                labelClasses += 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 bg-white';
                letterClasses += 'border-gray-300 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500';
                textClasses += 'text-gray-700';
            }

            const eliminateBtnTitle = isEliminated ? 'Restaurar alternativa' : 'Eliminar alternativa (riscar)';
            const eliminateBtnClass = isEliminated ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 border-gray-200';

            optionsHtml += `
                <div class="flex items-center w-full">
                    <label id="mcq-label-${i}" class="${labelClasses} flex items-start flex-grow ${isEliminated ? 'pointer-events-none' : ''}">
                        <div id="mcq-letter-${i}" class="${letterClasses}">
                            ${letter}
                        </div>
                        <input type="radio" name="mcq" value="${i}" class="sr-only" ${isEliminated ? 'disabled' : ''} onchange="window.handleMCQChange(${i})">
                        <span id="mcq-text-${i}" class="${textClasses}">${opt}</span>
                    </label>
                    <button type="button" onclick="window.toggleEliminateOption(${index}, ${i})" title="${eliminateBtnTitle}" class="ml-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${eliminateBtnClass} flex-shrink-0 cursor-pointer bg-white shadow-sm flex items-center justify-center">
                        ${isEliminated ? 'Restaurar' : '✕'}
                    </button>
                </div>
            `;
        });"""

    text = text[:pos_loop] + new_loop + text[pos_end:]
    print("Options loop updated successfully!")
else:
    print("q.options.forEach not found!")

with open("src/main.tsx", "w", encoding="utf-8") as f:
    f.write(text)
print("All modifications written to src/main.tsx")
