# CRUD Pessoas - Vanilla JS

Sistema CRUD para gerenciamento de pessoas. Vanilla JavaScript, sem frameworks.

## Stack
- HTML5, CSS3, JavaScript ES6+
- Fetch API para requisições REST
- SPA com navegação por abas

## Estrutura
```
├── index.html
├── css/styles.css
├── js/
│   ├── api.js    # Comunicação REST
│   ├── utils.js  # Utilitários
│   └── app.js    # Aplicação principal
```

## Funcionalidades
- CRUD completo (Create, Read, Update, Delete)
- Validação de formulários
- Feedback visual (toasts/modals)
- Monitoramento status API
- Interface responsiva

## Campos
- Nome (obrigatório)
- Email (obrigatório, validado)
- Telefone (opcional)
- Gênero (radio: Masculino/Feminino/Não Informado)
- Data Nascimento (obrigatório)

## Execução

### API
```bash
cd gabarito_cadpessoas_rest
./mvnw spring-boot:run
```

### Frontend
```bash
python -m http.server 8000
# ou
npx serve .
```

Acesso: http://localhost:8000

## Endpoints
- `GET /api/pessoas` - Listar
- `GET /api/pessoas/{id}` - Buscar
- `POST /api/pessoas` - Criar
- `PUT /api/pessoas/{id}` - Atualizar
- `DELETE /api/pessoas/{id}` - Remover
- `GET /api/health` - Status
