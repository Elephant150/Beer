class BeerAPI {
    constructor() {
        this.url = 'https://api.punkapi.com/v2/beers'
    }

    searchByName(name, callback) {
        const urlApi = this.url
        const params = {
            'beer_name': name
        }

        $.getJSON(urlApi, params)
            .done((data) => {
                callback(data)
            })
            .fail((response) => {
                callback(null)
            })
    }
}

class BeerSearch {
    constructor() {
        this.BeerAPI = new BeerAPI()
        this.elements = {
            'form': $('#search_form'),
            'input': $('#search_input'),
            'results': $('#results')
        }

        this.registerEvents()
    }

    registerEvents() {
        this.elements.form.on('submit', (e) => {
            e.preventDefault()
            const userInput = this.elements.input.val().trim()

            this.BeerAPI.searchByName(
                userInput, (data) => {
                    this.showResults(data)
                    console.log(data)
                }
            )
        })
    }

    showResults(data) {
        this.elements.results.html('')

        if (data.length === 0) {
            this.showError('This beer was found in the database')
        } else {
            $('#error').remove()
            data.forEach((beer) => {
                this.elements.results.append(`
            <div class=" card mb-2">
               <div class="card_body">
               <img class ="beer_img" src = "${beer.image_url}">
               <h3 class="card_title">${beer.name}</h3>
              </div>
           </div>
         `)
            })
        }
    }

    showError(message) {
        let alert = $('#error')

        if (alert.length === 0) {
            this.elements.form.before('<div class="alert alert-danger" id="error"></div>')
            alert = $('#error')
        }

        alert.text(message)
    }
}


const beerForm = new BeerSearch();