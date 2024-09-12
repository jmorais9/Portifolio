


let body = document.getElementById("body");
body.width = window.innerWidth;
body.height = window.innerHeight;
let canvas = document.getElementById("canva");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

function Circulo(x, y, dx, dy, raio, cor) {
    
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.raio = raio;
    this.cor = cor;

    this.desenhar = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false);
        ctx.fillStyle = this.cor;
        ctx.fill();
        ctx.strokeStyle = this.cor;
        ctx.stroke();
    }

    this.atualizar = function() {
        if (this.x + this.raio > canvas.width || this.x - this.raio < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.raio > canvas.height || this.y - this.raio < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.desenhar();
    }
}

let cores = ['#DCDCDC', '#D3D3D3', '#C0C0C0', '#A9A9A9', 'white'];

let arrayCirculos = [];
let qtdCirculos = 50;

for (let i = 0; i < qtdCirculos; i++) {
    let raio = 5;
    let x = Math.random() * (canvas.width - raio * 2) + raio;
    let y = Math.random() * (canvas.height - raio * 2) + raio;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;
    let cor = cores[Math.floor(Math.random() * cores.length)];

    arrayCirculos.push(new Circulo(x, y, dx, dy, raio, cor));
}

function animacao() {
    requestAnimationFrame(animacao);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < arrayCirculos.length; i++) {
        arrayCirculos[i].atualizar();
    }
}

animacao();


document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            emailjs.send('seu_service_id', 'seu_template_id', templateParams)
                .then(function(response) {
                    alert('E-mail enviado com sucesso!');
                    console.log('E-mail enviado:', response.status, response.text);
                }, function(error) {
                    alert('Erro ao enviar e-mail.');
                    console.log('Erro no envio:', error);
                });
        });