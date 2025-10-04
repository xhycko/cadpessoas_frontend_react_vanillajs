// Utility Functions
class Utils {
    static formatarData(dataString) {
        if (!dataString) return '-';
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }

    static formatarTelefone(telefone) {
        if (!telefone) return '-';
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    static getGenderIcon(genero) {
        switch (genero) {
            case 'Masculino': return '👨';
            case 'Feminino': return '👩';
            default: return '👤';
        }
    }

    static showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    static showModal(title, message, onConfirm) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const confirmBtn = document.getElementById('modal-confirm');

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.add('show');

        confirmBtn.onclick = () => {
            onConfirm();
            this.closeModal();
        };
    }

    static closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
    }

    static validateForm(formData) {
        const errors = {};

        if (!formData.nome || formData.nome.trim().length < 2) {
            errors.nome = 'Nome deve ter pelo menos 2 caracteres';
        }

        if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.email = 'Email inválido';
        }

        if (!formData.genero) {
            errors.genero = 'Gênero é obrigatório';
        }

        if (!formData.dataNascimento) {
            errors.dataNascimento = 'Data de nascimento é obrigatória';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static showFieldErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.field-error').forEach(el => el.remove());

        Object.keys(errors).forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.color = 'var(--error)';
                errorDiv.style.fontSize = 'var(--font-size-xs)';
                errorDiv.style.marginTop = 'var(--spacing-xs)';
                errorDiv.textContent = errors[field];
                input.parentNode.appendChild(errorDiv);
            }
        });
    }

    static clearFieldErrors() {
        document.querySelectorAll('.field-error').forEach(el => el.remove());
    }
}

// Global functions for HTML onclick handlers
function navigateTo(page) {
    App.navigateTo(page);
}

function loadPessoas() {
    App.loadPessoas();
}

function editPessoa(id) {
    App.editPessoa(id);
}

function deletePessoa(id) {
    App.deletePessoa(id);
}

function closeModal() {
    Utils.closeModal();
}