console.log('client side js file.')

fetch('http://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1Ijoic2VyYWoyNiIsImEiOiJjbGRvZGp3eWswOTBqM25xdmszZnlkeWZ6In0.-qlUmutN53yVZEJr1tuyfQ&limit=1').then((response) => {
    response.json().then((data) => {
        // console.log(data.features[0])

        if(data.features.length === 0){
            return console.log('Location not found.')
        }

        const latitude = data.features[0].geometry.coordinates[1], longitude = data.features[0].geometry.coordinates[0];
        const location = data.features[0].place_name;
        console.log(latitude, longitude, location)

        fetch(`http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=${latitude},${longitude}`).then((forecast) => {
            forecast.json().then((forecastData) => {
                // console.log(forecastData)
                if(forecastData.error){
                    return console.log(forecastData.error.info)
                }

                const temp = forecastData.body.current.temperature, feelTemp = forecastData.body.current.feelslike, rain = forecastData.body.current.precip * 100;
                console.log(forecastData.body.current.weather_descriptions + '. It\'s currently ' + temp + ' degrees out. And there is ' + rain + '% chance to rain. And it feels like ' + feelTemp + ' degrees of temperature.');
            })
        })
    })
})

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const address = document.querySelector('#address').value
    
    
    fetch('http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2VyYWoyNiIsImEiOiJjbGRvZGp3eWswOTBqM25xdmszZnlkeWZ6In0.-qlUmutN53yVZEJr1tuyfQ&limit=1').then((response) => {
    response.json().then((data) => {
        // console.log(data.features[0])

        if(data.features.length === 0){
            return console.log('Location not found.')
        }

        const latitude = data.features[0].geometry.coordinates[1], longitude = data.features[0].geometry.coordinates[0];
        const location = data.features[0].place_name;
        alert(latitude + longitude + location)

        fetch(`http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=${latitude},${longitude}`).then((forecast) => {
            forecast.json().then((forecastData) => {
                // console.log(forecastData)
                if(forecastData.error){
                    return console.log(forecastData.error.info)
                }

                const temp = forecastData.body.current.temperature, feelTemp = forecastData.body.current.feelslike, rain = forecastData.body.current.precip * 100;
                console.log(forecastData.body.current.weather_descriptions + '. It\'s currently ' + temp + ' degrees out. And there is ' + rain + '% chance to rain. And it feels like ' + feelTemp + ' degrees of temperature.');
            })
        })
    })
})
})