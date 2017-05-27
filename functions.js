var tools = require("./quickReplies.js");
var request = require('request');
var variables = require("./variables.js");
var token = process.env.FACEBOOK_TOKEN;
var menu = require("./menu.js");

var self = module.exports = {

	// Function to check if input is numeric
	isNumeric: function(n) {

  		return !isNaN(parseFloat(n)) && isFinite(n);
	},

	// Check if the string just have numbers of characters
	validate: function(strValue) {
  		var objRegExp  = /^[a-zA-Z\u00C0-\u00ff\s]+$/;
  		return objRegExp.test(strValue);

	},

	// Check if character exists in a given string
	checkVar: function(vari, char) {
  		return vari.indexOf(char) > -1;
	},

	// Check for unwanted errors from users
	checkError: function(str, char) {

  		return (str[1].trim() == "" || self.validate(str[1]) == true && self.checkVar(str[1], char) == false);
	},

	// Check for unwanted errors when querying an image
	checkErrorImg: function(str) {

  		return (str[1].trim() == "" || self.validate(str[1]) == true);
	},

	// Convert integer to binary
	toBinary: function(a) {
  		return (a >>> 0).toString(2);
	},

	// Send POST to Facebook graph to load the quick replies
	quickReplies: function(res, buttons) {

  		request({

    		url: 'https://graph.facebook.com/v2.6/me/messages',
    		qs: { access_token : token },
    		method: 'POST',
    		headers: {'Content-Type': 'application/json'},
    		form: buttons
  		},
  		function (error, response, body) {

    	if (!error && response.statusCode == 200) {
      	  console.log("ok");
      	  res.end();

    	} else { 
       	 console.log("error");
    	}
  		});
  		
	},

	// Postback for quickreplies function
	receivedPostback: function(res,event) {
   		var senderID = event.sender.id;
    	var recipientID = event.recipient.id;
    	var timeOfMessage = event.timestamp;
    	var payload = event.postback.payload;
    	var replies = tools;

    	switch(payload)
    	{
        case 'getstarted':
            self.quickReplies(res, replies.getStartedEx(senderID)); 
            break;

        case 'GRAPH_COMMAND':
            self.quickReplies(res, replies.graphEx(senderID)); 
            break;

        case 'SIMPLIFY_COMMAND':
            self.quickReplies(res, replies.simplifyEx(senderID));
            break;

        case 'DERIVATE_COMMAND':
            self.quickReplies(res, replies.derivateEx(senderID));
            break;

        case 'GCD_COMMAND':
            self.quickReplies(res, replies.gcdEx(senderID));
            break;

        case 'XGCD_COMMAND':
            self.quickReplies(res, replies.xgcdEx(senderID));
            break;

        case 'INTEGRAL_COMMAND':
            self.quickReplies(res, replies.integralEx(senderID));
            break;

        case 'LCM_COMMAND':
            self.quickReplies(res, replies.lcmEx(senderID));
            break;

        case 'SOLVE_COMMAND':
            self.quickReplies(res, replies.solveEx(senderID));
            break;

        case 'TOBINARY_COMMAND':
            self.quickReplies(res, replies.tobinaryEx(senderID));
            break;

        case 'CONVERT_COMMAND':
              self.quickReplies(res, replies.convertEx(senderID));
              break;


        default :
            self.quickReplies(res, replies.getStartedEx(senderID));
        break;
    	}

	},

	// Function to send plain message to the bot
	replyToSender: function(res,sender, text) {
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
       	if (!error && response.statusCode == 200) {
      	  console.log("ok");
      	  res.end();

    	} else { 
       	 console.log("error");
    	}
     	});
	},

	// Function to retrive image from bot
	replyToSenderImage: function(res,sender, image) {

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

       			if (!error && response.statusCode == 200) {
      	  			console.log("ok");
      	  			res.end();

    			} else { 
       	 			console.log("error");
    			}
     	});
     	
	},

	// FACEBOOK SETUP AREA

	// Greeting message for first time interaction with the bot.
	// TODO: Multi-locale
	setupGreetingText: function(res){

  		request({
    		url: 'https://graph.facebook.com/v2.6/me/messenger_profile',
    		qs: { access_token : token },
    		method: 'POST',
    		headers: {'Content-Type': 'application/json'},
    		form: variables.getStartedEx()
  		},
  		function (error, response, body) {

    		if (!error && response.statusCode == 200) {
       		
        		res.send(response.body);
        		res.end();

    		} else { 
        		
        		res.send(body);
        		res.end();
    		}
  		});

	},	

	// Persistent Menu For Messenger
	setupPersistentMenu: function(res){

		request({
   			url: "https://graph.facebook.com/v2.6/me/messenger_profile",
    		qs: { access_token : token },
    		method: 'POST',
    		headers: {'Content-Type': 'application/json'},
    		form: menu.persistentMenu
		},
		function (error, response, body) {
    		if (!error && response.statusCode == 200) {
 
        		res.send(response.body);
        		res.end();

    		} else { 

        		res.send(body);
        		res.end();
   			}
		});

	},

	// Get started button setup
	setupGetStartedButton: function(res){
		var messageData = {
        	"get_started":{

            	"payload":"getstarted"
        	}
		};

		request({
    		url: "https://graph.facebook.com/v2.6/me/messenger_profile",
    		qs: { access_token : token },
    		method: 'POST',
    		headers: {'Content-Type': 'application/json'},
    		form: messageData
		},
		function (error, response, body) {

    		if (!error && response.statusCode == 200) {

       		 	res.send(response);
       		 	res.end();

    		} else { 
    
        		res.send(body);
        		res.end();
    		}
		});
		
	}

	// FACEBOOK SETUP END
};
