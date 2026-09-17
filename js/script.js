document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const cnpjInput = document.getElementById("cnpj");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordToggleBtn = document.querySelector(".password-toggle");
  const rememberCheckbox = document.querySelector('input[name="remember"]');

  const STORAGE_KEY = "finhub_saved_user";

  const loadSavedUser = () => {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (savedValue && emailInput) {
      emailInput.value = savedValue;
      if (rememberCheckbox) {
        rememberCheckbox.checked = true;
      }
    }
  };

  loadSavedUser();

  const applyCnpjMask = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 14);
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    }
    if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    }
    if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    }
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  if (cnpjInput) {
    cnpjInput.addEventListener("input", (e) => {
      e.target.value = applyCnpjMask(e.target.value);
      clearError(e.target);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", (e) => {
      clearError(e.target);
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", (e) => {
      clearError(e.target);
    });
  }

  if (passwordToggleBtn && passwordInput) {
    passwordToggleBtn.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      
      const icon = passwordToggleBtn.querySelector("i");
      if (icon) {
        if (type === "text") {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
          passwordToggleBtn.setAttribute("aria-label", "Ocultar senha");
        } else {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
          passwordToggleBtn.setAttribute("aria-label", "Mostrar senha");
        }
      }
    });
  }

  const showError = (inputElement, message) => {
    const inputGroup = inputElement.closest(".input-group");
    if (!inputGroup) return;

    inputElement.setAttribute("aria-invalid", "true");

    let errorElement = inputGroup.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("span");
      errorElement.className = "error-message";
      errorElement.style.color = "#ef4444";
      errorElement.style.fontSize = "12px";
      errorElement.style.marginTop = "4px";
      inputGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
  };

  const clearError = (inputElement) => {
    const inputGroup = inputElement.closest(".input-group");
    if (!inputGroup) return;

    inputElement.removeAttribute("aria-invalid");
    const errorElement = inputGroup.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  };

  const validateCnpj = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.length === 14;
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      const cnpjValue = cnpjInput ? cnpjInput.value.trim() : "";
      const emailValue = emailInput ? emailInput.value.trim() : "";
      const passwordValue = passwordInput ? passwordInput.value.trim() : "";

      if (!cnpjValue) {
        showError(cnpjInput, "CNPJ é obrigatório.");
        isValid = false;
      } else if (!validateCnpj(cnpjValue)) {
        showError(cnpjInput, "Digite um CNPJ válido.");
        isValid = false;
      } else {
        clearError(cnpjInput);
      }

      if (!emailValue) {
        showError(emailInput, "E-mail ou usuário é obrigatório.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (!passwordValue) {
        showError(passwordInput, "Senha é obrigatória.");
        isValid = false;
      } else {
        clearError(passwordInput);
      }

      if (isValid) {
        if (rememberCheckbox && rememberCheckbox.checked) {
          localStorage.setItem(STORAGE_KEY, emailValue);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }

        window.location.href = "home.html";
      }
    });
  }
});