var recent = []; //localstorage array
var recentContainer = document.getElementById('recent')
var searchField = $('#searchField').val();
var date = moment().format("L")
var jumbo = document.getElementById('jumbotron')
var apiKey = "&appid=b0b277f6143cf88547073bfccc66624a" //api key so i dont have to keep copying + pasting

function clear() { //clears input fields/text on page
    $(".lead").text('');
    $('h1').text('');
    $('.list-item').remove();
    $('h5').text('');
    $('.card-text').text('');

}

function displayRecent() { //pushes bubbles of previous cities



    for (var i = 0; i < recent.length; i++) {

        var recentCity = recent[i];
        var listEl = document.createElement('ul');
        var recentCityBubble = document.createElement('button');
        var cityName = document.createElement('span');
        recentCityBubble.classList = 'list-item';
        cityName.setAttribute("id", "thecityname")

        cityName.textContent = recentCity;
        recentCityBubble.appendChild(cityName);
        recentContainer.appendChild(recentCityBubble);
        recentCityBubble.append(listEl);
    }
    $('.list-item').on('click', sidebarAPI);
}


function getAPI() { //calls api, displays weather
    clear();
    var input = $('#searchField').val();
    if (input == "" || input == " ") {
        alert("Please enter a location!")
        return
    }

    recent.push(input)
    localStorage.setItem("recent searches", JSON.stringify(recent));

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=imperial' + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //dig thru the response data and find what i need to display
            var city = data.name;
            var temperature = data.main.temp
            var wind = data.wind.speed
            var humidity = data.main.humidity
            var lat = data.coord.lat //need lat + long for next api call (uvi)
            var lon = data.coord.lon
            //append info to page
            $('h1').append(city + " - " + date);
            $('.lead').append("<p>Temperature: " + temperature + "°");
            $('.lead').append("<br>")
            $('.lead').append("<p>Wind: " + wind + "MPH");
            $('.lead').append("<br>")
            $('.lead').append("<p>Humidity: " + humidity + "%")
            $('.lead').append("<br>")
             
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=alerts,minutely,hourly&units=imperial'+ apiKey)
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
                    //here starts the 5 day forecast data

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
                    var fiveCode1 = data2.daily[1].weather[0].icon;
                    var fiveCode2 = data2.daily[2].weather[0].icon;
                    var fiveCode3 = data2.daily[3].weather[0].icon;
                    var fiveCode4 = data2.daily[4].weather[0].icon;
                    var fiveCode5 = data2.daily[5].weather[0].icon;
                    var fiveImage1 = "http://openweathermap.org/img/wn/" + fiveCode1 + "@2x.png"
                    var fiveImage2 = "http://openweathermap.org/img/wn/" + fiveCode2 + "@2x.png"
                    var fiveImage3 = "http://openweathermap.org/img/wn/" + fiveCode3 + "@2x.png"
                    var fiveImage4 = "http://openweathermap.org/img/wn/" + fiveCode4 + "@2x.png"
                    var fiveImage5 = "http://openweathermap.org/img/wn/" + fiveCode5 + "@2x.png"
                    //cards for 5 day
                    var card1 = document.createElement('div')
                    var card2 = document.createElement('div')
                    var card3 = document.createElement('div')
                    var card4 = document.createElement('div')
                    var card5 = document.createElement('div')

                    card1.classList = "card";
                    card2.classList = "card";
                    card3.classList = "card";
                    card4.classList = "card";
                    card5.classList = "card";
                    //giving cards text + appending them
                    $('.t1').append(fiveDate1);
                    $('.img1').attr('src', fiveImage1);
                    $('.p1').append("Temp: " + fiveTemp1 + "°" + "<br>" + "Wind: " + fiveWind1 + "MPH" + "<br>" + "Humidity: " + fiveHumid1 + " %")
                    jumbo.appendChild(card1);

                    $('.t2').append(fiveDate2);
                    $('.img2').attr('src', fiveImage2);
                    $('.p2').append("Temp: " + fiveTemp2 + "°" + "<br>" + "Wind: " + fiveWind2 + "MPH" + "<br>" + "Humidity: " + fiveHumid2 + " %")
                    jumbo.appendChild(card2);

                    $('.t3').append(fiveDate3);
                    $('.img3').attr('src', fiveImage3);
                    $('.p3').append("Temp: " + fiveTemp3 + "°" + "<br>" + "Wind: " + fiveWind3 + "MPH" + "<br>" + "Humidity: " + fiveHumid3 + " %")
                    jumbo.appendChild(card3);

                    $('.t4').append(fiveDate4);
                    $('.img4').attr('src', fiveImage4);
                    $('.p4').append("Temp: " + fiveTemp4 + "°" + "<br>" + "Wind: " + fiveWind4 + "MPH" + "<br>" + "Humidity: " + fiveHumid4 + " %")
                    jumbo.appendChild(card4);

                    $('.t5').append(fiveDate5);
                    $('.img5').attr('src', fiveImage5);
                    $('.p5').append("Temp: " + fiveTemp5 + "°" + "<br>" + "Wind: " + fiveWind5 + "MPH" + "<br>" + "Humidity: " + fiveHumid5 + " %")
                    jumbo.appendChild(card5);
                    $('.card').removeClass('hide');
                })
        });
    displayRecent();


}

function sidebarAPI() { //basically the same but ran from recent search buttons
    clear();
    displayRecent();
    var theCity = this.textContent;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + theCity + '&units=imperial' + apiKey)
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
           
            $('h1').append(city + " - " + date);
            $('.lead').append("<p>Temperature: " + temperature + "°");
            $('.lead').append("<br>")
            $('.lead').append("<p>Wind: " + wind + "MPH");
            $('.lead').append("<br>")
            $('.lead').append("<p>Humidity: " + humidity + "%")
            $('.lead').append("<br>")
            
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=alerts,minutely,hourly&units=imperial'+apiKey)
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
                    var fiveCode1 = data2.daily[1].weather[0].icon;
                    var fiveCode2 = data2.daily[2].weather[0].icon;
                    var fiveCode3 = data2.daily[3].weather[0].icon;
                    var fiveCode4 = data2.daily[4].weather[0].icon;
                    var fiveCode5 = data2.daily[5].weather[0].icon;
                    var fiveImage1 = "http://openweathermap.org/img/wn/" + fiveCode1 + "@2x.png"
                    var fiveImage2 = "http://openweathermap.org/img/wn/" + fiveCode2 + "@2x.png"
                    var fiveImage3 = "http://openweathermap.org/img/wn/" + fiveCode3 + "@2x.png"
                    var fiveImage4 = "http://openweathermap.org/img/wn/" + fiveCode4 + "@2x.png"
                    var fiveImage5 = "http://openweathermap.org/img/wn/" + fiveCode5 + "@2x.png"


                    var card1 = document.createElement('div')
                    var card2 = document.createElement('div')
                    var card3 = document.createElement('div')
                    var card4 = document.createElement('div')
                    var card5 = document.createElement('div')

                    card1.classList = "card";
                    card2.classList = "card";
                    card3.classList = "card";
                    card4.classList = "card";
                    card5.classList = "card";

                    $('.t1').append(fiveDate1);
                    $('.img1').attr('src', fiveImage1);
                    $('.p1').append("Temp: " + fiveTemp1 + "°" + "<br>" + "Wind: " + fiveWind1 + "MPH" + "<br>" + "Humidity: " + fiveHumid1 + " %")
                    jumbo.appendChild(card1);

                    $('.t2').append(fiveDate2);
                    $('.img2').attr('src', fiveImage2);
                    $('.p2').append("Temp: " + fiveTemp2 + "°" + "<br>" + "Wind: " + fiveWind2 + "MPH" + "<br>" + "Humidity: " + fiveHumid2 + " %")
                    jumbo.appendChild(card2);

                    $('.t3').append(fiveDate3);
                    $('.img3').attr('src', fiveImage3);
                    $('.p3').append("Temp: " + fiveTemp3 + "°" + "<br>" + "Wind: " + fiveWind3 + "MPH" + "<br>" + "Humidity: " + fiveHumid3 + " %")
                    jumbo.appendChild(card3);

                    $('.t4').append(fiveDate4);
                    $('.img4').attr('src', fiveImage4);
                    $('.p4').append("Temp: " + fiveTemp4 + "°" + "<br>" + "Wind: " + fiveWind4 + "MPH" + "<br>" + "Humidity: " + fiveHumid4 + " %")
                    jumbo.appendChild(card4);

                    $('.t5').append(fiveDate5);
                    $('.img5').attr('src', fiveImage5);
                    $('.p5').append("Temp: " + fiveTemp5 + "°" + "<br>" + "Wind: " + fiveWind5 + "MPH" + "<br>" + "Humidity: " + fiveHumid5 + " %")
                    jumbo.appendChild(card5);
                    $('.card').removeClass('hide');
                })
        })
}
$('#searchButton').on('click', getAPI)