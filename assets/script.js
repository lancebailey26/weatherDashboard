var recent = [];
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
}

$('#searchButton').on('click', function(){
    clear();
    var input = $('#search').val();
    recent.push(input)
    localStorage.setItem("recent searches",JSON.stringify(recent));
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var temperature = data.main.temp 
            var wind = data.wind.speed
            var humidity = data.main.humidity
            var lat = data.coord.lat
            var lon = data.coord.lon
            // for (var i = 0; i>data.length; i++)
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
                $('p').append("UVI: " + "<span id=uvi>"+uvi+"</span>")
            
                if (uvi <=2){
                $('#uvi').addClass("low")
                }
                if (uvi >=3.99 && uvi <=5.99){
                    $('#uvi').addClass("moderate")
                }
                if (uvi >=6.99 && uvi <= 7.99){
                    $('#uvi').addClass("high")
                }
                if (uvi >= 8.99 && uvi <= 10.99){
                    $('#uvi').addClass("veryhigh")
                }
                if (uvi >= 11){
                    $('#uvi').addClass("extreme")
                }
              })
            });
          
       
        });
    