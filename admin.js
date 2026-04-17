const API_BASE_URL = 'https://api-backend-catraca.vercel.app'; 

// Referências do DOM
const alunoForm = document.getElementById('alunoForm');
const tabelaAlunos = document.getElementById('tabelaAlunos');
const totalAlunosEl = document.getElementById('totalAlunos');
const btnCancelar = document.getElementById('btnCancelar');
const formTitle = document.getElementById('formTitle');
const loginForm = document.getElementById('loginForm');
const btnLogout = document.getElementById('btnLogout');
const loginError = document.getElementById('loginError');
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');

let tokenAtual = localStorage.getItem('adminToken') || null;
let listaAlunos = [];

// Inicialização
iniciarApp();

function iniciarApp() {
    if (tokenAtual) {
        mostrarPainelAdmin();
        buscarAlunos();
    } else {
        mostrarLogin();
    }
}

async function parseApiResponse(resposta) {
    const texto = await resposta.text();
    try {
        return texto ? JSON.parse(texto) : null;
    } catch {
        return texto;
    }
}

function handleAuthError(resposta) {
    if (resposta.status === 401 || resposta.status === 403) {
        tokenAtual = null;
        localStorage.removeItem('adminToken');
        mostrarLogin();
        alert('Sessão expirada. Faça login novamente.');
        return true;
    }
    return false;
}

// 1. LOGIN
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        const resposta = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senha: password, usuario: usuario }) 
        });

        if (resposta.ok) {
            const dados = await resposta.json(); 
            tokenAtual = dados.token;
            localStorage.setItem('adminToken', tokenAtual); 
            loginError.classList.add('hidden');
            mostrarPainelAdmin();
            buscarAlunos(); 
        } else {
            loginError.classList.remove('hidden');
        }
    } catch (erro) {
        alert("Erro ao conectar com o servidor.");
    }
});

btnLogout.addEventListener('click', () => {
    tokenAtual = null;
    localStorage.removeItem('adminToken');
    mostrarLogin(); 
});

// 2. BUSCAR ALUNOS (Read)
async function buscarAlunos() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/alunos`, {
            headers: { 'Authorization': `Bearer ${tokenAtual}` }
        });
        
        if (resposta.ok) {
            listaAlunos = await resposta.json();
            renderizarTabela();
            return;
        }

        if (handleAuthError(resposta)) return;

        const erro = await parseApiResponse(resposta);
        console.error("Erro ao buscar:", resposta.status, erro);
        alert("Falha ao carregar alunos: " + (erro?.mensagem || erro?.erro || resposta.statusText));
    } catch (erro) {
        console.error("Erro ao buscar:", erro);
        alert("Erro ao conectar com o servidor.");
    }
}

function renderizarTabela() {
    tabelaAlunos.innerHTML = '';
    totalAlunosEl.textContent = listaAlunos.length;

    listaAlunos.forEach(aluno => {
        // Lógica do Status: converte true/false para texto e cor
        const estaAtivo = aluno.status === true || aluno.status === "true";
        const statusTexto = estaAtivo ? "Ativo" : "Bloqueado";
        const statusCor = estaAtivo ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10";

        const tr = document.createElement('tr');
        tr.className = "hover:bg-white/[0.02] transition-colors border-b border-zinc-800/50";
        tr.innerHTML = `
            <td class="p-6">
                <span class="block text-sm font-bold text-white uppercase">${aluno.nome}</span>
            </td>
            <td class="p-6 font-mono text-xs text-[#d4af37]">
                ${aluno.cpf}
            </td>
            <td class="p-6">
                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusCor}">
                    ${statusTexto}
                </span>
            </td>
            <td class="p-6 text-right">
                <button onclick="prepararEdicao('${aluno.id}')" class="text-zinc-500 hover:text-white mr-4 transition-all">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletarAluno('${aluno.id}')" class="text-zinc-500 hover:text-red-500 transition-all">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tabelaAlunos.appendChild(tr);
    });
}

// 3. SALVAR / EDITAR (Create / Update)
alunoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!tokenAtual) {
        alert('Faça login antes de cadastrar ou editar.');
        return;
    }

    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value.trim();
    const status = document.getElementById('status').value === "true"; 

    if (!/^[0-9]{11}$/.test(cpf)) {
        alert('CPF inválido. Informe exatamente 11 dígitos numéricos e sem letras.');
        return;
    }

    const dadosAluno = { nome, cpf, status };

    try {
        let url = `${API_BASE_URL}/alunos`;
        let metodo = 'POST';

        if (id) {
            url = `${API_BASE_URL}/alunos/${id}`;
            metodo = 'PUT';
        }

        const resposta = await fetch(url, {
            method: metodo,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenAtual}`
            },
            body: JSON.stringify(dadosAluno)
        });

        if (resposta.ok) {
            limparFormulario();
            buscarAlunos();
            alert("Operação realizada com sucesso!");
            return;
        }

        if (handleAuthError(resposta)) return;

        const erro = await parseApiResponse(resposta);
        console.error("Erro ao salvar:", resposta.status, erro);
        alert("Erro: " + (erro?.mensagem || erro?.erro || JSON.stringify(erro) || resposta.statusText));
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Erro ao conectar com o servidor.");
    }
});

// 4. DELETAR (Delete)
async function deletarAluno(id) {
    if (!confirm("Remover este guerreiro da Sparta?")) return;
    if (!tokenAtual) {
        alert('Faça login antes de excluir.');
        return;
    }

    try {
        const resposta = await fetch(`${API_BASE_URL}/alunos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${tokenAtual}` }
        });

        if (resposta.ok) {
            buscarAlunos();
            return;
        }

        if (handleAuthError(resposta)) return;

        const erro = await parseApiResponse(resposta);
        console.error("Erro ao excluir:", resposta.status, erro);
        alert("Erro ao excluir: " + (erro?.mensagem || erro?.erro || resposta.statusText));
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro ao conectar com o servidor.");
    }
}

// UI HELPER
function mostrarLogin() { loginSection.classList.remove('hidden'); adminSection.classList.add('hidden'); }
function mostrarPainelAdmin() { loginSection.classList.add('hidden'); adminSection.classList.remove('hidden'); }
function limparFormulario() { alunoForm.reset(); document.getElementById('alunoId').value = ''; formTitle.textContent = "Novo Guerreiro"; btnCancelar.classList.add('hidden'); }
function prepararEdicao(id) {
    const aluno = listaAlunos.find(a => String(a.id) === String(id));
    if (aluno) {
        document.getElementById('alunoId').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('cpf').value = aluno.cpf;
        document.getElementById('status').value = String(aluno.status);
        formTitle.textContent = "Editar Guerreiro";
        btnCancelar.classList.remove('hidden');
    }
}
btnCancelar.addEventListener('click', limparFormulario);