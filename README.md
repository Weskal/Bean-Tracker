# BeanTracker ☕

Sistema de rastreamento de cafés especiais com Node.js, React, MongoDB e Docker.

## 🚀 Tecnologias

- **Backend:** Node.js + Express + Mongoose
- **Banco:** MongoDB
- **Containerização:** Docker + Docker Compose
- **Deploy:** AWS EC2 (em desenvolvimento)
- **Frontend** React (em desenvolvimento)

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

## ⚙️ Configuração

1. Clone o repositório
2. Copie o arquivo de exemplo:
```bash
   cp .env.example .env
```
3. Edite o `.env` com suas credenciais

## 🐳 Executar com Docker
```bash
# Subir containers
docker-compose up -d --build

# Ver logs
docker-compose logs -f app

# Parar containers
docker-compose down
```

## 🔗 Endpoints da API

- `POST /api/coffees` - Criar café
- `GET /api/coffees` - Listar todos
- `GET /api/coffees/:id` - Buscar por ID
- `PUT /api/coffees/:id` - Atualizar
- `DELETE /api/coffees/:id` - Deletar

## 📦 Estrutura do Projeto
```
beantracker/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.js
│   └── Dockerfile
└── docker-compose.yml
```

## 🔄 Status

🚧 Projeto em desenvolvimento

- ✅ Backend API REST
- ✅ MongoDB containerizado
- ⏳ Frontend React (em breve)
- ⏳ Deploy AWS EC2 (em breve)

