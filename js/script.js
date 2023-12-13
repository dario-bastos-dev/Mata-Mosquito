//Ajustando a área do jogo
let altura = 0;
let largura = 0;

let body = document.querySelector("body");
let main = document.querySelector("body #jogo");

body.onresize = ajusteTamanho();

function ajusteTamanho() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}

//Gerando a posição aleatória, criando o mosquito e controlando as vidas
let vidas = 1;
function posicaoRandomica() {
  // Removendo o mosquito (caso exista)
  if (document.querySelector("#mosquito")) {
    document.querySelector("#mosquito").remove();

    if (vidas > 3) {
      window.location.href = "../html/game_over.html";
    } else {
      document.querySelector("#v" + vidas).src = "../src/img/coracao_vazio.png";

      vidas++;
    }
  }
  //Posição aleatória
  let positionX = Math.floor(Math.random() * largura) - 90;
  let positionY = Math.floor(Math.random() * altura) - 90;

  positionX = positionX < 0 ? 0 : positionX;
  positionY = positionY < 0 ? 0 : positionY;

  //Geraando o mosquito
  let imgMosquito = document.createElement("img");
  imgMosquito.setAttribute("src", "../src/img/mosca.png");
  imgMosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  imgMosquito.style.position = "absolute";
  imgMosquito.style.left = positionX + "px";
  imgMosquito.style.top = positionY + "px";
  imgMosquito.id = "mosquito";
  imgMosquito.onclick = function () {
    this.remove();
  };

  main.appendChild(imgMosquito);
}

//Alterando o tamanho do mosquito
function tamanhoAleatorio() {
  let classe = Math.floor(Math.random() * 3);

  if (classe == 0) {
    return "mosquito1";
  } else if (classe == 1) {
    return "mosquito2";
  } else if (classe == 2) {
    return "mosquito3";
  }
}

//Mudando o lado do mosquito
function ladoAleatorio() {
  let classe = Math.floor(Math.random() * 2);

  if (classe == 0) {
    return "ladoA";
  } else if (classe == 1) {
    return "ladoB";
  }
}
//Gerando os mosquitos em tempos intervalados
let criarMosquito = setInterval(() => {
  posicaoRandomica();
}, 1000);

//Iniciar jogo
function iniciarJogo() {
  let SelectNivel = document.querySelector("div #dificuldade").value;

  if (SelectNivel === "nulo") {
    alert("Selecione um nível");
  } else {
    window.location.href = "./html/jogo.html" + "?" + SelectNivel;
  }
}

//Cronometro do jogo e Dificuldade
let intervalo = 1500;

//Dificuldade
let dificuldade = window.location.search;
dificuldade = dificuldade.replace("?", "");

if (dificuldade == "facil") {
  intervalo = 1500;
}
 else if (dificuldade == "normal") {
  intervalo = 1000;
} 
else if (dificuldade == "dificil") {
  intervalo = 750;
}

//Cronometro
let tempo = 20;
let cronometro = setInterval(() => {
  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criarMosquito);
    window.location.href = "../html/victori.html";
  } else {
    document.querySelector("div p #tempo").textContent = tempo;
  }

  tempo--;
}, intervalo);
