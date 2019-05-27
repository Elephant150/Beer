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
            'form': $('#search-form'),
            'input': $('#search-input'),
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
            <div class=" card border-light mb-3">
               <div class="card-body">
               <img class ="beer_img" src = "${beer.image_url}">
               <h4 class="card-title">${beer.name}</h4>
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
// $(".tab_item.bitterIbu").on("click", function() {
//     $(".beers_grid .bitterIbu").show();
//     $(".beers_grid .all").hide();
//     $(".beers_grid .weakAbv").hide();
//     $(".beers_grid .mediumAbv").hide();
//     $(".beers_grid .strongAbv").hide();
//     $(".beers_grid .weakIbu").hide();
//     $(".beers_grid .mediumIbu").hide();
// });


const beerForm = new BeerSearch();