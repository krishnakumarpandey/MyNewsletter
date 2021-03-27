const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require('request');
const https =  require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/singup.html");
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/aacf53aed0"
    
    const options = {
        method: "POST",
        auth: "krishna1:e8ef9b578a7397e800ba9824ff023abd-us1"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data) {
           // console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post('/failure', function(req, res) {
    res.redirect('/');
})


app.listen(process.env.PORT || 3000, () => {
    console.log("port is listning on 3000");
    
})

