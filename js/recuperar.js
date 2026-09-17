document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.querySelector('.recovery-form');
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();

            if (!email) return;

            alert('Link de recuperação enviado para o e-mail informado.');
            window.location.href = 'index.html';
        });
    }
});