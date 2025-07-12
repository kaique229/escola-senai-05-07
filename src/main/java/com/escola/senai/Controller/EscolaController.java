package com.escola.senai.Controller;


import com.escola.senai.Model.Escola;
import com.escola.senai.Service.EscolaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/escola")
public class EscolaController {
    private final EscolaService service;

    public EscolaController(EscolaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Escola> buscarEscola(){
        return service.listaTodos();
    }

    @PostMapping
    public Escola salvarNovoEscola(@RequestBody Escola escola){
        return service.salvar(escola);
    }

    @GetMapping("/{id}")
    public Escola buscarEscolaId(@PathVariable Long id){
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarEscola(@PathVariable Long id){
        service.excluirEscola(id);
    }


    @PutMapping("/{id}")
    public Escola atualizaEscola(@PathVariable Long id, @RequestBody Escola atualizaEscola){
        Escola existeEscola = service.buscarPorId(id);

        if (existeEscola == null) return null;
        existeEscola.setNome(atualizaEscola.getNome());
        existeEscola.setEmail(atualizaEscola.getEmail());
        existeEscola.setTelefone(atualizaEscola.getTelefone());

        return  service.salvar(existeEscola);
    }

}
