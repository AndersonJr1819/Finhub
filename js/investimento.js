document.addEventListener('DOMContentLoaded', () => {
    const visibilityBtn = document.querySelector('.balance-visibility-btn');
    const balanceValueEl = document.querySelector('.balance-value');
    let isBalanceVisible = true;
    const originalBalance = balanceValueEl ? balanceValueEl.textContent : '12.480,75';

    if (visibilityBtn && balanceValueEl) {
        visibilityBtn.addEventListener('click', () => {
            isBalanceVisible = !isBalanceVisible;
            if (isBalanceVisible) {
                balanceValueEl.textContent = originalBalance;
            } else {
                balanceValueEl.textContent = '••••••••';
            }
        });
    }

    const periodButtons = document.querySelectorAll('.investment-period button');
    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const period = button.textContent;
            console.log(`Período alterado para: ${period}`);
        });
    });

    const searchInput = document.getElementById('investment-search');
    const investmentRows = document.querySelectorAll('.investment-row');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            investmentRows.forEach(row => {
                const name = row.querySelector('.transaction-name')?.textContent.toLowerCase() || '';
                const code = row.querySelector('.transaction-category')?.textContent.toLowerCase() || '';
                const type = row.querySelector('.investment-type')?.textContent.toLowerCase() || '';

                if (name.includes(searchTerm) || code.includes(searchTerm) || type.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    const newInvestmentBtn = document.querySelector('.investments-actions button');
    if (newInvestmentBtn) {
        newInvestmentBtn.addEventListener('click', () => {
            alert('Funcionalidade de cadastrar novo investimento em breve.');
        });
    }

    const promoBtn = document.querySelector('.promo-btn');
    if (promoBtn) {
        promoBtn.addEventListener('click', () => {
            alert('Saiba mais sobre consultoria e estratégias de longo prazo da Fin Hub.');
        });
    }

    investmentRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            const name = row.querySelector('.transaction-name')?.textContent;
            const code = row.querySelector('.transaction-category')?.textContent;
            console.log(`Detalhes do ativo selecionado: ${name} (${code})`);
        });
    });
});