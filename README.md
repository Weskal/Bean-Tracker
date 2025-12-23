# BeanTracker ☕

Sistema de rastreamento e avaliação de cafés e grãos especiais desenvolvido com Node.js, React, MongoDB e Docker.

![BeanTracker](https://img.shields.io/badge/Status-Concluído-success)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)

## 📋 Sobre o Projeto

BeanTracker é uma aplicação full-stack para entusiastas de café registrarem e avaliarem diferentes grãos e origens que experimentam. O projeto demonstra conhecimentos em desenvolvimento web moderno, containerização e deploy em cloud.

### ✨ Funcionalidades

- ✅ **CRUD Completo** - Criar, listar, visualizar, editar e deletar avaliações de café
- 🔍 **Busca em Tempo Real** - Filtro por nome, origem ou notas de sabor
- ⭐ **Sistema de Avaliação** - Rating de 1 a 5 estrelas com interface interativa
- 📅 **Data de Degustação** - Registro da data em que o café foi provado
- 🏷️ **Tags de Sabor** - Categorização com múltiplas notas (chocolate, caramelo, etc)
- 📱 **Design Responsivo** - Interface adaptável para mobile, tablet e desktop
- ✏️ **Validação de Formulários** - Feedback visual para campos obrigatórios
- 🎨 **Interface Moderna** - Design clean com tema marrom/café

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Habilitação de requisições cross-origin

### **Frontend**
- **React** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **React Router** - Navegação entre páginas
- **Axios** - Cliente HTTP
- **React Icons** - Ícones

### **DevOps**
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **AWS EC2** - Hospedagem cloud

---

## 📦 Estrutura do Projeto
```
beantracker/
├── backend/
│   ├── src/
│   │   ├── models/          # Schemas do MongoDB
│   │   ├── controllers/     # Lógica de negócio
│   │   ├── routes/          # Rotas da API
│   │   └── server.js        # Entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Comunicação com API
│   │   └── assets/          # Imagens e recursos
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔧 Pré-requisitos

- **Docker** 20.x ou superior
- **Docker Compose** 2.x ou superior
- **Node.js** 18.x ou superior (apenas para desenvolvimento local)
- **Git**

---

## 🏃 Como Executar Localmente

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/beantracker.git
cd beantracker
```

### **2. Configure as variáveis de ambiente**

Copie o arquivo de exemplo e ajuste conforme necessário:
```bash
cp .env.example .env
```

Conteúdo do `.env`:
```env
PORT=3000
MONGO_USER=admin
MONGO_PASS=admin123
MONGO_URI=mongodb://admin:admin123@mongodb:27017/beantracker?authSource=admin
```

### **3. Suba os containers**
```bash
docker-compose up -d --build
```

### **4. Acesse a aplicação**

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000/api/health

### **5. Comandos úteis**
```bash
# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend

# Parar containers
docker-compose down

# Reiniciar um serviço
docker-compose restart frontend

# Ver containers rodando
docker ps
```

---

## 🌐 Deploy na AWS EC2

### **Configuração necessária**

Antes de fazer o deploy, **atualize o IP da API**:

1. Abra `frontend/src/services/api.js`
2. Localize a linha:
```javascript
   const API_URL = 'http://SEU_IP_AQUI:3000/api/coffees';
```
3. Substitua `SEU_IP_AQUI` pelo **IP público da sua instância EC2**

### **Passos para deploy**

#### **1. Criar instância EC2**

- **Tipo:** t2.micro (Free Tier)
- **Sistema:** Ubuntu 24.04 LTS
- **Storage:** 30 GB

#### **2. Configurar Security Group**

Libere as seguintes portas:
- **22** - SSH
- **3000** - Backend API
- **5173** - Frontend

#### **3. Conectar via SSH**
```bash
ssh -i sua-chave.pem ubuntu@SEU_IP_PUBLICO
```

#### **4. Instalar Docker**
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reiniciar sessão
exit
```

#### **5. Clonar e configurar projeto**
```bash
# Instalar Git
sudo apt install git -y

# Clonar repositório
git clone https://github.com/seu-usuario/beantracker.git
cd beantracker

# Criar arquivo .env
nano .env
# Cole as variáveis de ambiente
```
1. PORT
2. MONGO_URI
3. MONGO_USER
4. MONGO_PASS

### Configuração necessária

Antes de fazer o deploy, **atualize o IP da API**:

1. Abra `frontend/src/services/api.js`
2. Localize a linha:
```javascript
   const API_URL = 'http://SEU_IP_AQUI:3000/api/coffees';
```
3. Substitua `SEU_IP_AQUI` pelo **IP público da sua instância EC2**

#### **6. Subir aplicação**
```bash
docker-compose up -d --build
```

#### **7. Acessar aplicação**

- **Frontend:** `http://SEU_IP_PUBLICO:5173`
- **Backend:** `http://SEU_IP_PUBLICO:3000/api/health`

### **⚠️ Dicas importantes**

- Sempre **pare a instância** quando não estiver usando para evitar custos
- Configure **alarmes de billing** no CloudWatch
- O IP público muda ao parar/iniciar a instância (considere usar Elastic IP)

---

## 🗺️ API Endpoints

### **Cafés**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/coffees` | Lista todos os cafés |
| `GET` | `/api/coffees/:id` | Busca café por ID |
| `POST` | `/api/coffees` | Cria novo café |
| `PUT` | `/api/coffees/:id` | Atualiza café |
| `DELETE` | `/api/coffees/:id` | Deleta café |

### **Exemplo de Request**
```json
POST /api/coffees
Content-Type: application/json

{
  "name": "Bourbon Amarelo",
  "origin": "Brasil, Minas Gerais",
  "roastLevel": "medium",
  "flavorNotes": ["chocolate", "caramelo", "nozes"],
  "brewMethod": "Espresso",
  "rating": 5,
  "notes": "Café excepcional com doçura natural.",
}
```

---

## 🧪 Testes

### **Planejado para implementação futura:**

- Testes unitários (Jest)
- Testes de integração (Supertest)
- Cobertura de código
```bash
# Executar testes (quando implementado)
npm test

# Cobertura
npm run test:coverage
```

---

## 📸 Screenshots

### Home Page
![Home](docs/screenshots/home.jpg)
![Home](docs/screenshots/home2.jpg)

### Lista de Cafés
![Lista](docs/screenshots/lista.jpg)

### Formulário de Avaliação
![Formulário](docs/screenshots/form.jpg)
![Formulário](docs/screenshots/form2.jpg)

### Detalhes do Café
![Detalhes](docs/screenshots/detalhes.jpg)

---

## 🎨 Paleta de Cores
```css
--coffee-cream: #F5E6D3    /* Bege claro - fundo */
--coffee-light: #D4A574    /* Marrom claro */
--coffee-medium: #8B4513   /* Marrom médio */
--coffee-dark: #3E2723     /* Marrom escuro - texto */
--accent: #C7956D          /* Dourado suave */
```

---

## 🛠️ Desenvolvimento

### **Executar sem Docker (desenvolvimento local)**

#### **Backend:**
```bash
cd backend
npm install
npm run dev
```

#### **Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

## 👤 Autor

**Gabriel Paliato**

- GitHub: [@Weskal](https://github.com/Weskal)
- LinkedIn: [Gabriel Paliato](https://www.linkedin.com/in/gabriel-paliato-49467b211/)

---

## 🙏 Agradecimentos

- Comunidade React
- Comunidade Node.js
- MongoDB Documentation
- Docker Documentation

---

## 📌 Roadmap

- [ ] Autenticação de usuários
- [ ] Upload de imagens dos cafés
- [ ] Dashboard com gráficos e estatísticas
- [ ] Exportação de dados (CSV/PDF)
- [ ] Sistema de favoritos
- [ ] Comparação entre cafés
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] CI/CD com GitHub Actions

---

**Desenvolvido com ☕ e 💙**
