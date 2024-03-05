document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    return showAlert("Você precisa digitar uma cidade...");
  }

  const apiKey = "685bcef0045050880ef82b20ad3b1d91";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_BR`;

  const result = await fetch(apiUrl);
  const json = await result.json();

  if (json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      temp_min: json.main.temp_min,
      temp_max: json.main.temp_max,
      wind_speed: json.wind.speed,
      humidity: json.main.humidity,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
    });
  } else {
    showAlert("Não foi possivel localizar");
  }
});

function showInfo(json) {
  showAlert("");

  document.querySelector("#weather").classList.add("show");

  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
  document.querySelector("#temp_value").innerHTML = `${json.temp
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C</sup>`;
  document.querySelector("#temp_description").innerHTML = `${json.description}`;
  document
    .querySelector("#temp_img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  document.querySelector("#temp_max").innerHTML = `${json.temp_max}`;
  document.querySelector("#temp_min").innerHTML = `${json.temp_min}`;
  document.querySelector("#humidity").innerHTML = `${json.humidity}`;
  document.querySelector("#wind").innerHTML = `${json.wind_speed}`;
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}
