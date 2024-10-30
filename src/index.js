

const player1 = {
    name: "Mario",
    speed: 4,
    maneuverability: 3,
    power: 3,
    points: 0,
}

const player2 = {
    name: "Luigi",
    speed: 3,
    maneuverability: 4,
    power: 4,
    points: 0,
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

(async function startMessage(){
    console.log(`🏁🚨 Iniciando a corrida entre \n ${player1.name} e ${player2.name} começando...`)
})()


console.log(rollDice())

