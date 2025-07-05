document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/alunos')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('alunos-tbody');
      data.forEach(aluno => {
        adicionarLinhaAluno(aluno);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar alunos:', error);
      alert('Erro ao carregar a lista de alunos.');
    });
});

function adicionarLinhaAluno(aluno) {
  const tbody = document.getElementById('alunos-tbody');
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${aluno.nome}</td>
    <td>${aluno.email}</td>
    <td>${aluno.telefone}</td>
    <td>
      <button onclick="abrirModalEdicao(${aluno.id}, '${aluno.nome}', '${aluno.email}', '${aluno.telefone}', this)">Editar</button>
      <button onclick="excluirAluno(${aluno.id}, this)">Excluir</button>
    </td>
  `;




  tbody.appendChild(tr);
}

function excluirAluno(id, botao) {
  fetch(`http://localhost:8080/alunos/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      const linha = botao.closest('tr');
      linha.remove();
    } else {
      alert('Erro ao excluir aluno.');
    }
  })
  .catch(error => {
    console.error('Erro ao excluir aluno:', error);
    alert('Erro ao excluir aluno.');
  });
}

function abrirModalEdicao(id, nome, email, telefone, botao) {
  document.getElementById('edit-id').value = id;
  document.getElementById('edit-nome').value = nome;
  document.getElementById('edit-email').value = email;
  document.getElementById('edit-telefone').value = telefone;
  document.getElementById('editModal').style.display = 'block';
  
  // Guarda a linha atual para atualizar depois
  window.linhaEditando = botao.closest('tr');
}

function fecharModal() {
  document.getElementById('editModal').style.display = 'none';
}

function salvarEdicao() {
  const id = document.getElementById('edit-id').value;
  const nome = document.getElementById('edit-nome').value;
  const email = document.getElementById('edit-email').value;
  const telefone = document.getElementById('edit-telefone').value;

  fetch(`http://localhost:8080/alunos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, telefone })
  })
  .then(response => {
    if (response.ok) {
      // Atualiza a linha da tabela
      const cells = window.linhaEditando.children;
      cells[0].textContent = nome;
      cells[1].textContent = email;
      cells[2].textContent = telefone;

      fecharModal();
    } else {
      alert('Erro ao atualizar aluno.');
    }
  })
  .catch(error => {
    console.error('Erro ao atualizar aluno:', error);
    alert('Erro ao atualizar aluno.');
  });
}





