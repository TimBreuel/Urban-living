// let url = 'http://localhost:3000/articles'

// async function getUserAsync(url) {
//     let response = await fetch(url);
//     let data = await response.json()

//     data.forEach(article => {
//         let img = document.createElement('img')
//         img.src = article.imageL
//         document.querySelector('#h1').append(img)
//     })



//     return data;
// }

// getUserAsync(url)
//     .then(data => console.log(data[0].imageS))



//////////////////
//ALL UI SELECTORS
const UIselectors = {
    navMenu: '#navMenu',
    menu: '#menu'
}

///////////////////
//EVENTS LISTENERS
document.addEventListener('DOMContentLoaded', (e) => {

    //NAVIGATION MENU CALL
    const navMenu = document.querySelector(UIselectors.navMenu)
    navMenu.addEventListener('click', navigationMenu)
})



////////////////////////
//NAVIGATION MENU SLIDER
let menuTrigger = false
let menuCounter = -220
const navigationMenu = () => {
    const menu = document.querySelector(UIselectors.menu)
    let interval = setInterval(() => {
        if (menuTrigger === false && menuCounter <= 0) {
            menuCounter = menuCounter + 0.5
            menu.style.left = menuCounter + 'px'

        }

        if (menuTrigger === true && menuCounter >= -220) {
            menu.style.left = menuCounter + 'px'
            menuCounter = menuCounter - 0.5
            console.log(menuCounter)
        }
        if (menuCounter === 0) {
            menuTrigger = true
            clearInterval(interval)
        }
        if (menuCounter === -220) {
            menuTrigger = false
            clearInterval(interval)
        }

    }, 1)
}