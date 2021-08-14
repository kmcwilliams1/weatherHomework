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
        // var currentCity = data.main.temp      where is city in the localStorage
        // currentCityEl.innerHTML = currentCity       
        var temp = data.main.temp
        tempEl.innerHTML = "Today's temperature is " + temp + " degrees"
        var humidity = data.main.humidity
        humidityEl.innerHTML = "Humidity makes it feel like " + humidity + " degrees"
        var wind = data.wind.speed
     //   var emojies = data.weather.icon        
        windEl.innerHTML = "Wind speed is " + wind + " mph" //+ emojoies 
      });     
}


//how to append this to wind speeds??
// if(windEl > 0 && windEl < 90){
//   innerHTML = "from the southwest";
// } else if (wind El >= 90 && windEl < 180){
//   innterHTML = "from the northwest";
// } else if (windEl >=180 && windEl < 270){
//   innerHTML = "from the northeast"
// } else if (windEl >=270 || windEl === 0 ) {innerHTML = "from the south east"}


const myPEl = document.querySelector('#myP')

function fiveDayForecast(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`).then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.list.length; i++) {
            const element = data.list[i];
          //   var div = document.createElement("div");
          //     div.style.width = "100px";
          //     div.style.height = "100px";
          //     div.style.textAlign = "center";
          //     div.style.background = "blue";
          //     div.style.color = "white";
          //     div.innerHTML =  temp + " degrees";
          //     div.innerHTML = humidity + " degrees";  //do i need to move them from the previous function into the global scale
          //     div.innerHTML = wind + " mph";
          // myPEl.append(div)    

    if(element.dt_txt.indexOf('12:00:00') !== -1){
    console.log(element);
}
        }
      });

}
