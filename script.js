const currentDayEl = document.getElementById('currentDay')
var currentHour = moment().format("dddd, MMMM Do YYYY");
currentDayEl.textContent = currentHour;
// why is moment undefined?


const searchBtnEl = document.querySelector('.searchBtn')
const localStorageArray = [];

var apiKey  = "be43281b92c7806eba0c3648f7dcf89a"


searchBtnEl.addEventListener('click' , function(event){
event.preventDefault()
const searchBarEl = document.querySelector('.searchBar').value
localStorageArray.push(searchBarEl);
localStorage.setItem('cities' , JSON.stringify(localStorageArray));
todaysWeather(searchBarEl);
fiveDayForecast(searchBarEl);
})

var tempEl = document.querySelector('#temp')
var humidityEl = document.querySelector('#humidity')
var windEl = document.querySelector('#wind')
var currentCityEl = document.querySelector('#currentCity')


function todaysWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        if(data.weather[0].id >199 && data.weather[0].id <233){
          document.body.style.backgroundImage = "url(./thunderstorm.jpg)"
        } else if (data.weather[0].id >300 && data.weather[0].id <321){
          document.body.style.backgroundImage = "./drizzle.jpg"
        }else if (data.weather[0].id >499 && data.weather[0].id <522){
          document.body.style.backgroundImage = "./rain.jpg"
        }else if (data.weather[0].id >599 && data.weather[0].id <623){
          document.body.style.backgroundImage = "./snow.jpg"
        }else if (data.weather[0].id >699 && data.weather[0].id <782){
          document.body.style.backgroundImage = "./fog.jpg"
        } else if (data.weather[0].id >800 && data.weather[0].id <805){
          document.body.style.backgroundImage = "url(./cloudy.jpg)"
        }else if (data.weather[0].id === 800){
          document.body.style.backgroundImage = "./clear.jpg"
        }
        
         // how to make first letter captial?	
        currentCityEl.innerHTML = data.name
           
        var temp = data.main.temp
        tempEl.innerHTML = "Today's temperature is " + temp + " degrees"
        var humidity = data.main.humidity
        humidityEl.innerHTML = "Humidity is " + humidity + " %"
        var wind = data.wind.speed
        var windDegreeEl = data.wind.deg
        var emojis = document.createElement("img");
        var emojiEl = document.getElementById('emojis');        
        emojis.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';           
        windEl.innerHTML = "Wind speed is " + wind + " mph"          

    if(windDegreeEl > 0 && windDegreeEl < 90){
  windEl.append(' from the southwest');
} else if (windDegreeEl >= 90 && windDegreeEl < 180){
  windEl.append(" from the northwest");
} else if (windDegreeEl >=180 && windDegreeEl < 270){
  windEl.append(" from the northeast");
} else if (windDegreeEl >=270 || windDegreeEl === 0 ) {
  windEl.append(" from the south east")}
      });     
}

const forecastEl = document.querySelector('.forecast')  

function fiveDayForecast(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
    if(element.dt_txt.indexOf('12:00:00') !== -1){
    console.log(element);
            var div = document.createElement("div");
              div.style.width = "100px";
              div.style.height = "100px";
              div.style.textAlign = "center";
              div.style.background = "blue";
              div.style.color = "white";
              var pTag0 = document.createElement("p");
              pTag0.innerHTML = new Date (element.dt_txt).toLocaleDateString();
              var pTag = document.createElement("p");
              pTag.innerHTML =  element.main.temp + " degrees";
              var pTag2 = document.createElement("p");
              pTag2.innerHTML = element.main.humidity + " %";  
              var pTag3 = document.createElement("p");
              pTag3.innerHTML = element.wind.speed + " mph";
              div.append(pTag0 , pTag , pTag2 , pTag3)
          forecastEl.append(div)    
}
        }
      });

}
