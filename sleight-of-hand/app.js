const start = document.getElementById('start')
const game = document.getElementById('game')
const time = document.getElementById('time')
const result = document.getElementById('result')
const timeH1 = document.getElementById('time-header')
const resultH1 = document.getElementById('result-header')
const inputTime = document.getElementById('game-time')

let score = 0
let isGameActive = false

const endGame = () => {
    isGameActive = false   
    game.innerHTML = ''
    start.classList.remove("hide")
    timeH1.classList.add("hide")
    resultH1.classList.remove("hide")
    resultH1.innerHTML = score
    inputTime.removeAttribute('disabled');
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
const gameBoxClick = (event) => {
    if (!isGameActive) {
        console.log
        return
    }
    if (event.target.classList.contains('gameCub')) {
        score++
        game.innerHTML = '';
        renderBox()
    }
}


const renderBox = () => {
    const gameCub = document.createElement('div')
    gameCub.classList.add('gameCub')
    gameCub.getAttribute('id', 'game_cub')
    const widthAndHeight = getRandom(40,50)
    gameCub.style.width = `${widthAndHeight}px`
    gameCub.style.height = `${widthAndHeight}px`
    gameCub.style.top = `${getRandom(50,250)}px`
    gameCub.style.left = `${getRandom(50,250)}px`

    game.append(gameCub)
    game.addEventListener('click', gameBoxClick);
}

const startGame = () => {
    isGameActive = true
    start.classList.add("hide")
    timeH1.classList.remove("hide")
    resultH1.classList.add("hide")
    score = 0
    time.textContent = inputTime.value
    inputTime.disabled = true // подругому оно не заработало
    renderBox()
    let interval = setInterval(function(){ 
        let currentTime = time.textContent
        if(currentTime <= 0) {
            clearInterval(interval);
            endGame()
        } else {
            time.textContent = (currentTime - 0.1).toFixed(1)
        }
    },100)
}

start.addEventListener('click', () => {
    startGame()
    
})

