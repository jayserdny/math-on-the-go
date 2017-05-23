// Externals Libraries

var app = require('express')();
var bodyParser  = require('body-parser');
var request = require('request');
var math = require('mathjs');
var apiaiApp = require('apiai')(process.env.API_AI_API);
var express = require('express');
var request = require('request');
var fs = require('file-system');
var http = require('http');
var download = require('download-file');

if (process.env.NODE_ENV !== 'production') {
require('dotenv').config()
}

// Setup for express js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var path = require('path');
app.use(express.static(path.join(__dirname, 'private')));
app.use('/public', express.static(path.join(__dirname + '/private')));

var http = require("http"),
    port = process.env.PORT || 1881;  

// Token for Messenger API
var token = process.env.FACEBOOK_TOKEN;


// Commands available for the bot
var commands = [
  "Here are all the available commands and right to it, a simple example: ",
  "",
  "Simplify: 10/4",
  "",
  "Lcm: 4,6",
  "",
  "Gcd: 4,6",
  "",
  "Xgcd: 4,6",
  "",
  "Derivate: 4x^2 + 5x",
  "",
  "Graph: x^2 + x^3",
  "",
  "Convert: 5 m to km"
].join("\n");

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

  return (str[1].trim() == "" || validate(str[1]) == true && checkVar(str[1], char) == false);
}

// Check for unwanted errors when querying an image
function checkErrorImg(str) {

  return (str[1].trim() == "" || validate(str[1]) == true);
}

// Function to replace all specific characters in a string
String.prototype.replaceAll = function(str1, str2, ignore) {

    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),
      (ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

function setupGreetingText(res){
var messageData = {
    "greeting":[
        {
        "locale":"default",
        "text":"Welcome to Math on the Fly! Solve your Math with me <3 !"
        }, {
        "locale":"en_US",
        "text":"Welcome to Math on the Fly! Solve your Math with me <3 !"
        }
    ]};
request({
    url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    qs: { access_token : token },
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: messageData
},
function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        res.send(body);

    } else { 
        // TODO: Handle errors
        res.send(body);
    }
});

}

function quickRepliesGraph(res) {
var buttons = {
  "message":{
    "text":"Pick a color:",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Red",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
      },
      {
        "content_type":"text",
        "title":"Green",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
      }
    ]
  }
};
request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token : token },
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: buttons
},
function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        res.send(body);
        console.log("Test");

    } else { 
        // TODO: Handle errors
        res.send(body);
        console.log("Test");
    }
});
}

// Persistent Menu For Messenger
function setupPersistentMenu(res){
var messageData = 
    {"persistent_menu":[
        {
        "locale":"default",
        "composer_input_disabled":false,
        "call_to_actions":[
            {
            "title":"Help",
            "type":"nested",
            "call_to_actions":[
                {
                "title":"Commands 1",
                "type":"nested",
                "call_to_actions":[
                  {
                  "title":"Graph",
                  "type":"postback",
                  "payload": "GRAPH_COMMAND"
                  },
                  {
                  "title":"Simplify",
                  "type":"postback",
                  "payload": "SIMPLIFY_COMMAND"
                  },
                  {
                  "title":"Derivate",
                  "type":"postback",
                  "payload": "DERIVATE_COMMAND"
                  },
                  {
                  "title":"GCD",
                  "type":"postback",
                  "payload": "GCD_COMMAND"
                  },
                ],
                },
                {
                "title":"Commands 2",
                "type":"nested",
                "call_to_actions":[
                  {
                  "title":"XGCD",
                  "type":"postback",
                  "payload": "XGCD_COMMAND"
                  },
                  {
                  "title":"LCM",
                  "type":"postback",
                  "payload": "LCM_COMMAND"
                  },
                  {
                  "title":"Convert",
                  "type":"postback",
                  "payload": "CONVERT_COMMAND"
                  },
                ]
                },
                {
                "title":"How To Use",
                "type":"postback",
                "payload":"HOW_TO_USE_PAYLOAD"
                }
            ]
            },
            {
            "type":"postback",
            "title":"Get Started",
            "payload":"getstarted"
            },
            {
            "type":"web_url",
            "title":"Visit website ",
            "url":"https://devpost.com/software/math-on-the-fly",
            "webview_height_ratio":"full"
            }
        ]
        }
    ]};  
// Start the request
request({
    url: "https://graph.facebook.com/v2.6/me/messenger_profile",
    qs: { access_token : token },
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: messageData
},
function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        res.send(body);

    } else { 
        // TODO: Handle errors
        res.send(body);
    }
});

}

function setupGetStartedButton(res){
var messageData = {
        "get_started":{
            "payload":"getstarted"
        }
};
// Start the request
request({
    url: "https://graph.facebook.com/v2.6/me/messenger_profile",
    qs: { access_token : token },
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: messageData
},
function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        res.send(body);

    } else { 
        // TODO: Handle errors
        res.send(body);
    }
});
}
      

app.get('/setup',function(req,res){

    setupGetStartedButton(res);
    setupPersistentMenu(res);
    setupGreetingText(res);
});

function doGraph(action) {
  if (checkErrorImg(action)){

          replyToSender(sender, "This is not allowed");

        } else {

          var equation = action.replaceAll("+", "%2B");
          var fEquation = equation.replaceAll("^", "%5E").trim();
          var eq = fEquation.replaceAll("(", "%28").trim();
          var eq1 = eq.replaceAll(")", "%29").trim();
          var eq2 = eq1.replaceAll(" ", "%20").trim();

          url = "https://www.graphsketch.com/render.php?eqn1_color=1&eqn1_eqn="+ eq2.trim() +"&x_min=-17&x_max=17&y_min=-10.5&y_max=10.5&x_tick=1&y_tick=1&x_label_freq=5&y_label_freq=5&do_grid=0&do_grid=1&bold_labeled_lines=0&bold_labeled_lines=1&line_width=4&image_w=850&image_h=525";
          replyToSender(sender, "Here is your graph for: " + action);
          replyToSenderImage(sender, url.trim());

        }
}

function receivedPostback(res,event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var payload = event.postback.payload;

    switch(payload)
    {
        case 'getstarted':
            replyToSender(sender, "Hello, I am Math on the go. A bot that can help you solving math problems :)\n" +
              "\n" +
              "You can start deal with me with a simple greeting like 'Hey', 'Hello' <3\n"+
              "\n" +
              "Or, you can start with a simple example: Try the following problem: graph: x^2\n"+
              "\n"+
              "If you need any help, type the following command 'help'");
         
            break;

        case 'GRAPH_COMMAND':
            replyToSender(sender, "With the graph command you can graph any equation ;)\n" +
              "\n"+
              "For example, you can execute the following command to graph a parabola 'graph: x^2' :D");
            quickRepliesGraph(res);
            break;

        case 'GRAPH_COMMAND':
            replyToSender(sender, "With the graph command you can graph any equation ;)\n" +
              "\n"+
              "For example, you can execute the following command to graph a parabola 'graph: x^2' :D");
            break;

        default :
            replyToSender(sender, "Hello, I am Math on the go. A bot that can help you solving math problems :)\n" +
              "\n" +
              "You can start deal with me with a simple greeting like 'Hey', 'Hello' <3\n"+
              "\n" +
              "Or, you can start with a simple example: Try the following problem: graph: x^2");
        break;
    }


}



app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) { // Validate token from Facebook's webhooks.
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook/', function (req, res) {

  messaging_events = req.body.entry[0].messaging;

  for (i = 0; i < messaging_events.length; i++) {

    event = req.body.entry[0].messaging[i];

    sender = event.sender.id;


    

    try {

    image = event.message.attachments[0].payload.url;

    if (image) {
      //Checking if there are any image attachments 
      if(event.message.attachments[0].type === "image"){

        var imageURL = image;

        var options = {
          directory: "./private/",
          filename: "image.png"
        }

        var results = "";
 
        download(imageURL, options, function(err){

          if (err) {

            throw err

          } else {

            var url = "https://api.ocr.space/parse/imageurl?apikey="+ process.env.OCR_TOKEN + "&url=https://mathserver.herokuapp.com/public/image.png";
            request({
              url: url,
              json: true
              }, function (error, response, body) {

                if (!error && response.statusCode === 200) {

                  try {

                    results = body.ParsedResults[0].ParsedText;
                    var resultsStr = results.toString();
                    var final = resultsStr.trim();

                    try {

                      replyToSender(sender, "Answer Is: " + math.eval(final));

                    } catch (e) {

                      replyToSender(sender, "Please try a valid operation. Also, please try to use a photo without any other text other than basic math.");

                      }

                  } catch (e) { console.log(e)}
                    
                } else {
                  console.log("error");
                }
              })
            }
          
        });
 
      }
    }

    } catch(e){}
    //Checking for attachments
    

    if (event.message && event.message.text) {
      
      text = event.message.text;

      action = event.message.text.split(":");

      

      apiai = apiaiApp.textRequest(text, {
          sessionId: 'natural_language'
        });
      

      // To simplify equations and fractions
      if (action[0].toLowerCase().trim() == "simplify") {

        try {

          replyToSender(sender, "Answer Is: " + math.simplify(action[1]));

        } catch(err){

          replyToSender(sender, "I can't simplify this :(. Please try the following one: 10/4")
        }
      
      }

      

      // To compute complex numbers
      else if (action[0].toLowerCase().trim() == "complex") {

        try {

          replyToSender(sender, "Answer Is: " + math.complex(action[1]));

        } catch(err) {

          replyToSender(sender, "This is not a complex equation. Try this one: 2i + 5i");

        }

      }

      // To calculate LCM from TWO numbers
      else if (action[0].toLowerCase().trim() == "lcm") {

        try {

          input = action[1].trim();

          lcm = input.split(",");
          
          replyToSender(sender, "The LCM Is: " + math.lcm(lcm[0],lcm[1]));

        } catch(err) {

          replyToSender(sender, "Can't calculate the LCM with given values. Please, try the following: 4, 6")
        }
      }

      // To calculate GCD from TWO numbers
      else if (action[0].toLowerCase().trim() == "gcd") {

        try {

          txt = action[1].trim();

          values = txt.split(",");

          replyToSender(sender, "The GCD Is: " + math.gcd(values[0],values[1]));

        } catch(err) {

          replyToSender(sender, "Can't calculate the GCD with given values. Please, try the following: 4, 6")
        }
      }

      // To calculate Extended Euclidean algorithm from TWO numbers 
      else if (action[0].toLowerCase().trim() == "xgcd") {

        try {

          txt = action[1].trim();

          values = txt.split(",");

          replyToSender(sender, "The Extended Euclidean Algorithm Is: " + math.xgcd(values[0],values[1]));

        } catch(err) {

          replyToSender(sender, "Can't calculate the Extended Euclidean Algorithm with given values. Please, try the following: 4, 6")
        }
      }

      // To convert units 
      else if (action[0].toLowerCase().trim() == "convert") {

        try {
          
          units = action[1].toString();
          console.log(units);

          replyToSender(sender, "Answer Is: " + math.eval(units));

        } catch(err) {

          replyToSender(sender, "Can't convert this kind of unit. Please, try the following: 2 inch, cm")
        }
      }



      // To get the derivative of an equation
      else if (action[0].toLowerCase().trim() == "derivate") {

          try {

            replyToSender(sender, "The Derivative Is: " + math.derivative(action[1], "x"));

          } catch(err) {

            replyToSender(sender, "You can't derivate this function. Try this one: 2x^2 + 5x + 2")

          }
        

      }

      // To evaluate basic math operations
      else if (isNumeric(text[0])) {

        try {

          replyToSender(sender, "Answer Is: " + math.eval(text));

        } catch(err) {

          replyToSender(sender, "I can't compute this equation. Instead, try this: 15 * 4 + 2");
        }
      }

      // To graph an equation
      else if (action[0].toLowerCase().trim() == "graph"){

        if (checkErrorImg(action)){

          replyToSender(sender, "This is not allowed");

        } else {

          var equation = action[1].replaceAll("+", "%2B");
          var fEquation = equation.replaceAll("^", "%5E").trim();
          var eq = fEquation.replaceAll("(", "%28").trim();
          var eq1 = eq.replaceAll(")", "%29").trim();
          var eq2 = eq1.replaceAll(" ", "%20").trim();

          url = "https://www.graphsketch.com/render.php?eqn1_color=1&eqn1_eqn="+ eq2.trim() +"&x_min=-17&x_max=17&y_min=-10.5&y_max=10.5&x_tick=1&y_tick=1&x_label_freq=5&y_label_freq=5&do_grid=0&do_grid=1&bold_labeled_lines=0&bold_labeled_lines=1&line_width=4&image_w=850&image_h=525";
          replyToSender(sender, "Here is your graph for: " + action[1]);
          replyToSenderImage(sender, url.trim());

        }
      }

      // To get help with commands.
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

    // PAYLOADS AREA - Controls the menu area

    else if (event.postback && event.postback.payload) {

          var payload = event.postback.payload;

          switch (payload) {

            case "getstarted":
              receivedPostback(res,event);
              break;

            case "GRAPH_COMMAND":
              receivedPostback(res, event);

            default:
              
            break; 
          }
            
    }
         
          
    }
  

  res.sendStatus(200);

});



app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
