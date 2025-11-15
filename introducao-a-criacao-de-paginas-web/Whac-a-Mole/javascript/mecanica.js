// Código para implementar o funcionamento interativo do Jogo Whac-a-Mole

// Variaveis globais
// pontuação
var acertos = 0;
var perdidos = 0;
var errados = 0;
var lastSaldo = 0;

// Temporizadores
var intervalo = 1000; // tempo entre aparições da toupeira
var janela = 2000; // tempo que a toupeira fica à mostra

var buraco = 0;

// event listeners - carregados após a página
onload = function() {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('stop').addEventListener('click',stop);
    document.getElementById('idGramado').addEventListener('mousedown', marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('buraco0').addEventListener('click', martelada);
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
};

let timerToupeira;     // controla o tempo da toupeira visível
let timerProxima;      // controla o tempo até a próxima aparição

function start() {
    const botao = document.getElementById('start');
    botao.removeEventListener('click', start);
    botao.disabled = true;

    sobeToupeira();
}

function stop() {
    const botao = document.getElementById('start');
    botao.addEventListener('click', start);
    botao.disabled = false;

    // esconde a toupeira
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole.png';

    clearTimeout(timerToupeira);   // cancela tempo da toupeira
    clearTimeout(timerProxima);   // cancela tempo da próxima aparição
}

function sobeToupeira(){
    // mostra toupeira
    // recalcula tempo de toupira à mostra
    // dispara remover toupeira
    // dispara próximo evento
    buraco = Math.floor(Math.random() * 5);
    const objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole-mole.png';

    
    timerToupeira = setTimeout(tiraToupeira, 400 + janela, buraco);
    timerProxima = setTimeout(sobeToupeira, intervalo + janela);
}

function Intervalo(){
    return intervalo + janela;
}

function tiraToupeira(buraco){
    // remove a toupeira do buraco
    // como não acertou, incrementa perdidos
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole.png';
    perdidos++;
    mostraPontuacao();
}

function mostraPontuacao(){
    //mostra pontuação
    // recalcula janela de tempo
    let saldo = Math.max(acertos-perdidos-errados,0);
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', saldo ); // retorna saldo positivo ou zero

    if (saldo > lastSaldo){
        janela -= 100;
        if (janela < 0 ){
            janela = 0;
        }
        lastSaldo = saldo;
    }
    else if (saldo < lastSaldo){
        janela +=100;
        if (janela > intervalo){
            janela = intervalo;
        } 
        lastSaldo = saldo;
    }
    // console.log("lastSaldo = " + lastSaldo)
    // console.log("Janela = " + janela);
}

function mostraPontuacaoDe(display, valor){
    // mostra valor no display

    let imgs = document.getElementById(display).getElementsByTagName('img');
    let centena = Math.floor(valor / 100);
    let dezena = Math.floor(valor / 10) % 10;
    let unidade = valor % 10;

    imgs[0].src = 'images/caractere_' + centena + '.gif';
    imgs[0].alt = centena;
    imgs[1].src = 'images/caractere_' + dezena + '.gif';
    imgs[1].alt = dezena;
    imgs[2].src = 'images/caractere_' + unidade + '.gif';
    imgs[2].alt = unidade;
}

function marteloBaixo(){
    document.getElementById('idGramado').style.cursor = 'url(images/hammerDown.png), default';
}

function marteloCima(){
    document.getElementById('idGramado').style.cursor = 'url(images/hammer.png), default';
}

function martelada(evento){
    // trata o evento click
    // exibe pontuação

    if(evento.target.src.includes('hole-mole')) {
        // se acertou a figura com a toupeira
        acertos++;
        evento.target.src = 'images/hole.png';
        clearTimeout(timerToupeira);
    }
    else{
        //errou 
        errados++;
    }

    mostraPontuacao();
}