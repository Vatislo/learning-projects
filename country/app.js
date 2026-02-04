const row = document.querySelector(".row")

const numTransleteLimon = (num) => {
    const roundedNumber = Math.round(num / 100000) / 10 * 1000000
    return `${(roundedNumber / 1000000).toFixed(1)} M`
}

const getCard = (data) => {
    for(let i = 0;i < 120;i++) {

        const flagsCountry = data[i].flags.png ? data[i].flags.png : null
        const nameCountry = data[i].name.common ? data[i].name.common : null
        const regionCountry = data[i].region ? data[i].region : null

        const languagesCountry = Object.values(data[i].languages) ? Object.values(data[i].languages) : null
  

        const currenciesCountry = Object.values(data[i].currencies).map(c=>`${c.symbol} ${c.name}`).join(', ')

        const populationCountry = numTransleteLimon(data[i].population) ?  numTransleteLimon(data[i].population) : "zero"
        
        const template = `
            <div class="col">
                <div class="card">
                    <img src="${flagsCountry}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${nameCountry}</h5>
                        <p class="card-text">${regionCountry}</p>
                        <p class="card-text"><i class="fa-solid fa-house-chimney-user"></i>${populationCountry}</p>
                        <p class="card-text"><i class="fa-solid fa-earth-europe"></i></i>${languagesCountry}</p>
                        <p class="card-text"><i class="fa-solid fa-sack-dollar"></i>${currenciesCountry}</p>
                    </div>
                </div>
            </div>
        `

        row.innerHTML += template
    }
}

fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies')
.then((response) => response.json())
.then((data) => {
    getCard(data)
})
