// js/sancaquizz.js
const questions = [
    {
        question: "O Black Sabbath é uma banda Inglesa que se formou em qual cidade?",
        options: ["Birmingham", "Liverpool", "Londres", "Manchester"],
        answer: "Birmingham"
    },
	 {
        question: "Tears in Heaven, clássico do Eric Clapton, fala sobre a perda de qual parente dele?",
        options: ["Pai", "Filho", "Mãe", "Esposa"],
        answer: "Filho"
    },
	{
        question: "Keith Moon, lendário baterista inglês, tocou em qual dessas bandas?",
        options: ["Roling Stones", "Rainbow", "Dust", "The Who"],
        answer: "The Who"
    },
    {
        question: "Qual é o nome do primeiro baterista do Rush?",
        options: ["Neil Peart", "John Rutsey", "Bill Ward", "Vinny Appice"],
        answer: "John Rutsey"
    },
    {
        question: "O primeiro disco do Motörhead é?",
        options: ["Ace of Spades", "Orgasmatron", "Bomber", "Motörhead"],
        answer: "Motörhead"
    },
	
	{
        question: "O álbum mais vendido do Deep Purple é?",
        options: ["Burn", "Machine Head", "Fireball", "In Rock"],
        answer: "Machine Head"
    },
	
	{
        question: "O AC/DC é uma banda de rock de qual país?",
        options: ["Estados Unidos", "Inglaterra", "Austrália", "Canadá"],
        answer: "Austrália"
    },
	
    {
        question: "Qual foi o último álbum do Bon Scott no AC/DC?",
        options: ["Powerage", "Highway to Hell", "High Voltage", "Back in Black"],
        answer: "Highway to Hell"
    },
    {
        question: "A primeira banda de Lemmy Kilmister foi?",
        options: ["The Motown Sect", "Hawkwind", "The Rainbows", "Motörhead"],
        answer: "The Rainbows" // Corrigido para a resposta correta
    },
    {
        question: "Quem é o vocalista da banda Scorpions?",
        options: ["Bruce Dickinson", "Klaus Meine", "Rob Halford", "James Hetfield"],
        answer: "Klaus Meine"
    },
    {
        question: "Qual guitarrista brasileiro tocou no Megadeth?",
        options: ["Rafael Bittencourt", "Kiko Loureiro", "Moyses Kolesne", "Andreas Kisser"],
        answer: "Kiko Loureiro"
    },
    {
        question: "Qual foi o primeiro vocalista do Deep Purple?",
        options: ["Ian Gillan", "David Coverdale", "Joe Lynn Turner", "Rod Evans"],
        answer: "Rod Evans"
    },
    {
        question: "O Thin Lizzy é uma banda de rock originária de qual país?",
        options: ["Inglaterra", "Canadá", "Irlanda", "Escócia"],
        answer: "Irlanda"
    },
	{
        question: "Qual artista encerrou o festival de Woodstock?",
        options: ["Richie Havens", "Grateful Dead", "Jimi Hendrix", "Ten Years After"],
        answer: "Jimi Hendrix"
    },
    {
        question: "Qual clássico do Michael Jackson, Van Halen participou?",
        options: ["Bad", "Beat It", "Billie Jean", "Thriller"],
        answer: "Beat It"
    },
    {
        question: "Qual foi o álbum de estreia do Grand Funk?",
        options: ["Born to Die", "On Time", "Closer to Home", "Survival"],
        answer: "On Time"
    },
	{
        question: "Qual o nome da primeira banda do Bruce Dickinson?",
        options: ["Saxon", "Sampson", "Budgie", "Moxy"],
        answer: "Sampson"
    },
    {
        question: "Deus Salva... o Rock Alivia, é um álbum clássico de qual banda Brasileira?",
        options: ["Made in Brazil", "Patrulha do Espaço", "Golpe de Estado", "Casa das Máquinas"],
        answer: "Made in Brazil"
    },
	{
        question: "Robert Trujillo baixista do Metallica, não tocou em quais dessas bandas?",
        options: ["Brujeria", "Suicidal Tendencies", "Ozzy Osbourne", " Black Label Society"],
        answer: "Brujeria"
    },
	
    {
        question: "O primeiro vocalista do Uriah Heep foi?",
        options: ["David Byron", "John Lawton", "Peter Goalby", "Bernie Shaw"],
        answer: "David Byron"
    },
   
     
    ];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question").innerText = currentQuestion.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = ""; // Limpa as opções anteriores
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => selectOption(option);
            optionsContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

function selectOption(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function showResult() {
    const percentage = (score / questions.length) * 100;
    document.getElementById("result").innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    document.getElementById("percentage").innerText = `Percentual de acerto: ${percentage.toFixed(2)}%.`;

    let message = ""; // Variável para a mensagem de avaliação

    if (percentage === 100) {
        message = "Você é um Expert!";
    } else if (percentage >= 80) {
        message = "Você conhece muito rock!";
    } else if (percentage >= 60) {
        message = "Você precisa ouvir mais Classic Rock.";
    } else if (percentage >= 0 && percentage <= 20) {
        message = "Eu sou uma piada para você?";
    } else {
        message = "Bom trabalho, mas ainda tem espaço para melhorar!";
    }

    // Exibe a mensagem de avaliação
    document.getElementById("percentage").innerText += `\n${message}`;
    
    document.querySelector("button[onclick='restartQuiz()']").style.display = 'block'; // Mostra o botão de reiniciar
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").innerText = "";
    document.getElementById("percentage").innerText = ""; // Limpa a mensagem de percentual
    loadQuestion();
}

// Carrega a primeira pergunta ao iniciar o quiz
loadQuestion();