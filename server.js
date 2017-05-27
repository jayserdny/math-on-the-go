// Externals Libraries

var app = require('express')(),
    bodyParser  = require('body-parser'),
    request = require('request'),
    math = require('mathjs'),
    apiaiApp = require('apiai')(process.env.API_AI_API),
    express = require('express'),
    request = require('request'),
    fs = require('file-system'),
    http = require('http'),
    download = require('download-file'),
    algebra = require('algebra.js'),
    Algebrite = require('algebrite'),
    menu = require("./menu.js"),
    variables = require("./variables.js"),
    functions = require("./functions.js"),
    path = require('path'),
    http = require("http"),
    port = process.env.PORT || 1881;


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Setup for express js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'private')));
app.use('/public', express.static(path.join(__dirname + '/private')));


app.get('/setup',function(req,res){

    functions.setupGetStartedButton(res);
    functions.setupPersistentMenu(res);
    functions.setupGreetingText(res);
});


// Function to replace all specific characters in a string
String.prototype.replaceAll = function(str1, str2, ignore) {

    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),
    (ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}


// Validate token from Facebook's webhooks.
app.get('/webhook/', function (req, res) {

  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) { 

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

                      functions.replyToSender(sender, "Answer Is: " + math.eval(final).replace(/\*/g, '%'));

                    } catch (e) {

                      functions.replyToSender(sender, "Please try a valid operation. Also, please try to use a photo without any other text other than basic math.");

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

          functions.replyToSender(sender, "Answer Is: " + Algebrite.simplify(action[1]).toString());

        } catch(err){

          functions.replyToSender(sender, "I can't simplify this :(. Please try the following one: 10/4")
        }
      
      }

      

      // To compute complex numbers
      else if (action[0].toLowerCase().trim() == "complex") {

        try {

          functions.replyToSender(sender, "Answer Is: " + math.complex(action[1]).toString());

        } catch(err) {

          functions.replyToSender(sender, "This is not a complex equation. Try this one: 2i + 5i");

        }

      }

      // To calculate LCM from TWO numbers
      else if (action[0].toLowerCase().trim() == "lcm") {

        try {

          input = action[1].trim();

          lcm = input.split(",");
          
          functions.replyToSender(sender, "The LCM Is: " + math.lcm(lcm[0],lcm[1]).toString());

        } catch(err) {

          functions.replyToSender(sender, "Can't calculate the LCM with given values. Please, try the following: 4, 6")
        }
      }

      // To calculate GCD from TWO numbers
      else if (action[0].toLowerCase().trim() == "gcd") {

        try {

          txt = action[1].trim();

          values = txt.split(",");

          functions.replyToSender(sender, "The GCD Is: " + math.gcd(values[0],values[1]).toString());

        } catch(err) {

          functions.replyToSender(sender, "Can't calculate the GCD with given values. Please, try the following: 4, 6")
        }
      }

      // To calculate Extended Euclidean algorithm from TWO numbers 
      else if (action[0].toLowerCase().trim() == "xgcd") {

        try {

          txt = action[1].trim();

          values = txt.split(",");

          functions.replyToSender(sender, "The Extended Euclidean Algorithm Is: " + math.xgcd(values[0],values[1]).toString());

        } catch(err) {

          functions.replyToSender(sender, "Can't calculate the Extended Euclidean Algorithm with given values. Please, try the following: 4, 6")
        }
      }

      // To convert units 
      else if (action[0].toLowerCase().trim() == "convert") {

        try {
          
          units = action[1].toString();
          console.log(units);

          functions.replyToSender(sender, "Answer Is: " + math.eval(units).toString());

        } catch(err) {

          functions.replyToSender(sender, "Can't convert this kind of unit. Please, try the following: 2 inch, cm")
        }
      }



      // To get the derivative of an equation
      else if (action[0].toLowerCase().trim() == "derivate") {

          try {

            functions.replyToSender(sender, "The Derivative Is: " + math.derivative(action[1].trim(), "x").toString());

          } catch(err) {

            functions.replyToSender(sender, "You can't derivate this function. Try this one: 2x^2 + 5x + 2")

          }
        
      }

      else if (action[0].toLowerCase().trim() == "integrate") {

        try {

          var integral = Algebrite.eval('integral(' + action[1].toString().trim() + ')').toString();
          functions.replyToSender(sender, "The answer is: " + integral + " + C");
        }

        catch (err) {
          console.log(err);
          functions.replyToSender(sender, "error");
        }
      }

      else if (action[0].toLowerCase().trim() == "defintegrate") {

        var data = action[1].trim();
        var data1 = data.split(",");
        var equation = data1[0].toString();
        var eqfinal = equation.trim();
        var upper = data[1].trim();
        var lower = data[2].trim();
        console.log(data1);
        console.log(equation);
        x = "x";
        y = "y";

        try {
          functions.replyToSender(sender, "The answer is: " + Algebrite.defint(eqfinal,y,0,x,lower,upper));
        } catch (err) {

          console.log(err);
        }
        
      }

      // To evaluate basic math operations
      else if (functions.isNumeric(text[0])) {

        try {

          functions.replyToSender(sender, "Answer Is: " + math.eval(text).toString());

        } catch(err) {

          functions.replyToSender(sender, "I can't compute this equation. Instead, try this: 15 * 4 + 2");
        }
      }

      // To graph an equation
      else if (action[0].toLowerCase().trim() == "graph"){

        if (functions.checkErrorImg(action)){

          functions.replyToSender(sender, "This is not allowed");

        } else {

          var equation = action[1].replaceAll("+", "%2B");
          var fEquation = equation.replaceAll("^", "%5E").trim();
          var eq = fEquation.replaceAll("(", "%28").trim();
          var eq1 = eq.replaceAll(")", "%29").trim();
          var eq2 = eq1.replaceAll(" ", "%20").trim();

          url = "https://www.graphsketch.com/render.php?eqn1_color=1&eqn1_eqn="+ eq2.trim() +"&x_min=-17&x_max=17&y_min=-10.5&y_max=10.5&x_tick=1&y_tick=1&x_label_freq=5&y_label_freq=5&do_grid=0&do_grid=1&bold_labeled_lines=0&bold_labeled_lines=1&line_width=4&image_w=850&image_h=525";
          functions.replyToSender(sender, "Here is your graph for: " + action[1]);
          functions.replyToSenderImage(sender, url.trim());

        }
      }

      else if (action[0].toLowerCase().trim() == "solve") {

        try {

          var eq = algebra.parse(action[1].trim());

          var x = eq.solveFor("x");

          functions.replyToSender(sender, "x = " + x.toString());          

        } catch (err) {

          functions.replyToSender(sender, "Error");
        }
      }

      // To get help with commands.
      else if (text.toLowerCase() == "help") {

        functions.replyToSender(sender, variables.commands());

      }

      else if (action[0].toLowerCase().trim() == "tobinary") {

        var integer = action[1].trim();
        var binary = functions.toBinary(integer);

        try {
          
          functions.replyToSender(sender, action[1] + " to binary is " + binary);

        } catch (err) {

          functions.replyToSender(sender, "Can't be converted");
        }
      }

      else {

        // Call function to connect to ai responses.
        apiai.on('response', (response) => {
          functions.replyToSender(sender, response.result.fulfillment.speech);
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
              functions.receivedPostback(res, event);
              break;

            case "GRAPH_COMMAND":
              functions.receivedPostback(res, event);
              break;

            case "SIMPLIFY_COMMAND":
              functions.receivedPostback(res, event);
              break;

            case "DERIVATE_COMMAND":
              functions.receivedPostback(res, event);
              break;

            case "GCD_COMMAND":
              functions.receivedPostback(res, event);
              break;

            case "XGCD_COMMAND":
              functions.receivedPostback(res, event);
              break;

            case "INTEGRAL_COMMAND":
              functions.receivedPostback(res, event);
              break;

            case 'LCM_COMMAND':
              functions.receivedPostback(res, event);
              break;

            case 'SOLVE_COMMAND':
              functions.receivedPostback(res, event);
              break;

            case 'TOBINARY_COMMAND':
              functions.receivedPostback(res, event);
              break;

            default:
              functions.receivedPostback(res, event);
              
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
