var recent = [];
var recentContainer = document.getElementById('recent')
var date = moment().format("L")


// function getApi(){
//     localStorage.push
//     var input = $("search").text();
//     console.log(input);
    // var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+input+"&appid=b0b277f6143cf88547073bfccc66624a"

    // fetch(weatherUrl)
    //     .then(function (response){
    //         return response.json();
    //     })
    //     .then(function (data){
    //         console.log(data)
    //     })

function clear(){
    $('p').text('');
    $('h1').text('');
    $('.list-item').remove();
}

function displayRecent(){
   
    for (var i = 0; i < recent.length; i++){
        
        var recentCity = recent[i];
        var listEl = document.createElement('ul');
        var list = document.createElement('li');
        var recentCityBubble = document.createElement('button');
        var cityName = document.createElement('span');
        // var cityID = document.querySelector('span');
        // var cityAPI = 'https://api.openweathermap.org/data/2.5/weather?q='+recentCity+'&units=imperial&appid=b0b277f6143cf88547073bfccc66624a'
        
        
        recentCityBubble.classList = 'list-item';
        // cityID.id = "citySpan"
        cityName.textContent = recentCity;
        recentCityBubble.appendChild(cityName);
        recentContainer.appendChild(recentCityBubble);
        recentCityBubble.append(listEl);
        
    }
    $('.list-item').on('click',sidebarAPI);
}


    
function getAPI(){
    clear();
    displayRecent();
    var input = $('#searchField').val();
    if (input == "" || input == " "){
        alert("Please enter a location!")
        return
    }
    recent.push(input)
    localStorage.setItem("recent searches",JSON.stringify(recent));
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var city = data.name;
            var temperature = data.main.temp  
            var wind = data.wind.speed
            var humidity = data.main.humidity
            var lat = data.coord.lat
            var lon = data.coord.lon
            // for (var i = 0; i>data.length; i++)
            $('h1').append(city + " - " + date);
            $('p').append("Temperature: " + temperature + "°");
            $('p').append("<br>")
            $('p').append("Wind: " + wind + "MPH");
            $('p').append("<br>")
            $('p').append("Humidity: " + humidity + "%")
            $('p').append("<br>")
              //temperature wind humidity uvindex  
              fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=alerts,minutely,hourly&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
              .then(function (response){
                return response.json();
              })
              .then (function (data2){
                  console.log(data2);
                  var uvi = data2.current.uvi;
                $('p').append("UV Index: " + "<span id=uvi>"+uvi+"</span>")
            
                if (uvi <=2.99){
                $('#uvi').addClass("low")
                }
                if (uvi >=3 && uvi <=5.99){
                    $('#uvi').addClass("moderate")
                }
                if (uvi >=6 && uvi <= 7.99){
                    $('#uvi').addClass("high")
                }
                if (uvi >= 8 && uvi <= 10.99){
                    $('#uvi').addClass("veryhigh")
                }
                if (uvi >= 11){
                    $('#uvi').addClass("extreme")
                }
              })
            });
}

function sidebarAPI(){
    clear();
    displayRecent();
    var theCity = this.textContent;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+theCity+'&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var city = data.name;
        var temperature = data.main.temp 
        var wind = data.wind.speed
        var humidity = data.main.humidity
        var lat = data.coord.lat
        var lon = data.coord.lon
        // for (var i = 0; i>data.length; i++)
        $('h1').append(city + " - " + date);
        $('p').append("Temperature: " + temperature + "°");
        $('p').append("<br>")
        $('p').append("Wind: " + wind + "MPH");
        $('p').append("<br>")
        $('p').append("Humidity: " + humidity + "%")
        $('p').append("<br>")
          //temperature wind humidity uvindex  
          fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=alerts,minutely,hourly&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
          .then(function (response){
            return response.json();
          })
          .then (function (data2){
              console.log(data2);
              var uvi = data2.current.uvi;
            $('p').append("UV Index: " + "<span id=uvi>"+uvi+"</span>")
        
            if (uvi <=2.99){
                $('#uvi').addClass("low")
                }
                if (uvi >=3 && uvi <=5.99){
                    $('#uvi').addClass("moderate")
                }
                if (uvi >=6 && uvi <= 7.99){
                    $('#uvi').addClass("high")
                }
                if (uvi >= 8 && uvi <= 10.99){
                    $('#uvi').addClass("veryhigh")
                }
                if (uvi >= 11){
                    $('#uvi').addClass("extreme")
                }
          })
        });
    }
   
       
$('#searchButton').on('click', getAPI);
    
    