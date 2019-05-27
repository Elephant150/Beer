var url = "https://api.punkapi.com/v2/beers";


$.getJSON(url, function(data) {

            var allBeers = data.filter(function(beer_bg) {
                return beer_bg.abv; // all beer on page
            });
            var weakAbvBeer = data.filter(function(beer_bg) {
                return beer_bg.abv <= 5;
            });
            var mediumAbvBeer = data.filter(function(beer_bg) {
                return beer_bg.abv > 5 && beer_bg.abv <= 12;
            });
            var strongAbvBeer = data.filter(function(beer_bg) {
                return beer_bg.abv > 12;
            });
            var weakIbuBeer = data.filter(function(beer_bg) {
                return beer_bg.ibu <= 22;
            });
            var mediumIbuBeer = data.filter(function(beer_bg) {
                return beer_bg.ibu > 22 && beer_bg.ibu <= 50;
            });
            var bitterIbuBeer = data.filter(function(beer_bg) {
                return beer_bg.ibu > 50;
            });
            // filtered data on page
            function printToPage(range, extract) {
                // create html with data
                var htmlData = range.map(item => `
                  <div class = 'beer_wrapper'>
                  <div class = "beer_bg ${extract}">
                    <img class ="beer_img" src = "${item.image_url}">
                    <h3 class="beer_name">${item.name}</h3>

                  </div>
                  <div class ="pop_up">
                  <button type="button" class="close close_btn" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                    <h3 class ="title">Abv and Ibu</h3>
                      <p>abv - ${item.abv}<br>ibu - ${item.ibu}</p>
                      <h3 class ="title">Description</h3>
                      <p>${item.description}</p>
                      <h3 class ="title">Food Pairing</h3>
                        <ul>

                        ${item.food_pairing
                          .map(ingredient => `<li>${ingredient}</li>`)
                          .join("")}

                        </ul>
                    </div>
                  </div>`
                );

              $(".beers_grid").append(htmlData);
            }   

// print to page beers
    // printToPage(allBeers, "all");
    printToPage(weakAbvBeer, "weakAbv");
    printToPage(mediumAbvBeer, "mediumAbv");
    printToPage(strongAbvBeer, "strongAbv");
    printToPage(weakIbuBeer, "weakIbu");
    printToPage(mediumIbuBeer, "mediumIbu");
    printToPage(bitterIbuBeer, "bitterIbu");

    
    // pop-up for beer open
    $(".beer_bg img").on("click", function() {
      $(this).closest(".beer_wrapper").find(".pop_up").fadeIn();
      $(".bg").fadeIn();
    });
    // pop-up for beer close
    $(".close_btn").on("click", function (){
      $(".pop_up").fadeOut();
      $(".bg").fadeOut();
    });
    // print category
    $(".tab_item").on("click", function(){
      $(".tab_item").removeClass("active");
      $("this").addClass("active");
    });
    // all
    $(".tab_item.all").on("click", function(){
      $(".beers_grid .all").show();
    });
    // weak abv
    $(".tab_item.weakAbv").on("click", function(){
      $(".beers_grid .weakAbv").show();
      $(".beers_grid .all").hide();
      $(".beers_grid .mediumAbv").hide();
      $(".beers_grid .strongAbv").hide();
      $(".beers_grid .weakIbu").hide();
      $(".beers_grid .mediumIbu").hide();
      $(".beers_grid .bitterIbu").hide();
    });
    // medium abv
    $(".tab_item.mediumAbv").on("click", function(){
      $(".beers_grid .mediumAbv").show();
      $(".beers_grid .all").hide();
      $(".beers_grid .weakAbv").hide();
      $(".beers_grid .strongAbv").hide();
      $(".beers_grid .weakIbu").hide();
      $(".beers_grid .mediumIbu").hide();
      $(".beers_grid .bitterIbu").hide();
    });
    // strong abv
    $(".tab_item.strongAbv").on("click", function(){
      $(".beers_grid .strongAbv").show();
      $(".beers_grid .all").hide();
      $(".beers_grid .weakAbv").hide();
      $(".beers_grid .mediumAbv").hide();
      $(".beers_grid .weakIbu").hide();
      $(".beers_grid .mediumIbu").hide();
      $(".beers_grid .bitterIbu").hide();
    });
    // weak ibu
    $(".tab_item.weakIbu").on("click", function(){
      $(".beers_grid .weakIbu").show();
      $(".beers_grid .all").hide();
      $(".beers_grid .weakAbv").hide();
      $(".beers_grid .mediumAbv").hide();
      $(".beers_grid .strongAbv").hide();
      $(".beers_grid .mediumIbu").hide();
      $(".beers_grid .bitterIbu").hide();
    });
    // medium ibu
    $(".tab_item.mediumIbu").on("click", function(){
      $(".beers_grid .mediumIbu").show();
      $(".beers_grid .all").hide();
      $(".beers_grid .weakAbv").hide();
      $(".beers_grid .mediumAbv").hide();
      $(".beers_grid .strongAbv").hide();
      $(".beers_grid .weakIbu").hide();
      $(".beers_grid .bitterIbu").hide();
    });
    // bitter ibu
    $(".tab_item.bitterIbu").on("click", function(){
      $(".beers_grid .bitterIbu").show();
      $(".beers_grid .all").hide();
      $(".beers_grid .weakAbv").hide();
      $(".beers_grid .mediumAbv").hide();
      $(".beers_grid .strongAbv").hide();
      $(".beers_grid .weakIbu").hide();
      $(".beers_grid .mediumIbu").hide();
    });
});
// ---------------------------------