class BeerApiForIbu {
    constructor() {
        this.urlForIbu = 'https://api.punkapi.com/v2/beers?per_page=80'
    }

    searchByIbu(ibu, callback) {
        const url = this.urlForIbu
        const params = {
            'ibu_lt': ibu
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

class BeerIbuSearch {
    constructor() {
        this.BeerApiForIbu = new BeerApiForIbu()
        this.elements = {
            'form': $('#searchIbu-form'),
            'input': $('#searchIbu-input'),
            'resultsIbu': $('#resultsIbu')
        }

        this.registerEvents()
    }

    registerEvents() {
        this.elements.form.on('submit', (e) => {
            e.preventDefault()
            const userInput = this.elements.input.val().trim()

            this.BeerApiForIbu.searchByIbu(
                userInput, (data) => {
                    this.showResults(data)
                    console.log(data)
                }
            )
        })
    }

    showResults(data) {
        this.elements.resultsIbu.html('')

        if (data.length === 0) {
            this.showError('This beer was found in the database')
        } else {
            $('#error').remove()
            data.forEach((beer) => {
                this.elements.resultsIbu.append(`
             <div class=" centerBlockBeer">
                <div class="beer_bg">
                <img class ="beer_img" src = "${beer.image_url}">
                  <h4 class="block_title">${beer.name}</h4>
                  <h4 class="beer_ibu">${beer.ibu}</h4>
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

const beerIbuForm = new BeerIbuSearch();