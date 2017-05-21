var app = require('express')();
var bodyParser  = require('body-parser');
var request = require('request');
var math = require('mathjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 8080;

var apiaiApp = require('apiai')("2c4b35419a17431fa55cc9298201cc5c");

var token = "EAABziFHDyI8BAGP1V7P0skYxA7QX9oJsN0TepSPRqZCwmbzDma54VDj9MDuVCFs8y6Iv1J1vLy8p2TqoPPM2IUP6I23YLAegLPqMV90HQpNkZCGma6B7TabXQN7ysuhbIYUCziHsNkCyt5ZAryejKFI8yB8XeilrSJGwqRnEQZDZD";


var commands = "Here is a list of available commands:\
                \ \
                " + 
                " \
                \ Graph: equation\
                \ Simplify: equation\
                \ Derivative: equation\
                \ Complex: equation\
                "

// Function to send plain message to the bot
function replyToSender(sender, text) {
  messageData = {
    text : text
  };

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token : token },
    method: 'POST',
    json: {
       recipient: { id : sender },
       message: messageData,
    }
  }, function(error, response, body) {
       if (error) {
         console.log('Error sending message: ', error);
       } else if (response.body.error) {
         console.log('Error: ', response.body.error);
       }
     });
};

// Function to retrive image from bot
function replyToSenderImage(sender, image) {

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token : token },
    method: 'POST',
    json: {
       recipient: { id : sender },
       message: {
        attachment: {
          type: "image",
          payload: {
            url: image
          }
        }
      }
    }
  }, function(error, response, body) {
       if (error) {
         console.log('Error sending message: ', error);
       } else if (response.body.error) {
         console.log('Error: ', response.body.error);
       }
     });
};

// Function to check if input is numeric
function isNumeric(n) {

  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Check if the string just have numbers of characters
function validate(strValue) {

  var objRegExp  = /^[a-zA-Z\u00C0-\u00ff\s]+$/;
  return objRegExp.test(strValue);

}

// Check if character exists in a given string
function checkVar(vari, char) {
  return vari.indexOf(char) > -1;
}

// Check for unwanted errors from users
function checkError(str, char) {
  return (str[1].trim() == "" || validate(str[1]) == true && checkVar(str[1].trim(), char) == false);
}

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === '=l]}NGdntMZMJQSE4qm5orPKq$x9Pf') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook/', function (req, res) {

  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {

    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;

    if (event.message && event.message.text) {
      
      text = event.message.text;
      var action = text.split(":");

      var apiai = apiaiApp.textRequest(text, {
          sessionId: 'natural_language'
        });

      // Function to simplify equations and fractions
      if (action[0].toLowerCase().trim() == "simplify") {

        if (checkError(action, "x")) {

          replyToSender(sender, "This is not allowed");

        } else {

          replyToSender(sender, "Answer Is: " + math.simplify(action[1]));

        }
      
      }

      // Function to compute complex numbers
      else if (action[0].toLowerCase().trim() == "complex") {

        if (checkError(action, "i")) {

          replyToSender(sender, "This is not allowed");

        } else {

        replyToSender(sender, "Answer Is: " + math.complex(action[1]));

      }

    }

      // Function to get the derivative of an equation
      else if (action[0].toLowerCase().trim() == "derivative") {

        if (checkError(action, "x")) {

          replyToSender(sender, "This is not allowed");

        } else {

        replyToSender(sender, "Answer Is: " + math.derivative(action[1], "x"));

      } 
    }

      // Function to evaluate basic math operations
      else if (isNumeric(text[0])) {

        if (validate(text) == false) {

          replyToSender(sender, "Answer Is: " + math.eval(text));
        }
      }

      // Function to graph an equation
      else if (action[0].toLowerCase().trim() == "graph"){

        if (checkError(action[1], "x")){

          replyToSender(sender, "This is not allowed");

        } else {

          url = "https://www.graphsketch.com/render.php?eqn1_color=1&eqn1_eqn="+ action[1].trim() +"&eqn2_color=2&eqn2_eqn=&eqn3_color=3&eqn3_eqn=&eqn4_color=4&eqn4_eqn=&eqn5_color=5&eqn5_eqn=&eqn6_color=6&eqn6_eqn=&x_min=-17&x_max=17&y_min=-10.5&y_max=10.5&x_tick=1&y_tick=1&x_label_freq=5&y_label_freq=5&do_grid=0&do_grid=1&bold_labeled_lines=0&bold_labeled_lines=1&line_width=4&image_w=850&image_h=525";
          replyToSender(sender, "Here is your graph for: " + action[1]);
          replyToSenderImage(sender, url.trim());

        }
      }

      // Function to get help with commands.
      else if (text.toLowerCase() == "help") {

        replyToSender(sender, commands);

      }

      else {

        // Call function to connect to ai responses.
        apiai.on('response', (response) => {
          replyToSender(sender, response.result.fulfillment.speech);
        });

        apiai.on('error', (error) => {
          console.log(error);
        });

        apiai.end();
      }

    } 

    else if (event.postback) {

            console.log("Postback received: " + JSON.stringify(event.postback));
    }
  }

  res.sendStatus(200);

});

app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.listen(port, function () {
  console.log('The webhook is running on port ' + port);
});
