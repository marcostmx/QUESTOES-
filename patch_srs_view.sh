#!/bin/bash
sed -i '369i\
             <!-- SRS VIEW -->\
             <div id="view-srs" class="space-y-8 hidden fade-in">\
                 <div class="flex items-center justify-between mb-6">\
                     <h2 class="text-xl font-bold text-gray-900">Revisão Espaçada (SRS)</h2>\
                 </div>\
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">\
                    <div class="bg-gradient-to-br from-red-50 to-orange-50 p-6 md:p-8 rounded-3xl border border-red-100 shadow-sm flex flex-col justify-center items-center text-center">\
                        <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-inner">\
                             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>\
                        </div>\
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Revisões de Hoje</h3>\
                        <p class="text-gray-600 mb-6">Você tem <span id="srs-today-count" class="font-bold text-red-600 text-xl">0</span> questões pendentes para revisar agora.</p>\
                        <button onclick="window.startErrorReview()" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors">\
                            COMEÇAR REVISÃO\
                        </button>\
                    </div>\
                    <div class="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">\
                        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">\
                            <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>\
                            Previsão\
                        </h3>\
                        <div id="srs-calendar-list" class="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">\
                        </div>\
                    </div>\
                 </div>\
             </div>\
' index.html
