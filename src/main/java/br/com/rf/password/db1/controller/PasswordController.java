package br.com.rf.password.db1.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.rf.password.db1.model.Senha;
import br.com.rf.password.db1.repository.Senhas;

/** 
 * Controller para Salvar e Listar Senhas
 * @author Raul Dandolini Felipe <contato@raulfelipe.com.br>
 * @version 1.0.0
 * @since 03/Fev/2017
 */
@Controller
@RequestMapping("/password")
public class PasswordController {
	
	@Autowired
	private Senhas senhas;
	
	@GetMapping
	public ModelAndView validar() {
		
		List<Senha> listaSenhas = senhas.findAll();
		
		ModelAndView mv = new ModelAndView("Password");
		mv.addObject("senhas", listaSenhas);

		return mv;
		
	}
	
	@PostMapping
	public String salvar(Senha senha, RedirectAttributes attributes) {
		
		Senha senhaSalva = senhas.findByPasswordContainingIgnoreCase(senha.getPassword());		
		Optional<Senha> senhaOpcional = Optional.ofNullable(senhaSalva);
		
		if (!senhaOpcional.isPresent()) {
			
			senhas.save(senha);
			attributes.addFlashAttribute("mensagem", "Senha Salva com sucesso!");
			
		} else {
			
			attributes.addFlashAttribute("mensagem", "Senha já existe!");
			
		}
		
		return "redirect:/password";
		
	}
	
}