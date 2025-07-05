package com.escola.senai.Service;

import com.escola.senai.Interface.AlunoRepository;
import com.escola.senai.Interface.ProfessorRepository;
import com.escola.senai.Model.Professor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {
    private final ProfessorRepository repository;

    public ProfessorService(ProfessorRepository repository) {
        this.repository = repository;
    }

    public List<Professor> listaTodos(){
        return repository.findAll();
    }

     public Professor salvar(Professor professor){
        return repository.save(professor);
    }

    public void excluirProfessor(Long id){
        repository.deleteById(id);
    }

    public Professor buscarPorId(Long id){
        return repository.findById(id).orElse(null);
    }

}
