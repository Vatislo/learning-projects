const form = document.querySelector('form')
const formInput = document.querySelector('form input')
const userDataBox = document.querySelector('main')

if (localStorage.userNickFromGithub) {
    formInput.value = localStorage.userNickFromGithub
} 

const getUserDataFromGithub = async (userNickFromGithub) => {
    try{
        const response = await fetch(`https://api.github.com/users/${userNickFromGithub}`);
        if(!response.ok){
            throw new Error(`user undefined`)
        }

        const dataGithubApi = await response.json();
        localStorage.userNickFromGithub = userNickFromGithub
        return dataGithubApi

    } catch (error){
        console.error(error)
        formInput.value = ""
        formInput.placeholder = "user undefined"
    }
}

const renderUser = (user) => {
    return `
        <div class="user-box">
            <img src="${user.avatar_url}" width="200" height="200">
            <p><span>Name:</span> <span>${user.name === null ? "none data" : user.name }</span></p>
            <p><span>Company:</span>${user.company === null ? "none data" : user.company }</span></p>
            <p><span>E-mail:</span><span>${user.email === null ? "none data" : user.company }</span></p>
            <p><span>Followers:</span><span">${user.followers}</span></p>
            <p><span>Following:</span><span>${user.following}</span></p>
            <p><span>Following:</span><span>${user.following}</span></p>
            <p><span>URL:</span> <span><a href="${user.html_url}">${user.html_url.replace(/^https?:\/\//, '')}</a></span></p>
            <p><span>Date sing up:</span> <span>${user.created_at.split('T')[0].split('-').reverse().join(':')}</span></p>
            <p><span>Public repos:</span> <span>${user.public_repos}</span></p>
        <div>    
    `
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const userDataFromGithub = await getUserDataFromGithub(formInput.value)
    userDataBox.innerHTML = renderUser(userDataFromGithub)
})
