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
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos customizados com Tailwind CSS
- **JavaScript (Vanilla)** - Lógica sem frameworks
- **Tailwind CSS** - Framework utilitário para styling
- **Font Awesome 6.0** - Ícones vetoriais
- **Google Fonts** - Fontes Cinzel e Plus Jakarta Sans
- **Fetch API** - Requisições HTTP para comunicação com backend

### Backend
- **Python (Flask)** - Framework web
- **Firebase Firestore** - Banco de dados NoSQL
- **JWT** - Autenticação com tokens
- **Flask-CORS** - Suporte a requisições cross-origin

### Deploy
- **Vercel** - Hospedagem da API
- **Vercel/GitHub Pages** - Frontend estático

---

## 💻 Estrutura do Frontend

O frontend é uma aplicação web responsiva com interface moderna e intuitiva, desenvolvida com HTML5, CSS3 (Tailwind) e JavaScript vanilla.

### Componentes Principais

#### 1. **Seção de Login** (`loginSection`)
- Painel de autenticação com design sofisticado
- Campos para usuário e senha
- Validação de credenciais contra API backend
- Armazenamento seguro do token JWT no `localStorage`
- Mensagens de erro interativas
- Design escuro com detalhes em dourado (tema Sparta)

**Funcionalidade:**
```javascript
- POST /login com credenciais
- Recebimento do token JWT
- Redirecionamento para painel admin após sucesso
```

#### 2. **Barra de Navegação** (`navbar`)
- Logo da Sparta Gym com ícone personalizado
- Botão de logout
- Espaço para branding
- Design responsivo com Tailwind

#### 3. **Painel de Cadastro/Edição** (Lado esquerdo)
- Formulário sticky com campos para:
  - **Nome Completo** - input validado
  - **CPF** - input numérico (11 dígitos)
  - **Status** - dropdown (Ativo / Bloqueado)
- Botões de ação:
  - **SALVAR** - Cadastrar novo ou atualizar existente
  - **CANCELAR** - Limpar formulário (aparece apenas em modo edição)
- Validação de campos obrigatórios
- Requisições dinâmicas (POST para criar, PUT para editar)

#### 4. **Tabela de Alunos** (Lado direito)
- Listagem em tempo real de todos os alunos registrados
- Colunas:
  - **Nome** - Destacado em branco
  - **CPF** - Formatação monoespacial em dourado
  - **Status** - Badge com cores (Verde = Ativo, Vermelho = Bloqueado)
  - **Ações** - Botões de editar e deletar
- Contador total de alunos cadastrados
- Botão de refresh para recarregar lista
- Hover effects e transições suaves

### Fluxo de Autenticação

```
1. Usuário acessa a página
2. Se sem token:
   ├─ Exibe seção de LOGIN
   └─ Usuário insere credenciais
3. Backend valida credenciais
4. Se válido:
   ├─ Retorna token JWT
   ├─ Token salvo em localStorage
   └─ Exibe painel ADMIN
5. Se inválido:
   └─ Mostra mensagem de erro
```

### Fluxo CRUD de Alunos

```
CREATE (Novo Aluno):
  1. Usuário preenche form
  2. Clica em SALVAR
  3. POST /alunos com dados
  4. Lista recarrega

READ (Listar):
  1. App inicia ou clica refresh
  2. GET /alunos com token
  3. Preenche tabela dinamicamente

UPDATE (Editar):
  1. Clica ícone de editar
  2. Form preenche com dados
  3. Usuário altera campos
  4. PUT /alunos/{id}
  5. Lista recarrega

DELETE (Apagar):
  1. Clica ícone de deletar
  2. Confirma ação
  3. DELETE /alunos/{id}
  4. Lista recarrega
```

### Design e Estilos

- **Tema Visual:** Dark mode com acentos em ouro (#d4af37)
- **Tipografia:**
  - `Cinzel` - Títulos (font-family sparta)
  - `Plus Jakarta Sans` - Corpo do texto
- **Cores Principais:**
  - Fundo: gradiente preto (#121212 a #000000)
  - Destaque: ouro (#d4af37)
  - Status Ativo: verde esmeralda
  - Status Bloqueado: vermelho
  - Componentes: tons de cinza (zinc)
- **Efeitos:**
  - Glass morphism nos cards
  - Blur no background
  - Transições suaves (0.3s)
  - Hover effects interativos
  - Animações de revealção

### Funcionalidades de UI/UX

✅ **Responsividade**
- Grid layout que adapta em telas pequenas (col-span-12)
- Layout lado a lado em desktop (form 4 cols, tabela 8 cols)
- Padrão mobile-first com Tailwind

✅ **Tratamento de Erros**
- Validação de campos obrigatórios
- Mensagens de erro ao fazer login
- Alertas JavaScript informativos
- Feedback visual de operações sucesso

✅ **Gerenciamento de Sessão**
- Token persistido em localStorage
- Verificação de token na inicialização
- Logout limpa o localStorage
- Re-autenticação automática se token expirar

✅ **Estado da Aplicação**
- Variável `tokenAtual` controla autenticação
- Array `listaAlunos` armazena dados
- ID de edição em campo hidden
- Mudança dinâmica de título do form

### Cliente HTTP (Fetch API)

Todas as requisições incluem:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${tokenAtual}`
}
```

Tratamento centralizado de:
- Erros de autenticação (401/403)
- Parsing de respostas (JSON ou texto)
- Mensagens de erro customizadas
- Reconexão com servidor

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
cd administrativo_academia
```

### 2. Backend
```bash
pip install -r requirements.txt
python app.py
```

**Criar arquivo `.env` na raiz do backend:**
```
SECRET_KEY=sua_chave_secreta
ADM_USUARIO=admin
ADM_SENHA=sua_senha_segura
```

Backend rodará em: `http://localhost:5000`

### 3. Frontend

#### Opção A: Abrir diretamente no navegador
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### Opção B: Usar Live Server (VSCode)
1. Instale a extensão "Live Server" no VSCode
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"
4. Acesso automático em: `http://localhost:5500`

#### Opção C: Usar servidor Python local
```bash
# Python 3.7+
python -m http.server 8000
```
Acesse: `http://localhost:8000`

---

## 🎯 Como Usar a Aplicação

### 1. **Login**
```
Usuário: admin
Senha: (conforme configurado no .env)
```
- O sistema valida as credenciais contra a API backend
- Token JWT é armazenado no localStorage
- Sessão mantida mesmo após recarregar página

### 2. **Cadastrar Novo Aluno**
1. Preencha os campos do formulário:
   - **Nome Completo** (obrigatório)
   - **CPF** - apenas dígitos, máximo 11 (obrigatório)
   - **Status** - Ativo ou Bloqueado

2. Clique em **SALVAR**
3. Aluno aparece na tabela imediatamente

### 3. **Editar Aluno**
1. Clique no ícone de **lápis** (✏️) na linha do aluno
2. Formulário preenche com os dados atuais
3. Faça as alterações desejadas
4. Clique em **SALVAR**
5. Alterações refletem na tabela

### 4. **Deletar Aluno**
1. Clique no ícone de **lixeira** (🗑️) na linha do aluno
2. Confirme a exclusão no popup
3. Aluno é removido da tabela imediatamente

### 5. **Controlar Status de Acesso**
- **LIBERADO (Ativo)** - Aluno pode usar a catraca
- **BLOQUEADO** - Aluno é bloqueado na catraca
- Altere o status no dropdown ao editar o aluno

### 6. **Logout**
- Clique em **"Sair do Sistema"** na navbar
- Token é removido do localStorage
- Interface volta para login

---

## 🔐 Segurança

⚠️ **Importante:**
- Nunca compartilhe as credenciais de admin
- Token JWT é sensível - não exponha em produção
- Use HTTPS em produção
- Mantenha SECRET_KEY segura

**Melhorias de segurança futuras:**
- Autenticação com OAuth2
- Criptografia de dados sensíveis
- Rate limiting de login
- Logs de auditoria

---

## ⚠️ Observações Importantes

### Sobre o Sistema
- O sistema utiliza autenticação via token JWT
- O token é armazenado no localStorage do navegador
- O backend utiliza Firebase Firestore como banco de dados
- Existe um sistema de geração de ID baseado em contador (pode ser melhorado futuramente)

### Sobre o Frontend
- **Sem dependências externas:** Usa CDN para Tailwind CSS e Font Awesome
- **Cache de sessão:** Token persiste ao recarregar a página
- **Requisições assíncronas:** Todas as chamadas à API usam Fetch API com async/await
- **Tratamento de erros:** Validação de resposta antes de processar dados
- **Compatibilidade:** Requer navegador moderno com suporte a ES6
- **Storage local:** localStorage é o único armazenamento client-side

### Possíveis Problemas e Soluções

**Problema:** "Erro ao conectar com o servidor"
- **Causa:** Backend não está rodando ou URL da API está incorreta
- **Solução:** Verifique se backend está rodando, corrija `API_BASE_URL` em `admin.js`

**Problema:** "Sessão expirada"
- **Causa:** Token expirou ou foi invalidado
- **Solução:** Faça login novamente na tela de autenticação

**Problema:** Token não persiste após recarregar
- **Causa:** localStorage está desabilitado no navegador
- **Solução:** Ative localStorage nas configurações de privacidade

**Problema:** Tabela não atualiza
- **Causa:** Resposta da API foi corrompida
- **Solução:** Abra o DevTools (F12) e verifique a aba Network

---

## 👥 Colaboradores

- 👤 **João Guilherme** https://github.com/jgarrudaa
- 👤 **Daniel Pupo** https://github.com/DanielPupo

---

## 🌍 Deploy

- 🔗 **Frontend Administrativo:** https://administrativo-academia.vercel.app/
- 🔗 **Frontend Catraca:** https://catraca-academia-six.vercel.app/
- 🔗 **Backend (API):** https://api-backend-catraca.vercel.app

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

## 💡 Sobre o Projeto

O Sparta Gym foi desenvolvido como um sistema completo de controle de acesso para academias, simulando um ambiente real com autenticação, banco de dados e integração com hardware (catraca).