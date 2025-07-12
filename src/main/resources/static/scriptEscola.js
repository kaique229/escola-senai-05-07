document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/escola')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('escola-tbody');
      data.forEach(escola => {
        adicionarLinhaEscola(escola);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar escolas:', error);
      alert('Erro ao carregar a lista de escola.');
    });
});

function adicionarLinhaEscola(escola) {
  const tbody = document.getElementById('escola-tbody');
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${escola.nome}</td>
    <td>${escola.endereco}</td>
    <td>${escola.telefone}</td>
    <td>
      <button onclick="abrirModalEdicao(${escola.id}, '${escola.nome}', '${escola.endereco}', '${escola.telefone}', this)">Editar</button>
      <button onclick="excluirEscola(${escola.id}, this)">Excluir</button>
    </td>
  `;

  tbody.appendChild(tr);
}

function excluirEscola(id, botao) {
  fetch(`http://localhost:8080/escola/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        const linha = botao.closest('tr');
        linha.remove();
      } else {
        alert('Erro ao excluir escola.');
      }
    })
    .catch(error => {
      console.error('Erro ao excluir escola:', error);
      alert('Erro ao excluir escola.');
    });
}

function abrirModalEdicao(id, nome, endereco, telefone, botao) {
  document.getElementById('edit-id').value = id;
  document.getElementById('edit-nome').value = nome;
  document.getElementById('edit-endereco').value = endereco;
  document.getElementById('edit-telefone').value = telefone;
  document.getElementById('editModal').style.display = 'block';

  window.linhaEditando = botao.closest('tr');
}

function fecharModal() {
  document.getElementById('editModal').style.display = 'none';
}

function salvarEdicao() {
  const id = document.getElementById('edit-id').value;
  const nome = document.getElementById('edit-nome').value;
  const endereco = document.getElementById('edit-endereco').value;
  const telefone = document.getElementById('edit-telefone').value;

  fetch(`http://localhost:8080/escola/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, endereco, telefone })
  })
    .then(response => {
      if (response.ok) {
        const cells = window.linhaEditando.children;
        cells[0].textContent = nome;
        cells[1].textContent = endereco;
        cells[2].textContent = telefone;

        fecharModal();
      } else {
        alert('Erro ao atualizar escola.');
      }
    })
    .catch(error => {
      console.error('Erro ao atualizar escola:', error);
      alert('Erro ao atualizar escola.');
    });
}

function cadastrarEscola(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const endereco = document.getElementById('endereco').value;
  const telefone = document.getElementById('telefone').value;

  fetch('http://localhost:8080/escola', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, endereco, telefone })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar escola.');
      }
      return response.json();
    })
    .then(novaEscola => {
      adicionarLinhaEscola(novaEscola);
      document.getElementById('form-cadastro').reset();
    })
    .catch(error => {
      console.error('Erro ao cadastrar escola:', error);
      alert('Erro ao cadastrar escola.');
    });
}
