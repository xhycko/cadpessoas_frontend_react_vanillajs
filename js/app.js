// Main Application
class App {
    static currentPage = 'home';
    static editingId = null;

    static init() {
        this.setupNavigation();
        this.setupForms();
        this.loadPessoas();
        this.checkHealth();
        
        // Auto-refresh health every 30 seconds
        setInterval(() => this.checkHealth(), 30000);
    }

    static setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
    }

    static navigateTo(page) {
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Update pages
        document.querySelectorAll('.page').forEach(pageEl => {
            pageEl.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
        }

        // Load data if needed
        if (page === 'pessoas') {
            this.loadPessoas();
        } else if (page === 'adicionar') {
            this.resetForm();
        } else if (page === 'health') {
            this.checkHealth();
        }
    }

    static setupForms() {
        const form = document.getElementById('pessoa-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    static async handleFormSubmit() {
        const formData = new FormData(document.getElementById('pessoa-form'));
        const pessoa = Object.fromEntries(formData.entries());

        const validation = Utils.validateForm(pessoa);
        if (!validation.isValid) {
            Utils.showFieldErrors(validation.errors);
            return;
        }

        Utils.clearFieldErrors();

        try {
            if (this.editingId) {
                await API.atualizarPessoa(this.editingId, pessoa);
                Utils.showToast('Pessoa atualizada com sucesso!');
            } else {
                await API.criarPessoa(pessoa);
                Utils.showToast('Pessoa criada com sucesso!');
            }
            
            this.resetForm();
            this.navigateTo('pessoas');
        } catch (error) {
            Utils.showToast(`Erro: ${error.message}`, 'error');
        }
    }

    static resetForm() {
        document.getElementById('pessoa-form').reset();
        this.editingId = null;
        Utils.clearFieldErrors();
        
        const pageHeader = document.querySelector('#adicionar-page .page-header h2');
        pageHeader.textContent = 'Adicionar Pessoa';
    }

    static async loadPessoas() {
        const container = document.getElementById('pessoas-list');
        
        try {
            container.innerHTML = '<div style="text-align: center; padding: 2rem;">Carregando pessoas...</div>';
            
            const pessoas = await API.listarPessoas();
            
            if (!pessoas || pessoas.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
                        <h3>Nenhuma pessoa cadastrada</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                            Comece adicionando a primeira pessoa ao sistema.
                        </p>
                        <button class="btn btn-primary" onclick="navigateTo('adicionar')">
                            + Adicionar Primeira Pessoa
                        </button>
                    </div>
                `;
                return;
            }

            container.innerHTML = pessoas.map(pessoa => `
                <div class="pessoa-card">
                    <div class="pessoa-header">
                        <div class="pessoa-avatar">
                            ${Utils.getGenderIcon(pessoa.genero)}
                        </div>
                        <div class="pessoa-info">
                            <h3>${pessoa.nome}</h3>
                            <p>${pessoa.email}</p>
                        </div>
                    </div>
                    <div class="pessoa-details">
                        <div class="pessoa-detail">
                            <span><strong>Telefone:</strong></span>
                            <span>${Utils.formatarTelefone(pessoa.telefone)}</span>
                        </div>
                        <div class="pessoa-detail">
                            <span><strong>Gênero:</strong></span>
                            <span>${pessoa.genero}</span>
                        </div>
                        <div class="pessoa-detail">
                            <span><strong>Nascimento:</strong></span>
                            <span>${Utils.formatarData(pessoa.dataNascimento)}</span>
                        </div>
                    </div>
                    <div class="pessoa-actions">
                        <button class="btn btn-secondary btn-sm" onclick="editPessoa(${pessoa.id})">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deletePessoa(${pessoa.id})">
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--error);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h3>Erro ao carregar pessoas</h3>
                    <p style="margin-bottom: 2rem;">${error.message}</p>
                    <button class="btn btn-primary" onclick="loadPessoas()">
                        🔄 Tentar Novamente
                    </button>
                </div>
            `;
        }
    }

    static async editPessoa(id) {
        try {
            const pessoa = await API.buscarPessoa(id);
            
            // Fill form
            document.getElementById('nome').value = pessoa.nome || '';
            document.getElementById('email').value = pessoa.email || '';
            document.getElementById('telefone').value = pessoa.telefone || '';
            const generoRadio = document.querySelector(`input[name="genero"][value="${pessoa.genero}"]`);
            if (generoRadio) generoRadio.checked = true;
            document.getElementById('dataNascimento').value = pessoa.dataNascimento || '';
            
            this.editingId = id;
            
            const pageHeader = document.querySelector('#adicionar-page .page-header h2');
            pageHeader.textContent = 'Editar Pessoa';
            
            this.navigateTo('adicionar');
            
        } catch (error) {
            Utils.showToast(`Erro ao carregar pessoa: ${error.message}`, 'error');
        }
    }

    static deletePessoa(id) {
        Utils.showModal(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir esta pessoa? Esta ação não pode ser desfeita.',
            async () => {
                try {
                    await API.removerPessoa(id);
                    Utils.showToast('Pessoa excluída com sucesso!');
                    this.loadPessoas();
                } catch (error) {
                    Utils.showToast(`Erro ao excluir pessoa: ${error.message}`, 'error');
                }
            }
        );
    }

    static async checkHealth() {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        const lastCheck = document.getElementById('last-check');

        try {
            const health = await API.verificarHealth();
            
            statusDot.className = `status-dot ${health.status}`;
            statusText.textContent = health.status === 'online' ? 'API Online' : 'API Offline';
            lastCheck.textContent = new Date().toLocaleString('pt-BR');
            
        } catch (error) {
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'API Offline';
            lastCheck.textContent = new Date().toLocaleString('pt-BR');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});