const current = document.querySelector('.current')
const forecast = document.querySelector('.forecast')

const getHoursMinutes = () => {
    const currentDate = new Date()
    const hours = String(currentDate.getHours()).padStart(2, '0')
    const minutes = String(currentDate.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
}


const getTimeUser = () => {
    const currentDate = new Date()
    const hours = String(currentDate.getHours()).padStart(2, '0')
    return `${hours}`
}
let dayPlus = 0
const getYearMonthDayUser = () => {
    const currentDate = new Date()
    dayPlus++
    const year = String(currentDate.getFullYear()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate() + dayPlus).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const renderCurrent = (data) => {
    const template = `
        <div>
            <p>${data.city.name}</p>
            <p>${getHoursMinutes()}</p>
        </div>
        <div>
            <img width='80' height='80' src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="">
            <p>${data.list[0].weather[0].main}</p>
            <p>${Math.round(data.list[0].main.temp)} C°</p>
        </div>
        <div>
            <p>Speed</p>
            <p>${data.list[0].wind.speed} m/s</p>
        </div>`
    current.innerHTML = template
}
const renderForecast = (data) => {
    for(let i = 0;i < 40;i += 8) {
        const template = `
            <div class="row"> 
                <div>
                    <p>${getYearMonthDayUser()}</p>
                    <p>${getTimeUser()}:00:00</p>
                </div>
                <img width='80' height='80' src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="">
                <span>${Math.round(data.list[i].main.temp)}°</span>
            </div>
        `
        forecast.innerHTML += template
    }
}

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247&units=metric')
.then((response) => response.json())
.then((data) => {
    renderCurrent(data)
    renderForecast(data)
})
