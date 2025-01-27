const formContainer = document.getElementById('formContainer');
const resultContainer = document.getElementById('resultContainer');
const resultTable = document.getElementById('resultTable');
const meanTemp = document.getElementById('meanTemp');

const weather = {
    city: prompt(`Enter city:`),
    tempMin: [],
    tempMax: [],
    climate: ["sunny", "partly cloudy", "cloudy", "rain", "snow"],
    windSpeed: undefined,
    meanTempDaily: function (tempMin, tempMax) {
        return (tempMax + tempMin) / 2;
    },
    meanTempWeekly: function (temps) {
        const total = temps.reduce((sum, temp) => sum + temp, 0);
        return total / temps.length;
    }
}

function showDataDOM() {
    try {
        
        formContainer.style.display = "block";
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        formContainer.innerHTML = "";
    
        const form = document.createElement("form");
        form.id = "temperatureForm";
        form.innerHTML = `<h2>Enter Temperatures for 7 Days in ${weather.city}</h2>`;

        for (let i = 0; i < days.length; i++) {
            const dayInput = document.createElement("div");
            dayInput.className = 'day-input';
            dayInput.innerHTML = `
                <label for="day${i + 1}">${days[i]}:</label>
                <input type="number" id="max${i + 1}" placeholder="Max Temp" required>
                <input type="number" id="min${i + 1}" placeholder="Min Temp" required>
                <br>
            `;
    
            form.appendChild(dayInput);
        }
    
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Save Data";
        formContainer.style.display = "none";
        form.appendChild(submitButton);
        
        output.appendChild(form);
    
        form.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const maxTemps = [];
            const minTemps = [];
            let validInput = true;
            let icon = "";

            for (let i = 0; i < days.length; i++) {
                const tempMax = document.getElementById(`max${i + 1}`).value;
                const tempMin = document.getElementById(`min${i + 1}`).value;
    
                const max = parseFloat(tempMax);
                const min = parseFloat(tempMin);

                if (isNaN(max) || isNaN(min) || max < min) {
                    alert(`Please enter valid temperatures for ${days[i]}. Max temperature must be higher than Min.`);
                    break;
                }

                maxTemps.push(max);
                minTemps.push(min);
            }

            if (validInput) {
                    const meanMax = (maxTemps.reduce((a, b) => a + b, 0) / maxTemps.length).toFixed(2);
                    const meanMin = (minTemps.reduce((a, b) => a + b, 0) / minTemps.length).toFixed(2);

                    resultTable.innerHTML = "";
                    days.forEach((day, index) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${day}</td>
                            <td>${maxTemps[index]}°C</td>
                            <td>${minTemps[index]}°C</td>
                        `;
                        resultTable.appendChild(row);

                        const tempAvg = weather.meanTempDaily(minTemps[index], maxTemps[index]);

                        if (tempAvg < 0) {
                            icon = "❄️";
                        } else if (tempAvg > 0 && tempAvg < 15) {
                            icon = "☁️";
                            icon = "🌤";
                        } else {
                            icon = "🌞";
                        }
            
                        const iconCell = document.createElement("td");
                        iconCell.textContent = icon;
                        row.appendChild(iconCell);
                    });

                meanTemp.textContent = `Average Max Temperature: ${meanMax}°C, Average Min Temperature: ${meanMin}°C`;
                resultContainer.style.display = "block";
            }
        });
    } catch (error) {
        console.log(`Error, ${error}`);
    }
}

showDataDOM();


