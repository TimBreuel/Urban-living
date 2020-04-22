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





}