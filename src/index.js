import characters from './characters.js';

let round = 1;

//Função selecionar personagem para os Players
async function selectCharacter() {
    // Escolha do personagem para o Player 1
    console.log("\n📢 Escolha um personagem para o Player 1: ");
    const player1Character = await askForCharacter("Player 1");

    // Escolha do personagem para o Player 2
    console.log("\n📢 Escolha um personagem para o Player 2: ");
    const player2Character = await askForCharacter("Player 2");

    return [player1Character, player2Character];

    function askForCharacter(player) {
        // Mostrar no console as opções de personagens
        console.log("Escolha pelo código do personagem:");
        characters.forEach(character => {
            console.log(`${character.code} - ${character.name}`);
        });

        // Pausar a execução da função para entrada do usuário
        return new Promise((resolve) => {
            // Coletar o código digitado pelo usuário
            process.stdin.once('data', (data) => {
                const code = data.toString().trim();
                const character = characters.find(c => c.code === parseInt(code));
                if (character) {
                    console.log(`\n${player} escolheu ${character.name}!\n`);
                    resolve(character);
                } else {
                    console.log('Opção inválida. Tente novamente.');
                    resolve(askForCharacter(player)); // Reexecuta a função em caso de entrada inválida
                }
            });
        });
    }
}

// Função para retornar um dado de 6 lados
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
// Função para retornar um bloco da pista aleatóriamente
async function getRandomBlock() {
    let random = Math.random();
    let result;

    if (round === 1) {
        result = "RETA";
    } else {
        switch (true) {
            case random <= 0.33:
                result = "RETA";
                break;
            case random <= 0.66:
                result = "CURVA";
                break;
            default:
                result = "CONFRONTO";
        }
    }
    return result;
}
// Função para mostrar o resultado do teste
async function logRollResult(character1, character2, diceRoll1, diceRoll2, skillType, skillValue1, skillValue2, totalTestSkill1, totalTestSkill2) {
    const skillIcons = { "Velocidade": "⚡", "Manobrabilidade": "🔄", "Força": "💪" };

    console.log(`${character1.name} 🎲 ${diceRoll1} + ${skillValue1}${skillIcons[skillType]} ${skillType} = ${totalTestSkill1}`);
    console.log(`${character2.name} 🎲 ${diceRoll2} + ${skillValue2}${skillIcons[skillType]} ${skillType} = ${totalTestSkill2}`);
    console.log(`🎯 Resultado final: ${character1.name}: ${totalTestSkill1} vs ${character2.name}: ${totalTestSkill2}`);
}
// Função para executar a corrida
async function playRaceEngine(character1, character2) {
    for (round = 1; round <= 5; round++) {
        console.log(`📢 Rodada ${round}`);

        let block = await getRandomBlock();
        console.log(`🏁 Bloco sorteado: ${block}`);

        let diceRoll1 = await rollDice();
        let diceRoll2 = await rollDice();

        let totalTestSkill1, totalTestSkill2;
        let skillType;
        let skillValue1, skillValue2;

        if (block === "RETA") {
            skillType = "Velocidade";
            skillValue1 = character1.speed;
            skillValue2 = character2.speed;
            totalTestSkill1 = diceRoll1 + skillValue1;
            totalTestSkill2 = diceRoll2 + skillValue2;
        } else if (block === "CURVA") {
            skillType = "Manobrabilidade";
            skillValue1 = character1.maneuverability;
            skillValue2 = character2.maneuverability;
            totalTestSkill1 = diceRoll1 + skillValue1;
            totalTestSkill2 = diceRoll2 + skillValue2;
        } else if (block === "CONFRONTO") {
            skillType = "Força";
            skillValue1 = character1.power;
            skillValue2 = character2.power;
            totalTestSkill1 = diceRoll1 + skillValue1;
            totalTestSkill2 = diceRoll2 + skillValue2;
        }

        await logRollResult(character1, character2, diceRoll1, diceRoll2, skillType, skillValue1, skillValue2, totalTestSkill1, totalTestSkill2);

        if (block === "RETA" || block === "CURVA") {
            if (totalTestSkill1 > totalTestSkill2) {
                character1.points += 1;
                console.log(`${character1.name} ganha 1 ponto!`);
            } else if (totalTestSkill2 > totalTestSkill1) {
                character2.points += 1;
                console.log(`${character2.name} ganha 1 ponto!`);
            } else {
                console.log("Empate! Nenhum ponto ganho.");
            }
        } else if (block === "CONFRONTO") {
            if (totalTestSkill1 > totalTestSkill2 && character2.points > 0) {
                character2.points -= 1;
                console.log(`${character2.name} perdeu 1 ponto!`);
            } else if (totalTestSkill2 > totalTestSkill1 && character1.points > 0) {
                character1.points -= 1;
                console.log(`${character1.name} perdeu 1 ponto!`);
            } else if (character1.points === 0 && character2.points === 0) {
                console.log("O jogador não tem pontos para perder.");
            } else {
                console.log("Empate no confronto! Nenhum ponto perdido.");
            }
        }

        console.log(`------------------> ${character1.name.toUpperCase()} (${character1.points}) vs (${character2.points}) ${character2.name.toUpperCase()} <------------------\n`);
    }
}
// Função para mostrar o vencedor
async function showWinner(player1, player2) {
    if (player1.points > player2.points) {
        console.log("||||||||||||||||||||||||||||||||||||")
        console.log(`🏁🏁🏆 ${player1.name.toUpperCase()} VENCEU A CORRIDA! 🏆🏁🏁`);
        console.log("||||||||||||||||||||||||||||||||||||")
    } else if (player2.points > player1.points) {
        console.log("||||||||||||||||||||||||||||||||||||")
        console.log(`🏁🏁🏆 ${player2.name.toUpperCase()} VENCEU A CORRIDA! 🏆🏁🏁`);
        console.log("||||||||||||||||||||||||||||||||||||")
    } else {
        console.log("🏁 Empate! 🏁");
    }
}
// Inicia a corrida
(async function main() {
    const [player1, player2] = await selectCharacter();
    console.log(`🏁🚨 Iniciando a corrida entre ${player1.name} e ${player2.name}...\n`);
    await playRaceEngine(player1, player2);
    await showWinner(player1, player2);

    process.exit();
})();

