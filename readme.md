# 🛡️ Sparta Gym | Admin Panel

Sistema de gerenciamento de alunos para academias, com controle de acesso via catraca.

Este projeto permite que administradores cadastrem, editem, visualizem e removam alunos, além de controlar o status de liberação de acesso (ativo ou bloqueado).

---

## 🚀 Funcionalidades

- 🔐 Autenticação de administrador (login com token JWT)
- 👥 Cadastro de alunos
- ✏️ Edição de dados
- 🗑️ Exclusão de alunos
- 📋 Listagem em tempo real
- 🚦 Controle de status (LIBERADO / BLOQUEADO)
- 🔄 Integração com API para sistema de catraca

---

## 🧠 Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3 (com TailwindCSS)
- JavaScript (Vanilla)

### Backend
- Python (Flask)
- Firebase Firestore
- JWT para autenticação
- Flask-CORS

### Deploy
- Vercel (API)
- Frontend estático

---

## 🌐 API Endpoints

**Base URL:** https://api-backend-catraca.vercel.app

### 🔑 Autenticação

```http
POST /login
```

**Body:**
```json
{
  "usuario": "admin",
  "senha": "sua_senha"
}
```

---

## 👥 Rotas de Alunos

### Listar alunos
```http
GET /alunos
```

### Criar aluno
```http
POST /alunos
```

### Editar aluno
```http
PUT /alunos/{id}
```

### Deletar aluno
```http
DELETE /alunos/{id}
```

---

## 🚪 Rota da Catraca

```http
POST /catraca
```

**Body:**
```json
{
  "cpf": "00000000000"
}
```

**Resposta:**
```
LIBERADO
BLOQUEADO
```

---

## ⚙️ Como Rodar o Projeto

### 1. Clonar repositório
```bash
git clone https://github.com/jgarrudaa/administrativo_academia.git
```

### 2. Backend
```bash
pip install -r requirements.txt
python app.py
```

**Criar arquivo `.env`:**
```
SECRET_KEY=sua_chave
ADM_USUARIO=admin
ADM_SENHA=senha
```

### 3. Frontend

Basta abrir o arquivo `index.html` ou usar uma extensão tipo Live Server.

---

## ⚠️ Observações Importantes

- O sistema utiliza autenticação via token (JWT)
- O token é armazenado no localStorage
- O backend utiliza Firebase como banco de dados
- Existe um sistema de geração de ID baseado em contador (pode ser melhorado futuramente)

---

## 🧩 Melhorias Futuras

- 🔄 Substituir contador por ID automático do Firebase
- 🔐 Melhorar segurança do login
- 📱 Responsividade mobile
- 📊 Dashboard com métricas
- 🧾 Logs de acesso da catraca

---

## 👥 Colaboradores

- 👤 **Seu nome:** https://github.com/jgarrudaa
- 👤 **Parceiro:** https://github.com/DanielPupo

---

## 🌍 Deploy

- 🔗 **Frontend:** https://administrativo-academia.vercel.app/
- 🔗 **Backend (API):** https://api-backend-catraca.vercel.app

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

## 💡 Sobre o Projeto

O Sparta Gym foi desenvolvido como um sistema completo de controle de acesso para academias, simulando um ambiente real com autenticação, banco de dados e integração com hardware (catraca).