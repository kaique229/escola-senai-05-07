package com.escola.senai.Interface;

import com.escola.senai.Model.Escola;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EscolaRepository extends JpaRepository <Escola, Long> {
}
