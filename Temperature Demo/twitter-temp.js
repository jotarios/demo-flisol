var five = require('johnny-five');
var Twitter = require('twitter');

var temp = 0;

// Johnny-Five 
// Using a temperature sensor, type LM35

five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 1000
  });

  temperature.on('data', function() {
    //console.log(this.celsius + '°C');
    temp = this.celsius;
  });

  setInterval(publish, 3000);
});

//Twitter's Client
var client = new Twitter({
  consumer_key: 'b6k7v984gaAa36KVoRdacpRb9',
  consumer_secret: 'ZYG5YdauXqwRTnK2br9vpprebTMys7QMSdUBTH4W9olWrFVMtw',
  access_token_key: '2222062285-PXQwJf5W5EqhOEMt07NZMS9vtiycH8ZkZ6lAs2l',
  access_token_secret: '5yu95L1VGDxOg4iJCs9xrDjlL77OIQIOlyZyHmJ5HBkJb'
});

//Function that publish in Twitter
function publish () {
	client.post('statuses/update', 
	{
		status: 
			'Temperatura en Chiclayo: ' + temp + '°C - powered by Arduino'
	},  
	function(error, tweet, response){
  		if(error){
  			console.log(error); 			
		}
  		console.log(tweet);  // Tweet body.
	});
}

