module.exports.persistentMenu = 
	{
		"persistent_menu":[
          {
          "locale":"default",
          "composer_input_disabled":false,

          "call_to_actions":[
              {
                "title":"Help/Topics",
                "type":"nested",
                "call_to_actions":[
                    {
                      "title":"Algebra",
                      "type":"nested",
                      "call_to_actions":[
                          {
                          "title":"Graph Equation",
                            "type":"postback",
                            "payload": "GRAPH_COMMAND"
                          },
                          {
                            "title":"Simplify",
                          "type":"postback",
                            "payload": "SIMPLIFY_COMMAND"
                          },
                          
                          {
                            "title":"Find GCD",
                            "type":"postback",
                            "payload": "GCD_COMMAND"
                          },
                          {
                            "title":"Find LCM",
                            "type":"postback",
                            "payload": "LCM_COMMAND"
                          },
                          {
                          	"title":"Solve for x",
                            "type":"postback",
                            "payload": "SOLVE_COMMAND"
                          }
                      ],
                    },
                    {
                      "title":"Calculus",
                      "type":"nested",
                      "call_to_actions":[
                        {
                            "title":"Compute Derivatives",
                            "type":"postback",
                            "payload": "DERIVATE_COMMAND"
                          },
                          {
                            "title":"Compute Integrals",
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
                      "title":"Computer Science",
                      "type":"nested",
                      "call_to_actions":[
                        {
                            "title":"Extended Euclidean Algorithm",
                            "type":"postback",
                            "payload": "XGCD_COMMAND"
                          },
                          
                          {
                            "title":"Interger to Binary",
                            "type":"postback",
                            "payload": "TOBINARY_COMMAND"
                        },
                      ]
                    },
                    {
                      "title":"Misc",
                      "type":"nested",
                      "call_to_actions":[
                        {
                            "title":"Convert Units",
                            "type":"postback",
                            "payload": "CONVERT_COMMAND"
                        }
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
