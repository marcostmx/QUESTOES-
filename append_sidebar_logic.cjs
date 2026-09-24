const fs = require('fs');

const logic = `
// --- Navigation Logic ---
(window as any).toggleSidebar = function() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

(window as any).switchTab = function(tabId: string) {
    // Hide all views
    ['dashboard', 'metrics', 'timed'].forEach(id => {
        const el = document.getElementById('view-' + id);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('block');
        }
    });
    
    // Show selected view
    const activeView = document.getElementById('view-' + tabId);
    if (activeView) {
        activeView.classList.remove('hidden');
        activeView.classList.add('block');
    }
    
    // Update active tab styles
    const tabs = ['dashboard', 'metrics', 'timed'];
    tabs.forEach(id => {
        const btn = document.getElementById('tab-' + id);
        if (btn) {
            if (id === tabId) {
                // Active style
                btn.className = 'w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold transition-colors';
            } else {
                // Inactive style
                btn.className = 'w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold transition-colors';
            }
        }
    });

    // Change Header subtitle
    const subtitle = document.getElementById('header-subtitle');
    if (subtitle) {
        if (tabId === 'dashboard') {
            subtitle.textContent = 'Pronto para a revisão de hoje? Escolha um módulo.';
        } else if (tabId === 'metrics') {
            subtitle.textContent = 'Acompanhe seu desempenho detalhado.';
        } else if (tabId === 'timed') {
            subtitle.textContent = 'Treine sob pressão do relógio.';
        }
    }

    // Close sidebar on mobile after clicking
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
        sidebar.classList.add('-translate-x-full');
        overlay?.classList.add('hidden');
    }
};
`;

fs.appendFileSync('src/main.tsx', logic);
console.log("Appended logic");
