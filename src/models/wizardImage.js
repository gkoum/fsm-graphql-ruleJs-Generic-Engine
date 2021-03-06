// each step has a form and a model that gets into context
// it is a state in the fsm-diagram with a jsonModel that generates:
// 1. a UI-form,
// 2. a graphql json model and an endpoint
// 3. a model in a mongo db to store steps data for all users
// {
//   $jsonSchema: {
//     required: [
//       'states',
//       'events',
//       'transitions',
//       'roles',
//       'services'
//     ],
//     properties: {
//       states: {
//         bsonType: 'array',
//         items: {
//           bsonType: 'object',
//           required: [
//             'name',
//             'id'
//           ],
//           properties: {
//             name: {
//               bsonType: 'string',
//               description: 'must be a string and is required'
//             },
//             id: {
//               bsonType: 'string',
//               description: 'must be a string and is required'
//             },
//             ui: {
//               bsonType: 'array',
//               items: {
//                 bsonType: 'array',
//                 items: {
//                   bsonType: 'object'
//                 }
//               }
//             }
//           }
//         }
//       },
//       events: {
//         bsonType: 'array'
//       },
//       transitions: {
//         bsonType: 'array',
//         required: [
//           'name',
//           'from',
//           'to',
//           'atEvent',
//           'preconditions',
//           'effects'
//         ],
//         properties: {
//           name: {
//             bsonType: 'string',
//             description: 'must be a string and is required'
//           },
//           from: {
//             bsonType: 'string',
//             description: 'must be a string and is required'
//           },
//           to: {
//             bsonType: 'string',
//             description: 'must be a string and is required'
//           },
//           atEvent: {
//             bsonType: 'string',
//             description: 'must be a string and is required'
//           },
//           preconditions: {
//             bsonType: 'object',
//             description: 'must be an object and is required',
//             required: [
//               'request',
//               'services'
//             ],
//             properties: {
//               request: {
//                 bsonType: 'object',
//                 required: [
//                   'hasStructure',
//                   'hasValue'
//                 ],
//                 properties: {
//                   hasStructure: {
//                     bsonType: 'object'
//                   },
//                   hasValue: {
//                     bsonType: 'array'
//                   }
//                 }
//               },
//               services: {
//                 bsonType: 'array'
//               }
//             }
//           },
//           effects: {
//             bsonType: 'object',
//             description: 'must be an object and is required'
//           }
//         }
//       },
//       roles: {
//         bsonType: 'array'
//       },
//       services: {
//         bsonType: 'object'
//       }
//     }
//   }
// }
module.exports.wizardImage = {
  validateUser: function (userId, token) {
    console.log(`received id: ${userId} and token: ${token} and start async user validation`)
  },
  nextState: function (currentState, event) {
    return this.transitions.find(trans => trans.atEvent === event && trans.from == currentState);
  },
  states: [
    {
      id: 'Personal Data', name: 'Personal Data', description: 'Data for the system',
      ui: [
        [ 
          {"label": "First Name", "minLength": 4, "maxLength": 50, "help": "( Your full Name )"},
          { "label": "Age", "type": "number", "min": 0, "max": 120, "help": "( >= 0 <= 120 )"}
        ]
      ]
    },
    {
      id: 'Fever', name: 'Fever', description: 'Fever',
      ui: [
        [
          { "label": "Fever", "type": "number", "min": 32, "max": 42, "help": "( >= 32 <= 42 )"},
        ]
      ]
    },
    {
      id: 'Coughing', name: 'Coughing', description: 'newSystem',
      ui: [
        [
          { "label": "Coughing",
            "type": "select",
            "iconLeft": "globe-americas",
            "placeholder": "Select your option",
            "options": [
              "Very often",
              "Less often",
              "Rarelly"
            ]
          },
        ]
      ]
    },
    {
      id: 'Smell', name: 'Smell', description: 'Smell',
      ui: [
        [
          { "label": "Smell",
            "type": "radio",
              "items": [
                {
                  "text": "Partial lost",
                  "value": "Partial lost",
                  "checked": true
                },
                "The same",
                "Haven't noticed"
              ]
            },
        ]
      ]
    },
    {
      id: 'End', name: 'End', description: 'End',
      ui: [
        [
        ]
      ]
    },
    {
      id: 'fatigue', name: 'fatigue', description: 'Fealing tired',
      ui: [
        [
          {
            "label": "fatigue",
            "type": "checkbox",
            "items": [
              {
                "text": "sleepy",
                "value": 1,
                "checked": true
              },
              {
                "text": "tired",
                "checked": true
              },
              "ded"
            ]
          },
        ]
      ]
    },
    {
      id: 'shortness of breath', name: 'shortness of breath', description: 'shortness of breath',
      ui: [
        [
          { "label": "shortness of breath",
            "type": "radio",
              "items": [
                {
                  "text": "High",
                  "value": "Partial lost",
                  "checked": true
                },
                "Mid",
                "Low"
              ]
            }
        ]
      ]
    },
  ],
  events: [
    { name: 'Personal Data', description: '', body: {} },
    { name: 'Fever', description: '', body: {} },
    { name: 'Coughing', description: '', body: {} },
    { name: 'Smell', description: '', body: {} },
    { name: 'fatigue', description: '', body: {} },
    { name: 'shortness of breath', description: '', body: {} }
  ],
  transitions: [
    {
      name: 'Personal Data',
      description: 'Give personal Data',
      from: 'Personal Data',
      to: 'Fever',
      atEvent: 'Personal Data',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          // it has to be the same as the form ui
          hasValue: [
            { name: "First Name", type: "string" },
            // { name: "Age", value: "1" }
            { name: "Age", type: "number", min: 0, max: 120, gt: 0, lte: 100 }
            // if age>65 high 
            // else if 40<age<65 mid
            // else age<40 low
            // write rules through the ui with math operations and logic and translate them to json
          ],
        },
        services: []
      },
      effects: {
        response: {
          haStructure: {},
          hasValue: {}
        },
        services: [
        ]
      }
    },
    {
      name: 'high',
      description: 'has high fever',
      from: 'Fever',
      to: 'Coughing',
      atEvent: 'Fever',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: [
            { name: "Fever", type: "number", min: 35, max: 42, gte: 39 }
          ],
        },
        services: []
      },
      effects: {
        response: {
          haStructure: '',
          hasValue: {}
        },
        services: [
        ]
      }
    },
    {
      name: 'mid',
      description: 'has mid fever',
      from: 'Fever',
      to: 'Smell',
      atEvent: 'Fever',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: [
            { name: "Fever", type: "number", min: 35, max: 42, gte: 38, lt: 39 }
          ],
        },
        services: []
      },
      effects: {
        response: {
          haStructure: '',
          hasValue: {}
        },
        services: [
        ]
      }
    },
    {
      name: 'low',
      description: 'has low or no fever',
      from: 'Fever',
      to: 'End',
      atEvent: 'Fever',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: [
            { name: "Fever", type: "number", min: 35, max: 42, lt: 38 }
          ],
        },
        services: []
      },
      effects: {
        response: {
          haStructure: '',
          hasValue: {}
        },
        services: [
        ]
      }
    },
    {
      name: 'rare',
      description: 'if not coughing with low fever end',
      from: 'Coughing',
      to: 'End',
      atEvent: 'Coughing',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: [
            { name: "Coughing", type: "string", value: "Very often" }
          ],
        },
        services: []
      },
      effects: {
        response: {
          haStructure: '',
          hasValue: {}
        },
        services: [
        ]
      }
    },
    {
      name: 'shortness low',
      description: '',
      from: 'Coughing',
      to: 'shortness of breath',
      atEvent: 'Coughing',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: [
            { name: "Fever", type: "number", "min": 37, "max": 39 }
          ],
        },
        services: []
      },
      effects: {
        response: {
          haStructure: '',
          hasValue: {}
        },
        services: [
        ]
      }
    },
  ]
}
