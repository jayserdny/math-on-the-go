module.exports = {

    getStartedEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"Hello, I am Math on the go. A bot that can help you solving math problems :)\n" +
              "\n" +
              "You can start deal with me with a simple greeting like 'Hey', 'Hello' <3\n"+
              "\n" +
              "Or, you can start with a simple example: Try the following problem: graph: x^2\n"+
              "\n"+
              "Take in mind I am running in a free server. If I hang out, please allow me a moment ;)\n"+
              "\n" +
              "If you need any help, type the following command 'help'\n" + 
              "\n" +
              "Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Graph: x^2",
        				"payload":"GRAPH_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Integrate: x^2",
        				"payload":"INTEGRATE_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Derivate: x^2 + 3x",
        				"payload":"DERIVATIVE_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Simplify: x^2 + 3x",
        				"payload":"SIMPLIFY_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Solve: 2x + 2 = 0",
        				"payload":"SOLVE_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Gcd: 4, 5",
        				"payload":"GCD_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Lcm: 4,5",
        				"payload":"LCM_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Xgcd: 4,5",
        				"payload":"XGCD_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Convert: 4m to km",
        				"payload":"CONVERT_EXAMPLE"
      				},
    			]
  			}
		};

		return buttons;
	},

	// Algebra quick replies

	// Quick replies for graph command
	graphEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"The graphic command is used to graph any equation you want.\n" +
              	"\n" +
              	"Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Graph: x^2",
        				"payload":"GRAPH_EXAMPLE"
      				},
      				{
        				"content_type":"text",
        				"title":"Graph: x^2 + 3x",
        				"payload":"GRAPH_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Graph: cos(x)",
        				"payload":"GRAPH_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Graph: sin(x)",
        				"payload":"GRAPH_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	// Quick replies for simplify command
	simplifyEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With the simplify command you can make any equation or fraction simpler :D\n" +
              	"\n" +
              	"Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Simplify: 10/4",
        				"payload":"SIMPLIFY_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Simplify: a*b+a*c",
        				"payload":"SIMPLIFY_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Simplify: 1024/52",
        				"payload":"SIMPLIFY_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Simplify: 160/90",
        				"payload":"SIMPLIFY_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	// Quick replies for GCD command
	gcdEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With the GCD command, you can find the GCD between 2 numbers. Sadly I can't handle more :(\n" +
              	"\n" +
              	"Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Gcd: 9,3",
        				"payload":"GCD_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Gcd: 4,5",
        				"payload":"GCD_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Gcd: 36,12",
        				"payload":"GCD_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Gcd: 9,5",
        				"payload":"GCD_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	// Quick replies for lcm command
	lcmEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With the LCM command, you can find the LCM between 2 numbers. Sadly I can't handle more :(\n" +
              	"\n" +
              	"Try a quick example 😏 :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Lcm: 9,3",
        				"payload":"LCM_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Lcm: 4,5",
        				"payload":"LCM_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Lcm: 36,12",
        				"payload":"LCM_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Lcm: 9,5",
        				"payload":"LCM_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	solveEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With the solve command you can solve ANY equation for X 😻\n" +
              	"\n" +
              	"Give a try 💁 :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Solve: x + 2 = 0",
        				"payload":"SOLVE_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Solve: x^2 - 2 = 0",
        				"payload":"SOLVE_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Solve: x^2 = 4",
        				"payload":"SOLVE_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Solve: x^3 = 9",
        				"payload":"SOLVE_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	// Algebra Quick replies end.

	// Quick replies for Calculus

	derivateEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With the derivate command, you can derivate any equation you want :O\n" +
              	"\n" +
              	"Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Derivate: 2x^2",
        				"payload":"DERIVATIVE_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Derivate: 2x^2 + 5x",
        				"payload":"DERIVATIVE_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Derivate: x",
        				"payload":"DERIVATIVE_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Derivate: x^x",
        				"payload":"DERIVATIVE_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	integralEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"To calculate indefinite integrals, you can use this command! It works fast 👌\n" +
              	"\n" +
              	"Try a quick example 🔥 :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Integrate: 2x^3",
        				"payload":"INTEGRATE_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Integrate: e^x",
        				"payload":"INTEGRATE_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Integrate: sin(x)",
        				"payload":"INTEGRATE_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Integrate: cos(2x)",
        				"payload":"INTEGRATE_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	// Calculus Quick replies end.

	// Computer science utils

	// Quick replies for Extended Euclidean Algorithm      
	xgcdEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With the XGCD command, you can find the Extended Euclidean Algorithm between 2 numbers. (Y)\n" +
              	"\n" +
              	"Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"Xgcd: 9,3",
        				"payload":"XGCD_EXAMPLE0"
      				},
      				{
        				"content_type":"text",
        				"title":"Xgcd: 4,5",
        				"payload":"XGCD_EXAMPLE1"
      				},
      				{
        				"content_type":"text",
        				"title":"Xgcd: 36,12",
        				"payload":"XGCD_EXAMPLE2"
      				},
      				{
        				"content_type":"text",
        				"title":"Xgcd: 9,5",
        				"payload":"XGCD_EXAMPLE3"
      				}
    			]
  			}
		};

		return buttons;
	},

	// Quick Replies for tobinary command
	tobinaryEx: function(recipient) {
		var buttons = {
  			"recipient":{
   				"id": recipient
  			},

  			"message":{
    			"text":"With tobinary command you can convert any integer to binary 👌\n" +
              	"\n" +
              	"Try a quick example ;) :",
    			"quick_replies":[
      				{
        				"content_type":"text",
        				"title":"tobinary: 150",
        				"payload":"TO_BINARY0"
      				},
      				{
        				"content_type":"text",
        				"title":"tobinary: 45",
        				"payload":"TO_BINARY1"
      				},
      				{
        				"content_type":"text",
        				"title":"tobinary: 32",
        				"payload":"TO_BINARY2"
      				},
      				{
        				"content_type":"text",
        				"title":"tobinary: 16",
        				"payload":"TO_BINARY3"
      				}
    			]
  			}
		};

		return buttons;
	}
};
