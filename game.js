const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const larguraJogador = 50;
const alturaJogador = 50;
const raioBola = 15;
let jogador1Y = canvas.height - alturaJogador - 10;
let jogador2Y = canvas.height - alturaJogador - 10;
let jogador1X = 50;
let jogador2X = canvas.width - larguraJogador - 50;
let velocidadeJogador1 = 0;
let velocidadeJogador2 = 0;
let bolaX = canvas.width / 2;
let bolaY = canvas.height / 2;
let velocidadeBolaX = 2;
let velocidadeBolaY = 2;
let gravidade = 0.3;
let quicar = -0.7;

// Pontuações dos jogadores
let pontuacaoJogador1 = 0;
let pontuacaoJogador2 = 0;

// Atualiza o placar
function atualizarPlacar() {
    document.getElementById('scoreBoard').textContent = `Jogador 1: ${pontuacaoJogador1} | Jogador 2: ${pontuacaoJogador2}`;
}

// Reseta a posição da bola no centro
function resetarBola() {
    bolaX = canvas.width / 2;
    bolaY = canvas.height / 2;
    velocidadeBolaX = (Math.random() < 0.5 ? 3 : -3);  // Começa em uma direção aleatória
    velocidadeBolaY = 3;
}

// Função para desenhar os jogadores
function desenharJogador(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, larguraJogador, alturaJogador);
}

// Função para desenhar a bola
function desenharBola() {
    ctx.beginPath();
    ctx.arc(bolaX, bolaY, raioBola, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar o campo
function desenharCampo() {
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 2 - 2, 0, 4, canvas.height); // Linha central
}

// Atualização do movimento dos jogadores e bola
function atualizarJogo() {
    // Movimentação dos jogadores
    jogador1Y += velocidadeJogador1;
    jogador2Y += velocidadeJogador2;

    // Manter os jogadores dentro do campo
    if (jogador1Y < 0) jogador1Y = 0;
    if (jogador2Y < 0) jogador2Y = 0;
    if (jogador1Y > canvas.height - alturaJogador) jogador1Y = canvas.height - alturaJogador;
    if (jogador2Y > canvas.height - alturaJogador) jogador2Y = canvas.height - alturaJogador;

    // Movimento da bola
    bolaX += velocidadeBolaX;
    bolaY += velocidadeBolaY;
    velocidadeBolaY += gravidade;

    // Colisões com as paredes
    if (bolaX + raioBola > canvas.width) {
        pontuacaoJogador1++;
        atualizarPlacar();
        resetarBola();
    }
    if (bolaX - raioBola < 0) {
        pontuacaoJogador2++;
        atualizarPlacar();
        resetarBola();
    }
    if (bolaY + raioBola > canvas.height) {
        bolaY = canvas.height - raioBola;
        velocidadeBolaY *= quicar;
    }

    // Colisões com os jogadores
    if (bolaX - raioBola < jogador1X + larguraJogador && bolaY > jogador1Y && bolaY < jogador1Y + alturaJogador) {
        velocidadeBolaX = -velocidadeBolaX;
    }
    if (bolaX + raioBola > jogador2X && bolaY > jogador2Y && bolaY < jogador2Y + alturaJogador) {
        velocidadeBolaX = -velocidadeBolaX;
    }
}

// Função principal para desenhar e atualizar o jogo
function loopJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharCampo();
    desenharJogador(jogador1X, jogador1Y);
    desenharJogador(jogador2X, jogador2Y);
    desenharBola();
    atualizarJogo();
    requestAnimationFrame(loopJogo);
}

// Controle dos jogadores
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        velocidadeJogador1 = -5;
    }
    if (event.key === 'ArrowDown') {
        velocidadeJogador1 = 5;
    }
    if (event.key === 'w') {
        velocidadeJogador2 = -5;
    }
    if (event.key === 's') {
        velocidadeJogador2 = 5;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        velocidadeJogador1 = 0;
    }
    if (event.key === 'w' || event.key === 's') {
        velocidadeJogador2 = 0;
    }
});

// Iniciar o jogo
atualizarPlacar();
loopJogo();
