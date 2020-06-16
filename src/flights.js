import * as Constants from './utils/constants'

const unirest = require("unirest");
require('dotenv').config()

const REQUEST_URL = Constants.flightApiConstants.REQUEST_URL
const MARKET = Constants.flightApiConstants.MARKET
const LANGUAGE = Constants.flightApiConstants.LANGUAGE


function get_routes(currency, origin, destiny, dates_outbound, dates_inbound){

    var req = unirest("GET", `https://${REQUEST_URL}/apiservices/browseroutes/v1.0/${MARKET}/${currency}/${LANGUAGE}/${origin}/${destiny}/${dates_outbound}`);

    req.query({
        "inboundpartialdate": dates_inbound
    });

    req.headers({
        "x-rapidapi-host": REQUEST_URL,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);

        return JSON.parse(res.body)
    });
}


// country XYZ que vai ser retornado do list_markets
// retorna lista de lugares relacionados ao termo buscado Places[]['PlaceName']
// necessário mostrar esse 
function list_places(query, country, currency){

    var req = unirest("GET", `https://${REQUEST_URL}/apiservices/autosuggest/v1.0/${country}/${currency}/${MARKET}/`);
    
    req.query({
        "query": query // Cidade, bairro, etc
    });
    
    req.headers({
        "x-rapidapi-host": REQUEST_URL,
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
    var req = unirest("GET", `https://${REQUEST_URL}/apiservices/reference/v1.0/countries/en-US`);

    req.headers({
        "x-rapidapi-host": REQUEST_URL,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
        return JSON.parse(res.body)
    });
}