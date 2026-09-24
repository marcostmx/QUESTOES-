import re

with open("src/main.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "proped" in line.lower():
        print(f"{idx+1}: {line.strip()[:110]}")
