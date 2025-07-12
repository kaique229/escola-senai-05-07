package com.escola.senai.Controller;


import com.escola.senai.Model.Aluno;
import com.escola.senai.Service.AlunoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {
    private final AlunoService service;

    public AlunoController(AlunoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Aluno> buscarAluno(){
        return service.listaTodos();
    }

    @PostMapping
    public Aluno salvarNovoAluno(@RequestBody Aluno aluno){
        return service.salvar(aluno);
    }

    @GetMapping("/{id}")
    public Aluno buscarAlunoId(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarAluno(@PathVariable Long id){
        service.excluirAluno(id);
    }


    @PutMapping("/{id}")
    public Aluno atualizaAluno(@PathVariable Long id, @RequestBody Aluno alunoAtualizado){
        Aluno existeAluno = service.buscarPorId(id);

        if (existeAluno == null) return null;
        existeAluno.setNome(alunoAtualizado.getNome());
        existeAluno.setEmail(alunoAtualizado.getEmail());
        existeAluno.setTelefone(alunoAtualizado.getTelefone());

        return  service.salvar(existeAluno);
    }

}
