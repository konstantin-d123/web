/*

Задание
Найти API, который выдает прогноз погоды на день
Сделать html-страницу с подробным прогнозом, который отображается в виде карусельки (стрелками перематываем дни либо время дня)

*/


const LAT = 55.0415;
const LON = 82.9346;
const currentDayObj = new Date();
let currentDay = currentDayObj.getDay();
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,wind_speed_10m_max,relative_humidity_2m_max,pressure_msl_max&timezone=Asia/Novosibirsk&forecast_days=7`;

 const weatherCodes = {
        0: { desc: "Ясно", icon: "☀️" },
        1: { desc: "Малооблачно", icon: "🌤️" },
        2: { desc: "Переменная облачность", icon: "⛅" },
        3: { desc: "Пасмурно", icon: "☁️" },
        45: { desc: "Туман", icon: "🌫️" },
        51: { desc: "Морось", icon: "🌧️" },
        53: { desc: "Морось", icon: "🌧️" },
        61: { desc: "Дождь", icon: "🌦️" },
        63: { desc: "Дождь", icon: "🌧️" },
        65: { desc: "Сильный дождь", icon: "🌧️💧" },
        71: { desc: "Снег", icon: "❄️" },
        73: { desc: "Снегопад", icon: "🌨️" },
        75: { desc: "Сильный снег", icon: "❄️❄️" },
        80: { desc: "Ливень", icon: "☔" },
        95: { desc: "Гроза", icon: "⛈️" },
        96: { desc: "Гроза с градом", icon: "⛈️" },
    };


function getWeatherByCode(code){
    if(weatherCodes[code]) return weatherCodes[code];
    return { desc: "Облачно", icon: "⛈️" };
}

function formatDate(dateStr){
    const date = new Date(dateStr);
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const weekday = weekdays[date.getDay()];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}, ${weekday}`;
}

function getTimeFromISO(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Novosibirsk' });
}



function renderCarousel(daysData){
    const container = document.getElementById('caruselCOntantMain');

    /*const caruselHML = `
    ${daysData.map(day => 
        `
         <div class="carusel-element">
                <h2>${day.dateStr}</h2>
         <div class="carusel-body" id="dymamicContent">
        <div>
                        ${day.icon}
                    </div>
                    <div>
                        <p class="g">${day.tempMax}°</p>
                        <p class="go">Ощущается как ${day.feelsLike}°</p>
                        <p>${day.description}</p>
                        <p>Ветер: ${day.wind}</p>
                        <p>Атм. давление: ${day.pressure}</p>
                        <p>Влажность: ${day.humidity}%</p>
                    </div>
                    <div>
                        <p>Восход / закат: ${day.sunrise}</p>
                        <p>Долгота дня: </p>
                    </div></div></div>`
    ).join('')}`;*/
    const day = daysData[currentDay-1]
    const caruselHML = `
     <div class="carusel-element">
                <h2>${day.dateStr}</h2>
         <div class="carusel-body" id="dymamicContent">
        <div>
                        ${day.icon}
                    </div>
                    <div>
                        <p class="g">${day.tempMax}°</p>
                        <p class="go">Ощущается как ${day.feelsLike}°</p>
                        <p>${day.description}</p>
                        <p>Ветер: ${day.wind}</p>
                        <p>Атм. давление: ${day.pressure}</p>
                        <p>Влажность: ${day.humidity}%</p>
                    </div>
                    <div>
                        <p>Восход / закат: ${day.sunrise}</p>
                        <p>Долгота дня: </p>
                    </div></div></div>`;
    container.innerHTML  = caruselHML;
}



async function loadWeather(){
    const container = document.getElementById('caruselCOntantMain');

    const response = await fetch(API_URL);
    if(!response.ok) throw new Error(`Ошибка: ${response.status}`);
    const data = await response.json();

    const daily = data.daily;
    const times = daily.time;
    const maxTemps = daily.temperature_2m_max;
    const weathercode = daily.weathercode;
    const winds = daily.wind_speed_10m_max;
    const humidities = daily.relative_humidity_2m_max;
    const pressures = daily.pressure_msl_max;
    const sunrises = daily.sunrise;



    let daysArray = [];

    for(let i = 0; i < times.length;i++){
        const rawDate = times[i];
        const weekdayF = formatDate(rawDate);

        const dateObj = new Date(rawDate);
        const weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const shortWeekDay = weekdaysShort[dateObj.getDay()];

        const dayNumber = dateObj.getDate();
        const monthShort = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'][dateObj.getMonth()];

        const fullDateLabel = `${dayNumber} ${monthShort}, ${shortWeekDay}`;

        const sunriseTime  = getTimeFromISO(sunrises[i]);
        const weatherInfo = getWeatherByCode(weathercode[i]);

        daysArray.push({
            weekday: shortWeekDay,
            dateStr: fullDateLabel,
            tempMax: maxTemps[i],
            feelsLike: maxTemps[i],
            icon: weatherInfo.icon,
            description: weatherInfo.desc,
            wind: winds[i],
            humidity: humidities[i],
            pressure: pressures[i],
            sunrise: sunrises[i]
        })
    }

    console.log(daysArray);
    renderCarousel(daysArray);


}

loadWeather();


const btnLeft = document.getElementById('btn-left');
btnLeft.addEventListener('click', function(){
    currentDay--;
    if(currentDay == 0){
        currentDay=7;
    }
    loadWeather();
});

const btnRight = document.getElementById('btn-right');
btnRight.addEventListener('click', function(){
    currentDay++;
    if(currentDay == 8){
        currentDay=1;
    }
    loadWeather();
});