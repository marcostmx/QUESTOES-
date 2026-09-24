#!/bin/bash
sed -i 's/Math.min(qData.level - 1, intervals.length - 1)/Math.max(0, Math.min(qData.level - 1, intervals.length - 1))/g' src/main.tsx
