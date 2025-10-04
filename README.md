# CRUD Desktop - Vanilla JavaScript

Sistema gerenciamento de pessoas em Vanilla JavaScript, HTML e CSS para navegação desktop.

## Características
- **Vanilla JavaScript**: Sem frameworks, JavaScript puro
- **Design Desktop-First**: Otimizado para navegadores desktop
- **Tema Claro**: Interface limpa e moderna
- **PWA**: Progressive Web App com manifest
- **Responsivo**: Adapta-se a diferentes telas
- **API REST**: Consome mesma API do projeto React mobile

## Estrutura
```
crud-vanilla-desktop/
├── index.html          # Página principal
├── manifest.json       # Configuração PWA
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   ├── api.js          # Serviços API
│   ├── utils.js        # Funções utilitárias
│   └── app.js          # Aplicação principal
```

## Funcionalidades
- [x] Listagem pessoas em grid
- [x] Formulário cadastro/edição
- [x] Exclusão com confirmação
- [x] Validação formulários
- [x] Feedback visual (toasts)
- [x] Status API em tempo real
- [x] Design responsivo
- [x] Navegação SPA
- [x] Tratamento de erros

## Design
- **Layout**: Desktop-first com grid de cards
- **Navegação**: Menu horizontal no header
- **Tipografia**: System fonts (-apple-system, Segoe UI)
- **Cores**: Azul primário (#2563eb) com tons de cinza

## Como Usar

### Iniciar API REST
```bash
cd gabarito_cadpessoas_rest
./mvnw spring-boot:run
```

### Servir arquivos
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Acessar
http://localhost:8000

## API Endpoints
- `GET /api/pessoas` - Listar pessoas
- `GET /api/pessoas/{id}` - Buscar pessoa
- `POST /api/pessoas` - Criar pessoa
- `PUT /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Excluir pessoa
- `GET /api/health` - Status da API

## Tecnologias
- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Custom Properties
- **JavaScript ES6+**: Classes, Async/Await, Modules
- **Fetch API**: Requisições HTTP
- **PWA**: Service Worker ready
