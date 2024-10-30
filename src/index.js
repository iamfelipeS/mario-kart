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
        console.log(`🏁 Rodada ${round}`);

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
            } else if (totalTestSkill1 === totalTestSkill2) {
                console.log("Empate! Nenhum ponto atribuído.");
            } else {
                if (totalTestSkill1 > totalTestSkill2) {
                    character1.points += 1;
                    console.log(`${character1.name} ganha 1 ponto!`);
                } else if (totalTestSkill2 > totalTestSkill1) {
                    character2.points += 1;
                    console.log(`${character2.name} ganha 1 ponto!`);
                }
            }
        }

        console.log(`------------------> ${character1.name.toUpperCase()} (${character1.points}) vs (${character2.points}) ${character2.name.toUpperCase()} <------------------\n`);
    }
}

(async function main() {
    console.log(`🏁🚨 Iniciando a corrida entre ${player1.name} e ${player2.name}...\n`);
    await playRaceEngine(player1, player2);
    await showWinner();
})();
// Função para mostrar o vencedor
async function showWinner() {
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
