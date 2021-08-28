const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  mailchimp.setConfig({
    apiKey: "983a70ee2c88a166963e5563d3651b09-us6",
    server: "YOUR_SERVER_PREFIX"
  });

  const listId = "c6cfca9197";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  async function run() {
    const data = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${
        response.id
      }.`
    );
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/c6cfca9197";
  const options = {
    method: "POST",
    auth: "7vikthagod:983a70ee2c88a166963e5563d3651b09-us6"
  }
  const request=https.request(url, options, function(response) {
    response.on("data",function(data){
        conse.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  run();
});
app.listen(3000, function(req, res) {
  console.log("Server is running on port 3000");
});
// 983a70ee2c88a166963e5563d3651b09-us6
// c6cfca9197
