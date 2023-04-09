let currentDay = document.querySelector("#currentDay");
let otherDaysVar = document.querySelector("#otherDays");
let searchValue = document.querySelector("#searchValue");

async function searchLocation(area){

    let apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ff57cd3320b245b8ad1200849231702&q=${area}&days=3&aqi=no&alerts=no`);
    if(apiResponse.status == 200)
    {
        let finalResponse = await apiResponse.json();
        console.log(finalResponse);
        firstDay(finalResponse.current , finalResponse.location);
        otherDays(finalResponse.forecast.forecastday);
    }
}

searchValue.addEventListener("input",function(e){

    searchLocation(e.target.value)
    
    
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function firstDay(current , location){

    if(current != null)
    {
        let lastUpdated = current.last_updated;
        let spaceIndex =  lastUpdated.indexOf(" ");
        let lastUpdated1 = lastUpdated.slice(0,spaceIndex);
        let d = new Date(lastUpdated1);

        let cartona = `<div class="item today">

        <div class="weather-header d-flex justify-content-between">
            <div class="day">${days[d.getDay()]}</div>
            <div class="date">${d.getDate()+months[d.getMonth()]}</div>
        </div>

        <div class="weather-content py-4 px-3">
            <div class="location">${location.name}</div>
            <div class="temprature">
                <div class="temprature-degree text-white d-inline-block me-4"> ${current.temp_c}<sup>o</sup>C</div>
                <div class="temprature-icon d-inline-block"><img src="https:${current.condition.icon}" alt="image"></div>
            </div>
            <div class="weather-state text-info mb-3">${current.condition.text}</div>
            <span class="me-3"><img class="me-1" src="images/icon-umberella.png" alt="umberella"> 20%</span>
            <span class="me-3"><img class="me-1" src="images/icon-wind.png" alt="wind"> 18km/h</span>
            <span class="me-3"><img class="me-1" src="images/icon-compass.png" alt="compass"> East</span>
        </div>

        </div>`
        
        currentDay.innerHTML = cartona;
    }

}

function otherDays(forecast1){

    let cartona1 = ``;
    for(let i=1 ; i<forecast1.length ; i++)
    {
        let classBackground = ""
        if(i==1){
           classBackground = "second-day"
        }
        let d1 = new Date(forecast1[i].date);
        cartona1 += `<div class="col-lg-6">
        <div class="item other-days ${classBackground}">

            <div class="weather-header text-center">
                <div class="day">${days[d1.getDay()]}</div>
            </div>

            <div class="other-days-content">

                <div class="other-days-icon mb-3"><img src="https:${forecast1[i].day.condition.icon}" alt="image"></div>
                <div class="other-days-temprature">${forecast1[i].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${forecast1[i].day.mintemp_c}<sup>o</sup></small>
                <div class="weather-state text-info my-3">${forecast1[i].day.condition.text}</div>

            </div>

        </div>
       </div>`

    }

    otherDaysVar.innerHTML = cartona1;

}

searchLocation("Cairo");