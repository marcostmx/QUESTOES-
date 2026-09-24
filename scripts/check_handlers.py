import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

with open("src/main.tsx", "r", encoding="utf-8") as f:
    ts = f.read()

handlers = re.findall(r"(?:onclick|onchange|onsubmit|oninput)=[\"'](?:window\.)?([a-zA-Z0-9_]+)\(", html)
unique_handlers = sorted(list(set(handlers)))
print(f"Found {len(unique_handlers)} unique event handlers in index.html:")
for h in unique_handlers:
    present = (f".{h}" in ts) or (f"function {h}" in ts) or (f"window.{h}" in ts)
    if not present:
        print(f"  [MISSING!] {h}")
    else:
        print(f"  [OK] {h}")
