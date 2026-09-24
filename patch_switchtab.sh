#!/bin/bash
sed -i "s/\['dashboard', 'metrics', 'simulado', 'srs'\]/\['dashboard', 'metrics', 'simulado', 'srs', 'favorites'\]/g" src/main.tsx
