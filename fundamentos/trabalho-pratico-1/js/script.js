window.addEventListener('load', start);
var range = document.querySelector('#myRange');
var numeroAtual = document.querySelector('#numeroAtual')
var numeroPorExtenso = document.querySelector('#numeroPorExtenso');


function start() {
    numeroAtual.value = range.value;
    numeroPorExtenso.value = converteNumeroExtenso(range.value);
    range.addEventListener('input', capturaRange);
}

function capturaRange(event) {
    numeroAtual.value = event.target.value; 
    exibirNumeroExtenso(converteNumeroExtenso(event.target.value));
    
}

function exibirNumeroExtenso(extenso) {
    numeroPorExtenso.value = extenso;
}

function converteNumeroExtenso(n) {
    var unidades=["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"];
    var especiais=["Dez","Onze", "Doze", "Treze", "Catorze", "Quinze", "Dezeseis", "Dezessete", "Dezoito", "Dezenove"]; 
    var dezenas=["Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"];
    var centenas=["Cem", "Duzentos", "Trezentos", "Quatrocentos", "Quinhetos", "Seiscentos","Setecentos","Oitocentos", "Novecentos"];
    

    if(n.length === 1) {
        return unidades[parseInt(n[0])];
    }	

    else if(n.length === 2) {
        if((n[0]=='1') && (n[1]=='0'||n[1]=='1'||n[1]=='2'||n[1]=='3'||n[1]=='4'||n[1]=='5'||n[1]=='6'||n[1]=='7'||n[1]=='8'||n[1]=='9')) {
            return especiais[parseInt(n[1])];
        }
        else if((n[0]=='2'||n[0]=='3'||n[0]=='4'||n[0]=='5'||n[0]=='6'||n[0]=='7'||n[0]=='8'||n[0]=='9') && n[1]=='0') {
            return dezenas[parseInt(n[0]-2)];
        }
        else {
            return dezenas[parseInt(n[0]-2)]+" e "+unidades[parseInt(n[1])];
        }
    }

    else if (n.length === 3) {
        if ((n[0]=='1'||n[0]=='2'||n[0]=='3'||n[0]=='4'||n[0]=='5'||n[0]=='6'||n[0]=='7'||n[0]=='8'||n[0]=='9') && (n[1]=='0' && n[2]=='0')) {
            return centenas[parseInt(n[0]-1)];
        }
        else if ((n[0]=='1'||n[0]=='2'||n[0]=='3'||n[0]=='4'||n[0]=='5'||n[0]=='6'||n[0]=='7'||n[0]=='8'||n[0]=='9') && (n[1]=='0') && ((n[2]=='1'||n[2]=='2'||n[2]=='3'||n[2]=='4'||n[2]=='5'||n[2]=='6'||n[2]=='7'||n[2]=='8'||n[2]=='9'))) {
            return centenas[parseInt(n[0]-1)]+" e "+unidades[parseInt(n[2])];
        }
        else if ((n[0]=='2'||n[0]=='3'||n[0]=='4'||n[0]=='5'||n[0]=='6'||n[0]=='7'||n[0]=='8'||n[0]=='9') && (n[1]=='1') && ((n[2]=='0'||n[2]=='1'||n[2]=='2'||n[2]=='3'||n[2]=='4'||n[2]=='5'||n[2]=='6'||n[2]=='7'||n[2]=='8'||n[2]=='9'))) {
            return centenas[parseInt(n[0]-1)]+" e "+especiais[parseInt(n[2])];
        }
        else if ((n[0]=='2'||n[0]=='3'||n[0]=='4'||n[0]=='5'||n[0]=='6'||n[0]=='7'||n[0]=='8'||n[0]=='9') && (n[1]!='1') && (n[2]=='0')) {
            return centenas[parseInt(n[0]-1)]+" e "+dezenas[parseInt(n[1]-2)];
        }
        else if ((n[0]=='2'||n[0]=='3'||n[0]=='4'||n[0]=='5'||n[0]=='6'||n[0]=='7'||n[0]=='8'||n[0]=='9') && (n[1]!='1')) {
            return centenas[parseInt(n[0]-1)]+" e "+dezenas[parseInt(n[1]-2)]+" e "+unidades[parseInt(n[2])];
        }
        else if ((n[0]=='1') && (n[1]=='1') && (n[2]=='0'||n[2]=='1'||n[2]=='2'||n[2]=='3'||n[2]=='4'||n[2]=='5'||n[2]=='6'||n[2]=='7'||n[2]=='8'||n[2]=='9')) {
            return "Cento e "+especiais[parseInt(n[2])];
        }
        else if ((n[0]=='1') && (n[1]=='2'||n[1]=='3'||n[1]=='4'||n[1]=='5'||n[1]=='6'||n[1]=='7'||n[1]=='8'||n[1]=='9') && (n[2]=='0')) {
            return "Cento e "+dezenas[parseInt(n[1]-2)];
        }
        else if ((n[0]=='1') && (n[1]!='1') && (n[2]!='0')) {
            return "Cento e "+dezenas[parseInt(n[1]-2)]+" e "+unidades[parseInt(n[2])];
        }
    }

}