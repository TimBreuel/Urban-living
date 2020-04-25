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
        const response = await fetch('http://localhost:3000/products?')
        const resData = await response.json()
        return resData
    }

    async printProductsPageNum(pageNumber) {
        const response = await fetch('http://localhost:3000/products?_page=' + pageNumber + '&_limit=15')
        const resData = await response.json()
        return resData
    }

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
    searchIcon: '.search-icon',
    seeAll: '#seeAll',
    logo: '.logo',
    page1: '#page1',
    page2: '#page2',
    page3: '#page3',
    page4: '#page4',
    impressum: '#impressum',
    arrowMinus: '.arrow-minus',
    arrowPlus: '.arrow-plus',
    amount: '.amount'

};

/////////////////////
//GET HTML SELECTORS
const navMenu = document.querySelector(UIselectors.navMenu);
const shopingCardBtn = document.querySelector(UIselectors.shoppingCartBtn);
const productContainer = document.querySelector(UIselectors.productContainer);
const headline = document.querySelector(UIselectors.headline)
const logo = document.querySelector(UIselectors.logo)

//GET HTML CATEGORYS
const seeAll = document.querySelector(UIselectors.seeAll)
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

//IMPRESSUM
const impressum = document.querySelector(UIselectors.impressum)

//AMOUNT


///////////////////
//EVENTS LISTENERS
document.addEventListener("DOMContentLoaded", (e) => {

    /////////////////////////////
    //NAVIGATION MENU SLIDER CALL
    navMenu.addEventListener("click", navigationMenu);

    //SHOPING CARD CONTAINER CALL
    shopingCardBtn.addEventListener("click", shoppingCardContainer);

    //PRODUCTS CALL
    printProductsPageNum(1);

    //LOAD LOCAL STORAGE
    getLocalStorage()

    ////////////////////////
    //CATEGORY PRODUCTS CALL
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        printProductsPageNum(1)
    })
    seeAll.addEventListener('click', (e) => {
        e.preventDefault();
        printProductsPageNum(1)
        navigationMenuSlideBack()
    })
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

    //IMPRESSUM
    impressum.addEventListener('click', () => {
        setImpressum()
        navigationMenuSlideBack()
    })


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
            setLocalStorage()
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

        ////////////////////
        //AMOUNT MINUS
        if (e.target.classList.contains('arrow-minus')) {
            let amount = parseFloat(e.target.nextElementSibling.innerText)
            let originalPrice = parseFloat(e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText) / amount
            if (amount > 1) {
                amount--
                e.target.nextElementSibling.innerText = amount
                e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText = parseFloat(e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText) - originalPrice
                totalCostCalc()
                setLocalStorage()
            }
        }
        //AMOUNT PLUS
        if (e.target.classList.contains('arrow-plus')) {
            let amount = parseFloat(e.target.previousElementSibling.innerText)
            let originalPrice = parseFloat(e.target.nextElementSibling.innerText) / amount
            if (amount >= 1) {
                amount++
                e.target.previousElementSibling.innerText = amount
                e.target.nextElementSibling.innerText = parseFloat(e.target.nextElementSibling.innerText) + originalPrice
                totalCostCalc()
                setLocalStorage()
            }
        }

    });

    //////////////////////////////////
    //SEARCH INPUT BUTTON CLICK EVENT
    btnSearch.addEventListener('click', (e) => {
        e.preventDefault()
        headline.innerText = 'Search result'
        printSearchProducts(inputName.value.trim(), inputCategory.options[inputCategory.selectedIndex].value.trim(), inputColor.options[inputColor.selectedIndex].value.trim(), inputPrice.value.trim())
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
const products = new ProductsCtr
const printProducts = () => {


    //CLEAR PRODUCT CONTAINER
    productContainer.innerHTML = "";

    //FETCH PRODUCTS
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


//////////////////////////////////
//PRINT PRODUCTS WITH PAGE NUMBER
const printProductsPageNum = (pageNumber) => {
    headline.innerHTML = `Our Products <span class="pageNum fl-r" id="page4">4</span>
    <span class="fl-r pageNum" id="page3">3</span><span class="fl-r pageNum" id="page2">2</span><span
      class="fl-r pageNum" id="page1">1</span>`

    //BUTTON PAGE NUMBERS
    const page1 = document.querySelector(UIselectors.page1)
    const page2 = document.querySelector(UIselectors.page2)
    const page3 = document.querySelector(UIselectors.page3)
    const page4 = document.querySelector(UIselectors.page4)

    //BUTTON PAGE NUMBERS EVENT CLICK
    page1.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsPageNum(1)

    })
    page2.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsPageNum(2)

    })
    page3.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsPageNum(3)

    })
    page4.addEventListener('click', (e) => {
        e.preventDefault()
        printProductsPageNum(4)

    })

    //CLEAR PRODUCT CONTAINER
    productContainer.innerHTML = "";

    //FETCH PRODUCTS
    products
        .printProductsPageNum(pageNumber)
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
                  <i class="fas fa-chevron-left arrow-minus"></i><span class="input-num amount">1</span
                  ><i class="fas fa-chevron-right arrow-plus"></i> price:
                  <span class="cart-price">${product.price}</span> $
                </div>
                </div>
                `;

                shoppingCardList.append(cartLi);
            }

        });

        //ADD TOTAL COST CALL
        totalCostCalc();

        //SET SOCAL STORAGE
        setLocalStorage()
    });
};
//ADD TO SHOPPING CAT FROM LOCAL STORAGE
const addToShoppingCardFromLocalStorage = (name, amount, price) => {
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
                  <i class="fas fa-chevron-left arrow-minus"></i><span class="input-num amount">${amount}</span
                  ><i class="fas fa-chevron-right arrow-plus"></i> price:
                  <span class="cart-price">${price}</span> $
                </div>
                </div>
                `;

                shoppingCardList.append(cartLi);
            }

        });

        //ADD TOTAL COST CALL
        totalCostCalc();

        //SET SOCAL STORAGE
        setLocalStorage()
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

    //CHECK DEFAULT VALUES
    if (name.length === 0) {
        name = 'false'
    }
    if (price == '0') {
        price = 'false'
    } else {
        price = parseFloat(price)
    }

    //console.log('name: ' + name, 'category: ' + category, 'color: ' + color, 'price: ' + price)
    products
        .getProducts()
        .then((product) => {
            product.forEach((product) => {

                //NAME
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && category === 'false' && color === 'false' && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //CATEGORY
                if (product.category === category && color === 'false' && name === 'false' && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //COLOR
                if (product.color === color && category === 'false' && name === 'false' && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //PRICE
                if (parseFloat(product.price) <= price && category === 'false' && color === 'false' && name === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & CATEGORY
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && color === 'false' && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & COLOR
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && category === 'false' && product.color === color && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & PRICE
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && category === 'false' && color === 'false' && parseFloat(product.price) <= parseFloat(price)) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //CATEGORY & COLOR
                if (name === 'false' && product.category === category && product.color === color && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //CATEGORY & PRICE
                if (name === 'false' && product.category === category && color === 'false' && parseFloat(product.price) <= parseFloat(price)) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //COLOR & PRICE
                if (name === 'false' && category === 'false' && product.color === color && parseFloat(product.price) <= parseFloat(price)) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & CATEGORY & COLOR
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && product.color === color && price === 'false') {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & CATEGORY & PRICE
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && color === 'false' && parseFloat(product.price) <= parseFloat(price)) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //CATEGORY & COLOR & PRICE
                if (name === 'false' && product.category === category && product.color === color && parseFloat(product.price) <= parseFloat(price)) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & CATEGORY & COLOR & PRICE
                if (product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && product.category === category && product.color === color && parseFloat(product.price) <= parseFloat(price)) {
                    searchProducts(product.imageS, product.name, product.price)
                }
                //NAME & CATEGORY & COLOR & PRICE ARE EMPTY
                if (name === 'false' && category === 'false' && color === 'false' && price === 'false') {
                    inputName.focus()
                    headline.innerText = 'Please enter any value to search'
                }
            });
        })
        .catch((err) => console.log("ERROR", err));
}
//PRINT AND SEARCH PRODUCTS /PRODUCT CREATER
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
    navigationMenuSlideBack()
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
const setLocalStorage = () => {
    let products;
    if (localStorage.getItem('products') == null) {
        products = []
    } else {
        products = JSON.parse(localStorage.getItem('products'))
        products = []
    }

    let allCartLi = document.querySelectorAll('.cart-li')
    allCartLi = Array.from(allCartLi)
    allCartLi.forEach(item => {
        // console.log(item.children[0].src)
        // console.log(item.children[1].children[0].innerText)
        // console.log(item.children[1].children[1].children[3].innerText)
        let product = {
            "name": item.children[1].children[0].innerText,
            "image": item.children[0].src,
            "price": item.children[1].children[1].children[3].innerText,
            "amount": item.children[1].children[1].children[1].innerText
        }
        products.push(product)
    })

    localStorage.setItem('products', JSON.stringify(products))

}
//////////////////////////////////
//GET LOCAL STORAGE AFTER REFRESH
const getLocalStorage = () => {
    let products = JSON.parse(localStorage.getItem('products'))

    products.forEach(product => {
        addToShoppingCardFromLocalStorage(product.name, product.amount, product.price)

    })

}

const setImpressum = () => {
    headline.innerText = 'Impressum'
    productContainer.innerHTML = `
    <div class="impressum" style="padding: 0 50px 0 50px; color:#4d4954;">
<h2>Angaben gemäß 5 TMG</h2><br>
<p>Tim Breuel<br />
Urban living
Osterstraße 133c<br />
20255 Hamburg</p>
<br>
<h2>Kontakt</h2>
<p>Telefon: +49 (0) 152 026 728 03<br />
E-Mail: tim.breuel@gmail.com</p>
<br>
<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect;27 a Umsatzsteuergesetz:<br />
DE 999 999 999</p>
<br>
<h2>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h2>
<p>Tim Breuel<br />
Osterstraße 133c<br />
20255 Hamburg</p>

<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

<h3>Haftung f&uuml;r Inhalte</h3> <p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p> <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p> <h3>Haftung f&uuml;r Links</h3> <p>Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p> <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p> <h3>Urheberrecht</h3> <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p> <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
<p>Quelle Bilder: <a href="https://unsplash.com">Unsplash</a></p>
<p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
</div>
    `
}