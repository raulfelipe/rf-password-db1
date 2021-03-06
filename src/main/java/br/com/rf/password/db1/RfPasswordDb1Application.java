package br.com.rf.password.db1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/** 
 * Sprint starter application
 * @author Raul Dandolini Felipe <contato@raulfelipe.com.br>
 * @version 1.0.0
 * @since 03/Fev/2017
 */
@Controller
@SpringBootApplication
public class RfPasswordDb1Application {
	
	/**
	 * Método de inicio da aplicação
	 * @param args - argumentos que pode receber no inicio
	 */
	public static void main(String[] args) {
		
		SpringApplication.run(RfPasswordDb1Application.class, args);
		
	}
	
	/** redirect inicial
	 * @return String - caminho para redirecionar
	 */
	@RequestMapping("/")
	public String init() {
		
		return "redirect:/password";
		
	}
	
}