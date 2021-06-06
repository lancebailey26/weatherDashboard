var recent = [];
var recentContainer = document.getElementById('recent')
var searchField = $('#searchField').val();
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

function clear() {
    $(".lead").text('');
    $('h1').text('');
    $('.list-item').remove();
    $('h5').text('');
    $('.card-text').text('');
    
}

function displayRecent() {



    for (var i = 0; i < recent.length; i++) {

        var recentCity = recent[i];
        var listEl = document.createElement('ul');
        var list = document.createElement('li');
        var recentCityBubble = document.createElement('button');
        var cityName = document.createElement('span');
        recentCityBubble.classList = 'list-item';
        




        // var cityID = document.querySelector('span');
        // var cityAPI = 'https://api.openweathermap.org/data/2.5/weather?q='+recentCity+'&units=imperial&appid=b0b277f6143cf88547073bfccc66624a'

       
       

        // cityID.id = "citySpan"
        cityName.textContent = recentCity;
        recentCityBubble.appendChild(cityName);
        recentContainer.appendChild(recentCityBubble);
        recentCityBubble.append(listEl);
       

    }


    $('.list-item').on('click', sidebarAPI);

}


function getAPI() {
    var cityCheck = document.getElementsByClassName('span');
    clear();
    
    if (searchField == cityCheck.textContent) {
        alert("Please choose a new location!")
        return
    }
    displayRecent();
    
    var input = $('#searchField').val();
    if (input == "" || input == " ") {
        alert("Please enter a location!")
        return
    }

    recent.push(input)
    localStorage.setItem("recent searches", JSON.stringify(recent));
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
        .then(function (response) {
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
            $('.lead').append("<p>Temperature: " + temperature + "°");
            $('.lead').append("<br>")
            $('.lead').append("<p>Wind: " + wind + "MPH");
            $('.lead').append("<br>")
            $('.lead').append("<p>Humidity: " + humidity + "%")
            $('.lead').append("<br>")
            //temperature wind humidity uvindex  
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=alerts,minutely,hourly&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data2) {
                    console.log(data2);
                    var uvi = data2.current.uvi;
                    $('.lead').append("<p>UV Index: " + "<span id=uvi>" + uvi + "</span>")

                    if (uvi <= 2.99) {
                        $('#uvi').addClass("low")
                    }
                    if (uvi >= 3 && uvi <= 5.99) {
                        $('#uvi').addClass("moderate")
                    }
                    if (uvi >= 6 && uvi <= 7.99) {
                        $('#uvi').addClass("high")
                    }
                    if (uvi >= 8 && uvi <= 10.99) {
                        $('#uvi').addClass("veryhigh")
                    }
                    if (uvi >= 11) {
                        $('#uvi').addClass("extreme")
                    }
                
                // for(i = 0; i < 6; i++){
                //     JSON.parse(data2.daily)
                // }

                //date wind temp humidity (icon)

                //date comes as unix
                var unixDate1 = data2.daily[1].dt;
                var unixDate2 = data2.daily[2].dt;
                var unixDate3 = data2.daily[3].dt;
                var unixDate4 = data2.daily[4].dt;
                var unixDate5 = data2.daily[5].dt;

                //convert unix to mm/dd/yyyy
                var fiveDate1 = moment.unix(unixDate1).format("MM/DD/YYYY");
                var fiveDate2 = moment.unix(unixDate2).format("MM/DD/YYYY");
                var fiveDate3 = moment.unix(unixDate3).format("MM/DD/YYYY");
                var fiveDate4 = moment.unix(unixDate4).format("MM/DD/YYYY");
                var fiveDate5 = moment.unix(unixDate5).format("MM/DD/YYYY");

               //daytime temp
                var fiveTemp1 = data2.daily[1].temp.day;
                var fiveTemp2 = data2.daily[2].temp.day;
                var fiveTemp3 = data2.daily[3].temp.day;
                var fiveTemp4 = data2.daily[4].temp.day;
                var fiveTemp5 = data2.daily[5].temp.day;

                //wind
                var fiveWind1 = data2.daily[1].wind_speed;
                var fiveWind2 = data2.daily[2].wind_speed;
                var fiveWind3 = data2.daily[3].wind_speed;
                var fiveWind4 = data2.daily[4].wind_speed;
                var fiveWind5 = data2.daily[5].wind_speed;

                //humidity
                var fiveHumid1 = data2.daily[1].humidity;
                var fiveHumid2 = data2.daily[2].humidity;
                var fiveHumid3 = data2.daily[3].humidity;
                var fiveHumid4 = data2.daily[4].humidity;
                var fiveHumid5 = data2.daily[5].humidity;

                //img

                // var fiveCode = data2.daily[1].weather[1].icon;
                // var fiveCodeURL = "http://openweathermap.org/img/wn/"+fiveCode+"@2x.png"
                var cardContainer = document.getElementById('cardContainer')
                var card1 = document.createElement('div')
                var card2 = document.createElement('div')
                var card3 = document.createElement('div')
                var card4 = document.createElement('div')
                var card5 = document.createElement('div')
                
                // var img = document.createElement('img');
                // var img1 = img
                card1.classList = "card";
                card2.classList = "card";
                card3.classList = "card";
                card4.classList = "card";
                card5.classList = "card";
                

                $('.t1').append(fiveDate1);
                $('.p1').append("Temp: " +fiveTemp1 + "<br>" + "Wind: " + fiveWind1 + "<br>" + "Humidity: " + fiveHumid1)
                cardContainer.appendChild(card1);
                
            
                $('.t2').append(fiveDate2);
                $('.p2').append("Temp: " +fiveTemp2 + "<br>" + "Wind: " + fiveWind2 + "<br>" + "Humidity: " + fiveHumid2)
                cardContainer.appendChild(card2);
                
                
                $('.t3').append(fiveDate3);
                $('.p3').append("Temp: " +fiveTemp3 + "<br>" + "Wind: " + fiveWind3 + "<br>" + "Humidity: " + fiveHumid3)
                cardContainer.appendChild(card3);
                
                
                $('.t4').append(fiveDate4);
                $('.p4').append("Temp: " +fiveTemp4 + "<br>" + "Wind: " + fiveWind4 + "<br>" + "Humidity: " + fiveHumid4)
                cardContainer.appendChild(card4);
                
                
                $('.t5').append(fiveDate5);
                $('.p5').append("Temp: " +fiveTemp5 + "<br>" + "Wind: " + fiveWind5 + "<br>" + "Humidity: " + fiveHumid5)
                cardContainer.appendChild(card5);
                $('.card').removeClass('hide');
                
                
                
                
                // })
    // fiveDay();
            
        
        });
        
    })
}

function sidebarAPI() {
    clear();
    displayRecent();
    var theCity = this.textContent;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + theCity + '&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
        .then(function (response) {
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
            $('.lead').append("<p>Temperature: " + temperature + "°");
            $('.lead').append("<br>")
            $('.lead').append("<p>Wind: " + wind + "MPH");
            $('.lead').append("<br>")
            $('.lead').append("<p>Humidity: " + humidity + "%")
            $('.lead').append("<br>")
            //temperature wind humidity uvindex  
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=alerts,minutely,hourly&units=imperial&appid=b0b277f6143cf88547073bfccc66624a')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data2) {
                    console.log(data2);
                    var uvi = data2.current.uvi;
                    $('.lead').append("<p>UV Index: " + "<span id=uvi>" + uvi + "</span>")

                    if (uvi <= 2.99) {
                        $('#uvi').addClass("low")
                    }
                    if (uvi >= 3 && uvi <= 5.99) {
                        $('#uvi').addClass("moderate")
                    }
                    if (uvi >= 6 && uvi <= 7.99) {
                        $('#uvi').addClass("high")
                    }
                    if (uvi >= 8 && uvi <= 10.99) {
                        $('#uvi').addClass("veryhigh")
                    }
                    if (uvi >= 11) {
                        $('#uvi').addClass("extreme")
                    }
               
                
                // var fiveIcon
                // var fiveTemp
                // var fiveWind
                // var fiveHumid
                })
        });
}

// function fiveDay(){
//    var input = $('#searchField').val();
//     fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input+'&cnt=40&appid=b0b277f6143cf88547073bfccc66624a')
//         .then(function (response){
//             return response.json();
//         })
//         .then(function (data){
//             console.log(data);
//             var temp1 = data.list
//             var Wind = data.wind.speed;
//             var humidity = data.main.humidity;
//             var date = 
//         })
// }


$('#searchButton').on('click', getAPI)