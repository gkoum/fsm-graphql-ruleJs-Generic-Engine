module.exports.wizardDesignProcess = {
  validateUser: function (userId, token) {
    console.log(`received id: ${userId} and token: ${token} and start async user validation`)
  },
  nextState: function (currentState, event) {
    return this.transitions.find(trans => trans.atEvent === event && trans.from == currentState);
  },
  states: [
    {
      name: 'getFirstSalary', description: 'if firstSalary < 1993 to oldSystem else to newSystem',
      params: {
        ui: [
          [
            '{ "label": "First Salary", "type": "number", "min": 1960, "max": 2020, "help": "( >= 1960 <= 2020 )"}',
            '{ "label": "oldSystem", "type": "number", "min": 1960, "max": 2020, "help": "( >= 1960 <= 2020 )"}'
          ]
          [
          '{ "label": "oldSystem", "type": "number", "min": 1960, "max": 2020, "help": "( >= 1960 <= 2020 )"}'
          ]
        ]
      }
    },
    {
      name: 'oldSystem', description: 'oldSystem for pension calculation',
      params: {
        ui: [
          [
            '{ "label": "oldSystem", "type": "number", "min": 1960, "max": 2020, "help": "( >= 1960 <= 2020 )"}'
          ]
        ]
      }
    },
    {
      name: 'newSystem', description: 'newSystem',
      params: {
        ui: [
          [
            '{ "label": "newSystem", "type": "number", "min": 1960, "max": 2020, "help": "( >= 1960 <= 2020 )"}'
          ]
        ]
      }
    }
  ],
  events: [
    { name: 'FirstSalary', description: '', body: {} },
    { name: 'FirstSalary', description: '', body: {} },
    { name: 'newSystem', description: '', body: {} }
  ],
  transitions: [
    {
      name: 'salaryToOld',
      description: 'User creates a new application',
      from: 'getFirstSalary',
      to: 'oldSystem',
      atEvent: 'FirstSalary',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: [
            { name: "name", type: 'String', value: "Giannis" },
            { name: "age", type: 'Number', mathOp: 'gt', value: "30" }
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
          { insertHistoryStep: { params: { application: {}, nextState: 'userW_' }, execution: 'sync' } },
          { saveDB: { params: { application: {}, nextState: 'userW_' } } },
          { notifyUser: { params: { application: {} }, execution: 'async' } }
        ]
      }
    },
    {
      name: 'salaryToNew',
      description: 'User creates a new application',
      from: 'getFirstSalary',
      to: 'newSystem',
      atEvent: 'FirstSalary',
      preconditions: {
        request: {
          hasStructure: 'calcUserFinalSavedAppStructure',
          // if(app.consideration) include titleConsideration
          // I need to have the app in the context to calculate structure.. CONTEXT
          // I have the body: requestBody from graphql for each request -> I need to get it here
          // or join them in another file. So structure can be in a static json or be produced from a function
          // application: userFinalSavedAppStructure(body)
          hasValue: [
            { name: "name", type: 'String', value: "Giannis" },
            { name: "age", type: 'Number', mathOp: 'gt', value: "31" }
          ],
        },
        services: [] // [{ getApplicationDB: { params: { id: 'applicationId' }, return: { application: {} }, execution: 'sync' } }]
      },
      effects: {
        response: {
          haStructure: '',
          hasValue: {}
        },
        services: [
          // application with the new step needs to be the context for the next two services.... rules?
          // application will come from the context so params are only extra needed data
          // modify application in the context and give it to saveDB
          { insertHistoryStep: { params: { nextState: 'precheckersQueue' }, execution: 'sync' } },
          { saveDB: { params: { application: {} }, execution: 'sync' } },
          { notifyUser: { params: { application: {} }, execution: 'async' } }
        ]
      }
    }
  ]
}
