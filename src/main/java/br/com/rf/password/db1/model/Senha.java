package br.com.rf.password.db1.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/** 
 * Entidade que representa as senhas salvas
 * @author Raul Dandolini Felipe <contato@raulfelipe.com.br>
 * @version 1.0.0
 * @since 03/Fev/2017
 */
@Entity
public class Senha {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;
	
	private String password;
	private String score;
	private String complexity;
	
	public Long getCodigo() {
		return codigo;
	}
	
	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getScore() {
		return score;
	}
	
	public void setScore(String score) {
		this.score = score;
	}
	
	public String getComplexity() {
		return complexity;
	}
	
	public void setComplexity(String complexity) {
		this.complexity = complexity;
	}
	
}