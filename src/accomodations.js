const unirest = require("unirest");
require('dotenv').config()

const REQUEST_URL_ACCOMODATIONS = 'hotels4.p.rapidapi.com'
const MARKET = 'BR'
const LOCALE = 'pt_BR'

// retorna destinationId
function locations_search(query){
    var req = unirest("GET", `https://${REQUEST_URL_ACCOMODATIONS}/locations/search`);

    req.query({
        "locale": LOCALE,
        "query": query
    });

    req.headers({
        "x-rapidapi-host": REQUEST_URL_ACCOMODATIONS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}

// locations_search('São Paulo')

// número máximo por página: 25
// cada request traz 25 resultados
// checkin e checkout yyyy-MM-dd

// criar uma class para a query (poder colocar os valores opcionais)

function properties_list(query){

    var req = unirest("GET", `https://${REQUEST_URL_ACCOMODATIONS}/properties/list`);

    req.query({
        // Obrigatório
        "destinationId": "1506246",
        "pageNumber": "1",
        "checkIn": "2020-12-30",
        "checkOut": "2021-01-15",
        "pageSize": "25", // const
        "adults1": "1",

        // Opcional
        // "themeIds": "14",
        "children1": "2",
        "adults2": "4",
        // "children2": null,
        "currency": "BRL", // const
        "priceMin": "100",
        "priceMax": "1000",
        "starRatings": "5",
        // "accommodationIds": "15",
        "locale": LOCALE,
        // "landmarkIds": "327%2C 3",
        "sortOrder": "PRICE", // BEST_SELLER|STAR_RATING_HIGHEST_FIRST|STAR_RATING_LOWEST_FIRST|DISTANCE_FROM_LANDMARK|GUEST_RATING|PRICE_HIGHEST_FIRST|PRICE
        "guestRatingMin": "3"
    });

    req.headers({
        "x-rapidapi-host": REQUEST_URL_ACCOMODATIONS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}

// properties_list()

//  id => pega do properties_list
function get_properties_details(query){

    var req = unirest("GET", `https://${REQUEST_URL_ACCOMODATIONS}/properties/get-details`);

    req.query({
        // Obrigatório
        "id": "513116",

        // Opcional
        "locale": LOCALE,
        "currency": "BRL",
        "checkOut": "2020-01-15",
        "adults1": "1",
        "checkIn": "2020-12-02"
    });

    req.headers({
        "x-rapidapi-host": REQUEST_URL_ACCOMODATIONS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}

// get_properties()

// id from properties/list
function get_hotel_photos(id){
    var req = unirest("GET", `https://${REQUEST_URL_ACCOMODATIONS}/properties/get-hotel-photos`);

    req.query({
        "id": id
    });

    req.headers({
        "x-rapidapi-host": REQUEST_URL_ACCOMODATIONS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}

// get_hotel_photos('1178275040')
