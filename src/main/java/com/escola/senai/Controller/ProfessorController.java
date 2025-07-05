package com.escola.senai.Controller;

import com.escola.senai.Model.Professor;
import com.escola.senai.Service.ProfessorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professor")
public class ProfessorController {
    private final ProfessorService service;

    public ProfessorController(ProfessorService service) {
        this.service = service;
    }


    @GetMapping
    public List<Professor> buscarAluno(){
        return service.listaTodos();
    }

    @PostMapping
    public Professor salvarNovoAluno(@RequestBody Professor aluno){
        return service.salvar(aluno);
    }

    @GetMapping("/{id}")
    public Professor buscarAlunoId(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarAluno(@PathVariable Long id){
        service.excluirProfessor(id);
    }


    @PutMapping("/{id}")
    public Professor atualizaAluno(@PathVariable Long id, @RequestBody Professor alunoAtualizado){
        Professor existeAluno = service.buscarPorId(id);

        if (existeAluno == null) return null;
        existeAluno.setNome(alunoAtualizado.getNome());
        existeAluno.setEmail(alunoAtualizado.getEmail());
        existeAluno.setTelefone(alunoAtualizado.getTelefone());

        return  service.salvar(existeAluno);
    }

}
