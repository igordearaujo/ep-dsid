const unirest = require("unirest");
require('dotenv').config()

const REQUEST_URL_FLIGHTS = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
const MARKET = 'BR'
const LANGUAGE = 'pt-BR'

function get_routes(currency, origin, destiny, dates_outbound, dates_inbound){

    var req = unirest("GET", `https://${REQUEST_URL_FLIGHTS}/apiservices/browseroutes/v1.0/${MARKET}/${currency}/${LANGUAGE}/${origin}/${destiny}/${dates_outbound}`);

    req.query({
        "inboundpartialdate": dates_inbound
    });

    req.headers({
        "x-rapidapi-host": REQUEST_URL_FLIGHTS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);

        return JSON.parse(res.body)
    });
}

// get_routes('BRL', 'SFO-sky', 'ORD-sky', '2020-12-01', null)

// country XYZ que vai ser retornado do list_markets
// retorna lista de lugares relacionados ao termo buscado Places[]['PlaceName']
// necessário mostrar esse 
function list_places(query, currency){

    var req = unirest("GET", `https://${REQUEST_URL_FLIGHTS}/apiservices/autosuggest/v1.0/${MARKET}/${currency}/${LANGUAGE}/`);
    
    req.query({
        "query": query // Cidade, bairro, etc
    });
    
    req.headers({
        "x-rapidapi-host": REQUEST_URL_FLIGHTS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });
    
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        
        console.log(res.body);
        
        return JSON.parse(res.body)
    });

}


// Esse Country vai vir do GeoAutoComplete quando o usuário selecionar o endereço que ele gera lá
function list_markets(country){
    
    // Aqui a lingua vai ser EN-US pq os resultados do GeoAutoComplete são em inglês
    var req = unirest("GET", `https://${REQUEST_URL_FLIGHTS}/apiservices/reference/v1.0/countries/en-US`);

    req.headers({
        "x-rapidapi-host": REQUEST_URL_FLIGHTS,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        len = (res.body).Countries.length
        response = res.body

        for (var i = 0; i < len; i++){
            if (response.Countries[i].Name == country){
                console.log(response.Countries[i].Name)
                return (response.Countries[i].Code)
            }
        }

    });
}

// list_markets('Brazil')