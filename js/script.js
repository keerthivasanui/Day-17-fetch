function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }
  
  //*          <---------------------Creating a Base (container,heading,row)---------------------->
  
  const h1 = element(
    "h1",
    "text-center",
    "title",
    "List of Countries and Weather Details"
  );
  let container = element("div", "container", "", "");
  const row = element("div", "row", "", "");
  
  //! <-------------------------------------------fetch section-------------------------------------------------------->
  
  const response = fetch("https://restcountries.com/v3.1/all");
  response
    .then((data) => data.json())
    .then((res) => {
      //console.log(res)
  
      for (let i = 0; i < res.length; i++) {
        let latitude = res[i].latlng[0];
        let longitude = res[i].latlng[1];
        let col = document.createElement("div");
        col.classList =
          "col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-4 mb-3 justify-content-center";
        col.innerHTML = `
          <div class = "card h-100">
          <div class = "card-header">
          <h3 class = "card-title text-center">${res[i].name.common}</h3>
          </div>
          <div class = "img-box text-center">
          <img src="${res[i].flags.png}" alt="${res[i].name.common} Country Flag" class="card-img-top" />
          </div>
          <div class = "card-body">
          <div class = "card-text text-center"><b>Region:</b> ${res[i].region} </div>
          <div class = "card-text text-center"><b>Capital:</b> ${res[i].capital} </div>
          <div class = "card-text text-center"> 
          <b>Lattitude:</b> ${latitude} <br>
          <b>Longitude:</b> ${longitude} </div>
          <div class = "card-text text-center"><b>Country code:</b> ${res[i].cca3} </div>
          <div class = "card-text text-center"><b>Population:</b> ${res[i].population} </div>
          
          <div id="weather-details-${i}"></div>
          <button class="btn btn-primary" id="weather-btn-${i}"> Click for Weather </button>
  
          </div>
          
          `;
        row.append(col);
      }
  
      //*          <-------------Button which appends weather details from the weather API------------->
  
      let buttons = document.querySelectorAll("button");
      buttons.forEach((btn, index) => {
        let weatherDetailsDisplayed = false;
        btn.addEventListener("click", () => {
          let weatherDetailsDiv = document.getElementById(
            `weather-details-${index}`
          );
          if (weatherDetailsDisplayed) {
            weatherDetailsDiv.innerHTML = "";
            btn.textContent = "Show Weather Details";
            weatherDetailsDisplayed = false;
          } else {
            //*splitting latlng
            let latlng = res[index].latlng;
            let lat = latlng[0];
            let lng = latlng[1];
            //*          <-------------Getting weather API and Updating lat,lng,API key to the API------------->
            let weatherResponse = fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0a703c5f1c4f5d943433bc3742b3d479&units=metric`
            );
            weatherResponse
              .then((data1) => data1.json())
              .then((res1) => {
                weatherDetailsDiv.innerHTML = `
              <div class="card-text text-center"><b>Temperature:</b> ${res1.main.temp}°C</div>
              <div class="card-text text-center"><b>Pressure:</b> ${res1.main.pressure} hPa</div>
              <div class="card-text text-center"><b>Humidity:</b> ${res1.main.humidity}%</div>
              <div class="card-text text-center"><b>Wind Speed:</b> ${res1.wind.speed} m/s</div>
            `;
                btn.textContent = "Hide Weather Details";
                weatherDetailsDisplayed = true;
              });
          }
        });
      });
    });
  
  //! <-------------------------------------------Append section-------------------------------------------------------->
  
  document.body.append(h1, container);
  container.append(row);