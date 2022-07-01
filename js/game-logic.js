// All code should be written in this file.
var playerOneMoveOneType = undefined
var playerOneMoveTwoType = undefined
var playerOneMoveThreeType = undefined
var playerOneMoveOneValue = undefined
var playerOneMoveTwoValue = undefined
var playerOneMoveThreeValue = undefined
var playerTwoMoveOneType = undefined
var playerTwoMoveTwoType = undefined
var playerTwoMoveThreeType = undefined
var playerTwoMoveOneValue = undefined
var playerTwoMoveTwoValue = undefined
var playerTwoMoveThreeValue = undefined

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
    var centinela = true
    Array.from(arguments).forEach(parametro => {
        if (typeof parametro === 'undefined') {
            centinela = false
        }
        if (parametro !== "Player One" && parametro !== "Player Two" && parametro !== "rock" && parametro !== "scissors" && parametro !== "paper" && isNaN(parametro)) {
            centinela = false
        }
        if (!isNaN(parametro)) {
            if (parametro < 1 || parametro > 99) {
                centinela = false
            }
        }
    })
    
    if (!centinela) {
        return false
    }
    let suma = moveOneValue + moveTwoValue + moveThreeValue
    if(suma > 99) {
        return false
    }

    if (player === "Player One") {
        playerOneMoveOneType = moveOneType
        playerOneMoveTwoType = moveTwoType
        playerOneMoveThreeType = moveThreeType
        playerOneMoveOneValue = moveOneValue
        playerOneMoveTwoValue = moveTwoValue
        playerOneMoveThreeValue = moveThreeValue
    }
    if (player === "Player Two") {
        playerTwoMoveOneType = moveOneType
        playerTwoMoveTwoType = moveTwoType
        playerTwoMoveThreeType = moveThreeType
        playerTwoMoveOneValue = moveOneValue
        playerTwoMoveTwoValue = moveTwoValue
        playerTwoMoveThreeValue = moveThreeValue
    }
}

function getRoundWinner(number) {
    let tirada
    if (number == 1) {
        tirada = comprobarTirada(playerOneMoveOneType, playerTwoMoveOneType)
        if (tirada === "win") {
            return ("Player One")
        } else if (tirada === "lose") {
            return ("Player Two")
        } else if (tirada === "draw") {
            if (playerOneMoveOneValue === undefined || playerTwoMoveOneValue === undefined ) {
                return null
            }
            if (playerOneMoveOneValue > playerTwoMoveOneValue) {
                return ("Player One")
            } else if (playerOneMoveOneValue < playerTwoMoveOneValue) {
                return ("Player Two")
            }
            return ("Tie")
        } 
        return null
    } else if (number == 2) {
        tirada = comprobarTirada(playerOneMoveTwoType, playerTwoMoveTwoType)
        if (tirada === "win") {
            return ("Player One")
        } else if (tirada === "lose") {
            return ("Player Two")
        } else if (tirada === "draw") {
            if (playerOneMoveTwoValue === undefined || playerTwoMoveTwoValue === undefined ) {
                return null
            }
            if (playerOneMoveTwoValue > playerTwoMoveTwoValue) {
                return ("Player One")
            } else if (playerOneMoveTwoValue < playerTwoMoveTwoValue) {
                return ("Player Two")
            }
            return ("Tie")
        }
        return null
    } else if (number == 3) {
        tirada = comprobarTirada(playerOneMoveThreeType, playerTwoMoveThreeType)
        if (tirada === "win") {
            return ("Player One")
        } else if (tirada === "lose") {
            return ("Player Two")
        } else if (tirada === "draw") {
            if (playerOneMoveThreeValue === undefined || playerTwoMoveThreeValue === undefined ) {
                return null
            }
            if (playerOneMoveThreeValue > playerTwoMoveThreeValue) {
                return ("Player One")
            } else if (playerOneMoveThreeValue < playerTwoMoveThreeValue) {
                return ("Player Two")
            }
            return ("Tie")
        }
        return null
    } else {
        return null
    }
}

function getGameWinner() {
    let uno = 0
    let dos = 0
    let centinela = false
    for (let i = 1; i <= 3; i++) {
        let valor = getRoundWinner(i)
        if (valor == null) {
            centinela = true
        }
        if (valor === "Player One") {
            uno++
        } else if (valor === "Player Two") {
            dos++
        }
    }
    if (centinela) {
        return null
    }
    if (uno > dos) {
        return "Player One"
    } else if (uno < dos) {
        return "Player Two"
    } else {
        return "Tie"
    }
}

function setComputerMoves() {
    playerTwoMoveOneType = generarMovimiento()
    playerTwoMoveTwoType = generarMovimiento()
    playerTwoMoveThreeType = generarMovimiento()
    let puntos = 99
    playerTwoMoveOneValue = getRandomInt(puntos - 2) + 1
    puntos -= playerTwoMoveOneValue
    playerTwoMoveTwoValue = getRandomInt(puntos - 2) + 1
    playerTwoMoveThreeValue = puntos - playerTwoMoveTwoValue
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const generarMovimiento = () => {
    let num = getRandomInt(3)
    if (num == 0) {
        return "rock"
    } else if (num == 1) {
        return "paper"
    } else {
        return "scissors"
    }
}

const comprobarTirada = (one, two) => {
    if (one === undefined || two == undefined) {
        return null
    }
    if (one === "rock") {
        if (two === "rock") {
            return "draw"
        } else if (two === "scissors") {
            return "win"
        } else if (two === "paper") {
            return "lose"
        }
    } else if (one === "scissors") {
        if (two === "rock") {
            return "lose"
        } else if (two === "scissors") {
            return "draw"
        } else if (two === "paper") {
            return "win"
        }
    } else if (one === "paper") {
        if (two === "rock") {
            return "win"
        } else if (two === "scissors") {
            return "lose"
        } else if (two === "paper") {
            return "draw"
        }
    }
}