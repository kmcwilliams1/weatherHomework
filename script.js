// const currentDayEl = document.getElementById('currentDay')
// var currentHour = moment().format("dddd, MMMM Do YYYY");
// currentDayEl.textContent = currentHour;
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

        if(data.weather[0] >199 && data.weather[0] <233){
          document.body.style.backgroundImage = "./thunderstorm.jpg"
        } else if (data.weather[0] >300 && data.weather[0] <321){
          document.body.style.backgroundImage = "./drizzle.jpg"
        }else if (data.weather[0] >499 && data.weather[0] <522){
          document.body.style.backgroundImage = "./rain.jpg"
        }else if (data.weather[0] >599 && data.weather[0] <623){
          document.body.style.backgroundImage = "./snow.jpg"
        }else if (data.weather[0] >699 && data.weather[0] <782){
          document.body.style.backgroundImage = "./fog.jpg"
        } else if (data.weather[0] >800 && data.weather[0] <805){
          document.body.style.backgroundImage = "./cloudy.jpg"
        }else if (data.weather[0] === 800){
          document.body.style.backgroundImage = "./clear.jpg"
        }






        // var currentCity = data.main.temp      where is city in the localStorage
        // currentCityEl.innerHTML = currentCity       
        var temp = data.main.temp
        tempEl.innerHTML = "Today's temperature is " + temp + " degrees"
        var humidity = data.main.humidity
        humidityEl.innerHTML = "Humidity is " + humidity + " %"
        var wind = data.wind.speed
        var windDegreeEl = data.wind.deg
        windEl.innerHTML = "Wind speed is " + wind + " mph" //+ emojois         
        var emojiEl = document.getElementById('emojis');
        // emojiEl.src = 'https://openweathermap.org/img/w' + todaysWeather.weather[0].icon + '.png';       


      });     
}


//how to append this to wind degree??
// if(windDegreeEl > 0 && windDegreeEl < 90){
//   innerHTML = "from the southwest";
// } else if (windDegreeEl >= 90 && windDegreeEl < 180){
//   innterHTML = "from the northwest";
// } else if (windDegreeEl >=180 && windDegreeEl < 270){
//   innerHTML = "from the northeast"
// } else if (windDegreeEl >=270 || windDegreeEl === 0 ) {innerHTML = "from the south east"}








function fiveDayForecast(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
          // const forecastEl = document.querySelector('#forecast')  
          //   var div = document.createElement("div");
          //     div.style.width = "100px";
          //     div.style.height = "100px";
          //     div.style.textAlign = "center";
          //     div.style.background = "blue";
          //     div.style.color = "white";
          //     div.innerHTML =  temp + " degrees";
          //     div.innerHTML = humidity + " degrees";  //do i need to move them from the previous function into the global scale
          //     div.innerHTML = wind + " mph";
          // forecastEl.append(div)    

    if(element.dt_txt.indexOf('12:00:00') !== -1){
    console.log(element);
}
        }
      });

}
