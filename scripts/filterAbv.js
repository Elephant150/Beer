class BeerApiForAbv {
    constructor() {
        this.urlForAbv = 'https://api.punkapi.com/v2/beers?per_page=80'
    }

    searchByAbv(abv, callback) {
        const url = this.urlForAbv
        const params = {
            'abv_lt': abv
        }

        $.getJSON(url, params)
            .done((data) => {
                callback(data)
            })
            .fail((response) => {
                callback(null)
            })
    }
}

class BeerAbvSearch {
    constructor() {
        this.BeerApiForAbv = new BeerApiForAbv()
        this.elements = {
            'form': $('#searchAbv-form'),
            'input': $('#searchAbv-input'),
            'resultsAbv': $('#resultsAbv')
        }

        this.registerEvents()
    }

    registerEvents() {
        this.elements.form.on('submit', (e) => {
            e.preventDefault()
            const userInput = this.elements.input.val().trim()

            this.BeerApiForAbv.searchByAbv(
                userInput, (data) => {
                    this.showResults(data)
                    console.log(data)
                }
            )
        })
    }

    showResults(data) {
        this.elements.resultsAbv.html('')

        if (data.length === 0) {
            this.showError('This beer was found in the database')
        } else {
            $('#error').remove()
            data.forEach((beer) => {
                this.elements.resultsAbv.append(`
             <div class=" centerBlockBeer">
                <div class="beer_bg">
                <img class ="beer_img" src = "${beer.image_url}">
                  <h4 class="block_title">${beer.name}</h4>
                  <h4 class="beer_abv">${beer.abv}</h4>
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

const beerAbvForm = new BeerAbvSearch();