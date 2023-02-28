let findBtn = document.querySelector('.magnifier-block');
let cityInput = document.querySelector('#another-location');

let newsContainer = document.querySelector(".newsContainer");
let weatherContainer = document.querySelector(".weatherContainer");
let temperatureOutput = document.querySelector('#temperature-out');
let cityOutput = document.querySelector('.city-out');
let timeOutput = document.querySelector('.time');
let dateOutput = document.querySelector('.date');
let weatherIcon = document.querySelector('.weather-icon-img');
let weatherOut = document.querySelector('.condition-out');
let feels = document.querySelector('.feels');

let chosenCities = document.querySelectorAll('.chosen-cities');
let currentBtn = document.querySelector('.location');
let openMap = document.querySelector('.openMap');
let map = document.querySelector('iframe');
let mapDiv = document.querySelector('#map');

let daysOfWeekOut = document.querySelectorAll('.day-of-week');
let moreTemperatureOutputs = document.querySelectorAll('.temperature-value');
let moreWeatherIcons = document.querySelectorAll('.more-weather-icon');
let moreWeatherValues = document.querySelectorAll('.more-weather-value');
let weatherBlocks = document.querySelectorAll('.weather-block');

let dailyCard = document.querySelectorAll('.dailyCard');
let dailyTime = document.querySelectorAll('.dailyTime');
let dailyTemp = document.querySelectorAll('.dailyTemp');
let dailyValue = document.querySelectorAll('.dailyValue');
let dailyImg = document.querySelectorAll('.dailyImg');

let newBlock = document.querySelectorAll('.newBlock');
let newTitle = document.querySelectorAll('.newTitle');
let newDescr = document.querySelectorAll('.newDescr');
let newLink = document.querySelectorAll('.newLink');
let sourse = document.querySelectorAll('.sourse');


let windPointer = document.querySelector('#pointerContain');
let windSpeed = document.querySelector('.windSpeed');
let progress = document.querySelector('.progress-pie-chart');
let progressFill = document.querySelector('.ppc-progress-fill');
let percentsSpan = document.querySelector('.pcc-percents-span');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');
let speedboxDown = document.querySelector('.speedbox-down');
let speedboxScore = document.querySelector('.speedbox-score');


let rightSideBar = document.querySelector('.menu');
let menu = document.querySelector('.right-wrapper');
let close = document.querySelector('.closeImg');
let checkBox = document.querySelector('#checkBox');
let celName = document.querySelector('.celName');
let farName = document.querySelector('.farName');

let city = "Kyiv";
getWeather(city);
setInterval(getDate, 60000);
let temperatureByCelsius;
let temperatureByFahrenheit;
let celsius = true;
let newCityFlag = false;
let lat;
let lon;

// LOCAL STORAGE
// LOCAL STORAGE
// LOCAL STORAGE

window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('onChecked') === 'true') {
        checkBox.checked = true;
        temperatureOutput.textContent = temperatureByFahrenheit + "°F";
        farName.style.color = "#2196F3"
        celName.style.color = "#ffffff"
    }
    checkBox.addEventListener('click', function () {
        if (checkBox.checked == true) {
            localStorage.setItem('onChecked', 'true');
            celsius = false;
            farName.style.color = "#2196F3"
            celName.style.color = "#ffffff"
        } else {
            localStorage.clear();
            celsius = true;
            celName.style.color = "#2196F3"
            farName.style.color = "#ffffff"
        }
    });
});

// LOCATION
// LOCATION
// LOCATION

currentBtn.addEventListener("click", getCurrentLocation);
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
    cityInput.value = "";
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bf35cac91880cb98375230fb443a116f&units=metric`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(json => {
            city = json.name;
            getWeather(city)
        })
}

// EVENT LISTENERS
// EVENT LISTENERS
// EVENT LISTENERS

cityInput.addEventListener('click', () => {
    newCityFlag = true;
    setTimeout(() => newCityFlag = false, 1000);
})

findBtn.addEventListener('click', () => {
    city = cityInput.value;
    getWeather(city);
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        city = cityInput.value;
        getWeather(city);
    }
})

for (const chosenCity of chosenCities) {
    chosenCity.addEventListener('click', () => {
        city = chosenCity.textContent;
        getWeather(city);
        newCityFlag = true;
        setTimeout(() => newCityFlag = false, 1000);
    });
}

rightSideBar.addEventListener('click', () => {
    if (!newCityFlag) {
        menu.classList.toggle('hidden');
        setTimeout(() => menu.classList.toggle('invisible'), 200);
        mapDiv.classList = 'hidden invisible';
    }
});

close.addEventListener('click', () => {
    if (!newCityFlag) {
        menu.classList.toggle('hidden');
        setTimeout(() => menu.classList.toggle('invisible'), 200);
    }
});

openMap.addEventListener('click', () => {
    mapDiv.classList.toggle('hidden');
    setTimeout(() => mapDiv.classList.toggle('invisible'), 200);
})

// GET WEATHER
// GET WEATHER
// GET WEATHER

function getWeather(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&appid=bf35cac91880cb98375230fb443a116f";
    fetch(url)
        .then(response => response.json())
        .then(json => {
            lat = json.coord.lat;
            lon = json.coord.lon;
            if (json.name.length > 9) {
                cityOutput.style.fontSize = "36px"
            } else {
                cityOutput.style.fontSize = "70px"
            }
            cityOutput.textContent = json.name;

            temperatureByCelsius = (json.main.temp - 273.15).toFixed();
            temperatureByFahrenheit = ((json.main.temp - 273.15) * (9 / 5) + 32).toFixed();
            if (checkBox.checked == true) {
                temperatureOutput.textContent = temperatureByFahrenheit + "°F";
            } else {
                temperatureOutput.textContent = temperatureByCelsius + "°C";
            }

            openMap.addEventListener('click', () => {
                map.src = "https://www.rainviewer.com/map.html?loc=" + lat + "," + lon + ",10&oFa=0&oC=0&oU=0&oCS=0&oF=0&oAP=1&c=7&o=90&lm=1&layer=radar&sm=1&sn=0&hu=0";
            })

            let weather = json.weather[0].main;
            switch (weather) {
                case "Clear":
                    weatherOut.textContent = "Clear";
                    weatherIcon.src = "./img/weather/sunny.png";
                    break;
                case "Clouds":
                    weatherOut.textContent = "Cloudy";
                    weatherIcon.src = "./img/weather/cloudy.png";
                    break;
                case "Rain":
                    weatherOut.textContent = "Rainy";
                    weatherIcon.src = "./img/weather/rain.png";
                    break;
                case "Thunderstorm":
                    weatherOut.textContent = "Thunder";
                    weatherIcon.src = "./img/weather/thunder.png";
                    break;
                case "Drizzle":
                    weatherOut.textContent = "Drizzle";
                    weatherIcon.src = "./img/weather/drizzle.png";
                    break;
                case "Snow":
                    weatherOut.textContent = "Snow";
                    weatherIcon.src = "./img/weather/snow.png";
                    break;
            }
            if (checkBox.checked == true) {
                feels.innerHTML = "Feels like: " + (((json.main.feels_like - 273.5) * 1.8 + 32).toFixed()) + `°F`;
            }
            else {
                feels.innerHTML = "Feels like: " + ((json.main.feels_like - 273.15).toFixed()) + `°C`;
            }
            let windDirection = json.wind.deg - 180;
            windPointer.style.transform = 'rotate(' + windDirection + 'deg)';
            windSpeed.textContent = json.wind.speed + " m/s";

            percent = json.main.humidity,
                x = 360 * percent / 100;
            if (percent > 50) {
                progress.id = "gt-50";
            }
            if (percent <= 50) {
                progress.id = "";
            }
            progressFill.style.transform = 'rotate(' + x + 'deg)';
            percentsSpan.textContent = percent + '%';


            let sunriseDate = new Date(json.sys.sunrise * 1000);
            let sunsetDate = new Date(json.sys.sunset * 1000);
            let sunriseHour = String(sunriseDate).substring(16, 18);
            let sunriseMinute = String(sunriseDate).substring(19, 21);
            let sunsetHour = String(sunsetDate).substring(16, 18);
            let sunsetMinute = String(sunsetDate).substring(19, 21);
            sunrise.textContent = `🡹 ${sunriseHour}:${sunriseMinute}`;
            sunset.textContent = `🡻 ${sunsetHour}:${sunsetMinute}`;

            let pres = json.main.pressure;
            speedboxDown.textContent = `${pres} hPa`;
            let updatedPress = Math.round((pres - 750) * 180 / 526.5) - 45;
            speedboxScore.style.transform = 'rotate(' + updatedPress + 'deg)';

            let urlExtra = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=bf35cac91880cb98375230fb443a116f&units=metric";
            fetch(urlExtra)
                .then(response => response.json())
                .then(json => {
                    for (let i = 1; i <= weatherBlocks.length; i++) {
                        if (checkBox.checked == true) {
                            moreTemperatureOutputs[i - 1].textContent = (json.daily[i].temp.eve * 1.8 + 32).toFixed() + "°";
                        }
                        else {
                            moreTemperatureOutputs[i - 1].textContent = (json.daily[i].temp.day).toFixed() + "°";
                        }
                        let moreWeather = json.daily[i].weather[0].main;
                        switch (moreWeather) {
                            case "Clear":
                                moreWeatherValues[i - 1].textContent = "Clear";
                                moreWeatherIcons[i - 1].src = "./img/weather/sunny.png";
                                break;
                            case "Clouds":
                                moreWeatherValues[i - 1].textContent = "Cloudy";
                                moreWeatherIcons[i - 1].src = "./img/weather/cloudy.png";
                                break;
                            case "Rain":
                                moreWeatherValues[i - 1].textContent = "Rainy";
                                moreWeatherIcons[i - 1].src = "./img/weather/rain.png";
                                break;
                            case "Thunderstorm":
                                moreWeatherValues[i - 1].textContent = "Thunder";
                                moreWeatherIcons[i - 1].src = "./img/weather/thunder.png";
                                break;
                            case "Drizzle":
                                moreWeatherValues[i - 1].textContent = "Drizzle";
                                moreWeatherIcons[i - 1].src = "./img/weather/drizzle";
                                break;
                            case "Snow":
                                moreWeatherValues[i - 1].textContent = "Snow";
                                moreWeatherIcons[i - 1].src = "./img/weather/snow.png";
                                break;
                        }
                    }

                })

            let urlHourly = "https://api.openweathermap.org/data/2.5/forecast?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=bf35cac91880cb98375230fb443a116f&units=metric";
            fetch(urlHourly)
                .then(response => response.json())
                .then(json => {
                    for (let i = 1; i <= dailyCard.length; i++) {
                        dailyTemp[i - 1].textContent = (json.list[i].main.temp).toFixed() + "°";
                        if (checkBox.checked == true) {
                            dailyTemp[i - 1].textContent = (json.list[i].main.temp * 1.8 + 32).toFixed() + "°";
                        }
                        else {
                            dailyTemp[i - 1].textContent = (json.list[i].main.temp).toFixed() + "°";
                        }
                        let dateString = (json.list[i].dt_txt);
                        const hour = dateString.substring(11, 13);
                        const minute = dateString.substring(14, 16);
                        dailyTime[i - 1].textContent = `${hour}:${minute}`;
                        let moreWeather = json.list[i].weather[0].main;
                        switch (moreWeather) {
                            case "Clear":
                                dailyValue[i - 1].textContent = "Clear";
                                dailyImg[i - 1].src = "./img/weather/sunny.png";
                                break;
                            case "Clouds":
                                dailyValue[i - 1].textContent = "Cloudy";
                                dailyImg[i - 1].src = "./img/weather/cloudy.png";
                                break;
                            case "Rain":
                                dailyValue[i - 1].textContent = "Rainy";
                                dailyImg[i - 1].src = "./img/weather/rain.png";
                                break;
                            case "Thunderstorm":
                                dailyValue[i - 1].textContent = "Thunder";
                                dailyImg[i - 1].src = "./img/weather/thunder.png";
                                break;
                            case "Drizzle":
                                dailyValue[i - 1].textContent = "Drizzle";
                                dailyImg[i - 1].src = "./img/weather/drizzle";
                                break;
                            case "Snow":
                                dailyValue[i - 1].textContent = "Snow";
                                dailyImg[i - 1].src = "./img/weather/snow.png";
                                break;
                        }
                    }

                })

            let urlNew = "https://gnews.io/api/v4/search?q=" + `${city}` + "&lang=en&apikey=e8177e08eafcce86414a8216746d15dc";
            fetch(urlNew)
                .then(response => response.json())
                .then(json => {
                    for (let i = 1; i <= newBlock.length; i++) {
                        newTitle[i - 1].textContent = (json.articles[i].title);
                        newDescr[i - 1].textContent = (json.articles[i].description);
                        sourse[i - 1].textContent = (json.articles[i].source.name);
                        let link = (json.articles[i].url);
                        newLink[i - 1].href = link;
                    }

                })
        })
    cityInput.value = "";
    getDate();
}


// GET DATE
// GET DATE
// GET DATE

function getDate() {
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let date = new Date();
    let hours;
    if (String(date.getHours()).length === 1) hours = "0" + date.getHours();
    else hours = date.getHours();
    let minutes;
    if (String(date.getMinutes()).length === 1) minutes = "0" + date.getMinutes();
    else minutes = date.getMinutes();
    let day = date.getUTCDate();
    let dayOfWeek = daysOfWeek[date.getDay()];
    let month = months[date.getMonth()];
    let fullYear = String(date.getFullYear());
    let year = "'" + fullYear[2] + fullYear[3];

    timeOutput.textContent = `${hours}:${minutes}`;
    dateOutput.textContent = `${dayOfWeek}, ${day} ${month} ${year}`;
    for (let i = 1; i <= daysOfWeekOut.length; i++) {
        daysOfWeekOut[i - 1].textContent = daysOfWeek[date.getDay() + i];
    }
}