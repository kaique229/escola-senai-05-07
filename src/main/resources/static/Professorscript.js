document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/professor')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('professor-tbody');
      data.forEach(professor => {
        adicionarLinhaProfessor(professor);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar professor:', error);
      alert('Erro ao carregar a lista de professores.');
    });
});

function adicionarLinhaProfessor(professor) {
  const tbody = document.getElementById('professor-tbody');
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${professor.nome}</td>
    <td>${professor.email}</td>
    <td>${professor.telefone}</td>
    <td>
      <button onclick="abrirModalEdicaoProfessor(${professor.id}, '${professor.nome}', '${professor.email}', '${professor.telefone}', this)">
        <i class="fas fa-edit"></i> Editar
      </button>
      <button onclick="excluirProfessor(${professor.id}, this)">
        <i class="fas fa-trash-alt"></i> Excluir
      </button>
    </td>
  `;

  tbody.appendChild(tr);
}

function excluirProfessor(id, botao) {
  fetch(`http://localhost:8080/professor/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        const linha = botao.closest('tr');
        linha.remove();
      } else {
        alert('Erro ao excluir professor.');
      }
    })
    .catch(error => {
      console.error('Erro ao excluir professor:', error);
      alert('Erro ao excluir professor.');
    });
}

function abrirModalEdicaoProfessor(id, nome, email, telefone, botao) {
  document.getElementById('edit-id-professor').value = id;
  document.getElementById('edit-nome-professor').value = nome;
  document.getElementById('edit-email-professor').value = email;
  document.getElementById('edit-telefone-professor').value = telefone;
  document.getElementById('editModalProfessor').style.display = 'block';

  window.linhaEditandoProfessor = botao.closest('tr');
}

function fecharModalProfessor() {
  document.getElementById('editModalProfessor').style.display = 'none';
}

function salvarEdicaoProfessor() {
  const id = document.getElementById('edit-id-professor').value;
  const nome = document.getElementById('edit-nome-professor').value;
  const email = document.getElementById('edit-email-professor').value;
  const telefone = document.getElementById('edit-telefone-professor').value;

  fetch(`http://localhost:8080/professor/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, telefone })
  })
    .then(response => {
      if (response.ok) {
        const cells = window.linhaEditandoProfessor.children;
        cells[0].textContent = nome;
        cells[1].textContent = email;
        cells[2].textContent = telefone;

        fecharModalProfessor();
      } else {
        alert('Erro ao atualizar professor.');
      }
    })
    .catch(error => {
      console.error('Erro ao atualizar professor:', error);
      alert('Erro ao atualizar professor.');
    });
}





function cadastrarProfessor(event) {
  event.preventDefault(); // Impede o reload do form

  const nome = document.getElementById('prof-nome').value;
  const email = document.getElementById('prof-email').value;
  const telefone = document.getElementById('prof-telefone').value;

  fetch('http://localhost:8080/professor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, telefone })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar professor.');
      }
      return response.json();
    })
    .then(novoProfessor => {
      adicionarLinhaProfessor(novoProfessor); // Atualiza a tabela
      document.getElementById('form-cadastro-professor').reset(); // Limpa o form
    })
    .catch(error => {
      console.error('Erro ao cadastrar professor:', error);
      alert('Erro ao cadastrar professor.');
    });
}
