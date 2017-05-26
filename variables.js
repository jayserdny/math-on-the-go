module.exports = {
	
	getStartedEx: function() {
		var greetingMessage = {
    		"greeting":[
        		{
        			"locale":"default",
        			"text":"Welcome to Math on the Fly! Solve your Math with me <3 !"
        		}, 
        		{
        			"locale":"en_US",
        			"text":"Welcome to Math on the Fly! Solve your Math with me <3 !"
        		}
    		]
    	};

    	return greetingMessage; 
    },

    commands: function() {
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

		return commands;
    }
};
