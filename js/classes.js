class ArticlesCtr {
    constructor(articelNumber, name, category, price, color, imageL, imageS, description) {
        this.articelNumber = articelNumber
        this.name = name
        this.category = category
        this.price = price
        this.color = color
        this.imageL = imageL
        this.imageS = imageS
        this.description = description
    }

    //FETCH API
    async getArticles() {
        const response = await fetch('http://localhost:3000/articles')
        const resData = await response.json()
        return resData
    }
}