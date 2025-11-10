// === Perguntas ===
const questions = [
  {
    question: "Qual é o nome do lendário baixista do Grand Funk?",
    options: ["Glenn Hughes", "Nick Graham", "Dave Rimmer", "Mel Schacher"],
    answer: "Mel Schacher"
},
{
    question: "O álbum 'The Dark Side of the Moon' é de qual banda?",
    options: ["Pink Floyd", "Yes", "Genesis", "King Crimson"],
    answer: "Pink Floyd"
},
{
    question: "Qual é a ligação entre Ronnie James Dio e David 'Rock' Feinstein, guitarrista da banda The Rods?",
    options: ["Foram colegas na banda Elf", "São primos","Gravaram juntos em um álbum do Black Sabbath","Feinstein foi empresário de Dio nos anos 80"],
    answer: "São primos"
},
{
    question: "Qual foi a causa da morte de Cliff Burton, baixista do Metallica,?",
    options: ["Acidente de Carro", "Acidente de Avião", "Acidente de Ônibus", "Câncer"],
    answer: "Acidente de Ônibus"
},
{
    question: "Qual banda o Lendário Dio não fez parte?",
    options: ["Rainbow", "ELF", "Black Sabbath", "Dust"],
    answer: "Dust"
},
{
    question: "Qual banda gravou 'Hotel California'?",
    options: ["America", "Fleetwood Mac", "The Doors", "Eagles"],
    answer: "Eagles"
},
{
    question: "Qual era o QI do Gênio Jim Morrison?",
    options: ["159", "100", "149", "110"],
    answer: "149"
},
{
    question: "Qual vocalista recusou o convite para entrar no AC/DC após a morte de Bon Scott?",
    options: ["Marc Storace (Krokus)", "Rob Halford (Judas Priest)","David Coverdale (Whitesnake)","Joe Lynn Turner (Rainbow)"],
    answer: "Marc Storace (Krokus)"
},
{
    question: "Antes de entrar no AC/DC, Brian Johnson era vocalista de qual banda britânica?",
    options: ["Sweet","Slade","Status Quo","Geordie"],
    answer: "Geordie"
},
{
    question: "Qual banda abriu o lendário festival Live Aid em 1985?",
    options: ["U2","Queen","Status Quo","Dire Straits"],
    answer: "Status Quo"
},
{
    question: "Antes de se chamar Status Quo, qual era o nome original da banda?",
    options: ["The Tremeloes","The Spectres","The Searchers","Traffic Jam"],
    answer: "The Spectres"
},
{
    question: "Qual dessas bandas foi apelidada de 'a resposta americana ao Black Sabbath'?",
    options: ["Mountain", "Grand Funk Railroad", "Blue Öyster Cult", "Foghat"],
    answer: "Blue Öyster Cult"
},
{
    question: "Qual apelido ficou associado a Ted Nugent por seu estilo selvagem nos palcos?",
    options: ["The Detroit Devil", "The Motor City Madman", "The Crazy Hunter", "Wild Guitar Hero"],
    answer: "The Motor City Madman"
},
{
    question: "Além da música, qual é uma das maiores paixões de Ted Nugent?",
    options: ["Boxe", "Corrida de carros", "Caça", "Motociclismo"],
    answer: "Caça"
},
{
    question: "Qual é o álbum do Uriah Heep que contém o clássico 'Easy Livin’'?",
    options: ["Sweet Freedom", "Look at Yourself", "The Magician’s Birthday", "Demons and Wizards"],
    answer: "Demons and Wizards"
},
{
    question: "O ZZ Top recusou uma oferta de 1 milhão de dólares para fazer o quê?",
    options: ["Mudar o estilo musical", "Cortar suas barbas longas", "Tocar em um comercial de TV", "Mudar de gravadora"],
    answer: "Cortar suas barbas longas"
},
{
    question: "O Rainbow, banda de Ritchie Blackmore, era conhecida por quê?",
    options: ["Trocar frequentemente de integrantes", "Ter letras sobre política", "Nunca tocar shows fora da Inglaterra", "Tocar apenas covers"],
    answer: "Trocar frequentemente de integrantes"
},
{
    question: "Quem toca guitarra na música 'Beat It' de Michael Jackson?",
    options: ["Slash", "Eddie Van Halen", "Brian May", "Steve Vai"],
    answer: "Eddie Van Halen"
},
{
    question: "De qual país é a Lendária Banda Krokus?",
    options: ["Suiça", "Suécia", "Dinamarca", "EUA"],
    answer: "Suiça"
},
{
    question: "Por qual motivo o Manowar entrou para o Guinness Book?",
    options: ["Show mais alto do mundo, atingindo 139 decibéis","Por ter o maior número de guitarristas em um show","Por usar roupas de couro mais pesadas que 50 kg","Maior número de Haters da História"],
    answer: "Show mais alto do mundo, atingindo 139 decibéis"
},
{
    question: "Recentemente, Lobão criou polêmica por criticar uma lendária banda de Heavy Metal, qual banda foi?",
    options: ["Manowar", "Iron Maiden", "Judas Priest", "Metallica"],
    answer: "Iron Maiden"
},
{
    question: "Qual guitarrista fundou o Ten Years After?",
    options: ["Rory Gallagher", "Gary Moore", "Alvin Lee", "Jeff Beck"],
    answer: "Alvin Lee"
},
{
    question: "Qual foi a primeira banda de rock ocidental a se apresentar na União Soviética em 1988?",
    options: ["Scorpions", "Metallica", "Deep Purple", "Bon Jovi"],
    answer: "Scorpions"
},
{
    question: "Quem canta 'Like a Rolling Stone'?",
    options: ["Rolling Stones", "Neil Young", "Bob Dylan", "Bruce Springsteen"],
    answer: "Bob Dylan"
},
{
    question: "Qual era a profissão de Biff Byford, lendário vocalista do Saxon antes de se tornar músico?",
    options: ["Mecânico", "Professor", "Carpinteiro", "Cozinheiro"],
    answer: "Carpinteiro"
},
{
    question: "Quem foi o guitarrista do Dire Straits?",
    options: ["David Gilmour", "Eric Clapton", "Jeff Beck", "Mark Knopfler"],
    answer: "Mark Knopfler"
},
{
    question: "Qual banda lançou o hit 'We’re Not Gonna Take It'?",
    options: ["Twisted Sister", "Motley Crue", "Poison", "Quiet Riot"],
    answer: "Twisted Sister"
},
{
    question: "O álbum 'Rumours' é de qual banda?",
    options: ["Heart", "Fleetwood Mac", "Eagles", "Journey"],
    answer: "Fleetwood Mac"
},
{
    question: "Qual o nome da primeira banda do Bruce Dickinson?",
    options: ["Saxon", "Samson", "Budgie", "Moxy"],
    answer: "Samson"
},
{
    question: "Quem canta 'Free Bird'?",
    options: ["The Band", "Allman Brothers Band", "CCR", "Lynyrd Skynyrd"],
    answer: "Lynyrd Skynyrd"
},
{
    question: "Por que a banda Made in Brazil entrou para o Livro dos Recordes?",
    options: ["Por tocar mais de 200 músicas em um show","Por ter mais de 200 formações diferentes","Por ter vendido mais de 200 mil álbuns","Por fazer mais de 200 turnês internacionais"],
    answer: "Por ter mais de 200 formações diferentes"
},
{
    question: "O guitarrista Janick Gers do Iroan Maiden é formado em que?",
    options: ["Música", "Engenharia", "Sociologia", "Economia"],
    answer: "Sociologia"
},
{
    question: "Quem foi o vocalista original do Van Halen?",
    options: ["David Lee Roth", "Sammy Hagar", "Gary Cherone", "Eddie Van Halen"],
    answer: "David Lee Roth"
},
{
    question: "O nome Sepultura, foi inspirado em qual música do Motörhead?",
    options: ["Go to Hell", "Orgasmatron", "Ace of Spades", "Dancing on your Grave"],
    answer: "Dancing on your Grave"
},
{
    question: "Quem canta 'More Than a Feeling'?",
    options: ["Boston", "Foreigner", "Journey", "Styx"],
    answer: "Boston"
},
{
    question: "Qual banda lançou o álbum 'Bat Out of Hell'?",
    options: ["Queen", "Meat Loaf", "Alice Cooper", "Blue Öyster Cult"],
    answer: "Meat Loaf"
},
{
    question: "Qual doença rara afetou o baterista Eric Carr, do KISS, levando à sua morte em 1991?",
    options: ["Câncer de pulmão","Câncer de pele","Câncer de Coração","Leucemia"],
    answer: "Câncer de Coração"
},
{
    question: "Além de seus trabalhos com música, Bruce Dickinson também é?",
    options: ["Piloto de Avião", "Esgrimista", "Mestre Cervejeiro", "Todas Alternativas"],
    answer: "Todas Alternativas"
},
{
    question: "Quem canta 'Rebel Rebel'?",
    options: ["David Bowie", "Lou Reed", "Iggy Pop", "Marc Bolan"],
    answer: "David Bowie"
},
{
    question: "Qual álbum consagrou o Nirvana?",
    options: ["In Utero", "Bleach", "Nevermind", "MTV Unplugged"],
    answer: "Nevermind"
},
{
    question: "Quem canta 'Born to Be Wild'?",
    options: ["Steppenwolf", "Grand Funk", "The Doors", "Creedence Clearwater Revival"],
    answer: "Steppenwolf"
},
{
    question: "Apesar de ser um guitarrista virtuoso, Blackmore tentou tocar outro instrumento no início da carreira, qual foi?",
    options: ["Bateria", "Gaita", "Piano", "Flauta"],
    answer: "Flauta"
},
{
    question: "Qual banda gravou 'Layla'?",
    options: ["The Yardbirdss", "Cream", "Derek and the Dominos", "The Beatles"],
    answer: "Derek and the Dominos"
},
{
    question: "Porque o Metallica expulsou Dave Mustaine da banda?",
    options: ["Excesso de Álcool", "Qualidade Técnica", "Atrasos", "Falta de Dedicação"],
    answer: "Excesso de Álcool"
},
{
    question: "Após sua expulsão do Metallica, qual banda Dave Mustaine criou?",
    options: ["Testament", "Slayer", "Megadeth", "Pantera"],
    answer: "Megadeth"
},
{
    question: "Quem é conhecido como 'O Camaleão do Rock'?",
    options: ["David Bowie", "Lou Reed", "Iggy Pop", "Marc Bolan"],
    answer: "David Bowie"
},
{
    question: "A música 'Hurricane' de Bob Dylan se refere a qual pugilista?",
    options: ["Joe Frazier", "Sonny Liston", "Rubin Carter", "Larry Holmes"],
    answer: "Rubin Carter"
},
{
    question: "Qual música do Queen ficou eternizada no filme 'Highlander'?",
    options: ["Who Wants to Live Forever", "Bohemian Rhapsody", "We Will Rock You", "Radio Ga Ga"],
    answer: "Who Wants to Live Forever"
},
{
    question: "Quem interpretou Freddie Mercury no filme 'Bohemian Rhapsody'?",
    options: ["Jared Leto", "Ben Whishaw", "Taron Egerton", "Rami Malek"],
    answer: "Rami Malek"
},
{
    question: "Wish You Were Here, clássico do Pink Floyd, é uma homenagem a quem?",
    options: ["Irmão David Gilmour", " Esposa Roger Waters", "Syd Barrett", "Mãe Nick Mason"],
    answer: "Syd Barrett"
},
{
    question: "O filme 'The Doors' (1991), dirigido por Oliver Stone, teve qual ator no papel de Jim Morrison?",
    options: ["Val Kilmer", "Johnny Depp", "Christian Slater", "Ethan Hawke"],
    answer: "Val Kilmer"
},
{
    question: "O álbum 'Born in the U.S.A.' é de qual artista?",
    options: ["John Mellencamp", "Tom Petty", "Bob Dylan", "Bruce Springsteen"],
    answer: "Bruce Springsteen"
},
{
    question: "Quem canta 'Hotel California'?",
    options: ["Eagles", "Fleetwood Mac", "America", "Doobie Brothers"],
    answer: "Eagles"
},
{
    question: "Qual guitarrista é conhecido como 'Slowhand'?",
    options: ["Jimmy Page", "Eric Clapton", "Jeff Beck", "David Gilmour"],
    answer: "Eric Clapton"
},
{
    question: "Qual álbum dos Beatles foi o último gravado em estúdio?",
    options: ["Abbey Road", "Let It Be", "Revolver", "Rubber Soul"],
    answer: "Abbey Road"
},
{
    question: "O Rush é uma banda originária de qual país?",
    options: ["Austrália", "Estados Unidos", "Inglaterra", "Canadá"],
    answer: "Canadá"
},
{
    question: "Qual música do Guns N' Roses toca em 'Terminator 2: Judgment Day'?",
    options: ["You Could Be Mine", "Welcome to the Jungle", "Paradise City", "Sweet Child O' Mine"],
    answer: "You Could Be Mine"
},
{
    question: "Em 'Back to the Future', Marty McFly toca qual música de Chuck Berry?",
    options: ["Roll Over Beethoven", "Maybellene", "Johnny B. Goode", "Sweet Little Sixteen"],
    answer: "Johnny B. Goode"
},
{
    question: "Qual cantor britânico faz uma participação no filme 'Labyrinth' (1986)?",
    options: ["Peter Gabriel", "Sting", "Phil Collins", "David Bowie"],
    answer: "David Bowie"
},
{
    question: "O filme 'The Wall' foi baseado em um álbum de qual banda?",
    options: ["Genesis", "The Who", "Pink Floyd", "Yes"],
    answer: "Pink Floyd"
},
{
    question: "O álbum 'London Calling' é de qual banda?",
    options: ["The Jam", "Sex Pistols", "The Clash", "Buzzcocks"],
    answer: "The Clash"
},
{
    question: "Qual foi o álbum de estreia do Queen?",
    options: ["Queen", "A Night at the Opera", "Sheer Heart Attack", "News of the World"],
    answer: "Queen"
},
{
    question: "Quem canta 'Cocaine'?",
    options: ["Jimmy Page", "J.J. Cale", "Jeff Beck", "Eric Clapton"],
    answer: "Eric Clapton"
},
{
    question: "Qual foi o primeiro álbum do Pink Floyd?",
    options: ["The Piper at the Gates of Dawn", "Dark Side of the Moon", "Animals", "Meddle"],
    answer: "The Piper at the Gates of Dawn"
},
{
    question: "War Pigs”, do Black Sabbath, é uma crítica direta a quê?",
    options: ["Políticos que incentivam guerras", "Soldados do Vietnã", "A Guerra Fria", "A corrida armamentista soviética"],
    answer: "Políticos que incentivam guerras"
},
{
    question: "Qual banda gravou “One”, inspirada no sofrimento de um soldado mutilado na guerra?",
    options: ["The Beatles", "The Rolling Stones", "Metallica", "The Doors"],
    answer: "Metallica"
},
{
    question: "A música 'People, Let's Stop the War', do Grand Funk Railroad, foi inspirada em qual conflito?",
    options: ["Guerra Fria", "Guerra da Coreia", "Guerra do Vietnã", "Guerra do Golfo"],
    answer: "Guerra do Vietnã"
},
{
    question: "O álbum 'OK Computer' é de qual banda?",
    options: ["Radiohead", "Oasis", "Blur", "U2"],
    answer: "Radiohead"
},
{
    question: "King Diamond, vocalista do Mercyful Fate, ficou conhecido por usar em seus shows uma cruz feita de quê?",
    options: ["Ossos Humanos Reais", "Madeiras retiradas de caixões antigos", "Ferro enferrujado e correntes", "Ossos artificiais moldados em resina"],
    answer: "Ossos Humanos Reais"
},
{
    question: "King Diamond, vocalista do Mercyful Fate, nasceu em qual país?",
    options: ["Suécia", "Dinamarca", "Noruega", "Alemanha"],
    answer: "Dinamarca"
},
{
    question: "O álbum 'Brothers in Arms' é de qual banda?",
    options: ["Dire Straits", "Pink Floyd", "Eagles", "Supertramp"],
    answer: "Dire Straits"
},
{
    question: "Quem é o vocalista do The Police?",
    options: ["Phil Collins", "Andy Summers", "Stewart Copeland", "Sting"],
    answer: "Sting"
},
{
    question: "O álbum 'Goodbye Yellow Brick Road' é de qual artista?",
    options: ["Elton John", "David Bowie", "Billy Joel", "Rod Stewart"],
    answer: "Elton John"
},
{
    question: "Quem canta 'Proud Mary'?",
    options: ["The Doors", "The Band", "Creedence Clearwater Revival", "The Animals"],
    answer: "Creedence Clearwater Revival"
},
{
    question: "Antes de fundar o Motörhead, Lemmy Kilmister trabalhou como roadie para qual famoso guitarrista?",
    options: ["Eric Clapton", "Jimi Hendrix", "Jeff Beck", "Jimmy Page"],
    answer: "Jimi Hendrix"
},
{
    question: "Qual banda lançou o álbum 'Permanent Waves'?",
    options: ["Rush", "Yes", "Genesis", "Kansas"],
    answer: "Rush"
},
{
    question: "O famoso gesto dos “chifres do metal” (🤘), eternizado por Ronnie James Dio, foi inspirado em quê?",
    options: ["Em um Livro", "Em um filme de terror", "Gesto da sua Avó", "No símbolo de um antigo álbum do Black Sabbath"],
    answer: "Gesto da sua Avó"
},

{
        question: "O Black Sabbath é uma banda Inglesa que se formou em qual cidade?",
        options: ["Liverpool", "Birmingham", "Londres", "Manchester"],
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
        answer: "The Rainbows" 
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
        question: "Qual foi o álbum de estreia de Michael Schenker no UFO?",
        options: ["Flying", "Phenomenom", "Force It", "Lights Out"],
        answer: "Phenomenom"
    },
    {
        question: "Qual foi o álbum de estreia do Grand Funk?",
        options: ["Born to Die", "On Time", "Closer to Home", "Survival"],
        answer: "On Time"
    },
	{
        question: "Qual o nome da primeira banda do Bruce Dickinson?",
        options: ["Saxon", "Samson", "Budgie", "Moxy"],
        answer: "Samson"
    },
    {
        question: "Deus Salva... o Rock Alivia, é um álbum clássico de qual banda Brasileira?",
        options: ["Made in Brazil", "Patrulha do Espaço", "Golpe de Estado", "Casa das Máquinas"],
        answer: "Made in Brazil"
    },
	{
        question: "Robert Trujillo baixista do Metallica, não tocou em quais dessas bandas?",
        options: ["Ozzy Osbourne", "Suicidal Tendencies", "Brujeria", " Black Label Society"],
        answer: "Brujeria"
    },
	
    {
        question: "O primeiro vocalista do Uriah Heep foi?",
        options: ["David Byron", "John Lawton", "Peter Goalby", "Bernie Shaw"],
        answer: "David Byron"
    }
  ];

// === Função para embaralhar ===
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// === Banco de perguntas restantes ===
let remainingQuestions = shuffle([...questions]);

// === Função que garante 10 perguntas sem repetir ===
function getRandomQuestions() {
  if (remainingQuestions.length < 10) {
    const needed = 10 - remainingQuestions.length;
    const selected = remainingQuestions;
    remainingQuestions = shuffle([...questions]);
    selected.push(...remainingQuestions.splice(0, needed));
    return selected;
  }

  const selected = remainingQuestions.slice(0, 10);
  remainingQuestions = remainingQuestions.slice(10);
  return selected;
}

// === Variáveis globais ===
let selectedQuestions = getRandomQuestions();
let currentQuestionIndex = 0;
let score = 0;
let round = 1; // 🆕 contador de rodadas

// === Sons ===
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

// === Carregar pergunta ===
function loadQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById("progress").innerText = `🎸 Rodada ${round} — Pergunta ${currentQuestionIndex + 1} de ${selectedQuestions.length}`;
    document.getElementById("question").innerText = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

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

// === Verificar resposta ===
function selectOption(selectedOption) {
  const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
  const optionsContainer = document.getElementById("options");
  const buttons = optionsContainer.querySelectorAll("button");

  // Desativa cliques após a escolha
  buttons.forEach(btn => btn.disabled = true);

  // Marca as opções
  buttons.forEach(btn => {
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn.innerText === selectedOption) {
      btn.classList.add("wrong");
    }
  });

  // Toca som e atualiza pontuação
  if (selectedOption === correctAnswer) {
    score++;
    soundCorrect.currentTime = 0;
    soundCorrect.play();
  } else {
    soundWrong.currentTime = 0;
    soundWrong.play();
  }

  // Próxima pergunta após um pequeno delay
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1000);
}
// === Mostrar resultado ===
function showResult() {
  const percentage = (score / selectedQuestions.length) * 100;
  document.getElementById("result").innerText = `Você acertou ${score} de ${selectedQuestions.length} perguntas.`;
  document.getElementById("percentage").innerText = `Percentual de acerto: ${percentage.toFixed(2)}%.`;

  let message = "";
  if (percentage === 100) message = "🔥 Você é um Expert do Rock!";
  else if (percentage >= 80) message = "🤘 Você conhece muito rock!";
  else if (percentage >= 60) message = "🎶 Tá no caminho certo!";
  else if (percentage <= 20) message = "😅 Eu sou uma piada pra você?";
  else message = "🎸 Bom trabalho, mas dá pra melhorar!";

  document.getElementById("percentage").innerText += `\n${message}`;
  document.getElementById("restart-btn").style.display = "block";
}

// === Reiniciar quiz ===
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  round++; // 🆕 aumenta a rodada
  selectedQuestions = getRandomQuestions();
  document.getElementById("result").innerText = "";
  document.getElementById("percentage").innerText = "";
  document.getElementById("restart-btn").style.display = "none";
  loadQuestion();
}

// === Iniciar ===
loadQuestion();

