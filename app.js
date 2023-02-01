

// Interação 
const citySearchInput = document.getElementById ('city-search-input')
const citySearchButton =document.getElementById ('city-search-button')

// Exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");

const api_key ="65cd79bcce73a6d50275d1fa768cb886";
citySearchButton.addEventListener("click",() => {
    let cityName = citySearchInput.value
    getCityWeather(cityName)

    //http://api.openwearmap.org/data/2.5/weather?q=s{city}&units=metric&lang=pt_br&appid=${api_key}

 })

 
 navigator.geolocation.getCurrentPosition(
    (position) => { 
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        getCurrentLocationweather(lat,lon)

    } ,
    (err) => {
        if (err.code === 1 ) {
            alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade atraveés da barra de pesquisa. ")
        } else {
            console.log(err)

     }
        
    }
 )

 function getCurrentLocationweather(lat,lon) {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))

 }
 function getCityWeather(cityName) {

    weatherIcon.src="assets/loading-icon.svg"

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
 }

 function displayWeather(data){
    let {
        dt,
        name,
        weather : [{ icon, description }],
        main : {temp, feels_like, humidity },
        wind: { speed } ,
        sys: { sunrise, sunset },
    } = data
    
    currentDate.textContent = formateDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `assets/${icon}.svg`
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)} ºC`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)} ºC`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formateTime(sunrise);
    sunsetTime.textContent = formateTime(sunset);
 }

 function formateDate(epochTime) {
    let date = new Date(epochTime *1000)
    let formateDate = date.toLocaleDateString('pt-br',{ month: "long", day: 'numeric'})
    return `hoje, ${formateDate}`
 }

 function formateTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
 }



