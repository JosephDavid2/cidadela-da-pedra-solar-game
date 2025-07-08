

import { Item, Enemy, StorySection } from './types.ts';

export const ITEMS: Record<string, Item> = {
  espada: { id: 'espada', name: 'Espada', description: 'Uma lâmina confiável.', options: { isWeapon: true } },
  armadura_couro: { id: 'armadura_couro', name: 'Armadura de Couro', description: 'Oferece proteção básica.' },
  mochila: { id: 'mochila', name: 'Mochila', description: 'Para carregar seus tesouros.' },
  tocha: { id: 'tocha', name: 'Tocha', description: 'Ilumina lugares escuros.' },
  chave_ferro: { id: 'chave_ferro', name: 'Chave de Ferro', description: 'Uma pequena chave de ferro enferrujada.' },
  escudo_metal: { id: 'escudo_metal', name: 'Escudo de Metal', description: 'Aumenta sua HABILIDADE em 1.', options: { stat: 'skill', bonus: 1 } },
  espada_ana: { id: 'espada_ana', name: 'Espada Anã', description: 'Concede +1 na sua Força de Ataque.', options: { isWeapon: true, stat: 'skill', bonus: 1 } },
  pepita_ouro: { id: 'pepita_ouro', name: 'Pepita de Ouro', description: 'Um pedaço de ouro valioso.' },
  folha_alos: { id: 'folha_alos', name: 'Folha de Alos', description: 'Restaura 2 pontos de ENERGIA.', options: { restores: 2 } },
  peca_ouro: { id: 'peca_ouro', name: 'Peça de Ouro', description: 'Uma moeda de ouro.' },
  medalhao_prata: { id: 'medalhao_prata', name: 'Medalhão de Prata', description: 'Um medalhão manchado com o entalhe de uma montanha.' },
  chifre_ouro_anao: { id: 'chifre_ouro_anao', name: 'Chifre de Ouro Anão', description: 'Um chifre de beber ricamente decorado.' },
  pedra_amolar: { id: 'pedra_amolar', name: 'Pedra de Amolar', description: 'Adiciona +1 de dano no seu próximo combate.' },
  chave_cristal: { id: 'chave_cristal', name: 'Chave de Cristal', description: 'Uma chave de cristal perfeitamente lapidada.' },
  martelo_guerra_ritual: { id: 'martelo_guerra_ritual', name: 'Martelo de Guerra Ritual', description: 'Uma arma poderosa, capaz de quebrar runas.', options: { isWeapon: true } },
  flauta_prata: { id: 'flauta_prata', name: 'Flauta de Prata', description: 'Um instrumento capaz de produzir um som de pureza cristalina.' },
  gemas_anas: { id: 'gemas_anas', name: 'Gemas Anãs', description: 'Três gemas brilhantes.' },
  pocao_sorte: { id: 'pocao_sorte', name: 'Poção de Sorte', description: 'Restaura sua SORTE ao seu nível inicial.' }
};

export const ENEMIES: Record<string, Enemy> = {
  goblin_batedor_1: { id: 'goblin_batedor_1', name: 'Primeiro Goblin Batedor', skill: 5, energy: 5 },
  goblin_batedor_2: { id: 'goblin_batedor_2', name: 'Segundo Goblin Batedor', skill: 5, energy: 4 },
  enguia_caverna: { id: 'enguia_caverna', name: 'Enguia da Caverna', skill: 6, energy: 7 },
  rato_gigante_1: { id: 'rato_gigante_1', name: 'Primeiro Rato Gigante', skill: 5, energy: 4 },
  rato_gigante_2: { id: 'rato_gigante_2', name: 'Segundo Rato Gigante', skill: 6, energy: 4 },
  carnical: { id: 'carnical', name: 'Carniçal', skill: 7, energy: 8, special: 'paralyze_on_win' },
  guarda_esqueleto_1: { id: 'guarda_esqueleto_1', name: 'Primeiro Guarda Esqueleto', skill: 7, energy: 6 },
  guarda_esqueleto_2: { id: 'guarda_esqueleto_2', name: 'Segundo Guarda Esqueleto', skill: 7, energy: 7 },
  troll_caverna: { id: 'troll_caverna', name: 'Troll da Caverna', skill: 9, energy: 12 },
};

export const STORY: Record<number, StorySection> = {
  1: {
    text: "A lenda da Pedra Solar o trouxe até aqui, à boca da Caverna da Noite Eterna. O ar frio que emana dela cheira a rocha úmida e a algo muito mais antigo e perigoso. Com sua tocha lançando sombras dançantes nas paredes, você adentra a escuridão. A passagem inicial, larga o suficiente para uma carroça, logo se estreita. Após uma caminhada de dez minutos, você chega a uma encruzilhada. À sua frente, o caminho principal continua, largo e pavimentado com lajes de pedra quebradas. Você ouve o som distante de vozes guturais e o tilintar de metal. À sua esquerda, uma fenda estreita na parede, quase escondida pela escuridão. À sua direita, uma escadaria de pedra desce em espiral. Por enquanto, você sente que o caminho mais direto é o mais promissor. Você segue em frente.",
    choices: [{ text: 'Continuar', action: { type: 'GOTO', sectionId: 2 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/1.wav',
  },
  2: {
    text: "Você avança com cautela pelo corredor principal. As vozes ficam mais altas. Espiando por uma quina, você vê dois Goblins Batedores jogando dados feitos de osso perto de uma fogueira. Eles ainda não notaram sua presença. Você pode tentar passar por eles silenciosamente ou enfrentá-los de frente.",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capitulo%201.png',
    choices: [
      { text: 'Atacar os Goblins', action: { type: 'GOTO', sectionId: 3 } },
      { text: 'Tentar se esgueirar pela escuridão', action: { type: 'GOTO', sectionId: 4 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/2.wav',
  },
  3: {
    text: "Com um grito de guerra, você salta das sombras. Os Goblins se assustam, mas reagem rápido, pegando suas adagas enferrujadas. Você must lutar contra eles, um de cada vez.\n\nPrimeiro GOBLIN BATEDOR: Habilidade 5, Energia 5.",
    choices: [{ text: 'Lutar!', action: { type: 'FIGHT', enemyId: 'goblin_batedor_1', winSectionId: 3.1, loseSectionId: 999 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/3.wav',
  },
  3.1: {
    text: "O primeiro goblin cai! Agora, enfrente o segundo.\n\nSegundo GOBLIN BATEDOR: Habilidade 5, Energia 4.",
    choices: [{ text: 'Lutar!', action: { type: 'FIGHT', enemyId: 'goblin_batedor_2', winSectionId: 5, loseSectionId: 999 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/3.1.wav',
  },
  4: {
    text: "Você se encolhe nas sombras, tentando passar sem fazer barulho. Teste sua Sorte.",
    choices: [{ text: 'Testar Sorte', action: { type: 'TEST_LUCK', successSectionId: 5, failureSectionId: 4.1 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/4.wav',
  },
  4.1: {
    text: "Você foi Azarado! Seu pé escorrega em uma pedra solta. Os Goblins se viram e atacam! Você perde a vantagem da surpresa.",
    choices: [{ text: 'Lutar mesmo assim', action: { type: 'GOTO', sectionId: 3 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/4.1.wav',
  },
  5: {
    text: "Com os Goblins fora do caminho (seja pela força ou pela furtividade), você pode examinar a área. A fogueira ilumina uma pequena sala de guarda. Há uma porta de madeira reforçada no lado oposto do corredor e uma passagem escura à sua direita. Você também pode vasculhar os corpos dos Goblins, se os derrotou.",
    choices: [
      { text: 'Vasculhar os corpos', action: { type: 'GOTO', sectionId: 6 }, disabledIfVisited: 6 },
      { text: 'Investigar a porta de madeira reforçada', action: { type: 'GOTO', sectionId: 7 }, disabledIfVisited: 7 },
      { text: 'Explorar a passagem escura à direita', action: { type: 'GOTO', sectionId: 8 }, disabledIfVisited: 8 },
      { text: 'Deixar a sala dos guardas e seguir em frente', action: { type: 'GOTO', sectionId: 11 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/5.wav',
  },
  6: {
    text: "Você revira os corpos imundos dos Goblins. Um deles tem um anel de cobre sem valor. O outro, no entanto, tem uma pequena chave de ferro enferrujada em uma bolsa de couro. Você pega a chave. Anote-a em sua Ficha de Aventura.",
    choices: [
        { text: 'Pegar a chave', action: { type: 'TAKE_ITEM', itemId: 'chave_ferro', nextSectionId: 6.1 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/6.wav',
  },
  6.1: {
    text: "Com a chave em mãos, você deve decide para onde ir.",
    choices: [
        { text: 'Ir para a porta de madeira', action: { type: 'GOTO', sectionId: 7 } },
        { text: 'Ir para a passagem escura', action: { type: 'GOTO', sectionId: 8 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/6.1.wav',
  },
  7: {
    text: "Você se aproxima da porta de madeira. Ela parece sólida, mas tem uma fechadura de ferro.",
    choices: [
      { text: 'Usar a chave de ferro', action: { type: 'GOTO', sectionId: 9 }, requiresItem: 'chave_ferro' },
      { text: 'Tentar arrombar a porta', action: { type: 'GOTO', sectionId: 10 }, requiresNoItem: 'chave_ferro' },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/7.wav',
  },
  8: {
    text: 'Você entra na passagem escura. O ar fica mais frio e úmido. O corredor é curto e termina em uma pilha de escombros que bloqueia o caminho. No entanto, você nota algo brilhando fracamente sob algumas pedras. É um pequeno escudo de metal polido. Se você pegá-lo, sua HABILIDADE aumentará em 1 ponto enquanto o estiver usando. Anote o "Escudo de Metal (+1 Habilidade)". Com o caminho bloqueado, sua única opção é retornar à sala da fogueira (você não poderá escolher esta opção novamente).',
    choices: [{ text: 'Pegar o escudo e voltar', action: { type: 'TAKE_ITEM', itemId: 'escudo_metal', nextSectionId: 5 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/8.wav',
  },
  9: {
    text: "A chave enferrujada entra na fechadura com dificuldade, mas com um estalo alto, ela gira. Você abre a porta e revela um pequeno arsenal. A maioria das armas está enferrujada, mas em um suporte você encontra uma Espada Anã. Ela é mais pesada, porém mais bem equilibrada. Se pegá-la, uma Espada Anã lhe dará um bônus de +1 em sua Força de Ataque. Você a troca por sua espada atual. A sala não tem outras saídas e você retorna à sala da fogueira.",
    choices: [{ text: 'Pegar a Espada Anã e voltar', action: { type: 'TAKE_ITEM', itemId: 'espada_ana', nextSectionId: 5 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/9.wav',
  },
  10: {
    text: "Você se prepara para arrombar a porta. Teste sua Força. Role dois dados. Se o resultado for menor ou igual à sua HABILIDADE inicial, você consegue. Se for maior, você falha.",
    choices: [{ text: 'Testar Força (Habilidade Inicial)', action: { type: 'TEST_INITIAL_SKILL', successSectionId: 9, failureSectionId: 10.1 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/10.wav',
  },
  10.1: {
    text: "Você falha. Você apenas consegue fazer barulho e machucar seu ombro. Perca 1 ponto de ENERGIA. A porta permanece fechada. Você deve retornar à sala da fogueira e fazer outra escolha (você não poderá escolher esta opção novamente).",
    choices: [{ text: 'Voltar', action: { type: 'LOSE_ENERGY', amount: 1, nextSectionId: 5 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/10.1.wav',
  },
  11: {
    text: "Você avança pelo corredor escuro, deixando para trás o calor fraco da fogueira. O som de água pingando fica mais alto. Musgo fosforescente projeta um brilho fraco. O corredor termina em uma bifurcação.",
    choices: [
      { text: 'Seguir pelo caminho da esquerda, que sobe', action: { type: 'GOTO', sectionId: 12 } },
      { text: 'Seguir pelo caminho da direita, que desce', action: { type: 'GOTO', sectionId: 16 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/11.wav',
  },
  12: {
    text: 'Você segue pelo caminho da esquerda. Após vinte metros, você chega à beira de um abismo estreito. Uma ponte de madeira podre e escorregadia é a única forma de atravessar. O vento que assobia pelo abismo ameaça seu equilíbrio.',
    choices: [
      { text: 'Tentar cruzar a ponte', action: { type: 'GOTO', sectionId: 13 } },
      { text: 'Voltar e pegar o outro caminho', action: { type: 'GOTO', sectionId: 11 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/12.wav',
  },
  13: {
    text: "Você pisa na primeira tábua da ponte. Ela range. Para atravessar em segurança, você deve usar toda a sua agilidade. Teste sua Habilidade.",
    choices: [{ text: 'Testar Habilidade', action: { type: 'TEST_SKILL', successSectionId: 14, failureSectionId: 15 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/13.wav',
  },
  14: {
    text: "Com passos cuidadosos e equilíbrio de mestre, você atravessa a ponte traiçoeira, chegando em segurança à plataforma do outro lado. A passagem continua, levando a uma porta de pedra entreaberta. Você a empurra e entra.",
    choices: [{ text: 'Entrar na porta', action: { type: 'GOTO', sectionId: 20 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/14.wav',
  },
  15: {
    text: "Na metade do caminho, seu pé escorrega! Você se desequilibra e, com um grito, cai no abismo. Por sorte, uma saliência rochosa amortece sua queda, mas a aterrissagem é dura. Você perde 2 pontos de ENERGIA e se encontra em uma plataforma escura, cerca de 5 metros abaixo da ponte.",
    choices: [{ text: 'Continuar', action: { type: 'LOSE_ENERGY', amount: 2, nextSectionId: 19 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/15.wav',
  },
  16: {
    text: "Você escolhe o caminho da direita e logo está com água gelada até os joelhos. A água turva impede de ver o fundo. No meio do túnel, você sente algo liso e musculoso roçar em sua perna. De repente, uma criatura serpentina emerge da água para atacar!",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capitulo%202.png',
    choices: [{ text: 'Lutar!', action: { type: 'GOTO', sectionId: 17 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/16.wav',
  },
  17: {
    text: "É uma Enguia da Caverna! Você must lutar contra ela na água, o que torna seus movimentos mais lentos.\n\nENGUIA DA CAVERNA: Habilidade 6, Energia 7.",
    choices: [{ text: 'Lutar contra a Enguia', action: { type: 'FIGHT', enemyId: 'enguia_caverna', winSectionId: 18, loseSectionId: 999 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/17.wav',
  },
  18: {
    text: "Após derrotar a enguia, você continua pela passagem inundada até chegar a uma área seca. Encostado na parede há o esqueleto de um aventureiro. Em sua bolsa, você encontra uma Pepita de Ouro e uma Folha de Alos, que restaura 2 pontos de ENERGIA. A passagem à frente leva a uma porta de pedra entreaberta.",
    choices: [
      { text: 'Pegar os itens e entrar na porta', action: { type: 'TAKE_ITEM', itemId: 'pepita_ouro', nextSectionId: 18.1 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/18.wav',
  },
  18.1: {
      text: "Você pegou a Pepita de Ouro.",
      choices: [
          { text: 'Pegar a Folha de Alos e entrar na porta', action: { type: 'TAKE_ITEM', itemId: 'folha_alos', nextSectionId: 20 } }
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/18.1.wav',
  },
  19: {
    text: "Você se levanta, dolorido. Sua tocha apagou. Felizmente, musgo fosforescente ilumina fracamente o local. Você vê degraus rústicos esculpidos na parede de rocha. Parece ser a única saída. Com algum esforço, você escala e chega ao topo, do outro lado do abismo. A passagem continua até uma porta de pedra entreaberta.",
    choices: [{ text: 'Empurrar a porta e entrar', action: { type: 'GOTO', sectionId: 20 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/19.wav',
  },
  20: {
    text: "Você entra em uma grande câmara circular. O teto está a uns 15 metros de altura. O chão é liso e desgastado. Não há nada nesta sala, exceto por três túneis idênticos que partem dela: um ao norte, um a sudeste e um a sudoeste. Um vento fraco sopra de todos, tornando impossível adivinhar o caminho certo.",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capitulo%203.png',
    choices: [
      { text: 'Escolher o túnel ao Norte', action: { type: 'GOTO', sectionId: 21 } },
      { text: 'Escolher o túnel a Sudeste', action: { type: 'GOTO', sectionId: 24 } },
      { text: 'Escolher o túnel a Sudoeste', action: { type: 'GOTO', sectionId: 27 } },
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/20.wav',
  },
  21: {
    text: "Você entra no túnel ao norte. Ele é reto, bem construído e estranhamente limpo. Após 30 metros, ele se abre em uma sala quadrada coberta por um mosaico de ladrilhos, cada um com um símbolo anão. Do outro lado, uma porta de madeira o aguarda. Perto da entrada, você nota uma placa de pressão sutil, sugerindo que o caminho é protegido. Você precisa atravessar.",
    choices: [{ text: 'Atravessar a sala', action: { type: 'GOTO', sectionId: 22 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/21.wav',
  },
  22: {
    text: "Você estuda os ladrilhos. Muitos símbolos são de clãs anões, outros de ferramentas ou armas. Parece haver uma lógica, uma trilha segura. Você acha que descobriu o caminho. Para ter certeza, você terá que confiar em sua intuição. Teste sua Sorte.",
    choices: [{ text: 'Testar Sorte', action: { type: 'TEST_LUCK', successSectionId: 23, failureSectionId: 22.1 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/22.wav',
  },
  22.1: {
    text: "Você foi Azarado! Você pisa em um ladrilho errado. Furos se abrem nas paredes e uma saraivada de dardos voa em sua direção! Perca 3 pontos de ENERGIA. Você corre o resto do caminho e chega à porta.",
    choices: [{ text: 'Continuar', action: { type: 'LOSE_ENERGY', amount: 3, nextSectionId: 23 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/22.1.wav',
  },
  23: {
    text: "Tendo superado a sala dos ladrilhos, você abre a porta e segue por um corredor curto. A passagem termina, abrindo-se em um salão vasto e cavernoso.",
    choices: [{ text: 'Entrar no salão', action: { type: 'GOTO', sectionId: 30 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/23.wav',
  },
  24: {
    text: "Você segue pelo túnel a sudeste. O cheiro é azedo, de pelo molhado e podridão. O chão está coberto de ossos roídos. Este é o covil de alguma criatura. De repente, guinchos agudos ecoam e sombras rápidas emergem de fendas nas paredes.",
    choices: [{ text: 'Preparar-se para lutar', action: { type: 'GOTO', sectionId: 25 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/24.wav',
  },
  25: {
    text: "Você está cercado por um enxame de Ratos Gigantes! Eles atacam com ferocidade. Você must lutar contra dois deles.\n\nPrimeiro RATO GIGANTE: Habilidade 5, Energia 4.",
    choices: [{ text: 'Lutar!', action: { type: 'FIGHT', enemyId: 'rato_gigante_1', winSectionId: 25.1, loseSectionId: 999 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/25.wav',
  },
  25.1: {
    text: "O primeiro rato jaz morto! Agora o segundo ataca.\n\nSegundo RATO GIGANTE: Habilidade 6, Energia 4.",
    choices: [{ text: 'Lutar!', action: { type: 'FIGHT', enemyId: 'rato_gigante_2', winSectionId: 26, loseSectionId: 999 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/25.1.wav',
  },
  26: {
    text: "Os corpos dos ratos jazem a seus pés. O resto do enxame recua. Você chuta o ninho imundo no canto e encontra uma Peça de Ouro. Você a guarda. O túnel continua e se abre em um salão vasto e cavernoso.",
    choices: [{ text: 'Pegar o ouro e continuar', action: { type: 'TAKE_ITEM', itemId: 'peca_ouro', nextSectionId: 30 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/26.wav',
  },
  27: {
    text: "Você escolhe o túnel a sudoeste. Quase imediatamente, seus olhos começam a arder. O túnel está cheio de um vapor amarelo-esverdeado. A passagem não é longa, mas atravessar o gás será um desafio.",
    choices: [{ text: 'Atravessar o gás', action: { type: 'GOTO', sectionId: 28 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/27.wav',
  },
  28: {
    text: "Você prende a respiração e corre. O gás é espesso. Você precisa de sorte para atravessar sem sofrer os piores efeitos. Teste sua Sorte.",
    choices: [{ text: 'Testar Sorte', action: { type: 'TEST_LUCK', successSectionId: 29, failureSectionId: 28.1 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/28.wav',
  },
  28.1: {
    text: "Você foi Azarado! Você tropeça e inala o vapor. Perca 2 pontos de ENERGIA. Você se arrasta para fora do túnel, sentindo-se fraco.",
    choices: [{ text: 'Continuar', action: { type: 'LOSE_ENERGY', amount: 2, nextSectionId: 29 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/28.1.wav',
  },
  29: {
    text: "Após escapar do túnel de gás, você se recupera. O ar here é fresco e limpo. No chão, você vê um objeto de metal. É um medalhão de prata, manchado, mas com um belo entalhe de uma montanha. Você o guarda. O caminho à sua frente se abre para um salão vasto e cavernoso.",
    choices: [{ text: 'Pegar o medalhão e continuar', action: { type: 'TAKE_ITEM', itemId: 'medalhao_prata', nextSectionId: 30 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/29.wav',
  },
  30: {
    text: "Independentemente do caminho, todos levam a este lugar. Você está na beira de um vasto salão de banquetes em ruínas. Mesas de pedra estão viradas, e estandartes de clãs anões rasgados pendem das paredes. No lado oposto, a uns cinquenta metros, há uma imponente porta dupla de carvalho escuro. O caminho para o coração da cidadela parece estar além dela.",
    choices: [{ text: 'Avançar para a porta', action: { type: 'GOTO', sectionId: 31 } }],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/30.wav',
  },
  31: {
    text: "Você para na entrada do salão para avaliar a situação. O lugar é imenso. Você vê três rotas possíveis para chegar à porta do outro lado.",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/Capitulo%204.png',
    choices: [
        {text: "Seguir pelo caminho central, mais exposto.", action: {type: 'GOTO', sectionId: 32}},
        {text: "Esgueirar-se pela parede da esquerda, nas sombras.", action: {type: 'GOTO', sectionId: 35}},
        {text: "Navegar pelo amontoado de mesas à direita, com mais cobertura.", action: {type: 'GOTO', sectionId: 38}}
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/31.wav',
  },
  32: {
      text: "Você escolhe o caminho do meio. Conforme se aproxima do centro, o ar fica gelado. Figuras translúcidas de anões aparecem, ecos do passado. Um deles, um espectro de rei, se levanta e aponta para você. Sua voz ecoa em sua mente: 'Ladrões e profanadores não passarão!' Ele o encara com uma vontade de ferro.",
      choices: [
          {text: "Encará-lo de volta", action: {type: 'GOTO', sectionId: 33}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/32.wav',
  },
  33: {
      text: "Você está sendo desafiado pelo espírito de um Rei Anão. Para passar, você deve mostrar que tem uma vontade forte. Sua coragem e foco são postos à prova. Teste sua Habilidade.",
      choices: [
          {text: "Testar Habilidade", action: {type: 'TEST_SKILL', successSectionId: 34, failureSectionId: 33.1}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/33.wav',
  },
  33.1: {
      text: "Você recua instintivamente. O fantasma solta um grito de desprezo. Você se sente diminuído. Perca 1 ponto de SORTE permanentemente. O espectro desaparece, deixando-o abalado.",
      choices: [
          {text: "Continuar", action: {type: 'LOSE_ENERGY', amount: 0, nextSectionId: 34}} // HACK: Using LOSE_ENERGY to modify LUCK
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/33.1.wav',
  },
  34: {
      text: "Com os fantasmas desaparecidos, o salão volta ao seu silêncio mortal. Você atravessa o resto do caminho e finalmente chega à grande porta de carvalho.",
      choices: [
          {text: "Ir para a porta", action: {type: 'GOTO', sectionId: 40}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/34.wav',
  },
  35: {
      text: "Você se move pela esquerda, abraçando as sombras. No meio do caminho, você ouve um arrastar úmido, seguido por um estalo. O som vem de trás de um grande pilar caído.",
      choices: [
          {text: "Espiar por cima do pilar", action: {type: 'GOTO', sectionId: 36}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/35.wav',
  },
  36: {
      text: "Você espia e vê uma criatura humanoide pálida, roendo o fêmur de um esqueleto. Ela se vira, seus olhos brilhando. Com um rosnado, a criatura salta em sua direção. É um Carniçal, um devorador de mortos!\n\nCARNIÇAL: Habilidade 7, Energia 8. O toque dele pode paralisar. Se ele vencer um turno, role um dado. Se for 1 ou 2, você perde seu próximo ataque.",
      choices: [
          {text: "Lutar contra o Carniçal!", action: {type: 'FIGHT', enemyId: 'carnical', winSectionId: 37, loseSectionId: 999}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/36.wav',
  },
  37: {
      text: "O Carniçal cai inerte. Você toma um momento para recuperar o fôlego. O resto do caminho pelas sombras é tenso, mas sem mais surpresas. Você chega à grande porta de carvalho.",
      choices: [
          {text: "Ir para a porta", action: {type: 'GOTO', sectionId: 40}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/37.wav',
  },
  38: {
      text: "Você decide que a cobertura dos destroços à direita é sua melhor aposta. O caminho é lento e barulhento. Você precisa ter cuidado. Teste sua Sorte.",
      choices: [
          {text: "Testar Sorte", action: {type: 'TEST_LUCK', successSectionId: 39, failureSectionId: 38.1}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/38.wav',
  },
  38.1: {
      text: "Você é Azarado. Seu pé fica preso. Ao tentar se soltar, você torce o tornozelo. Perca 1 ponto de ENERGIA. Você se liberta mancando e continua com mais cuidado.",
      choices: [
          {text: "Continuar", action: {type: 'LOSE_ENERGY', amount: 1, nextSectionId: 39}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/38.1.wav',
  },
  39: {
      text: "Enquanto navega pelos escombros, algo chama sua atenção: um brilho dourado. Você afasta os destroços e encontra a mão esquelética de um anão agarrando um magnífico Chifre de Ouro Anão. É pesado e valioso. Você o adiciona à sua mochila e atravessa o resto do salão até a grande porta.",
      choices: [
          {text: "Pegar o Chifre e ir para a porta", action: {type: 'TAKE_ITEM', itemId: 'chifre_ouro_anao', nextSectionId: 40}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/39.wav',
  },
  40: {
      text: "Todos os caminhos o levaram até here: a imponente porta dupla de carvalho escuro, reforçada com ferro. Um grande anel de ferro serve como maçaneta. A porta não parece trancada, apenas imensamente pesada. Este é um ponto de passagem importante. O Capítulo 4 está concluído. Quando estiver pronto, reúna suas forças para abrir a porta.",
      choices: [
          {text: "Abrir a porta", action: {type: 'GOTO', sectionId: 41}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/40.wav',
  },
  41: {
    text: "Com um esforço tremendo, você empurra a pesada porta. Ela se abre com um gemido, revelando uma vasta biblioteca de vários andares. O ar cheira a poeira e papel velho. Estantes sobem até um teto abobadado. A única luz vem de uma janela alta. No centro, há um grande púlpito de pedra.",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/Capitulo%205.png',
    choices: [
        {text: "Examinar o púlpito", action: {type: 'GOTO', sectionId: 42}},
        {text: "Vasculhar as prateleiras do térreo", action: {type: 'GOTO', sectionId: 45}},
        {text: "Procurar um caminho para os andares superiores", action: {type: 'GOTO', sectionId: 48}}
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/41.wav',
  },
  42: {
      text: "Você se aproxima do púlpito. Acorrentado a ele, há um livro enorme aberto em uma página com runas anãs. Muito está desbotado, mas uma passagem foi magicamente preservada.",
      choices: [
          {text: "Ler as runas", action: {type: 'GOTO', sectionId: 43}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/42.wav',
  },
  43: {
      text: "As runas dizem: 'Onde a sombra do meio-dia aponta, o verdadeiro Sol repousa. Não confie no brilho falso, mas na pedra que aquece a alma.' Parece uma profecia. Você a memoriza e, ao se virar, nota uma porta secreta atrás de uma estante.",
      choices: [
          {text: "Ir para a porta secreta", action: {type: 'GOTO', sectionId: 50}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/43.wav',
  },
  44: {
      text: "Você encontra um saco de couro esquecido. Dentro, há 3 Peças de Ouro e uma pedra de amolar lisa. Se você gastar minutos para afiar sua arma, pode adicionar 1 ponto ao dano no seu próximo combate. Com essa descoberta, você continua sua busca e nota o contorno de uma porta secreta.",
      choices: [
          {text: "Pegar itens, afiar arma e ir para a porta", action: {type: 'TAKE_ITEM', itemId: 'peca_ouro', nextSectionId: 44.1}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/44.wav',
  },
  44.1: {
      text: "Você pegou 3 Peças de Ouro.",
      choices: [
          {text: "Pegar a pedra de amolar e ir para porta", action: { type: 'TAKE_ITEM', itemId: 'pedra_amolar', nextSectionId: 50}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/44.1.wav',
  },
  45: {
      text: "Você caminha ao longo das estantes. A maioria dos pergaminhos vira pó. Em um nicho, você encontra alguns itens que resistiram ao tempo. Um deles é um livro de couro bem preservado.",
      choices: [
          {text: "Ler o livro", action: {type: 'GOTO', sectionId: 46}},
          {text: "Ignorar o livro e procurar algo mais prático", action: {type: 'GOTO', sectionId: 44}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/45.wav',
  },
  46: {
      text: 'O livro é um bestiário. Uma página chama sua atenção: uma ilustração de um gigante de metal. O texto diz: "O Golem de Ferro de Aethel é invulnerável a lâminas comuns. Sua única fraqueza reside na Runa de Comando em seu peito. Apenas um golpe de um martelo ritual ou um som de pureza cristalina pode rachá-la." Esta informação parece crucial. Após fechar o livro, você nota o contorno de uma porta secreta.',
      choices: [
          {text: "Ir para a porta secreta", action: {type: 'GOTO', sectionId: 50}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/46.wav',
  },
  47: {
      text: "A escada aguenta seu peso. Você chega a uma galeria no segundo andar. Em uma mesa de leitura, o esqueleto de um anão agarra um objeto. Você o pega. É uma Chave de Cristal perfeitamente lapidada, que pulsa com uma luz fraca. Parece importante. Você a guarda e desce, procurando uma saída, e nota o contorno de uma porta secreta.",
      choices: [
          {text: "Pegar a chave e ir para a porta", action: {type: 'TAKE_ITEM', itemId: 'chave_cristal', nextSectionId: 50}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/47.wav',
  },
  48: {
      text: "Você encontra uma escada em espiral de madeira escura. Ela parece antiga e instável. Subir é um risco. Teste sua Sorte.",
      choices: [
          {text: "Testar Sorte", action: {type: 'TEST_LUCK', successSectionId: 47, failureSectionId: 48.1}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/48.wav',
  },
  48.1: {
      text: "Você é Azarado. Um degrau se parte! Você cai. Perca 1 ponto de ENERGIA. A escada desaba, bloqueando o caminho. Você terá que se contentar com o que há no térreo.",
      choices: [
          {text: "Voltar", action: {type: 'LOSE_ENERGY', amount: 1, nextSectionId: 41}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/48.1.wav',
  },
  49: { // This section is referenced implicitly in the original doc, now made explicit.
    text: "Você está prestes a desistir quando seu ombro esbarra em uma estante, que se move. Intrigado, você a empurra. A estante gira, revelando uma passagem escura. Você encontrou a saída!",
    choices: [
        {text: "Entrar na passagem", action: {type: 'GOTO', sectionId: 50}}
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/49.wav',
  },
  50: {
      text: "Você passa pela porta secreta, que se fecha atrás de você. Você está em um corredor diferente. As lajes do chão são polidas, tochas apagadas em suportes de bronze. Você deixou as áreas de guarda e bibliotecas para trás e está entrando em uma parte mais nobre da cidadela.",
      choices: [
          {text: "Continuar pelo corredor", action: {type: 'GOTO', sectionId: 51}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/50.wav',
  },
  51: {
    text: "Você segue pelo corredor polido. O silêncio é profundo. O corredor termina em uma pequena encruzilhada.",
    choices: [
        {text: "À frente: um par de portas maciças (Sala do Trono)", action: {type: 'GOTO', sectionId: 52}, disabledIfVisited: 52},
        {text: "À esquerda: uma porta de ferro sólido com fechadura complexa", action: {type: 'GOTO', sectionId: 55}, disabledIfVisited: 55},
        {text: "À direita: uma porta de madeira de carvalho-branco com entalhes", action: {type: 'GOTO', sectionId: 58}, disabledIfVisited: 58},
        {text: "Seguir para as profundezas da montanha", action: {type: 'GOTO', sectionId: 60}}
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/51.wav'
  },
  52: {
      text: "Você se aproxima das grandes portas da sala do trono. Elas estão entreabertas. Você entra em um salão magnífico, embora coberto de poeira. No extremo oposto, em um trono, está o esqueleto de um rei anão em armadura. Em seus pés, apoiado no trono, está um imenso martelo de guerra.",
      imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/Capitulo%206.png',
      choices: [
          {text: "Aproximar-se para pegar o martelo", action: {type: 'GOTO', sectionId: 53}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/52.wav'
  },
  53: {
      text: "Você atravessa o salão e estende a mão para pegar a arma. No instante em que seus dedos a tocam, os olhos vazios do esqueleto brilham com uma luz vermelha e as portas se fecham! Grades de ferro descem. É uma armadilha! Ao redor, pilhas de ossos se juntam, formando guardas esqueléticos.",
      choices: [
          {text: "Enfrentar os guardas", action: {type: 'GOTO', sectionId: 54}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/53.wav'
  },
  54: {
      text: "Dois Guardas Esqueleto Anões avançam! Você deve lutar por sua vida!\n\nGUARDA ESQUELETO 1: Habilidade 7, Energia 6.",
      choices: [
          {text: "Lutar!", action: {type: 'FIGHT', enemyId: 'guarda_esqueleto_1', winSectionId: 54.1, loseSectionId: 999}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/54.wav'
  },
  54.1: {
      text: "O primeiro esqueleto se desfaz! O segundo avança.\n\nGUARDA ESQUELETO 2: Habilidade 7, Energia 7.",
      choices: [
          {text: "Lutar!", action: {type: 'FIGHT', enemyId: 'guarda_esqueleto_2', winSectionId: 54.2, loseSectionId: 999}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/54.1.wav'
  },
  54.2: {
      text: "Você venceu! A luz nos olhos do rei se apaga, e as grades se recolhem. Você pode pegar o Martelo de Guerra Ritual. Você pode então sair da sala.",
      choices: [
          {text: "Pegar o Martelo e voltar à encruzilhada", action: {type: 'TAKE_ITEM', itemId: 'martelo_guerra_ritual', nextSectionId: 51}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/54.2.wav'
  },
  55: {
      text: "Você encara a porta de ferro. Ela é fria e impenetrável. A fechadura no centro é uma obra-prima da engenharia anã. Arrombá-la parece impossível. Você precisa da chave certa.",
      choices: [
          {text: "Examinar a fechadura", action: {type: 'GOTO', sectionId: 56}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/55.wav'
  },
  56: {
      text: "Você examina a fechadura. Uma chave comum não serviria aqui.",
      choices: [
          {text: "Tentar usar a Chave de Cristal", action: {type: 'GOTO', sectionId: 57}, requiresItem: 'chave_cristal'},
          {text: "Não tenho a chave, voltar", action: {type: 'GOTO', sectionId: 51}, requiresNoItem: 'chave_cristal'}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/56.wav'
  },
  57: {
      text: 'A Chave de Cristal desliza para dentro. Ela não gira, mas emite um pulso de luz e um som de sino. Com um CLANG, a tranca se abre. Você entra no tesouro real, saqueado há muito tempo. No entanto, em um pedestal está um único item: uma Flauta de Prata. Seria este o "som de pureza cristalina"? Você a pega e a guarda.',
      choices: [
          {text: "Pegar a Flauta e voltar", action: {type: 'TAKE_ITEM', itemId: 'flauta_prata', nextSectionId: 51}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/57.wav'
  },
  58: {
      text: "Você abre a porta de madeira. Ela desliza silenciosamente, revelando um quarto luxuoso, agora em desordem e coberto de teias de aranha. O air é pesado com uma sensação de tristeza e perda.",
      choices: [
          {text: "Entrar no quarto", action: {type: 'GOTO', sectionId: 59}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/58.wav'
  },
  59: {
      text: 'Ao entrar, uma forma etérea de uma rainha anã se materializa. "Meu rei se foi...", ela sussurra. "Os invasores levaram tudo... quase tudo." Ela aponta para debaixo da cama. "Meu último presente... para um propósito maior. Leve-o." Com essas palavras, ela se desfaz. Você se ajoelha e encontra uma tábua solta. Dentro de uma caixa, há três Gemas Anãs e uma Poção de Sorte, que restaura sua SORTE ao nível inicial.',
      choices: [
          {text: "Pegar os tesouros e voltar", action: {type: 'TAKE_ITEM', itemId: 'gemas_anas', nextSectionId: 59.1}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/59.wav'
  },
  59.1: {
      text: "Você pegou as Gemas Anãs.",
      choices: [
          {text: "Pegar a Poção de Sorte e voltar", action: {type: 'TAKE_ITEM', itemId: 'pocao_sorte', nextSectionId: 51}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/59.1.wav'
  },
  60: {
      text: "Após explorar, você sente que não há mais nada a fazer here. Você passa pela entrada da sala do trono e segue por um longo corredor que desce. O ar se torna mais frio, e o som de água corrente ecoa. Você chega a uma grande caverna, onde o corredor termina. Diante de você está a Ponte do Guardião, sobre um rio subterrâneo. Do outro lado, um portão monumental.",
      choices: [
          {text: "Atravessar a Ponte do Guardião", action: {type: 'GOTO', sectionId: 61}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/60.wav'
  },
  61: {
      text: "Você pisa na Ponte do Guardião. A pedra é escorregadia. O barulho da água é ensurdecedor. Quando chega ao meio da ponte, uma sombra imensa se projeta do outro lado. Uma figura colossal se move para bloquear seu caminho.",
      imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/Capitulo%207.png',
      choices: [
          {text: "Encarar a criatura", action: {type: 'GOTO', sectionId: 62}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/61.wav'
  },
  62: {
      text: "A criatura é um Troll da Caverna com um porrete de pedra maciça. Ele o encara com olhos pequenos e estúpidos e solta um rugido gutural. Ele não parece disposto a deixá-lo passar.",
      choices: [
          {text: "Sacar sua arma e lutar", action: {type: 'GOTO', sectionId: 63}},
          {text: "Tentar usar a astúcia", action: {type: 'GOTO', sectionId: 65}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/62.wav'
  },
  63: {
      text: "Não há o que negociar. Você empunha sua arma. O Troll sorri e avança para esmagá-lo.\n\nTROLL DA CAVERNA: Habilidade 9, Energia 12.",
      choices: [
          {text: "Lutar contra o Troll!", action: {type: 'FIGHT', enemyId: 'troll_caverna', winSectionId: 64, loseSectionId: 999}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/63.wav'
  },
  64: {
      text: "Com um golpe final, você atinge o Troll em um ponto vital. Ele solta um urro, cambaleia para trás e despenca no rio lá embaixo. Exausto, você atravessa o resto da ponte.",
      choices: [
          {text: "Continuar", action: {type: 'GOTO', sectionId: 69}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/64.wav'
  },
  65: {
      text: "Lutar contra essa montanha de músculos parece suicídio. Você decide apelar para a ganância dos Trolls e abre sua mochila em busca de um suborno.",
      choices: [
          {text: "Oferecer o Chifre de Ouro Anão", action: {type: 'GOTO', sectionId: 66}, requiresItem: 'chifre_ouro_anao'},
          {text: "Oferecer as Gemas Anãs", action: {type: 'GOTO', sectionId: 67}, requiresItem: 'gemas_anas'},
          {text: "Correr para passar por ele", action: {type: 'GOTO', sectionId: 68}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/65.wav'
  },
  66: {
      text: "Você retira o Chifre de Ouro. Ele brilha esplendidamente. Os olhos do Troll se fixam no objeto. Ele solta um grunhido de desejo. Enquanto ele admira o ouro, você aproveita a distração e passa correndo. Você perde o Chifre, mas mantém sua vida.",
      choices: [
          {text: "Continuar", action: {type: 'GOTO', sectionId: 69}} // Item loss is handled by the choice logic
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/66.wav'
  },
  67: {
      text: "Você joga as Gemas Anãs no chão da ponte. As pedras preciosas se espalham, brilhando. O Troll, confuso, se agacha para pegar as pedrinhas. É a sua chance. Você corre e passa por ele.",
      choices: [
          {text: "Continuar", action: {type: 'GOTO', sectionId: 69}} // Item loss is handled by the choice logic
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/67.wav'
  },
  68: {
      text: "Você decide arriscar. Fingindo ir para um lado, você dispara pelo outro. Teste sua Sorte.",
      choices: [
          {text: "Testar Sorte", action: {type: 'TEST_LUCK', successSectionId: 69, failureSectionId: 68.1}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/68.wav'
  },
  68.1: {
      text: "Você é Azarado. O Troll antecipa seu movimento e o atinge com um golpe de raspão. A dor é imensa. Perca 4 pontos de ENERGIA. Você é jogado para a frente e cai do outro lado da ponte, ferido, mas vivo.",
      choices: [
          {text: "Continuar", action: {type: 'LOSE_ENERGY', amount: 4, nextSectionId: 69}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/68.1.wav'
  },
  69: {
      text: "Você está do outro lado da Ponte do Guardião. À sua frente está seu objetivo: um portão monumental, esculpido na rocha, coberto por runas anãs que brilham com uma luz azul fraca.",
      choices: [
          {text: "Aproximar-se do portão", action: {type: 'GOTO', sectionId: 70}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/69.wav'
  },
  70: {
      text: "Você se aproxima do grande portão. No centro, há uma pequena depressão na pedra. Ela tem o formato de um cristal multifacetado. Você percebe que esta porta não se abrirá com força, mas com o item correto.",
      choices: [
          {text: "Examinar o portão", action: {type: 'GOTO', sectionId: 71}}
      ],
      audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/70.wav'
  },
  71: {
    text: "Você encara o portão silencioso. A força bruta parece inútil. A solução deve ser mais sutil. Você pondera suas opções.",
    choices: [
      { text: "Usar a Chave de Cristal na depressão", action: { type: 'GOTO', sectionId: 72 }, requiresItem: 'chave_cristal' },
      { text: "Tentar usar o Martelo de Guerra Ritual para quebrar o portão", action: { type: 'GOTO', sectionId: 74 }, requiresItem: 'martelo_guerra_ritual' },
      { text: "Procurar por outro mecanismo na área", action: { type: 'GOTO', sectionId: 75 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/71.wav'
  },
  72: {
    text: "Você retira a Chave de Cristal. Ao aproximá-la, ela começa a vibrar e a emitir uma luz azul intensa, em harmonia com as runas. Com a mão firme, você insere a chave. Ela se encaixa perfeitamente.",
    choices: [
      { text: "Observar", action: { type: 'GOTO', sectionId: 73 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/72.wav'
  },
  73: {
    text: "No momento em que a chave se encaixa, uma onda de energia azul emana do portão. As runas brilham com um poder ofuscante, e um som profundo e ressonante ecoa. Lentamente, a laje de pedra se recolhe, revelando uma passagem escura. O caminho está aberto.",
    choices: [
      { text: "Entrar", action: { type: 'GOTO', sectionId: 76 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/73.wav'
  },
  74: {
    text: "Você empunha o Martelo de Guerra Ritual e o golpeia contra o portão. O impacto cria um CLANG metálico, mas a porta permanece intocada. Pior, uma onda de choque mágica é refletida, derrubando-o. Perca 1 ponto de ENERGIA. Fica claro que este portão é imune a danos físicos.",
    choices: [
      { text: "Voltar e reavaliar", action: { type: 'LOSE_ENERGY', amount: 1, nextSectionId: 71 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/74.wav'
  },
  75: {
    text: "Você investiga a área, procurando por mecanismos escondidos, mas não encontra nada. A parede é de rocha sólida e lisa. A única característica notável é a depressão no centro do portão. A solução tem que estar ali.",
    choices: [
      { text: "Voltar e reavaliar", action: { type: 'GOTO', sectionId: 71 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/75.wav'
  },
  75.1: {
    text: "Você investiga cada centímetro da rocha ao redor do portão, mas não encontra nada. A parede é de rocha sólida e impenetrável. A terrível verdade o atinge como uma rocha caindo: você veio até aqui, explorou as profundezas, mas esqueceu um item crucial em algum lugar para trás. O caminho para a Pedra Solar está irrevogavelmente fechado para você. Sua jornada termina não em uma batalha gloriosa, mas em um silêncio frustrante, um enigma sem solução.\n\nSEU FINAL É O FRACASSO.",
    choices: [
        { text: "Sua aventura termina aqui.", action: { type: 'END_GAME', outcome: 'failure' } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/75.1.wav',
  },
  76: {
    text: "Você atravessa o portal. As paredes, o chão e o teto são de obsidiana polida. O ar é pesado e carregado de energia. Este é o santuário interior. O corredor leva a uma única e imponente porta de ferro negro no final.",
    choices: [
      { text: "Aproximar-se da porta de ferro", action: { type: 'GOTO', sectionId: 77 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/76.wav'
  },
  77: {
    text: "Você chega à porta de ferro. Ela é fria e silenciosa. Não há fechadura, apenas uma linha fina mostrando onde se abre. Parece estar esperando por alguém digno. Atrás desta porta está a Pedra do Sol... e seu guardião. Se precisa se curar, este é o momento.",
    choices: [
      { text: "Empurrar a porta", action: { type: 'GOTO', sectionId: 78 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/77.wav'
  },
  78: {
    text: "A porta de ferro se abre, revelando a câmara final. O salão é circular e vasto. No centro, sobre um pedestal de obsidiana, repousam dois objetos. Mas entre você e o pedestal está o guardião. Com quase três metros de altura, feito de placas de ferro negro, está o Golem de Ferro. Runas vermelhas brilham em seu peito. No momento em que você entrou, sua cabeça girou, e seus olhos, duas brasas incandescentes, se fixaram em você.",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capitulo%208.png',
    choices: [
      { text: "Enfrentar o Golem", action: { type: 'GOTO', sectionId: 79 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/78.wav'
  },
  79: {
    text: "O Golem de Ferro dá um passo pesado, o chão tremendo. Ele é uma força silenciosa e implacável. Ele levanta seus punhos maciços. A batalha final está prestes a começar, e você se lembra do que leu no bestiário: lâminas comuns são inúteis contra ele.",
    choices: [
      { text: "Decidir como lutar", action: { type: 'GOTO', sectionId: 81 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/79.wav'
  },
  80: { // Section 80 from PDF is combined into 79/81 in this flow
    text: "Você ignora o aviso de sua memória e ataca o Golem com sua melhor arma. O golpe acerta o torso de metal com um CLANG agudo. Sua lâmina recocheteia, sem deixar um arranhão. O Golem contra-ataca com um balanço de seu braço maciço. Você se esquiva por pouco. A verdadeira batalha começa agora.",
    choices: [
      { text: "Repensar a estratégia", action: { type: 'GOTO', sectionId: 81 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/80.wav'
  },
  81: {
    text: "O Golem avança, implacável. Sua mente corre, vasculhando as pistas que você encontrou. A força bruta falhou. Você precisa de um plano.",
    choices: [
      { text: "Usar o Martelo de Guerra Ritual", action: { type: 'GOTO', sectionId: 82 }, requiresItem: 'martelo_guerra_ritual' },
      { text: "Usar a Flauta de Prata", action: { type: 'GOTO', sectionId: 84 }, requiresItem: 'flauta_prata' },
      { text: "Tentar desequilibrar o gigante de metal", action: { type: 'GOTO', sectionId: 86 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/81.wav'
  },
  82: {
    text: "Você empunha o pesado Martelo de Guerra Ritual. Ele parece vibrar. O Golem se aproxima. Sua única chance é se esquivar do golpe e acertar a Runa de Comando em seu peito. É um alvo pequeno e um movimento arriscado.",
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capitulo%208.png',
    choices: [
      { text: "Tentar o golpe", action: { type: 'GOTO', sectionId: 83 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/82.wav'
  },
  83: {
    text: "Você se prepara para o momento exato. Teste sua Habilidade.",
    choices: [
      { text: "Testar Habilidade", action: { type: 'TEST_SKILL', successSectionId: 88, failureSectionId: 83.1 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/83.wav'
  },
  83.1: {
    text: "Você é lento demais. O punho do Golem o atinge com a força de uma avalanche. Você é jogado contra a parede. Perca 6 pontos de ENERGIA. Se você sobreviver, você cai no chão, quebrado e derrotado, enquanto o Golem se aproxima para terminar o serviço.",
    choices: [
      { text: "Sucumbir...", action: { type: 'LOSE_ENERGY', amount: 6, nextSectionId: 999 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/83.1.wav'
  },
  84: {
    text: "Você retira a Flauta de Prata. Enquanto o Golem avança, você leva o instrumento aos lábios e sopra. O som que emerge é milagrosamente puro e cristalino, uma onda de som perfeito.",
    choices: [
      { text: "Observar o efeito", action: { type: 'GOTO', sectionId: 85 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/84.wav'
  },
  85: {
    text: "O Golem para abruptamente. A Runa de Comando em seu peito começa a vibrar. Primeiro, uma pequena rachadura aparece. Então, com um som agudo, a runa se parte em mil pedaços de luz vermelha.",
    choices: [
      { text: "O Golem foi derrotado!", action: { type: 'GOTO', sectionId: 88 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/85.wav'
  },
  86: {
    text: "Sem nenhum item especial, sua situação é desesperadora. Sua única esperança é usar o ambiente. Você corre em direção ao pedestal, esperando que o Golem o siga e talvez tropece.",
    choices: [
      { text: "Tentar a sorte", action: { type: 'GOTO', sectionId: 87 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/86.wav'
  },
  87: {
    text: "Você corre, o som dos passos de metal do Golem logo atrás de você. Teste sua Sorte.",
    choices: [
      { text: "Testar Sorte", action: { type: 'TEST_LUCK', successSectionId: 94, failureSectionId: 87.1 } } // Goes to 94, then 99 for partial success
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/87.wav'
  },
  87.1: {
    text: "Você é Azarado. O Golem não se deixa enganar. Ele o alcança e o agarra com sua mão de ferro. Não há escapatória. Sua aventura termina em um aperto esmagador.",
    choices: [
      { text: "Fim da linha.", action: { type: 'END_GAME', outcome: 'failure' } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/87.1.wav'
  },
  88: {
    text: "A luz nos olhos do Golem de Ferro se apaga. Ele congela no lugar, tornando-se uma estátua inofensiva. O silêncio retorna à câmara. O guardião foi derrotado. O caminho para a Pedra do Sol está livre.",
    choices: [
      { text: "Aproximar-se do pedestal", action: { type: 'GOTO', sectionId: 89 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/88.wav'
  },
  89: {
    text: 'Você se aproxima do pedestal de obsidiana. Sobre ele, estão dois objetos. À esquerda, uma gema do tamanho do seu punho, que brilha com uma luz interna. À direita, uma pedra simples, cinzenta e sem brilho. Você se lembra do enigma: "Não confie no brilho falso, mas na pedra que aquece a alma." A escolha final é sua.',
    imageUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capitulo%2010.png',
    choices: [
      { text: "Escolher", action: { type: 'GOTO', sectionId: 90 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/89.wav'
  },
  90: {
    text: "Sua jornada o levou a este momento. Sua mão paira sobre os dois artefatos.",
    choices: [
      { text: "Pegar a gema brilhante", action: { type: 'GOTO', sectionId: 91 } },
      { text: "Pegar a pedra cinzenta", action: { type: 'GOTO', sectionId: 95 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/90.wav'
  },
  91: {
    text: "Você confia em seus instintos. Você estende a mão e pega a gema brilhante. Ela pulsa com poder. Por um momento, você se sente triunfante. Mas a luz se intensifica, tornando-se branca e cegante, e uma dor aguda percorre seu braço.",
    choices: [
      { text: "O quê?!", action: { type: 'GOTO', sectionId: 92 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/91.wav'
  },
  92: {
    text: 'A luz se solidifica ao seu redor, formando correntes de energia. Você tenta largar a gema, mas ela está presa à sua mão. Uma voz antiga ecoa em sua mente: "Um guardião caiu... um novo guardião se erguerá. A Pedra Solar deve ser protegida." Você percebe o terrível erro.',
    choices: [
      { text: "Não pode ser...", action: { type: 'GOTO', sectionId: 93 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/92.wav'
  },
  93: {
    text: "Sua consciência é arrancada de seu corpo. Você vê, como um espectador, seu próprio corpo cair inerte. Sua alma é puxada e derramada na carcaça de ferro do Golem. As runas em seu peito brilham novamente. Você está aprisionado, o novo Golem, obrigado a guardar o verdadeiro artefato por toda a eternidade.\n\nSEU FINAL É O FRACASSO SOMBRIO.",
    choices: [
      { text: "Sua aventura termina aqui.", action: { type: 'END_GAME', outcome: 'failure' } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/93.wav'
  },
  94: {
    text: "Você foi Sortudo! O Golem está caído, mas você sabe que não o destruiu. Ele está apenas incapacitado. Você não tem tempo. A gema brilhante é a mais próxima e mais chamativa. Você corre até o pedestal, arranca a gema brilhante e, sem olhar para trás, dispara para fora da câmara.",
    choices: [
        {text: "Fugir com a gema!", action: {type: 'GOTO', sectionId: 99}}
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/94.wav'
  },
  95: {
    text: 'Você resiste ao chamado da gema vistosa. O enigma ecoa em sua mente: "...a pedra que aquece a alma." Você estende a mão e pega a pedra cinzenta. Ela é pesada e fria ao toque. Por um instante, você teme ter cometido um erro terrível.',
    choices: [
      { text: "...", action: { type: 'GOTO', sectionId: 96 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/95.wav'
  },
  96: {
    text: "Mas então, acontece. Um calor profundo, não mágico, mas um calor de vida, começa a emanar da pedra. A calidez se espalha por sua mão, sobe pelo seu braço e preenche seu ser com uma sensação de coragem e paz. O peso do cansaço e dos ferimentos parece diminuir. Esta é a verdadeira Pedra do Sol.",
    choices: [
      { text: "Eu consegui!", action: { type: 'GOTO', sectionId: 97 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/96.wav'
  },
  97: {
    text: "Com a verdadeira Pedra do Sol em sua posse, a atmosfera da câmara muda. A energia opressiva se dissipa. Ao olhar para trás do pedestal, você nota algo novo: um conjunto de runas na parede do fundo, antes invisíveis, agora brilha, revelando uma passagem secreta.",
    choices: [
      { text: "Pegar o caminho do herói para casa", action: { type: 'GOTO', sectionId: 98 } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/97.wav'
  },
  98: {
    text: "Você entra na passagem secreta. É um túnel longo e ascendente. Após o que parece uma hora, você sente uma brisa fresca e vê uma luz natural. Você emerge em uma saliência na encosta da montanha. O sol está se pondo. A Pedra em sua mão pulsa em harmonia com a luz. Você conseguiu.\n\nSEU FINAL É O SUCESSO VERDADEIRO. PARABÉNS!",
    choices: [
      { text: "Sua aventura termina aqui.", action: { type: 'END_GAME', outcome: 'victory' } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/98.wav'
  },
  99: {
    text: "Você corre desesperadamente. Passa pela porta de ferro, pelo corredor de obsidiana, pelo portão rúnico. Você não para na Ponte, nem nos Alojamentos. Finalmente, ofegante e exausto, você sai para a luz do dia na entrada da caverna.",
    choices: [
        {text: "Examinar seu prêmio", action: {type: 'GOTO', sectionId: 100}}
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/99.wav'
  },
  100: {
    text: "Longe do perigo, você para e examina seu prêmio. A gema é uma obra-prima, valendo uma fortuna. Você será mais rico do que qualquer rei. No entanto, a gema é fria ao toque. No fundo de seu coração, você tem a sensação de que deixou o verdadeiro tesouro para trás. Sua aventura foi lucrativa, mas não lendária.\n\nSEU FINAL É O SUCESSO PARCIAL.",
    choices: [
      { text: "Sua aventura termina aqui.", action: { type: 'END_GAME', outcome: 'partial_success' } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/100.wav'
  },
  999: { // Game Over Section
    text: "Seus ferimentos são fatais. Você cai no chão frio da caverna, e a escuridão o consome. Sua busca pela Pedra do Sol e sua vida chegam a um fim trágico.",
    choices: [
        { text: "Sua aventura termina aqui.", action: { type: 'END_GAME', outcome: 'failure' } }
    ],
    audioUrl: 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/999.wav',
  }
};
