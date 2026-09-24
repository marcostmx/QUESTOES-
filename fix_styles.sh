#!/bin/bash
sed -i 's/selectedLabel.classList.remove(/selectedLabel.classList.remove("has-[:checked]:border-blue-500", "has-[:checked]:bg-blue-50", /g' src/main.tsx
sed -i 's/selectedLetterBox.classList.remove(/selectedLetterBox.classList.remove("group-has-[:checked]:border-blue-600", "group-has-[:checked]:bg-blue-600", "group-has-[:checked]:text-white", /g' src/main.tsx
sed -i 's/selectedText.classList.add(/selectedText.classList.remove("group-has-[:checked]:text-gray-900", "group-has-[:checked]:font-medium");\n            selectedText.classList.add(/g' src/main.tsx
