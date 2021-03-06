/**
 * Validador de senhas do: http://www.passwordmeter.com/
 */

/* Formatado por Raul Dandolini Felipe <contato@raulfelipe.com.br> em 03/Fev/2017 */

function addLoadEvent(func) {
	
	var oldonload = window.onload;
	
	if (typeof window.onload != "function") {
		
		window.onload = func;
		
	} else {
		
		window.onload = function() {
			
			if (oldonload) {
				
				oldonload();
				
			}
			
			func();
			
		};
	}
	
}

function $() {
	
	var arrElms = [];
	
	for (var i=0; i < arguments.length; i++) {
		
		var elm = arguments[i];
		
		if (typeof(elm == "string")) {
			
			elm = document.getElementById(elm);
			
		}
		
		if (arguments.length == 1) {
			
			return elm;
			
		}
		
		arrElms.push(elm);
		
	}
	
	return arrElms;
	
}

String.prototype.strReverse = function() {
	
	var newstring = "";
	
	for (var s=0; s < this.length; s++) {
		
		newstring = this.charAt(s) + newstring;
		
	}
	
	return newstring;
	
};

function chkPass(pwd) {
	
	var oScore = $("score");
	var oScoreBorder = $("scoreBorder");
	var oComplexity = $("complexity");
	var oComplexityBorder = $("complexityBorder"); 
	var nScore=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0;
	var nMultRepChar=1, nMultConsecSymbol=1;
	var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
	var nMultLength=4, nMultNumber=4;
	var nMultSymbol=6;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "01234567890";
	var sSymbols = ")!@#$%^&*()";
	var sComplexity = "Muito Curta";
	var nMinPwdLen = 8;
	
	if (document.all) {
		
		var nd = 0;
		
	} else {
		
		var nd = 1;
		
	}
	
	if (pwd) {
		
		nScore = parseInt(pwd.length * nMultLength);
		nLength = pwd.length;
		var arrPwd = pwd.replace(/\s+/g,"").split(/\s*/);
		var arrPwdLen = arrPwd.length;
		
		/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
		for (var a=0; a < arrPwdLen; a++) {
			
			if (arrPwd[a].match(/[A-Z]/g)) {
				
				if (nTmpAlphaUC !== "") { 
					
					if ((nTmpAlphaUC + 1) == a) { 
						
						nConsecAlphaUC++; nConsecCharType++;
					
					}
				
				}
				
				nTmpAlphaUC = a;
				nAlphaUC++;
				
			} else if (arrPwd[a].match(/[a-z]/g)) {
				
				if (nTmpAlphaLC !== "") { 
					
					if ((nTmpAlphaLC + 1) == a) { 
						
						nConsecAlphaLC++; nConsecCharType++; 
					
					}
					
				}
				
				nTmpAlphaLC = a;
				nAlphaLC++;
				
			} else if (arrPwd[a].match(/[0-9]/g)) {
				
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
				nTmpNumber = a;
				nNumber++;
				
			} else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
				
				if (a > 0 && a < (arrPwdLen - 1)) {
					
					nMidChar++;
					
				}
				
				if (nTmpSymbol !== "") { 
					
					if ((nTmpSymbol + 1) == a) {
						
						nConsecSymbol++; nConsecCharType++;
						
					} 
					
				}
				
				nTmpSymbol = a;
				nSymbol++;
			}
			
			/* Internal loop through password to check for repeat characters */
			var bCharExists = false;
			
			for (var b=0; b < arrPwdLen; b++) {
				
				/* repeat character exists */
				if (arrPwd[a] == arrPwd[b] && a != b) {
					
					bCharExists = true;
					
					/* 
					Calculate icrement deduction based on proximity to identical characters
					Deduction is incremented each time a new match is discovered
					Deduction amount is based on total password length divided by the
					difference of distance between currently selected match
					*/
					nRepInc += Math.abs(arrPwdLen/(b-a));
				}
				
			}
			
			if (bCharExists) {
				
				nRepChar++; 
				nUnqChar = arrPwdLen-nRepChar;
				nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc);
				
			}
			
		}
		
		/* Check for sequential alpha string patterns (forward and reverse) */
		for ( var s=0; s < 23; s++ ) {
			
			var sFwd = sAlphas.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			
			if ( pwd.toLowerCase().indexOf(sFwd) != -1 || 
				 pwd.toLowerCase().indexOf(sRev) != -1 ) { 
				
				nSeqAlpha++; nSeqChar++;
			
			}
			
		}
		
		/* Check for sequential numeric string patterns (forward and reverse) */
		for ( var s=0; s < 8; s++ ) {
			
			var sFwd = sNumerics.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			
			if ( pwd.toLowerCase().indexOf(sFwd) != -1 || 
				 pwd.toLowerCase().indexOf(sRev) != -1 ) {
				
				nSeqNumber++; nSeqChar++;
				
			}
			
		}
		
		/* Check for sequential symbol string patterns (forward and reverse) */
		for ( var s=0; s < 8; s++ ) {
			
			var sFwd = sSymbols.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			
			if ( pwd.toLowerCase().indexOf(sFwd) != -1 || 
				 pwd.toLowerCase().indexOf(sRev) != -1 ) {
				
				nSeqSymbol++; nSeqChar++;
				
			}
			
		}
		
		/* Modify overall score value based on usage vs requirements */
		/* General point assignment */ 
		if (nAlphaUC > 0 && nAlphaUC < nLength) {
			
			nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
			
		}
		
		if (nAlphaLC > 0 && nAlphaLC < nLength) {
			
			nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2));
			
		}
		
		if (nNumber > 0 && nNumber < nLength) {
			
			nScore = parseInt(nScore + (nNumber * nMultNumber));
			
		}
		
		if (nSymbol > 0) {
			
			nScore = parseInt(nScore + (nSymbol * nMultSymbol));
			
		}
		
		if (nMidChar > 0) {
			
			nScore = parseInt(nScore + (nMidChar * nMultMidChar));
			
		}
		
		/* Point deductions for poor practices */
		// Only Letters
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {
			
			nScore = parseInt(nScore - nLength);
			nAlphasOnly = nLength;
			sAlphasOnly = "- " + nLength;
			
		}
		
		// Only Numbers
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {
			
			nScore = parseInt(nScore - nLength); 
			nNumbersOnly = nLength;
			sNumbersOnly = "- " + nLength;
			
		}
		
		// Same character exists more than once
		if (nRepChar > 0) {
			
			nScore = parseInt(nScore - nRepInc);
			sRepChar = "- " + nRepInc;
			
		}
		
		// Consecutive Uppercase Letters exist
		if (nConsecAlphaUC > 0) {
			
			nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC)); 
			sConsecAlphaUC = "- " + parseInt(nConsecAlphaUC * nMultConsecAlphaUC);
			
		}
		
		// Consecutive Lowercase Letters exist
		if (nConsecAlphaLC > 0) {
			
			nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
			sConsecAlphaLC = "- " + parseInt(nConsecAlphaLC * nMultConsecAlphaLC);
			
		}
		
		// Consecutive Numbers exist
		if (nConsecNumber > 0) {
			
			nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
			sConsecNumber = "- " + parseInt(nConsecNumber * nMultConsecNumber);
			
		}
		
		// Sequential alpha strings exist (3 characters or more)
		if (nSeqAlpha > 0) {
			
			nScore = parseInt(nScore - (nSeqAlpha * nMultSeqAlpha)); 
			sSeqAlpha = "- " + parseInt(nSeqAlpha * nMultSeqAlpha);
			
		}
		
		// Sequential numeric strings exist (3 characters or more)
		if (nSeqNumber > 0) {
			
			nScore = parseInt(nScore - (nSeqNumber * nMultSeqNumber)); 
			sSeqNumber = "- " + parseInt(nSeqNumber * nMultSeqNumber);
			
		}
		
		// Sequential symbol strings exist (3 characters or more)
		if (nSeqSymbol > 0) {
			
			nScore = parseInt(nScore - (nSeqSymbol * nMultSeqSymbol)); 
			sSeqSymbol = "- " + parseInt(nSeqSymbol * nMultSeqSymbol);
			
		}
		
		nRequirements = nReqChar;
		if (pwd.length >= nMinPwdLen) {
			
			var nMinReqChars = 3;
			
		} else {
			
			var nMinReqChars = 4;
			
		}
		
		// One or more required characters exist
		if (nRequirements > nMinReqChars) {
			
			nScore = parseInt(nScore + (nRequirements * 2)); 
			sRequirements = "+ " + parseInt(nRequirements * 2);
			
		}
		
		/*Determine complexity based on overall score*/
		if (nScore > 100) {
			
			nScore = 100;
			
		} else if (nScore < 0) {
			
			nScore = 0;
			
		}
		
		if (nScore >= 0 && nScore < 20) {
			
			sComplexity = "Muito Fraca";
			oComplexityBorder.style.backgroundColor="#FF4500";
			
		} else if (nScore >= 20 && nScore < 40) {
			
			sComplexity = "Fraca";
			oComplexityBorder.style.backgroundColor="#FF0000";
			
		} else if (nScore >= 40 && nScore < 60) {
			
			sComplexity = "Boa";
			oComplexityBorder.style.backgroundColor="#FFA500";
			
		} else if (nScore >= 60 && nScore < 80) {
			
			sComplexity = "Forte";
			oComplexityBorder.style.backgroundColor="#2E8B57";
			
		} else if (nScore >= 80 && nScore <= 100) {
			
			sComplexity = "Muito Forte";
			oComplexityBorder.style.backgroundColor="#008000";
			
		}
		
		/* Display updated score criteria to client*/
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
		$("scoreHidden").value = nScore + "%";
		$("complexityHidden").value = sComplexity;
		
	} else {
		
		/* Display default score criteria to client */
		initPwdChk();
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
		oScoreBorder.style.backgroundColor="#a8a8a8";
		
	}
	
}

function togPwdMask() {
	
	var oPwd = $("inputSenha");
	
}

function initPwdChk(restart) {
	
	/* Reset all form values to their default */
	$("inputSenha").value = "";
	$("scoreHidden").value = "";
	$("complexityHidden").value = "";
	$("scoreBorder").style.backgroundColor="#a8a8a8";
	$("complexityBorder").style.backgroundColor="#FF6347";
	
}

addLoadEvent( 
		function() { 
			initPwdChk(1); 
		} 
);