package com.escola.senai.Service;

import com.escola.senai.Interface.AlunoRepository;
import com.escola.senai.Model.Aluno;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {
    private final AlunoRepository repository;

    public AlunoService(AlunoRepository repository) {
        this.repository = repository;
    }

    public List<Aluno> listaTodos(){
        return repository.findAll();
    }

     public Aluno salvar(Aluno alunos){
        return repository.save(alunos);
    }

    public void excluirAluno(Long id){
        repository.deleteById(id);
    }

    public Aluno buscarPorId(Long id){
        return repository.findById(id).orElse(null);
    }

}
