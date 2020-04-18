let url = 'http://localhost:3000/articles'

async function getUserAsync(url) {
    let response = await fetch(url);
    let data = await response.json()

    data.forEach(article => {
        let img = document.createElement('img')
        img.src = article.imageL
        document.querySelector('#h1').append(img)
    })



    return data;
}

getUserAsync(url)
    .then(data => console.log(data[0].imageS))