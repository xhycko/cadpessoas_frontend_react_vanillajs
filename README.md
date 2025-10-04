# CRUD Desktop - Vanilla JavaScript

Sistema de gerenciamento de pessoas desenvolvido em Vanilla JavaScript, HTML e CSS para navegação desktop.

## Características

- **Vanilla JavaScript**: Sem frameworks, apenas JavaScript puro
- **Design Desktop-First**: Otimizado para navegadores desktop
- **Tema Claro**: Interface limpa e moderna com tema claro
- **PWA**: Progressive Web App com manifest
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **API REST**: Consome a mesma API do projeto React mobile

## Estrutura do Projeto

```
crud-vanilla-desktop/
├── index.html          # Página principal
├── manifest.json       # Configuração PWA
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   ├── api.js          # Serviços da API
│   ├── utils.js        # Funções utilitárias
│   └── app.js          # Aplicação principal
└── README.md
```

## Funcionalidades

### ✅ Implementadas
- [x] Listagem de pessoas em grid
- [x] Formulário de cadastro/edição
- [x] Exclusão com confirmação
- [x] Validação de formulários
- [x] Feedback visual (toasts)
- [x] Status da API em tempo real
- [x] Design responsivo
- [x] Navegação SPA
- [x] Tratamento de erros

### 🎨 Design
- **Tema**: Claro e moderno
- **Layout**: Desktop-first com grid de cards
- **Navegação**: Menu horizontal no header
- **Tipografia**: System fonts (-apple-system, Segoe UI)
- **Cores**: Azul primário (#2563eb) com tons de cinza

## Como Usar

1. **Iniciar API REST**:
   ```bash
   cd gabarito_cadpessoas_rest
   ./mvnw spring-boot:run
   ```

2. **Servir arquivos**:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve .
   
   # Com PHP
   php -S localhost:8000
   ```

3. **Acessar**: http://localhost:8000

## API Endpoints

- `GET /api/pessoas` - Listar pessoas
- `GET /api/pessoas/{id}` - Buscar pessoa
- `POST /api/pessoas` - Criar pessoa
- `PUT /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Excluir pessoa
- `GET /api/health` - Status da API

## Diferenças do React Mobile

| Aspecto | React Mobile | Vanilla Desktop |
|---------|-------------|-----------------|
| **Framework** | React + Bootstrap | Vanilla JS + CSS |
| **Tema** | Escuro | Claro |
| **Layout** | Mobile-first | Desktop-first |
| **Navegação** | Menu hamburger | Menu horizontal |
| **Cards** | Lista vertical | Grid de cards |
| **Formulários** | Modais | Páginas dedicadas |

## Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Custom Properties
- **JavaScript ES6+**: Classes, Async/Await, Modules
- **Fetch API**: Requisições HTTP
- **PWA**: Service Worker ready

## Compatibilidade

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+