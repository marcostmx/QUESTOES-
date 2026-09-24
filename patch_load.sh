#!/bin/bash
sed -i '/questionTextEl.textContent = q.text;/a \    let realSubject = currentSubject;\n    let realIndex = index;\n    if (q.ogSubject && q.ogIndex !== undefined) { realSubject = q.ogSubject; realIndex = q.ogIndex; }\n    if ((window as any).updateFavoriteIcon) (window as any).updateFavoriteIcon(realSubject, realIndex);' src/main.tsx
