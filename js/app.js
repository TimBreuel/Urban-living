class ProductsCtr {
    constructor(
        productNumber,
        name,
        category,
        price,
        color,
        imageL,
        imageS,
        description
    ) {
        this.productNumber = productNumber;
        this.name = name;
        this.category = category;
        this.price = price;
        this.color = color;
        this.imageL = imageL;
        this.imageS = imageS;
        this.description = description;
    }

    //FETCH API
    async getProducts() {
        const response = await fetch("http://localhost:3000/products?");
        const resData = await response.json();
        return resData;
    }

    async printProductsPageNum(pageNumber) {
        const response = await fetch(
            "http://localhost:3000/products?_page=" + pageNumber + "&_limit=15"
        );
        const resData = await response.json();
        return resData;
    }
}

class RegisterMember {
    constructor(
        firstName,
        lastName,
        street,
        postcode,
        city,
        phoneNum,
        email,
        password
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.postcode = postcode;
        this.city = city;
        this.phoneNum = phoneNum;
        this.email = email;
        this.password = password;
    }

    setMemberToStorage() {
        let members;
        if (localStorage.getItem("members") == null) {
            members = [];
        } else {
            members = JSON.parse(localStorage.getItem("members"));

        }

        let member = {
            Firstname: this.firstName,
            Lastname: this.lastName,
            Street: this.street,
            Postcode: this.postcode,
            City: this.city,
            Phonenumber: this.phoneNum,
            Email: this.email,
            Password: this.password,
        };

        let doubleMemberCheck = false
        members.forEach((memberFromStorage) => {
            if (
                memberFromStorage.Firstname === member.Firstname &&
                memberFromStorage.Lastname === member.Lastname && memberFromStorage.Street === member.Street && memberFromStorage.Postcode === member.Postcode && memberFromStorage.City === member.City && memberFromStorage.Phonenumber === member.Phonenumber && memberFromStorage.Email === member.Email
            ) {
                doubleMemberCheck = true
            }
        });
        if (doubleMemberCheck === true) {
            let message = document.querySelector('.successOrNot')
            message.classList.add('d-block')
            message.style.color = '#f08080'
            message.innerText = 'Member allready exists!'
            setTimeout(() => {
                message.classList.remove('d-block')
                message.classList.add('d-none')
            }, 3000)
        } else {
            let message = document.querySelector('.successOrNot')
            message.classList.add('d-block')
            message.style.color = '#90ee90'
            message.innerText = 'Registration successfull!'
            setTimeout(() => {
                message.classList.remove('d-block')
                message.classList.add('d-none')
            }, 3000)
            members.push(member)
        }

        localStorage.setItem("members", JSON.stringify(members));
    }
}

//////////////////
//ALL UI SELECTORS
const UIselectors = {
    navMenu: "#navMenu",
    menu: "#menu",
    headline: "#headline",
    shoppingCartBtn: "#shoppingCart",
    shoppingCartContainer: "#shoping-card",
    productContainer: "#product-container",
    chairs: "#chairs",
    couches: "#couches",
    lamps: "#lamps",
    tables: "#tables",
    shoppingCardList: ".shopping-card-container",
    totalCost: "#totalCost",
    btnDetails: "#btn-details",
    inputName: "#input-name",
    inputCategory: "#input-category",
    inputColor: "#input-color",
    inputPrice: "#input-number",
    btnSearch: ".btn-search",
    searchIcon: ".search-icon",
    seeAll: "#seeAll",
    logo: ".logo",
    page1: "#page1",
    page2: "#page2",
    page3: "#page3",
    page4: "#page4",
    impressum: "#impressum",
    arrowMinus: ".arrow-minus",
    arrowPlus: ".arrow-plus",
    amount: ".amount",
    register: "#register",
    firstName: "#firstName",
    buyNowBtn: ".buy-now",
    aboutUs: '#about-us',
    loginBtn: '#login'
};

/////////////////////
//GET HTML SELECTORS
const navMenu = document.querySelector(UIselectors.navMenu);
const shopingCardBtn = document.querySelector(UIselectors.shoppingCartBtn);
const productContainer = document.querySelector(UIselectors.productContainer);
const headline = document.querySelector(UIselectors.headline);
const logo = document.querySelector(UIselectors.logo);

//GET HTML CATEGORYS
const seeAll = document.querySelector(UIselectors.seeAll);
const categoryChairs = document.querySelector(UIselectors.chairs);
const categoryCouches = document.querySelector(UIselectors.couches);
const categoryLamps = document.querySelector(UIselectors.lamps);
const categoryTables = document.querySelector(UIselectors.tables);

//GET SHOPPING CART
const shoppingCardList = document.querySelector(UIselectors.shoppingCardList);
const totalCost = document.querySelector(UIselectors.totalCost);

//GET INPUT VALUES
const inputName = document.querySelector(UIselectors.inputName);
const inputCategory = document.querySelector(UIselectors.inputCategory);
const inputColor = document.querySelector(UIselectors.inputColor);
const inputPrice = document.querySelector(UIselectors.inputPrice);
const btnSearch = document.querySelector(UIselectors.btnSearch);
const searchIcon = document.querySelector(UIselectors.searchIcon);

//IMPRESSUM
const impressum = document.querySelector(UIselectors.impressum);

//REGISTER
const register = document.querySelector(UIselectors.register);
const firstName = document.querySelector(UIselectors.firstName);

//BUY NOW
const buyNowBtn = document.querySelector(UIselectors.buyNowBtn)

//ABOUT US
const aboutUs = document.querySelector(UIselectors.aboutUs)

//LOGIN
const loginBtn = document.querySelector(UIselectors.loginBtn)

///////////////////
//EVENTS LISTENERS
document.addEventListener("DOMContentLoaded", (e) => {
    /////////////////////////////
    //NAVIGATION MENU SLIDER CALL
    navMenu.addEventListener("click", navigationMenu);

    //SHOPING CARD CONTAINER CALL
    shopingCardBtn.addEventListener("click", shoppingCardContainer);

    //PRODUCTS CALL
    printProductsPageNum(1, '#ffe5db', '#4d4954', '#4d4954', '#4d4954');

    //LOAD LOCAL STORAGE
    getLocalStorage();

    ////////////////////////
    //CATEGORY PRODUCTS CALL
    logo.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsPageNum(1, '#ffe5db', '#4d4954', '#4d4954', '#4d4954');
        navigationMenuSlideBack();
        shoppingCardContainerSlideBack()
    });
    seeAll.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsPageNum(1, '#ffe5db', '#4d4954', '#4d4954', '#4d4954');
        navigationMenuSlideBack();
        shoppingCardContainerSlideBack()
    });
    categoryChairs.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = "Chairs";
        printProductsCategory("chair");
        navigationMenuSlideBack();
    });

    categoryCouches.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = "Couches";
        printProductsCategory("couch");
        navigationMenuSlideBack();
    });

    categoryLamps.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = "Lamps";
        printProductsCategory("lamp");
        navigationMenuSlideBack();
    });

    categoryTables.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = "Tables";
        printProductsCategory("table");
        navigationMenuSlideBack();
    });

    //IMPRESSUM
    impressum.addEventListener("click", () => {
        setImpressum();
        navigationMenuSlideBack();
    });

    //REGISTER FORM
    register.addEventListener("click", (e) => {
        e.preventDefault();
        registerFormCreate();
        navigationMenuSlideBack();
    });

    //BUY NOW
    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault()
        window.location = 'https://www.paypal.com/de/home'
    })

    //LOGIN
    // loginBtn.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     loginCreater()
    // })

    ///////////////////////////////////////////////////////////////
    //CLICK EVENTS FOR ADD CART AND REMOVE CART FROM SHOPPING CART
    document.addEventListener("click", (e) => {
        //ADDED TO SHOPPING CART
        if (e.target.classList.contains("btn-add")) {
            //console.log(e.target.parentElement.parentElement.parentElement.children)
            let arrName = Array.from(e.target.parentElement.parentElement.parentElement.children);
            //console.log(arrName[1].innerText)
            addToShoppingCard(arrName[1].innerText);
            succesAdded(e.target);
        }

        //TOTAL COST CALCULATION
        if (e.target.classList.contains("cart-remove")) {
            e.target.parentElement.parentElement.parentElement.remove();
            totalCostCalc();
            setLocalStorage();
        }

        //OPEN DETAILS FOR ELEMENT THAT IS CLICKED
        if (e.target.classList.contains("open-details")) {
            let arrName = Array.from(e.target.parentElement.parentElement.children);
            getDetailsProducts(arrName[1].innerText);
        }

        ////////////////////
        //AMOUNT MINUS
        if (e.target.classList.contains("arrow-minus")) {
            let amount = parseFloat(e.target.nextElementSibling.innerText);
            let originalPrice =
                parseFloat(
                    e.target.nextElementSibling.nextElementSibling.nextElementSibling
                    .innerText
                ) / amount;
            if (amount > 1) {
                amount--;
                e.target.nextElementSibling.innerText = amount;
                e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText =
                    parseFloat(
                        e.target.nextElementSibling.nextElementSibling.nextElementSibling
                        .innerText
                    ) - originalPrice;
                totalCostCalc();
                setLocalStorage();
            }
        }
        //AMOUNT PLUS
        if (e.target.classList.contains("arrow-plus")) {
            let amount = parseFloat(e.target.previousElementSibling.innerText);
            let originalPrice =
                parseFloat(e.target.nextElementSibling.innerText) / amount;
            if (amount >= 1) {
                amount++;
                e.target.previousElementSibling.innerText = amount;
                e.target.nextElementSibling.innerText =
                    parseFloat(e.target.nextElementSibling.innerText) + originalPrice;
                totalCostCalc();
                setLocalStorage();
            }
        }
    });

    //////////////////////////////////
    //SEARCH INPUT BUTTON CLICK EVENT
    btnSearch.addEventListener("click", (e) => {
        e.preventDefault();
        headline.innerText = "Search Results";
        printSearchProducts(
            inputName.value.trim(),
            inputCategory.options[inputCategory.selectedIndex].value.trim(),
            inputColor.options[inputColor.selectedIndex].value.trim(),
            inputPrice.value.trim()
        );
    });
    //SEARCH ICON ON CLICK FOCUS NAME INPUT
    searchIcon.addEventListener("click", () => {
        navigationMenu();
        inputName.focus();
    });
    //CLEAR ALL SEARCH INPUTS
    const btnClear = document.querySelector('.btn-clear')
    btnClear.addEventListener('click', (e) => {
        e.preventDefault()
        clearSearchInputs()
    })

    //ABOUT US
    aboutUs.addEventListener('click', (e) => {
        e.preventDefault()
        aboutUsCreater()
        navigationMenuSlideBack();
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
const products = new ProductsCtr();
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
            Price: <span class="article-price-num">${product.price}</span> €
            <button class="btn-card btn-add">
            <i class="fas fa-cart-plus btn-success btn-add"></i>
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
const printProductsPageNum = (pageNumber, pagCol1, pagCol2, pagCol3, pagCol4) => {
    headline.innerHTML = `Our Products <span class="pageNum fl-r" id="page4" style="color:${pagCol4};">4</span>
    <span class="fl-r pageNum" id="page3" style="color:${pagCol3};">3</span><span class="fl-r pageNum" id="page2" style="color:${pagCol2};">2</span><span
      class="fl-r pageNum" id="page1" style="color:${pagCol1};">1</span>`;

    //BUTTON PAGE NUMBERS
    const page1 = document.querySelector(UIselectors.page1);
    const page2 = document.querySelector(UIselectors.page2);
    const page3 = document.querySelector(UIselectors.page3);
    const page4 = document.querySelector(UIselectors.page4);

    //BUTTON PAGE NUMBERS EVENT CLICK
    page1.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsPageNum(1, '#ffe5db', '#4d4954', '#4d4954', '#4d4954');

    });
    page2.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsPageNum(2, '#4d4954', '#ffe5db', '#4d4954', '#4d4954');
    });
    page3.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsPageNum(3, '#4d4954', '#4d4954', '#ffe5db', '#4d4954');
    });
    page4.addEventListener("click", (e) => {
        e.preventDefault();
        printProductsPageNum(4, '#4d4954', '#4d4954', '#4d4954', '#ffe5db');
    });

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
            Price: <span class="article-price-num">${product.price}</span> €
            <button class="btn-card btn-add">
            <i class="fas fa-cart-plus btn-success btn-add"></i>
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
                Price: <span class="article-price-num">${product.price}</span> €
                <button class="btn-card btn-add">
                <i class="fas fa-cart-plus btn-success btn-add"></i>
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
                //CHECK IF PRODUCT EXIST AND THAN UPDATE THE AMOUNT
                let cardLi = document.querySelectorAll('.cart-li')
                let listCheckTrigger = false
                cardLi.forEach(card => {
                    if (product.name === card.children[1].children[0].innerText) {
                        let amount = parseFloat(card.children[1].children[1].children[1].innerText)
                        let orginalPrice = parseFloat(card.children[1].children[1].children[3].innerText) / amount
                        card.children[1].children[1].children[1].innerText = parseFloat(card.children[1].children[1].children[1].innerText) + 1
                        card.children[1].children[1].children[3].innerText = orginalPrice * (amount + 1)
                        listCheckTrigger = true
                        totalCostCalc();
                    }
                })
                //IF NOT EXIST THAN CREATE THE CARD
                if (listCheckTrigger === false) {
                    let cartLi = document.createElement("li");
                    cartLi.classList = "cart-li cart-remove";
                    cartLi.innerHTML = `
                <img class="cart-img"src="${product.imageS}"alt=""/>
                <div class="cart-name-num-container">
                <div class="cart-name">${product.name}<i class="fas fa-times fl-r cart-remove"></i>
                </div>
                <div class="cart-price-cost">
                  <i class="fas fa-chevron-left arrow-minus"></i><span class="input-num amount">1</span
                  ><i class="fas fa-chevron-right arrow-plus"></i> Price:
                  <span class="cart-price">${product.price}</span> €
                </div>
                </div>
                `;
                    shoppingCardList.append(cartLi);
                }

            }
        });
        //ADD TOTAL COST CALL
        totalCostCalc();
        //SET SOCAL STORAGE
        setLocalStorage();
    });
};
//ADD TO SHOPPING CART FROM LOCAL STORAGE
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
                  ><i class="fas fa-chevron-right arrow-plus"></i> Price:
                  <span class="cart-price">${price}</span> €
                </div>
                </div>
                `;
                shoppingCardList.append(cartLi);
            }
        });
        //ADD TOTAL COST CALL
        totalCostCalc();
        //SET SOCAL STORAGE
        setLocalStorage();
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
                    let detailsBG = document.createElement("div");
                    detailsBG.classList.add("details-bg");
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
                    Price:<span class="fl-r">€</span><span class="fl-r" id="details-price-num">${product.price}</span>
                    </div>
                    <button class="details-add-btn btn">ADD TO CART</button>
                    </div>
                    <i id="btn-remove-details" class="far fa-times-circle"></i>
                    </div>
                    `;
                    productContainer.append(detailsBG);
                    const btnRemoveDetails = document.getElementById(
                        "btn-remove-details"
                    );
                    btnRemoveDetails.addEventListener("click", () => {
                        detailsBG.remove();
                    });
                    const btnAddDetailsToCart = document.querySelector(
                        ".details-add-btn"
                    );
                    btnAddDetailsToCart.addEventListener("click", (e) => {
                        addToShoppingCard(product.name);
                        succesAdded(e.target);
                    });
                }
            });
        })
        .catch((err) => console.log("ERROR", err));
};

////////////////////////////
//PRINT AND SEARCH PRODUCTS
const printSearchProducts = (name, category, color, price) => {
    productContainer.innerHTML = "";

    //CHECK DEFAULT VALUES
    if (name.length === 0) {
        name = "false";
    }
    if (price == "0") {
        price = "false";
    } else {
        price = parseFloat(price);
    }

    products
        .getProducts()
        .then((product) => {
            product.forEach((product) => {
                //NAME
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    category === "false" &&
                    color === "false" &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //CATEGORY
                if (
                    product.category === category &&
                    color === "false" &&
                    name === "false" &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //COLOR
                if (
                    product.color === color &&
                    category === "false" &&
                    name === "false" &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //PRICE
                if (
                    parseFloat(product.price) <= price &&
                    category === "false" &&
                    color === "false" &&
                    name === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & CATEGORY
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    product.category === category &&
                    color === "false" &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & COLOR
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    category === "false" &&
                    product.color === color &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & PRICE
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    category === "false" &&
                    color === "false" &&
                    parseFloat(product.price) <= parseFloat(price)
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //CATEGORY & COLOR
                if (
                    name === "false" &&
                    product.category === category &&
                    product.color === color &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //CATEGORY & PRICE
                if (
                    name === "false" &&
                    product.category === category &&
                    color === "false" &&
                    parseFloat(product.price) <= parseFloat(price)
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //COLOR & PRICE
                if (
                    name === "false" &&
                    category === "false" &&
                    product.color === color &&
                    parseFloat(product.price) <= parseFloat(price)
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & CATEGORY & COLOR
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    product.category === category &&
                    product.color === color &&
                    price === "false"
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & CATEGORY & PRICE
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    product.category === category &&
                    color === "false" &&
                    parseFloat(product.price) <= parseFloat(price)
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //CATEGORY & COLOR & PRICE
                if (
                    name === "false" &&
                    product.category === category &&
                    product.color === color &&
                    parseFloat(product.price) <= parseFloat(price)
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & CATEGORY & COLOR & PRICE
                if (
                    product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
                    product.category === category &&
                    product.color === color &&
                    parseFloat(product.price) <= parseFloat(price)
                ) {
                    searchProducts(product.imageS, product.name, product.price);
                }
                //NAME & CATEGORY & COLOR & PRICE ARE EMPTY
                if (
                    name === "false" &&
                    category === "false" &&
                    color === "false" &&
                    price === "false"
                ) {
                    inputName.focus();
                    headline.innerText = "Please enter any value to search";
                }
            });
        })
        .catch((err) => console.log("ERROR", err));
};
//PRINT AND SEARCH PRODUCTS__PRODUCT CREATER__
const searchProducts = (image, name, price) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                    <img src="${image}" class="image-small"/>
                    <h4 class="article-name">${name}</h4>
                    <div class="article-price">
                    Price: <span class="article-price-num">${price}</span> €
                    <button class="btn-card btn-add">
                    <i class="fas fa-cart-plus btn-success btn-add"></i>
                    </button>
                    </div>
                    <div class="details"><i id="btn-details" class="open-details fas fa-plus"></i></div>
                    `;
    productContainer.append(card);
    navigationMenuSlideBack();
};

//CLEAR SEARCH INPUTS
const clearSearchInputs = () => {
    inputName.value = ''
    inputCategory.getElementsByTagName('option')[0].selected = 'selected'
    inputColor.getElementsByTagName('option')[0].selected = 'selected'
    inputPrice.value = 0
}

//////////////////
//SUCCESS FUNCTION
const succesAdded = (selector) => {
    selector.classList.add("successAdd");
    shopingCardBtn.classList.add("successAdd");
    setTimeout(() => {
        selector.classList.remove("successAdd");
        shopingCardBtn.classList.remove("successAdd");
    }, 2000);
};

////////////////////
//SET LOCAL STORAGE
const setLocalStorage = () => {
    let products;
    if (localStorage.getItem("products") == null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));
        products = [];
    }

    let allCartLi = document.querySelectorAll(".cart-li");
    allCartLi = Array.from(allCartLi);
    allCartLi.forEach((item) => {
        let product = {
            name: item.children[1].children[0].innerText,
            image: item.children[0].src,
            price: item.children[1].children[1].children[3].innerText,
            amount: item.children[1].children[1].children[1].innerText,
        };
        products.push(product);
    });

    localStorage.setItem("products", JSON.stringify(products));
};
//////////////////////////////////
//GET LOCAL STORAGE AFTER REFRESH
const getLocalStorage = () => {
    let products;
    if (localStorage.getItem("products") == null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));

    }
    products.forEach((product) => {
        addToShoppingCardFromLocalStorage(
            product.name,
            product.amount,
            product.price
        );
    });
};

const setImpressum = () => {
    headline.innerText = "Impressum";
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
    `;
};

////////////////
//REGISTER FORM
const registerFormCreate = () => {
    headline.innerText = "Register Now";
    //CREATE THE INPUTS
    productContainer.innerHTML = `
    <div class="form-container">
        <form action="" method="">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName">
            <div class="invalid-feedback"></div>

            <label for="lastName">Last Name</label>
            <input type="text" id="lastName">
            <div class="invalid-feedback"></div>

            <label for="street">Street & Number</label>
            <input type="text" id="street">
            <div class="invalid-feedback"></div>

            <label for="postcode">Postcode</label>
            <input type="text" id="postcode">
            <div class="invalid-feedback"></div>

            <label for="city">City</label>
            <input type="text" id="city">
            <div class="invalid-feedback"></div>

            <label for="phoneNum">Phone Number</label>
            <input type="number" id="phoneNum">
            <div class="invalid-feedback"></div>

            <label for="email">Email</label>
            <input type="email" id="email">
            <div class="invalid-feedback"></div>

            <label for="password">Password</label>
            <input type="text" id="password">
            <div class="invalid-feedback"></div>

            <label for="password-again">Repeat Password</label>
            <input type="text" id="password-again">
            <div class="invalid-feedback"></div>


            <input type="submit" id="registerBtn" class="btn" value="REGISTER">
            <div class="successOrNot"></div>
        </form>
    </div>
    `;

    ////////////////////////////
    //REGISTER FORM VALID EVENTS

    //FIRSTNAME
    const firstName = document.getElementById("firstName");
    firstName.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^([^ \x21-\x26\x28-\x2C\x2E-\x40\x5B-\x60\x7B-\xAC\xAE-\xBF\xF7\xFE]+)$/;
        validateRegularExpression(firstName, re, "First name must be between 1 and 30 charackters");
    });
    //FIRSTNAME KEYPRESS EVENT
    firstName.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            lastName.focus()
        }
    })

    //LASTNAME
    const lastName = document.getElementById("lastName");
    lastName.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^([^ \x21-\x26\x28-\x2C\x2E-\x40\x5B-\x60\x7B-\xAC\xAE-\xBF\xF7\xFE]+)$/;
        validateRegularExpression(lastName, re, "Last name must be between 1 and 30 charackters");
    });
    //LASTNAME KEYPRESS EVENT
    lastName.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            streetNum.focus()
        }
    })

    //STREETNUMBER
    const streetNum = document.getElementById("street");
    streetNum.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^(([a-zA-ZäöüÄÖÜ]\D*)\s+\d+?\s*.*)$/;
        validateRegularExpression(streetNum, re, "Street or Streetnumber are not valid");
    });
    //STREETNUMBER KEYPRESS EVENT
    streetNum.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            postcode.focus()
        }
    })

    //POSTCODE
    const postcode = document.getElementById("postcode");
    postcode.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/;
        validateRegularExpression(postcode, re, "Postcode must have 5 numbers");
    });
    //POSTCODE KEYPRESS EVENT
    postcode.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            cityName.focus()
        }
    })

    //CITY
    const cityName = document.getElementById("city");
    cityName.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        validateRegularExpression(cityName, re, "Cityname is not valid");
    });
    //CITY KEYPRESS EVENT
    cityName.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            phoneNum.focus()
        }
    })

    //PHONENUMBER
    const phoneNum = document.getElementById("phoneNum");
    phoneNum.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^(((((((00|\+)49[ \-/]?)|0)[1-9][0-9]{1,4})[ \-/]?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-/]?))[0-9]{1,7}([ \-/]?[0-9]{1,5})?)$/;
        validateRegularExpression(phoneNum, re, "Phone number is not valid");
    });
    //PHONENUMBER KEYPRESS EVENT
    phoneNum.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            email.focus()
        }
    })

    //EMAIL
    const email = document.getElementById("email");
    email.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        validateRegularExpression(email, re, "Email is not valid");
    });
    //EMAIL KEYPRESS EVENT
    email.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            password.focus()
        }
    })

    //PASSWORD
    const password = document.getElementById("password");
    password.addEventListener("blur", (e) => {
        e.preventDefault()
        const re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        validateRegularExpression(password, re, "- At least 8 characters long - Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character => !@#$%^&*");
    });
    //PASSWORD KEYPRESS EVENT
    password.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (e.which === 13) {
            passwordAgain.focus()
        }
    })

    //PASSWORD AGAIN
    const passwordAgain = document.getElementById("password-again");
    passwordAgain.addEventListener("blur", (e) => {
        e.preventDefault()
        const pwValue = document.getElementById("password").value.trim();
        passwordAgainCheck(passwordAgain, pwValue, "Passwords are not the same");
    });

    //REGISTER NEW MEMBER TO THE LOCAL STORAGE
    const registerBtn = document.getElementById("registerBtn");
    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (firstName.value !== '' && firstName.classList.contains('true') && lastName.value !== '' && lastName.classList.contains('true') && streetNum.value !== '' && streetNum.classList.contains('true') && postcode.value !== '' && postcode.classList.contains('true') && cityName.value !== '' && cityName.classList.contains('true') && phoneNum.value !== '' && phoneNum.classList.contains('true') && email.value !== '' && email.classList.contains('true') && password.value !== '' && password.classList.contains('true') && passwordAgain.value !== '' && passwordAgain.classList.contains('true')) {
            const member = new RegisterMember(
                firstName.value,
                lastName.value,
                streetNum.value,
                postcode.value,
                cityName.value,
                phoneNum.value,
                email.value,
                password.value
            );
            member.setMemberToStorage();
        } else {
            let message = document.querySelector('.successOrNot')
            message.classList.add('d-block')
            message.style.color = '#f08080'
            message.innerText = 'Please fill out all fields!'
            setTimeout(() => {
                message.classList.remove('d-block')
                message.classList.add('d-none')
            }, 3000)
        }

    });
};

/////////////////////////////////////////
//VALIDATION REGULAR EXPRESSION FUNCTION
const validateRegularExpression = (selectorID, reEx, txt) => {
    if (!reEx.test(selectorID.value.trim())) {
        selectorID.classList.remove("is-invalid");
        selectorID.classList.add("invalid-feedback-border");
        selectorID.classList.remove('true')
        selectorID.nextElementSibling.innerText = txt;
        selectorID.nextElementSibling.classList.add("d-block");
    } else {
        selectorID.classList.add("form-falid");
        selectorID.classList.remove("invalid-feedback-border");
        selectorID.classList.add('true')
        selectorID.nextElementSibling.classList.remove("d-block");
        valid = false
    }
};

//PASSWORD CHECK IF BOOTH ARE THE SAME
const passwordAgainCheck = (selectorID, pw, txt) => {
    if (selectorID.value !== pw) {
        selectorID.classList.remove("is-invalid");
        selectorID.classList.add("invalid-feedback-border");
        selectorID.classList.remove('true')
        selectorID.nextElementSibling.innerText = txt;
        selectorID.nextElementSibling.classList.add("d-block");
    } else {
        selectorID.classList.add("form-falid");
        selectorID.classList.remove("invalid-feedback-border");
        selectorID.classList.add('true')
        selectorID.nextElementSibling.classList.remove("d-block");
    }
};

////////////////
//LOGIN CREATER
// const loginCreater = () => {

//     let loginBg = document.createElement('div')
//     loginBg.classList.add('login-bg')
//     loginBg.innerHTML = `

//         <div class="login-container">
//         <i id="btn-remove-login" class="far fa-times-circle"></i>
//             <h2>Login</h2>
//             <form action="" method="">


//                 <label for="email">Enter Email</label>
//                 <input type="email" id="email-login">
//                 <div class="invalid-feedback"></div>

//                 <label for="password">Enter Password</label>
//                 <input type="text" id="password-login">
//                 <div class="invalid-feedback"></div>

//                 <label for="password-again">Repeat Password</label>
//                 <input type="text" id="password-again-login">
//                 <div class="invalid-feedback"></div>


//                 <input type="submit" id="loginBtn" class="btn" value="LOGIN">
//                 <div class="successOrNot"></div>
//             </form>
//         </div>
//     `

//     productContainer.append(loginBg)
//     const btnRemoveLogin = document.querySelector('#btn-remove-login')
//     btnRemoveLogin.addEventListener('click', (e) => {
//         e.preventDefault()
//         loginBg.remove()
//     })

// }

///////////////////
//ABOUT US CREATER
const aboutUsCreater = () => {
    headline.innerText = 'About Us'

    let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth > 600) {
        productContainer.innerHTML = `
        <div class="box1">
                <div class="boxImage col4"><img src="./img/WorkingTogether.png" alt=""></div>
                <div class="boxContent col8">
                    <h3>Our Team</h3>
    
                    <p>Looking for a new a interesting job? We encourage interdiciplinary working and fundamentally
                        believe in the power of teamwork. Whether you're a Marketing Profession, Programmer or a
                        Logistics Lover - don't hestiate to get in contact with us about open opportunities.</p>
                    <br>
                    <span>JOBS AT URBAN LIVING: <a href="https://www.linkedin.com/jobs/tracker/saved/">Go to site</a></span>
                    <span>Send us yor Initiave application today. <a href="#">Go to chat</a></span>
    
                </div>
            </div>
    
            <div class="box2">
    
                <div class="boxContent2 col8">
                    <h3>Contact Us</h3>
    
                    <p>We strive to give the best possible customer service. Should you have any questions or need to
                        talk to someone about an order, you can get in touch with us the following ways:</p>
                    <br>
                    <span>Phone: 0402 558 33</span>
                    <span>Email: maxmusterman@gmail.com</span>
                    <span>LinkedIn: <a href="https://www.linkedin.com/jobs/tracker/saved/">Go to site</a></span>
                    <span>Chat: <a href="#">Go to chat</a></span>
    
                </div>
                <div class="boxImage2 col4"><img src="./img/CustomerService.png" alt=""></div>
            </div>
    
            <div class="box3">
                <div class="boxImage col4"><img src="./img/OfficeHours.png" alt=""></div>
                <div class="boxContent col8">
                    <h3>Our Office</h3>
    
                    <p>Located in the heart of Hamburg, our dedicated teams with their passion for all things interior,
                        work to provide you with the best possible online shopping experience.
                        You can find us here: </p>
                    <br>
                    <span>Urban Living GmbH</span>
                    <span>Landwehr 29</span>
                    <span>22087 Hamburg</span>
    
                </div>
    
            </div>
        `
    } else {
        productContainer.innerHTML = `
        <div class="box1">
                <div class="boxImage col4"><img src="./img/WorkingTogether.png" alt=""></div>
                <div class="boxContent col8">
                    <h3>Our Team</h3>
    
                    <p>Looking for a new a interesting job? We encourage interdiciplinary working and fundamentally
                        believe in the power of teamwork. Whether you're a Marketing Profession, Programmer or a
                        Logistics Lover - don't hestiate to get in contact with us about open opportunities.</p>
                    <br>
                    <span>JOBS AT URBAN LIVING: <a href="https://www.linkedin.com/jobs/tracker/saved/">Go to site</a></span>
                    <span>Send us yor Initiave application today. <a href="#">Go to chat</a></span>
    
                </div>
            </div>
    
            <div class="box2">
            <div class="boxImage2 col4"><img src="./img/CustomerService.png" alt=""></div>
                <div class="boxContent2 col8">
                    <h3>Contact Us</h3>
    
                    <p>We strive to give the best possible customer service. Should you have any questions or need to
                        talk to someone about an order, you can get in touch with us the following ways:</p>
                    <br>
                    <span>Phone: 0402 558 33</span>
                    <span>Email: maxmusterman@gmail.com</span>
                    <span>LinkedIn: <a href="https://www.linkedin.com/jobs/tracker/saved/">Go to site</a></span>
                    <span>Chat: <a href="#">Go to chat</a></span>
    
                </div>
                
            </div>
    
            <div class="box3">
                <div class="boxImage col4"><img src="./img/OfficeHours.png" alt=""></div>
                <div class="boxContent col8">
                    <h3>Our Office</h3>
    
                    <p>Located in the heart of Hamburg, our dedicated teams with their passion for all things interior,
                        work to provide you with the best possible online shopping experience.
                        You can find us here: </p>
                    <br>
                    <span>Urban Living GmbH</span>
                    <span>Landwehr 29</span>
                    <span>22087 Hamburg</span>
    
                </div>
    
            </div>
        `
    }

}