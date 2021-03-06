package br.com.rf.password.db1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.rf.password.db1.model.Senha;

/** 
 * Interface JPA para manipulação de dados
 * @author Raul Dandolini Felipe <contato@raulfelipe.com.br>
 * @version 1.0.0
 * @since 03/Fev/2017
 */
public interface Senhas extends JpaRepository<Senha, Long> {
	
	/**
	 * Buscar Entidade Senha pelo password digitado
	 * @param password
	 * @return Senha - Entidade com password, score e complexity
	 */
	public Senha findByPasswordContainingIgnoreCase(String password);
	
}