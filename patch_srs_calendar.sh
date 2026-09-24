#!/bin/bash
sed -i 's/<div id="srs-calendar-list" class="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">/<div id="srs-calendar-list" class="flex overflow-x-auto gap-3 custom-scrollbar pb-4 pt-2 items-center">/g' index.html
