let round = 1;
const player1 = {
    name: "Mario",
    speed: 4,
    maneuverability: 3,
    power: 3,
    points: 0,
};

const player2 = {
    name: "Luigi",
    speed: 3,
    maneuverability: 4,
    power: 4,
    points: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;
    
    // Verifica se o round atual é o primeiro
    if (round === 1) {
        result = "RETA";
    } else {
        // A partir do segundo round, sorteia aleatoriamente o bloco
        switch (true) {
            case random <= 0.33:
                result = "RETA";
                break;
            case random <= 0.66:
                result = "CURVA DIREITA";
                break;
            default:
                result = "CONFRONTO";
        }
    }
    return result;
}

async function playRaceEngine(character1, character2) {
    for (round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);
        
        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`🏁 Bloco sorteado: ${block}`);
        
        // Jogar dado (exemplo de uso do dado)
        let diceRoll1 = await rollDice();
        let diceRoll2 = await rollDice();
        console.log(`${character1.name} rolou: ${diceRoll1}`);
        console.log(`${character2.name} rolou: ${diceRoll2}`);
        
        // Lógica para determinar o vencedor do round pode ser adicionada aqui
        
        console.log(`-----`);
    }
}

(async function main() {
    console.log(`🏁🚨 Iniciando a corrida entre ${player1.name} e ${player2.name} começando...`);
    await playRaceEngine(player1, player2);
})();
