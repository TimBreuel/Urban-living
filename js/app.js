//////////////////
//ALL UI SELECTORS
const UIselectors = {
    navMenu: "#navMenu",
    menu: "#menu",
    shoppingCartBtn: "#shoppingCart",
    shoppingCartContainer: "#shoping-card",
    productContainer: "#product-container",
    chairs: "#chairs",
    couches: "#couches",
    lamps: "#lamps",
    tables: "#tables",
    shoppingCardList: ".shopping-card-container",
    totalCost: "#totalCost",
    btnDetails: '#btn-details'
};

/////////////////////
//GET HTML SELECTORS
const navMenu = document.querySelector(UIselectors.navMenu);
const shopingCardBtn = document.querySelector(UIselectors.shoppingCartBtn);
const productContainer = document.querySelector(UIselectors.productContainer);

//GET HTML CATEGORYS
const categoryChairs = document.querySelector(UIselectors.chairs);
const categoryCouches = document.querySelector(UIselectors.couches);
const categoryLamps = document.querySelector(UIselectors.lamps);
const categoryTables = document.querySelector(UIselectors.tables);

//GET SHOPPING CART
const shoppingCardList = document.querySelector(UIselectors.shoppingCardList);
const totalCost = document.querySelector(UIselectors.totalCost);

///////////////////
//EVENTS LISTENERS
document.addEventListener("DOMContentLoaded", (e) => {
    //NAVIGATION MENU SLIDER CALL
    navMenu.addEventListener("click", navigationMenu);

    //SHOPING CARD CONTAINER CALL
    shopingCardBtn.addEventListener("click", shoppingCardContainer);

    //PRODUCTS CALL
    printProducts();

    ////////////////////////
    //CATEGORY PRODUCTS CALL
    categoryChairs.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsCategory("chair");
    });

    categoryCouches.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsCategory("couch");
    });

    categoryLamps.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsCategory("lamp");
    });

    categoryTables.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsCategory("table");
    });

    ///////////////////////////////////////////////////////////////
    //CLICK EVENTS FOR ADD CART AND REMOVE CART FROM SHOPPING CART
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-add")) {
            let arrName = Array.from(e.target.parentElement.parentElement.children);
            addToShoppingCard(arrName[1].innerText);

        }
        if (e.target.classList.contains("cart-remove")) {
            e.target.parentElement.parentElement.parentElement.remove();
            totalCostCalc();
        }

        if (e.target.classList.contains('open-details')) {
            let arrName = Array.from(e.target.parentElement.parentElement.children);
            getDetailsProducts(arrName[1].innerText)
        }
    });
});

////////////////////////
//NAVIGATION MENU SLIDER
let menuTrigger = false;
let menuCounter = -220;
const navigationMenu = () => {
    const menu = document.querySelector(UIselectors.menu);
    let interval = setInterval(() => {
        if (menuTrigger === false && menuCounter <= 0) {
            menuCounter++;
            menu.style.left = menuCounter + "px";
        }
        if (menuTrigger === true && menuCounter >= -220) {
            menu.style.left = menuCounter + "px";
            menuCounter--;
        }
        if (menuCounter === 0) {
            menuTrigger = true;
            clearInterval(interval);
        }
        if (menuCounter === -220) {
            menuTrigger = false;
            clearInterval(interval);
        }
    }, 0.1);
};

/////////////////////////
//SHOPINGCARD MENU SLIDE
let shoppingCardTrigger = false;
let shoppingCardCounter = -300;
const shoppingCardContainer = () => {
    const cardContainer = document.querySelector(
        UIselectors.shoppingCartContainer
    );
    let interval = setInterval(() => {
        if (shoppingCardTrigger === false && shoppingCardCounter <= 0) {
            shoppingCardCounter++;
            cardContainer.style.right = shoppingCardCounter + "px";
        }
        if (shoppingCardTrigger === true && shoppingCardCounter >= -300) {
            cardContainer.style.right = shoppingCardCounter + "px";
            shoppingCardCounter--;
        }
        if (shoppingCardCounter === 0) {
            shoppingCardTrigger = true;
            clearInterval(interval);
        }
        if (shoppingCardCounter === -300) {
            shoppingCardTrigger = false;
            clearInterval(interval);
        }
    }, 0.1);
};

////////////////////////
//GET ARTICLES FROM API
const products = new ProductsCtr;
const printProducts = () => {
    products
        .getProducts()
        .then((product) => {
            product.forEach((product) => {
                let card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
            
            <img src="${product.imageS}" class="image-small"/>
            <h4 class="article-name">${product.name}</h4>
            <div class="article-price">
            price: <span class="article-price-num">${product.price}</span> $
            <button class="btn-card btn-add">
            <i class="fas fa-cart-plus"></i>
            </button>
            </div>
            <div class="details"><i id="btn-details" class="open-details fas fa-plus"></i></div>
            `;

                productContainer.append(card);
            });
        })
        .catch((err) => console.log("ERROR", err));
};

///////////////////////////////////
//PRINT PRODUCTS CATEGORY FROM API
const printProductsCategory = (category) => {
    productContainer.innerHTML = "";

    products
        .getProducts()
        .then((product) => {
            product.forEach((product) => {
                if (product.category === category) {
                    let card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                <img src="${product.imageS}" class="image-small"/>
                <h4 class="article-name">${product.name}</h4>
                <div class="article-price">
                price: <span class="article-price-num">${product.price}</span> $
                <button class="btn-card btn-add">
                <i class="fas fa-cart-plus"></i>
                </button>
                </div>
                <div class="details"><i id="btn-details" class="open-details fas fa-plus"></i></div>
                `;

                    productContainer.append(card);
                }
            });
        })
        .catch((err) => console.log("ERROR", err));
};

//////////////////////
//ADD TO SHOPPING CAT
const addToShoppingCard = (name) => {
    products.getProducts().then((product) => {
        product.forEach((product) => {
            if (product.name === name) {
                let cartLi = document.createElement("li");
                cartLi.classList = "cart-li cart-remove";
                cartLi.innerHTML = `
                <img class="cart-img"src="${product.imageS}"alt=""/>
                <div class="cart-name-num-container">
                <div class="cart-name">${product.name}<i class="fas fa-times fl-r cart-remove"></i>
                </div>
    
                <div class="cart-price-cost">
                  <i class="fas fa-chevron-left"></i><span class="input-num">1</span
                  ><i class="fas fa-chevron-right"></i> price:
                  <span class="cart-price">${product.price}</span> $
                </div>
                </div>
                `;
                shoppingCardList.append(cartLi);
            }
        });
        //ADD TOTAL COST CALL
        totalCostCalc();
    });
};

/////////////////
//ADD TOTAL COST
const totalCostCalc = () => {
    totalCost.innerHTML = 0;
    let totalprice = parseFloat(totalCost.innerHTML);
    let allPrices = document.querySelectorAll(".cart-price");
    allPrices = Array.from(allPrices);
    allPrices.forEach((item) => {
        let price = parseFloat(item.innerHTML);
        totalprice += price;
    });
    totalCost.innerHTML = totalprice;
};

//////////////////////
//GET DETAILS PRODUCT
const getDetailsProducts = (name) => {
    products
        .getProducts()
        .then((product) => {
            product.forEach((product) => {
                if (product.name === name) {
                    let detailsBG = document.createElement('div')
                    detailsBG.classList.add('details-bg')
                    detailsBG.innerHTML = `
                <div class="details-cart">
                <div class="col6">
                <img class="detals-img" src="${product.imageL}" alt="">
                </div>
                <div class="col6 details-font">
                    <div class="detals-name"><span>Name:</span> ${product.name}</div>
                    <div class="details-productNum"><span>Product Nr.:</span> ${product.productNumber}</div>
                    <div class="details-color"><span>Color:</span> ${product.color}</div>
                    <div class="details-description"><span>Description:</span> ${product.description}</div>

                    <div class="details-price">
                    Price:<span class="fl-r">$</span><span class="fl-r" id="details-price-num">${product.price}</span>
                    </div>
                    <button class="details-add-btn btn">Add to cart</button>

                </div>
                <i id="btn-remove-details" class="far fa-times-circle"></i>
                </div>
                `
                    productContainer.append(detailsBG)
                    const btnRemoveDetails = document.getElementById('btn-remove-details')
                    btnRemoveDetails.addEventListener('click', () => {
                        detailsBG.remove()
                    })
                }
            });
        })
        .catch((err) => console.log("ERROR", err));
}