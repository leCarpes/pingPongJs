//Variáveis da bolinha.
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro/2;


//Velocidade da bolinha.
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da raquete.
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 8;
let raqueteAltura = 90;

//Variáveis da raquete oponente.
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do jogo.
let meusPontos = 0;
let pontosOponente = 0;


//Sons do jogo.
let raquetada;
let ponto;
let trilha;



//Executa o pré-carregamento dos sons
function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


//Chance de errar.
let chanceDeErrar = 0;



//Executada uma vez
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}



//Desenha noss código
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();  
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  
}




//Exibe nosso elemento
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}



//Atribui movimento ao elemento
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}



//Atribui condicionais ao elemento
function verificaColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}



//Exibe nosso elemento
function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}



//Atribui movimento ao elemento
function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}



//Possível function (colisão raquete)
/*function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
}
}*/



//Colisão raquete utilizando uma biblioteca
function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}




//Atribui movimento ao elemento do oponente.
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
  
//outra alternativa
  
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  
}


//Atribui possibilidade de erro.
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


//Atribui o placar.
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
  
  
}

//Atribui a pontuação.
function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}


//Bug bolinha presa
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 30;
    }
}




