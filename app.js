const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  //   res.send("Server is up and running.");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  // console.log("post request recieved");

  const query = req.body.cityName;
  const apikey = "6b20be6da07288ee7ccaf187478225d3";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //   console.log(weatherData);
      //   const object = {
      //     name: "Pritam",
      //     favouriteFood: "Biryani",
      //   };
      //   console.log(JSON.stringify(object));

      const temp = weatherData.main.temp;
      //   console.log(temp);
      const value = weatherData.weather[0].description;
      //   console.log(value);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The tempertaure in " +
          query +
          " is " +
          temp +
          " degree celcius.</h1>"
      );
      res.write("<p>The description of weather is " + value + "</p>");
      res.write("<image src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000. ");
});
