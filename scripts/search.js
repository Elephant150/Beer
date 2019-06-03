    class BeerApiForName {
        constructor() {
            this.urlForName = 'https://api.punkapi.com/v2/beers?per_page=80'
        }

        searchByName(name, callback) {
            const url = this.urlForName
            const params = {
                'beer_name': name
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

    class BeerNameSearch {
        constructor() {
            this.BeerApiForName = new BeerApiForName()
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

                this.BeerApiForName.searchByName(
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
                    <div class="centerBlockBeer">
                  <div class="beer_bg">
                    <img class ="beer_img" src = "${beer.image_url}">
                    <h4 class="block_title">${beer.name}</h4>
                  </div>
                  </div>`)
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

    const beerNameForm = new BeerNameSearch();
    // pop-up for beer open
    //  $(".beer_bg img").on("click", function() {
    //   $(this).closest(".beer_wrapper").find(".pop_up").fadeIn();
    //   $(".bg").fadeIn();
    // });
    // // pop-up for beer close
    // $(".close_btn").on("click", function (){
    //   $(".pop_up").fadeOut();
    //   $(".bg").fadeOut();
    // });