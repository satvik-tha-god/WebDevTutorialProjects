const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
  const query=req.body.cityName;
  const apiKey="b09961c2070957026838d6156b1ac38f";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherDATA=JSON.parse(data);
      const temp= Math.round(weatherDATA.main.temp);
      const desc= weatherDATA.weather[0].description;
      const icon= weatherDATA.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+ query +" is "+temp+" degrees Celcius. <br>The weather can be best described as "+desc+".</h1>");
      res.write("<img src="+imageURL+">")
      res.send();
    });

  });
});

app.listen(3000, function(){
  console.log("Server running on port 3000");
});
