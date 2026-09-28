const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const barraProgresso = document.querySelector(".barra-progresso-preenchimento");

const perguntas = [
    {
        enunciado: "Em seu primeiro dia na Escola automotiva voce tem que escolher uma area pra se especializar, qual seguimento você iria escolher?",
        alternativas: [
            {
                texto: "Drift.", 
                afirmacao: "voce gosta de uma corrida mais bonita, que foca mais no visual do que na velocidade."
            },
            {
                texto: "F1.",
                afirmacao: "você gosta de velocidade e de fazer curvas bonitas."
            },
            {
                texto: "Rally.",
                afirmacao: "você gosta de se sujar, tem a troca de marcha muito rapida, e gosta de fazer trilha."
            } ,
            {
                texto: "Arrancada.",
                afirmacao: "você não quer apenas velocidade, voce quer criar um monstro sobre rodas, um carro com 90% de pegar fogo ou expludir, um altomovel com potencia absurda, e provavelmente voce gosta de racha de rua, e vai morrer enfiado num poste."
            }
        ]
    },
    {
        enunciado: "Durante sua primeira aula voce deve escolher seu primeiro veiculo, qual sera ele?",
        alternativas: [
            {
                texto: "nissan silvia.",
                afirmacao: "Perfeito para jogar de lado, sua dirigibilidade é boa, mas você tem que ser melhor ainda."
            },
            {
                texto: "ferrari 488 pista spider.",
                afirmacao: "Você não pede licensa,manda chegar pro lado,é rapido, suas curvas são limpas, mas voce pressisa ter braço, para não perder o controle e matar alguem."
            },
            {
                texto: "RAM R\T.",
                afirmacao: "impõem respeito em todo lugar,significa que você não tem medo de se sujar."
            },
            {
                texto: "Ford Mustang.",
                afirmacao: "você gosta de torque, muito torque, e acostumado com racha ilegal, e pensa muito em dar fuga da policia, cresceu jogando a franquia Need For Speed."
            }
        ]
    },
    {
        enunciado: "segundo dia, e voce vai modificar seu carro, qual a primeira coisa que voce faz?",
        alternativas: [
            {
                texto: "Erguer o seu carro nas alturas.", 
                afirmacao: "Você não tem medo de altura, impõem respeito e gosta de causar, provavelmete seu carro usa disel."
            },
            {
                texto: "Barra anticavalinho.",
                afirmacao: "você acha que seu carro é uma moto que vai empinar, e provavelmente junto do seu carro tembem tem um para quedas."
            },
            {
                texto: "Body kit", 
                afirmacao: "A aparencia para você vale mais que ser rapido, voce visa perfeição e não pressa."
            },
            {
                texto: "motor.", 
                afirmacao: "você quer potencia custe o que custar, e gosta de barrulho de carro forte."
            },
        ]
    },
    {
        enunciado: "Chega o momento de mecher no seu carro, o que voce preferre?",
        alternativas: [
            {
                texto: "Mecher no carro sozinho.",
                afirmacao: "você sabe o que ta fazendo e mesmo no erro voce mantem a calma e se ajusta a dificuldade."
            },
            {
                texto: "chamar alguem pra te ajudar.",
                afirmacao: "sabe o basico, mas esta sempre aprendendo."
            },
            {
                texto: "mandar pra alguem arrumar pra voce.", 
                afirmacao: "não é muito tecnico e gosta apenas de sentar e dirigir."
            },
        ]
    },
    {
        enunciado: "agora esta sendo marcada sua primeira corrida, escolha sua pista",
        alternativas: [
            {
                texto: "interlagos",
                afirmacao: "você não tem medo de se arriscar, mesmo que qualquer deslize cause sua morte você se mantem calmo."
            },
            {
                texto: "São Paulo International Dragway (SPID).",
                afirmacao: "você gosta muito mais do que so carros, voce gosta de velocidade e adrenalina, gosta de um começo rapido e um fim do mesmo jeito do começo."
            },
            {
                texto: "Circuito Ebisu.",
                afirmacao: "você prefere estilo a velocidade e tem um otimo controle sobre seu carro."
            },
            {
                texto: "Ouninpohja.",
                afirmacao: "você tem braço pra controlar seu carro, velocidade e muito barro embaixo das rodas."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function atualizaBarraProgresso() {
    const porcentagem = (atual / perguntas.length) * 100;
    barraProgresso.style.width = `${porcentagem}%`;
}

function mostraPergunta() {
    atualizaBarraProgresso();

    if (atual >= perguntas.length) {
        exibeResultado();
        return;
    }

    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";

    // Animação de entrada
    caixaPerguntas.classList.remove("animar-entrada");
    caixaAlternativas.classList.remove("animar-entrada");
    void caixaPerguntas.offsetWidth;
    caixaPerguntas.classList.add("animar-entrada");
    caixaAlternativas.classList.add("animar-entrada");

    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.addEventListener("click", function () {
            historiaFinal += alternativa.afirmacao + " ";
            atual++;
            mostraPergunta();
        });
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function exibeResultado() {
    barraProgresso.style.width = "100%";

    caixaPerguntas.textContent = "Resumo da sua Jornada";
    caixaAlternativas.textContent = "";
    textoResultado.textContent = historiaFinal;

    caixaPerguntas.classList.remove("animar-entrada");
    textoResultado.classList.remove("animar-entrada");
    void caixaPerguntas.offsetWidth;
    
    caixaPerguntas.classList.add("animar-entrada");
    textoResultado.classList.add("animar-entrada");

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Jogar Novamente";
    botaoReiniciar.addEventListener("click", reiniciarQuiz);
    caixaAlternativas.appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
    atual = 0;
    historiaFinal = "";
    textoResultado.textContent = "";
    mostraPergunta();
}

mostraPergunta();