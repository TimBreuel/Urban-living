class ProductsCtr {
    constructor(productNumber, name, category, price, color, imageL, imageS, description) {
        this.productNumber = productNumber
        this.name = name
        this.category = category
        this.price = price
        this.color = color
        this.imageL = imageL
        this.imageS = imageS
        this.description = description
    }

    //FETCH API
    async getProducts() {
        const response = await fetch('http://localhost:3000/products')
        const resData = await response.json()
        return resData
    }

    // async setLocalStorage(name, image, price) {
    //     let products;
    //     if (localStorage.getItem('products') == null) {
    //         products = []
    //     } else {
    //         products = JSON.parse(localStorage.getItem('products'))
    //     }
    //     let product = {
    //         "name": name,
    //         "image": image,
    //         "price": price
    //     }
    //     products.push(product)
    //     localStorage.setItem('products', JSON.stringify(products))
    // }



}



//////////////////
//ALL UI SELECTORS
const UIselectors = {
    navMenu: "#navMenu",
    menu: "#menu",
    headline: '#headline',
    shoppingCartBtn: "#shoppingCart",
    shoppingCartContainer: "#shoping-card",
    productContainer: "#product-container",
    chairs: "#chairs",
    couches: "#couches",
    lamps: "#lamps",
    tables: "#tables",
    shoppingCardList: ".shopping-card-container",
    totalCost: "#totalCost",
    btnDetails: '#btn-details',
    inputName: '#input-name',
    inputCategory: '#input-category',
    inputColor: '#input-color',
    inputPrice: '#input-number',
    btnSearch: '.btn-search',
    searchIcon: '.search-icon'
};

/////////////////////
//GET HTML SELECTORS
const navMenu = document.querySelector(UIselectors.navMenu);
const shopingCardBtn = document.querySelector(UIselectors.shoppingCartBtn);
const productContainer = document.querySelector(UIselectors.productContainer);
const headline = document.querySelector(UIselectors.headline)

//GET HTML CATEGORYS
const categoryChairs = document.querySelector(UIselectors.chairs);
const categoryCouches = document.querySelector(UIselectors.couches);
const categoryLamps = document.querySelector(UIselectors.lamps);
const categoryTables = document.querySelector(UIselectors.tables);

//GET SHOPPING CART
const shoppingCardList = document.querySelector(UIselectors.shoppingCardList);
const totalCost = document.querySelector(UIselectors.totalCost);

//GET INPUT VALUES
const inputName = document.querySelector(UIselectors.inputName)
const inputCategory = document.querySelector(UIselectors.inputCategory)
const inputColor = document.querySelector(UIselectors.inputColor)
const inputPrice = document.querySelector(UIselectors.inputPrice)
const btnSearch = document.querySelector(UIselectors.btnSearch)
const searchIcon = document.querySelector(UIselectors.searchIcon)

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
        headline.innerText = 'Chairs'
        printProductsCategory("chair");
        navigationMenuSlideBack()
    });

    categoryCouches.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = 'Couches'
        printProductsCategory("couch");
        navigationMenuSlideBack()
    });

    categoryLamps.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = 'Lamps'
        printProductsCategory("lamp");
        navigationMenuSlideBack()
    });

    categoryTables.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = 'Tables'
        printProductsCategory("table");
        navigationMenuSlideBack()
    });

    ///////////////////////////////////////////////////////////////
    //CLICK EVENTS FOR ADD CART AND REMOVE CART FROM SHOPPING CART
    document.addEventListener("click", (e) => {

        //ADDED TO SHOPPING CART
        if (e.target.classList.contains("btn-add")) {
            let arrName = Array.from(e.target.parentElement.parentElement.children);
            addToShoppingCard(arrName[1].innerText);
            succesAdded(e.target)
        }

        //TOTAL COST CALCULATION
        if (e.target.classList.contains("cart-remove")) {
            e.target.parentElement.parentElement.parentElement.remove();
            totalCostCalc();
        }

        //OPEN DETAILS FOR ELEMENT THAT IS CLICKED
        if (e.target.classList.contains('open-details')) {
            let arrName = Array.from(e.target.parentElement.parentElement.children);
            getDetailsProducts(arrName[1].innerText)
        }

        //MENU SLIDE BACK
        // if (!e.target.classList.contains('slide-back')) {
        //     navigationMenuSlideBack()
        // }

        //SHOPPING CART SLIDE BACK
        // if (!e.target.classList.contains('slide-back-cart')) {
        //     shoppingCardContainerSlideBack()
        // }

    });

    //////////////////////////////////
    //SEARCH INPUT BUTTON CLICK EVENT
    btnSearch.addEventListener('click', (e) => {
        headline.innerText = 'Search result'
        printSearchProducts(inputName.value.trim(), inputCategory.options[inputCategory.selectedIndex].value.trim(), inputColor.options[inputColor.selectedIndex].value.trim(), inputPrice.value.trim())
        navigationMenuSlideBack()
    })

    searchIcon.addEventListener('click', () => {
        navigationMenu()
        inputName.focus()

    })
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

//MENU SLIDE BACK IF CLICK OUTSIDE THE MENU
const navigationMenuSlideBack = () => {
    const menu = document.querySelector(UIselectors.menu);
    let interval = setInterval(() => {
        if (menuTrigger === true && menuCounter >= -220) {
            menu.style.left = menuCounter + "px";
            menuCounter--;
        }
        if (menuCounter === -220) {
            menuTrigger = false;
            clearInterval(interval);
        }
    }, 0.1);
}

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

//SHOPPING CART SLIDE BACK IF CLICK OUTSIDE THE MENU
const shoppingCardContainerSlideBack = () => {
    const cardContainer = document.querySelector(
        UIselectors.shoppingCartContainer
    );
    let interval = setInterval(() => {
        if (shoppingCardTrigger === true && shoppingCardCounter >= -300) {
            cardContainer.style.right = shoppingCardCounter + "px";
            shoppingCardCounter--;
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
            <i class="fas fa-cart-plus btn-success"></i>
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
                //setLocalStorge(product.name, product.imageS, product.price)

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
                    const btnAddDetailsToCart = document.querySelector('.details-add-btn')
                    btnAddDetailsToCart.addEventListener('click', (e) => {
                        addToShoppingCard(product.name)
                        succesAdded(e.target)
                    })
                }
            });
        })
        .catch((err) => console.log("ERROR", err));
}

////////////////////////////
//PRINT AND SEARCH PRODUCTS
const printSearchProducts = (name, category, color, price) => {
    productContainer.innerHTML = "";
    price = parseFloat(price)
    products
        .getProducts()
        .then((product) => {
            product.forEach((product) => {


                //NAME AND MORE
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && product.color === color) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && product.color === color) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && product.color === color && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }

                //WITHOUT NAME
                if (product.category === category) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.category === category && product.color === color) {
                    searchProducts(product.imageS, product.name, product.price)
                }

                if (product.category === category && product.color === color && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.category === category && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }

                //WITHOUT CATEGORIE
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.color === color && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.color === color) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.color === color && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }

                //WITHOUT COLOR
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && parseFloat(product.price) <= price) {
                    searchProducts(product.imageS, product.name, product.price)
                }

                //WITHOUT PRICE
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && product.color === color) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.color === color) {
                    searchProducts(product.imageS, product.name, product.price)
                }

            });
        })
        .catch((err) => console.log("ERROR", err));
}
//SEARCH PRODUCT
const searchProducts = (image, name, price) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                    <img src="${image}" class="image-small"/>
                    <h4 class="article-name">${name}</h4>
                    <div class="article-price">
                    price: <span class="article-price-num">${price}</span> $
                    <button class="btn-card btn-add">
                    <i class="fas fa-cart-plus"></i>
                    </button>
                    </div>
                    <div class="details"><i id="btn-details" class="open-details fas fa-plus"></i></div>
                    `;
    productContainer.append(card);
}

//////////////////
//SUCCESS FUNCTION
const succesAdded = (selector) => {
    selector.classList.add('successAdd')
    shopingCardBtn.classList.add('successAdd')
    setTimeout(() => {
        selector.classList.remove('successAdd')
        shopingCardBtn.classList.remove('successAdd')
    }, 2000)
}

////////////////////
//SET LOCAL STORAGE
const setLocalStorage = (name, image, price) => {
    let products;
    if (localStorage.getItem('products') == null) {
        products = []
    } else {
        products = JSON.parse(localStorage.getItem('products'))
    }
    let product = {
        "name": name,
        "image": image,
        "price": price
    }
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products))
}