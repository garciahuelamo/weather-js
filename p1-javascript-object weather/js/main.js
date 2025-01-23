const weather = {
    city: undefined,
    tempMin: [],
    tempMax: [],
    climate: [
        "sunny", 
        "partly cloudy", 
        "cloudy", 
        "rain", 
        "snow"
    ],
    windSpeed: undefined,
    meanTempDaily: function (tempMin, tempMax) {
        return (tempMax + tempMin) / 2;
    }
}

function requestTemperatures() {
    let days = 7;
    let totalTempMax = 0;
    let totalTempMin = 0;
    let meanTempMin = 0;
    let meanTempMax = 0;

    weather.tempMax = [];
    weather.tempMin = [];

    weather.city = prompt("Introduce city:")

    for(let i=0; i<days; i++){

        let tempMaxInput = prompt("Introduce temperature max for day " + (i + 1) + ":");
        let tempMinInput = prompt("Introduce temperature min for day " + (i + 1) + ":");

        tempMaxInput = parseFloat(tempMaxInput);
        tempMinInput = parseFloat(tempMinInput);

        totalTempMax += tempMaxInput;
        totalTempMin += tempMinInput;

        meanTempMax = totalTempMax / days;
        meanTempMin = totalTempMin / days;

        weather.tempMin.push(tempMinInput);
        weather.tempMax.push(tempMaxInput);

    }

    console.log("Max. temperatures in " + weather.city + " for this week (mo-su): " + weather.tempMax);
    console.log("Min. temperatures in " + weather.city + " for this week (mo-su): " + weather.tempMin);

    console.log("Mean max. temperature for this week is: " + meanTempMax.toFixed(2));
    console.log("Mean min. temperature for this week is: " + meanTempMin.toFixed(2));
}

requestTemperatures();


