const statisticsPanel = document.getElementById('statistics_panel')
const start = document.getElementById('start')
const game = document.getElementById('game')
const time = document.getElementById('time')
const result = document.getElementById('result')
const resultH1 = document.getElementById('result-header')
const inputTime = document.getElementById('game-time')

const colors = [
    "#FF5555", // red
    "#FFB86C", // orange
    "#F1FA8C", // yellow
    "#50FA7B", // green
    "#8BE9FD", // cyan
    "#BD93F9", // purple
    "#FF79C6"  // pink
];

const userWidthWindow = document.body.clientWidth
const userHeightWindow = document.body.clientHeight

let score = 0
let isGameActive = false

if (localStorage.score) {
    result.textContent = localStorage.score
} 

const endGame = () => {
    isGameActive = false   
    game.innerHTML = ''
    resultH1.classList.remove("hide")
    localStorage.score = score
    result.innerHTML = score
    statisticsPanel.style.top = '35%'
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
    const widthAndHeight = getRandom(200,400)
    gameCub.style.width = `${widthAndHeight}px`
    gameCub.style.height = `${widthAndHeight}px`
    gameCub.style.top = `${getRandom(50,userHeightWindow - 400)}px`
    gameCub.style.left = `${getRandom(50,userWidthWindow - 400)}px`
    gameCub.style.backgroundColor = colors[getRandom(0,colors.length)]
    game.append(gameCub)
    game.addEventListener('click', gameBoxClick);
}

const startGame = () => {
    isGameActive = true
    resultH1.classList.add("hide")
    score = 0
    time.textContent = inputTime.value

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
    statisticsPanel.style.top = '-500px'
    setTimeout(() => {
        startGame()
    }, 300);

})

console.log(document.body.clientWidth)



