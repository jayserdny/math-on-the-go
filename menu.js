module.exports.persistentMenu = 
	{
		"persistent_menu":[
          {
          "locale":"default",
          "composer_input_disabled":false,

          "call_to_actions":[
              {
                "title":"Topics",
                "type":"nested",
                "call_to_actions":[
                    {
                      "title":"Algebra",
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
                            "title":"GCD",
                            "type":"postback",
                            "payload": "GCD_COMMAND"
                          },
                          {
                            "title":"LCM",
                            "type":"postback",
                            "payload": "LCM_COMMAND"
                          },
                      ],
                    },
                    {
                      "title":"Calculus",
                      "type":"nested",
                      "call_to_actions":[
                        {
                            "title":"Derivatives",
                            "type":"postback",
                            "payload": "DERIVATE_COMMAND"
                          },
                          {
                            "title":"Integrals",
                            "type":"postback",
                            "payload": "INTEGRAL_COMMAND"
                          },
                          {
                            "title":"Definite Integrals",
                            "type":"postback",
                            "payload": "DINTEGRAL_COMMAND"
                          },
                      ]
                    },
                    {
                      "title":"Test 2",
                      "type":"nested",
                      "call_to_actions":[
                        {
                            "title":"XGCD",
                            "type":"postback",
                            "payload": "XGCD_COMMAND"
                          },
                          
                          {
                            "title":"Convert",
                            "type":"postback",
                            "payload": "CONVERT_COMMAND"
                        },
                      ]
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
