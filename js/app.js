//////////////////
//ALL UI SELECTORS
const UIselectors = {
    navMenu: '#navMenu',
    menu: '#menu',
    shoppingCartBtn: '#shoppingCart',
    shoppingCartContainer: '#shoping-card'
}

///////////////////
//EVENTS LISTENERS
document.addEventListener('DOMContentLoaded', (e) => {

    //NAVIGATION MENU SLIDER CALL
    const navMenu = document.querySelector(UIselectors.navMenu)
    navMenu.addEventListener('click', navigationMenu)

    //SHOPING CARD CONTAINER CALL
    const shopingCardBtn = document.querySelector(UIselectors.shoppingCartBtn)
    shopingCardBtn.addEventListener('click', shoppingCardContainer)

})



////////////////////////
//NAVIGATION MENU SLIDER
let menuTrigger = false
let menuCounter = -220
const navigationMenu = () => {
    const menu = document.querySelector(UIselectors.menu)
    let interval = setInterval(() => {
        if (menuTrigger === false && menuCounter <= 0) {
            menuCounter++
            menu.style.left = menuCounter + 'px'

        }
        if (menuTrigger === true && menuCounter >= -220) {
            menu.style.left = menuCounter + 'px'
            menuCounter--
        }
        if (menuCounter === 0) {
            menuTrigger = true
            clearInterval(interval)
        }
        if (menuCounter === -220) {
            menuTrigger = false
            clearInterval(interval)
        }

    }, 0.1)
}

/////////////////////////
//SHOPINGCARD MENU SLIDE
let shoppingCardTrigger = false
let shoppingCardCounter = -300
const shoppingCardContainer = () => {
    const cardContainer = document.querySelector(UIselectors.shoppingCartContainer)
    let interval = setInterval(() => {
        if (shoppingCardTrigger === false && shoppingCardCounter <= 0) {
            shoppingCardCounter++
            cardContainer.style.right = shoppingCardCounter + 'px'

        }
        if (shoppingCardTrigger === true && shoppingCardCounter >= -300) {
            cardContainer.style.right = shoppingCardCounter + 'px'
            shoppingCardCounter--
        }
        if (shoppingCardCounter === 0) {
            shoppingCardTrigger = true
            clearInterval(interval)
        }
        if (shoppingCardCounter === -300) {
            shoppingCardTrigger = false
            clearInterval(interval)
        }

    }, 0.1)
}

////////////////////////
//GET ARTICLES FROM API

let articles = new ArticlesCtr

function getArticles() {
    articles.getArticles().then(article => {
        console.log(article)
    }).catch(err => console.log('ERROR', err))
}
getArticles()