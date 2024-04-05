console.log("Weather app")
const btn = document.querySelector(".btn");
const input = document.querySelector(".form-control");
const api = "51d41d6f1c399b2abc7a3fcbfbb057c7";
const weatherBox = document.querySelector(".weatherBox")
let city = "";
const arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
btn.addEventListener("click", (e) => {
    console.log(e);
    e.preventDefault();
    let str2 = ""

    city = input.value;
    console.log(city)
    input.value = ""
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`, true);
xhr.onloadstart  = function(){
    console.log("progress")
    let sr  = "" 
    sr += `<h2 class="h2"> ${city} </h2>`;
    document.body.innerHTML = sr;
}
    xhr.onloadend = function () {
       
       

        
        let obj = JSON.parse(this.responseText);
        console.log(obj.cod)
        if (obj.cod === 429) {
            str2 += obj.message;
            weatherBox.innerHTML = str2;
        } else
            if (this.status == 200) {

                let ob = [];
                // console.log(ob.push(...obj))/
                let cardbox = document.querySelector(".cardBox");
                let content = document.querySelector(".content")
                str = "";
                str2 = "";
                let sunrise = displayEndtime(obj.sys.sunrise);
                let sunset = displayEndtime(obj.sys.sunset);
                let date = displayDay();
                let c = `&#8451`;
                if (obj.cod == "404") {

                } else {
                    str += `
            <div class="Box">
                <div class="cardBox">
                    <div class="cloudinfo">          
                      <img src=${"./img/"}${obj.weather[0].main}${".png"}>
                      <p>${obj.weather[0].main}${" | "}${"Feels like "}${(obj.main.feels_like - 273).toFixed(0)}${c}</p>
                    </div>
                    <div class="name">
                       <span>${obj.name}${" ,"}${obj.sys.country}</span> 
                    </div>
                    <div class="date">
                       <p>${date}</p>
                    </div>
                    <div class="temp">
                        <span class="tempNow">${(obj.main.temp - 273.15).toFixed(0)}${c}</span>
                        <div class="minmax">
                           <span class="mintemp">${(obj.main.temp_min - 273.15).toFixed(0)}${c}</span>
                           <span class="maxtemp">${(obj.main.temp_max - 273.15).toFixed(0)}${c}</span>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="weather">
                        <span class="humidity"><img src="./img/blur.png"/>
                           <p>${obj.main.humidity}${"%"}</p>
                           <p>Humidity</p>
                        </span>
                        <span class="wind"><img src="./img/wind.png"/>
                           <p>${obj.wind.speed}${"m/s"}</p>
                           <p>Wind</p>
                        </span>
                        <span class="sunrise"> <img src="./img/sunrise.png"/>
                           <p>${sunrise}</p>
                           <p>Sunrise</p>
                        </span>
                    </div>
                    <div class="location">
                        <span class="lat">  <img src="./img/latitude.png"/>
                          <p>${obj.coord.lat.toFixed(2)}</p>
                          <p>Latitude</p>                  
                        </span>
                        <span class="lon"> <img src="./img/longitude.png"/>
                          <p>${obj.coord.lon.toFixed(2)}</p><p>Longitude</p></span>
                        <span class="sunrise"><img src="./img/sunset.png"/>
                          <p>${sunset}</p>
                          <p>Sunset</p>
                        </span>
                    </div>
                </div>
            </div>`;
                    weatherBox.innerHTML = str;
                    // console.log(str);
                }
            } else {
                console.log("error");
                str2 += "City not found";
                weatherBox.innerHTML = str2;
            }
        
    }
    xhr.send();
});

function displayEndtime(tstamp) {
    const end = new Date(tstamp);

    const hour = end.getHours();
    const min = end.getMinutes();
    const dis = `${hour > 12 ? hour - 12 : hour}:${min < 10 ? "0" : ""}${min}`;
    return dis;
}

function displayDay() {
    const end = new Date();

    const date = end.getDate();
    const mon = end.getMonth();
    const dis = `${arr[mon]}${","}${date}`;
    return dis;
}

// const animae = document.querySelectorAll(".animae");
// function randomsize(min,max){
//     min=Math.ceil(40);
//     max  =Math.ceil(150);
//     return Math.floor(Math.random() * (max-min)) + min;

// }
// function size() {
//     for (let index = 0; index < animae.length; index++) { 
//         console.log("size")
//         animae[index].style.width = randomsize() + 'px';
//         animae[index].style.height = randomsize() + 'px';
//     }
// }

// window.addEventListener("load", size);
