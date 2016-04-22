/* 
 *  PubNub EON Demo with Arduino
 *  Original: Displaying the data sent by Arduino with DS18B20 temperature sensor using Johnny-Five
 *	Modified: Displaying the data sent by Arduino with LM35 temperature sensor using Johnny-Five
 *  Original: https://github.com/pubnub/johnnyfive-eon
 *  Modified: https://github.com/j29rios/lm35-johnnyfive
 *  Original: Tomomi Imura @girlie_mac
 *  Modified and [Express & Jade] added: Jorge Rios @j29rios
 *  License: MIT
 */

// Init PubNub - Please use your own keys. Get them from https://admin.pubnub.com
var pubnub = require('pubnub')({
  publish_key: 'pub-c-2b7387b6-1437-42bf-adbd-3f1ffa7c60b2',
  subscribe_key: 'sub-c-f452e206-db80-11e5-aff5-02ee2ddab7fe'
});

var channel = 'Channel-60cjd1c0y';

var temp = 0;

function publish() {
  var data = { eon: {
    'temperature': temp,
  }};
  pubnub.publish({
    channel: channel,
    message: data,
  });
}

// Johnny-Five 
// Using a temperature sensor, type LM35

var five = require('johnny-five');

five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 1000
  });

  temperature.on('data', function() {
    console.log(this.celsius + '°C');
    temp = this.celsius;
  });

  setInterval(publish, 3000);
});

//Express app
var express = require('express');
var app = express();

//Jade
app.set('view engine', 'jade');

//Routes
app.get('/',function(req,res) {
	res.render("index");
});

//Listening Statics files
app.use(express.static('public'));

app.listen(3000,function() {
	console.log('App listen at http://localhost:3000');
});


