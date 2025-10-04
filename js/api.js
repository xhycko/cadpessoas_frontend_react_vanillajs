// API Service
class API {
    static baseURL = 'http://localhost:8080/api';

    static async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async listarPessoas() {
        return await this.request('/pessoas');
    }

    static async buscarPessoa(id) {
        return await this.request(`/pessoas/${id}`);
    }

    static async criarPessoa(pessoa) {
        return await this.request('/pessoas', {
            method: 'POST',
            body: JSON.stringify(pessoa)
        });
    }

    static async atualizarPessoa(id, pessoa) {
        return await this.request(`/pessoas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(pessoa)
        });
    }

    static async removerPessoa(id) {
        return await this.request(`/pessoas/${id}`, {
            method: 'DELETE'
        });
    }

    static async verificarHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            return {
                status: response.ok ? 'online' : 'offline',
                statusCode: response.status,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return {
                status: 'offline',
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
}