var apiKey="";
function ApiCall(){
    var CityName= document.getElementById("questionInput").value;
    console.log("Weather Button Pressed");
    console.log(CityName);
    var CurrentWeather, lat, lon,PredictedWeather;
    var xhttp = new XMLHttpRequest();
    var xhttpPredict = new XMLHttpRequest();
    var Querry="https://api.openweathermap.org/data/2.5/weather?q="+CityName+"&lang=pl&appid="+apiKey+"&units=metric";
    var QuerryPredict="https://api.openweathermap.org/data/2.5/forecast?q="+CityName+"&lang=pl&appid="+apiKey+"&units=metric";
    console.log(Querry);
    xhttp.open("GET", Querry, true);
    xhttpPredict.open("GET",QuerryPredict,true);
    xhttp.send();
    xhttpPredict.send()
    xhttpPredict.addEventListener("load",()=>{
        PredictedWeather=JSON.parse(xhttpPredict.responseText);
        console.log(JSON.parse(xhttpPredict.responseText));
        drawPredictions(PredictedWeather);
    });
    xhttp.addEventListener("load",()=>{
        console.log(JSON.parse(xhttp.responseText));
        CurrentWeather=JSON.parse(xhttp.responseText);
        draw(CurrentWeather);
    });
}
function draw(CurrentWeather){
    console.log(CurrentWeather.weather[0].description);
    console.log(CurrentWeather.main.temp);
    console.log(CurrentWeather.main.feels_like);
    console.log(CurrentWeather.main.humidity);
    var WeatherField=document.getElementById("WeatherPrediction");
    WeatherField.innerHTML="";
    var rows= document.createElement("div");
    rows.setAttribute("class","CurrentWeather");
    rows.setAttribute("index",0);
    rows.innerHTML="<p>Obecna Pogoda:<br>"+CurrentWeather.weather[0].description+"</p>"+"<p>"+CurrentWeather.main.temp+"°C</p>"+"<p>"+CurrentWeather.main.feels_like+"°C</p>"+"<p>"+CurrentWeather.main.humidity+" %</p>";
    WeatherField.appendChild(rows);
}
function drawPredictions(PredictedWeather){
    console.log("Predictions");
    var WeatherField=document.getElementById("WeatherPrediction");
    console.log(PredictedWeather);
    for (var days=0;days<20;days++){
        var rows= document.createElement("div");
        rows.setAttribute("class","PredictedWeather");
        rows.setAttribute("index",days+1);
        rows.innerHTML="<p>"+PredictedWeather.list[days].dt_txt+"</p><p>"+PredictedWeather.list[days].weather[0].description+"</p>"+"<p>"+PredictedWeather.list[days].main.temp+"°C</p>"+"<p>"+PredictedWeather.list[days].main.feels_like+"°C</p>"+"<p>"+PredictedWeather.list[days].main.humidity+" %</p>";
        WeatherField.appendChild(rows);
    }
}
document.getElementById("WeatherButton").addEventListener("click", ApiCall);
let scrollContainer =document.querySelector("#WeatherPrediction");
scrollContainer.addEventListener("wheel",(ev)=>{
            ev.preventDefault();
            scrollContainer.scrollLeft+=ev.deltaY;

        });
