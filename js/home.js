document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            console.log('Buscando por:', query);
        });
    }

    const visibilityBtn = document.querySelector('.balance-visibility-btn');
    const balanceValue = document.querySelector('.balance-value');
    let isVisible = true;

    if (visibilityBtn && balanceValue) {
        visibilityBtn.addEventListener('click', () => {
            isVisible = !isVisible;
            if (isVisible) {
                balanceValue.textContent = '4.852,30';
                visibilityBtn.setAttribute('aria-label', 'Ocultar saldo');
            } else {
                balanceValue.textContent = '••••••••';
                visibilityBtn.setAttribute('aria-label', 'Mostrar saldo');
            }
        });
    }

    const chartLine = document.querySelector('.balance-chart-line');
    const chartFill = document.querySelector('.balance-chart-fill');
    
    if (chartLine && chartFill) {
        chartLine.style.opacity = '0';
        chartFill.style.opacity = '0';
        chartLine.style.transition = 'opacity 800ms ease-in-out';
        chartFill.style.transition = 'opacity 800ms ease-in-out';

        setTimeout(() => {
            chartLine.style.opacity = '1';
            chartFill.style.opacity = '1';
        }, 200);
    }

    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach((action, index) => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            const actionNames = ['Depósito', 'Transferência', 'Investimentos', 'Planejamento'];
            console.log(`Ação rápida acionada: ${actionNames[index] || 'Geral'}`);
        });
    });

    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'var(--color-surface-hover)';
            item.style.transition = 'background-color 150ms ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
    });
});