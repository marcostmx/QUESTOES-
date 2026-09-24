#!/bin/bash
sed -i 's/function renderSRSCalendar() {/(window as any).renderSRSCalendar = function() {/g' src/main.tsx
sed -i 's/renderSRSCalendar();/(window as any).renderSRSCalendar();/g' src/main.tsx
