#!/bin/bash
sed -i 's/feedbackTextEl.textContent = q.gabarito;/feedbackTextEl.innerHTML = q.gabarito.replace(\/\\*\\*(.*?)\\*\\*\/g, "<strong>$1<\\/strong>").replace(\/\\*(.*?)\\*\/g, "<em>$1<\\/em>");/g' src/main.tsx
