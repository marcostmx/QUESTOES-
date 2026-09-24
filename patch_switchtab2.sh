#!/bin/bash
sed -i '/if (tabId === "srs") {/i \    if (tabId === "favorites") {\n        (window as any).renderFavorites();\n    }' src/main.tsx
