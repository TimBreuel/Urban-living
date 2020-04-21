//////////////////
//ALL UI SELECTORS
const UIselectors = {
    navMenu: '#navMenu',
    menu: '#menu',
    shoppingCartBtn: '#shoppingCart',
    shoppingCartContainer: '#shoping-card',
    productContainer: '#product-container',
    chairs: '#chairs',
    couches: '#couches',
    lamps: '#lamps',
    tables: '#tables'
}

/////////////////////
//GET HTML SELECTORS
const navMenu = document.querySelector(UIselectors.navMenu)
const shopingCardBtn = document.querySelector(UIselectors.shoppingCartBtn)
const productContainer = document.querySelector(UIselectors.productContainer)

//GET HTML CATEGORYS
const categoryChairs = document.querySelector(UIselectors.chairs)
const categoryCouches = document.querySelector(UIselectors.couches)
const categoryLamps = document.querySelector(UIselectors.lamps)
const categoryTables = document.querySelector(UIselectors.tables)


///////////////////
//EVENTS LISTENERS
document.addEventListener('DOMContentLoaded', (e) => {

    //NAVIGATION MENU SLIDER CALL
    navMenu.addEventListener('click', navigationMenu)

    //SHOPING CARD CONTAINER CALL
    shopingCardBtn.addEventListener('click', shoppingCardContainer)

    //PRODUCTS CALL
    printProducts()

    ////////////////////////
    //CATEGORY PRODUCTS CALL
    categoryChairs.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsCategory('chair')
    })

    categoryCouches.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsCategory('couch')
    })

    categoryLamps.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsCategory('lamp')
    })

    categoryTables.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsCategory('table')
    })

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
const products = new ProductsCtr
const printProducts = () => {
    products.getProducts().then(product => {

        product.forEach(product => {
            let card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <img src="${product.imageS}" class="image-small"/>
            <h4 class="article-name">${product.name}</h4>
            <div class="article-price">
            price: <span class="article-price-num">${product.price}</span>$
            <button class="btn-card btn-add">
            <i class="fas fa-cart-plus"></i>
            </button>
            </div>
            `

            productContainer.append(card)

        })
    }).catch(err => console.log('ERROR', err))
}


const printProductsCategory = (category) => {
    productContainer.innerHTML = ''


    products.getProducts().then(product => {

        product.forEach(product => {
            if (product.category === category) {

                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `
                <img src="${product.imageS}" class="image-small"/>
                <h4 class="article-name">${product.name}</h4>
                <div class="article-price">
                price: <span class="article-price-num">${product.price}</span>$
                <button class="btn-card btn-add">
                <i class="fas fa-cart-plus"></i>
                </button>
                </div>
                `

                productContainer.append(card)
            }

        })
    }).catch(err => console.log('ERROR', err))

}