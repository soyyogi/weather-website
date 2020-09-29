const got = require('got');


const getWeatherData = async (address) => {
    try {
        const location = await got(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFveW9nZXNoNzgiLCJhIjoiY2tmYWFlbWZnMGxxNTJxbGR0MDh0NGZiZiJ9.-uZ2wncblDWHMFa0CA4Kog&limit=1`).json()
        const long = location.features[0].center[0]
        const lat = location.features[0].center[1]
        const response = await got(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=c4660004bbe1af7664421e0866d7fdcd&lang=en`).json()
        return [response, location.features[0].place_name]
    } catch (error){
        return error
    }
   
}

module.exports = getWeatherData;