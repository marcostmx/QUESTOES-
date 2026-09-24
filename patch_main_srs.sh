#!/bin/bash
sed -i 's/let qData = srsData\[subjectId\]\[qIndex\] || { level: 0, nextReview: Date.now() };/let qData = srsData[subjectId][qIndex] || { level: 0, nextReview: Date.now() };\n    if (typeof qData.level !== "number" || isNaN(qData.level)) { qData.level = 0; }/g' src/main.tsx
