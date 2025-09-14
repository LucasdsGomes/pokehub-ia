# 🎮 PokeAPI Full-Stack Application

Uma aplicação full-stack moderna que consome a PokeAPI para exibir informações sobre Pokémon, desenvolvida com Next.js no frontend e FastAPI no backend.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **Tailwind CSS** - Framework CSS utility-first
- **TypeScript** - Tipagem estática para JavaScript

### Backend
- **FastAPI** - Framework web moderno para APIs
- **Python 3.11+** - Linguagem de programação
- **SQLAlchemy** - ORM para banco de dados
- **Pytest** - Framework de testes
- **Pylance** - Language server para Python

### Infraestrutura
- **Docker Compose** - Orquestração de containers
- **PostgreSQL** - Banco de dados relacional
- **Postman Collections** - Documentação e testes de API

## 📁 Estrutura do Projeto

```
pokemon-app/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 13+)
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── lib/            # Utilitários e configurações
│   │   └── types/          # Definições TypeScript
│   ├── public/             # Assets estáticos
│   └── package.json
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/            # Endpoints da API
│   │   ├── core/           # Configurações centrais
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── schemas/        # Schemas Pydantic
│   │   ├── services/       # Lógica de negócio
│   │   └── tests/          # Testes unitários
│   ├── requirements.txt
│   └── Dockerfile
├── postman/                # Collections do Postman
├── docker-compose.yml      # Configuração dos serviços
└── README.md
```

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)
- Python 3.11+ (para desenvolvimento local)

### Instalação Rápida com Docker

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/pokemon-app.git
cd pokemon-app
```

2. **Execute com Docker Compose**
```bash
docker-compose up --build
```

3. **Acesse a aplicação**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Documentação API: http://localhost:8000/docs

### Desenvolvimento Local

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testes

### Testes Backend (Pytest)
```bash
cd backend
pytest app/tests/ -v
```

### Cobertura de Testes
```bash
pytest --cov=app app/tests/
```

## 📚 API Endpoints

### Principais Rotas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pokemon` | Lista todos os Pokémon |
| GET | `/api/pokemon/{id}` | Busca Pokémon por ID |
| GET | `/api/pokemon/name/{name}` | Busca Pokémon por nome |
| GET | `/api/types` | Lista tipos de Pokémon |
| GET | `/health` | Status da API |

### Documentação Interativa
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔧 Postman Collections

As collections do Postman estão disponíveis na pasta `/postman` e incluem:
- Todos os endpoints da API
- Exemplos de requisições
- Testes automatizados
- Variáveis de ambiente

Para importar:
1. Abra o Postman
2. Importe o arquivo `postman/Pokemon_API.postman_collection.json`
3. Configure as variáveis de ambiente

## 🌟 Funcionalidades

### Frontend
- ✅ Interface responsiva com Tailwind CSS
- ✅ Listagem de Pokémon com paginação
- ✅ Busca por nome ou ID
- ✅ Detalhes completos do Pokémon
- ✅ Filtros por tipo
- ✅ Loading states e tratamento de erro

### Backend
- ✅ API RESTful com FastAPI
- ✅ Integração com PokeAPI externa
- ✅ Cache de dados com SQLAlchemy
- ✅ Validação de dados com Pydantic
- ✅ Tratamento de erros robusto
- ✅ Documentação automática

## 🏗️ Arquitetura

### Padrões Utilizados
- **Clean Architecture** - Separação clara de responsabilidades
- **Repository Pattern** - Abstração da camada de dados
- **Service Layer** - Lógica de negócio centralizada
- **DTO Pattern** - Transferência segura de dados

### Boas Práticas
- Code splitting no frontend
- Type safety com TypeScript e Pydantic
- Testes unitários abrangentes
- Containerização completa
- Versionamento semântico
- Commits convencionais

## 📊 Monitoramento e Logs

- Logs estruturados com Python logging
- Health checks para todos os serviços
- Métricas de performance da API
- Error tracking e monitoring

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🚀 Deploy

### Produção
```bash
# Build das imagens
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 📞 Contato

- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)
- **LinkedIn**: [Seu Nome](https://linkedin.com/in/seu-perfil)
- **Email**: seu.email@exemplo.com

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
