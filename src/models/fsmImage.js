import calcUserFinalSavedAppStructure from '../structures/structures'

const ui = [
  ['{"label": "First Name", "minLength": 4, "maxLength": 50, "help": "( Your full Name )"}',
    '{ "label": "Age", "type": "number", "min": 0, "max": 120, "help": "( >= 0 <= 120 )"}'
  ]
]

module.exports.fsmImage = {
  validateUser: function (userId, token) {
    console.log(`received id: ${userId} and token: ${token} and start async user validation`)
  },
  nextState: function (currentState, event) {
    return this.transitions.find(trans => trans.atEvent === event && trans.from == currentState);
  },
  roles: [
    { 
      name: 'user',
      hasAccess: ['userW_'],
      events: ['newApplication', 'userTempSaved', 'userFinalSaved']
    },
    {
      name: 'PreChecker',
      hasAccess: ['precheckersQueue', 'precheckerW_'],
      events: ['selectedByPrechecker', 'precheckerTempSaved', 'precheckerFinalSaved']
    },
    { 
      name: 'SpecialProponent',
      hasAccess: ['proponentW_President', 'proponentW_Board'],
      events: ['proponentTempSaved', 'proponentFinalSaved']
    },
  ],
  states: [
    { 
      name: 'User', description: 'Εξωτερικός Χρήστης',
      params: { x: -600, y: -300 }
    },
    { 
      name: 'Prechecker', description: 'Εξωτερικός Χρήστης',
      params: { x: -400, y: -300 }
    },
    { 
      name: 'Proponent', description: 'Εξωτερικός Χρήστης',
      params: { x: -200, y: -300 }
    },
    { 
      name: 'President', description: 'Εξωτερικός Χρήστης',
      params: {x: 10, y: -300}
    },
    { 
      name: 'Διοικιτηκός', description: 'Εξωτερικός Χρήστης',
      params: { x: 200, y: -300 }
    },
    {
      name: 'Συμβούλιο', description: 'Εξωτερικός Χρήστης',
      params: { x: 400, y: -300 }
    },
    { 
      name: 'Ακαδημαικός', description: 'Εξωτερικός Χρήστης',
      params: { x: 600, y: -300 }
    },
    { 
      name: 'Αντιπρόεδρος', description: 'Εξωτερικός Χρήστης',
      params: { x: 800, y: -300 }
    },
    { 
      name: 'Print', description: 'Εξωτερικός Χρήστης',
      params: { x: 1000, y: -300 }
    },
    { name: 'userW_', description: 'Εξωτερικός Χρήστης',
      params: { x: -600, y: -250 },
      ui: ui
    },
    { name: 'precheckersQueue', description: 'Ουρά προελέγχου',
      params: { x: -400, y: -250 }
    },
    { name: 'precheckerW_', description: 'Προέλεγχος',
      params: { x: -400, y: 200 },
      events: ['precheckerTempSaved', 'precheckerFinalSaved', 'unSelectedByPrechecker']
      // possibly a transitions: [] will be build for execution speed
    },
    { name: 'presidentW_Prechecker', description: 'Πρόεδρος από Προέλεγχο', params: { x: 10, y: -250 } },
    { name: 'proponentW_President', description: 'Εισηγητής από Πρόεδρο', params: { x: -200, y: -250 } },
    { name: 'proponentW_Board', description: 'Εισηγητής από Εκτελεστική επιτροπή', params: { x: -200, y: 200 } },
    { name: 'viewerW_Proponent', description: 'Έλεγχος από Εισηγητή', params: { x: 200, y: -250 } },
    { name: 'viewerW_Vice', description: 'Έλεγχος από Αντιπρόεδρο', params: { x: 200, y: 100 } },
    { name: 'viewerW_Board', description: 'Έλεγχος από Εκτελεστική επιτροπή', params: { x: 200, y: 350 } },
    { name: 'viceW_President', description: 'Αντιπρόεδρος από Πρόεδρο', params: { x: 800, y: -250 } },
    { name: 'boardW_President', description: 'Εκτελεστική επιτροπή από Πρόεδρο', params: { x: 400, y: -250 } },
    { name: 'boardW_Proponent', description: 'Εκτελεστική επιτροπή από Εισηγητή', params: { x: 400, y: -10 } },
    { name: 'boardW_Consultant', description: 'Εκτελεστική επιτροπή από Ακαδημαϊκό', params: { x: 400, y: 320 } },
    { name: 'printDecisionW_', description: 'Καταχωρητής Απόφασης', params: { x: 1000, y: -200 } },
    { name: 'presidentW_PrintDecision', description: 'Πρόεδρος από Καταχωρητή', params: { x: 10, y: 100 } },
    { name: 'consultantW_Proponent', description: 'Ακαδημαϊκός Σύμβουλος από Εισηγητή', params: { x: 600, y: -100 } },
    { name: 'presidentW_Viewer', description: 'Πρόεδρος', params: { x: 10, y: 400 } },
    { name: 'printDecisionW_President', description: 'Ουρά καταχωρητών', params: { x: 1000, y: -10 } },
    { name: 'finalized', description: 'Ολοκληρωμένη-Παραλαβή', params: { x: 10, y: 500 } },
    { name: 'forArchive', description: 'Για το αρχείο', params: { x: 10, y: 600 } }
  ],
  events: [
    { name: 'userTempSaved', description: '', body: {} },
    { name: 'proponentTempSaved', description: '', body: {} },
    { name: 'precheckerTempSaved', description: '', body: {} },
    { name: 'boardMemberTempSaved', description: '', body: {} },
    //
    { name: 'newApplication', description: '', body: {} },
    { name: 'userFinalSaved', description: '', body: {} },
    { name: 'precheckerFinalSaved', description: 'x2', body: {} },
    { name: 'selectedByPrechecker', description: '', body: {} },
    { name: 'unSelectedByPrechecker', description: '', body: {} },
    { name: 'presidentAssignToProponent', description: '', body: {} },
    { name: 'proponentAssignToConsultant', description: '', body: {} },
    { name: 'proponentFinalSaved', description: 'x2', body: {} },
    { name: 'consultantFinalSaved', description: 'always', body: {} },
    { name: 'boardMemberFinalSaved', description: 'check if last and send to viewer x3 allMembersSigned', body: {} },
    { name: 'boardMemberMoreInfo', description: 'send to proponent from board x3', body: {} },
    { name: 'proponentRedifineCourses', description: 'to consultant', body: {} },
    { name: 'proponentFillInfo', description: 'to board', body: {} },
    { name: 'viewerChecked', description: 'to president x3', body: {} },
    { name: 'presidentDisagree', description: 'to board', body: {} },
    { name: 'presidentAgree', description: 'to print', body: {} },
    { name: 'presidentBoardDisagreement', description: 'to vice', body: {} },
    { name: 'viceDCDecision', description: 'to viewer', body: {} },
    { name: 'selectedByPrintDecision', description: 'to print', body: {} },
    { name: 'printForSigning', description: 'to president', body: {} },
    { name: 'selectedByPrint', description: '', body: {} },
    { name: 'presidentSigned', description: 'waitForDownload', body: {} },
    { name: 'actdownloadedByUser', description: 'waitForDownload', body: {} },
  ],
  transitions: [
    { name: 'newApplication',
      description: 'User creates a new application',
      from: 'start',
      to: 'userW_',
      atEvent: 'newApplication',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
    { name: 'userFinalSaved',
      description: 'User concludes working on an application',
      from: 'userW_',
      to: 'precheckersQueue',
      atEvent: 'userFinalSaved',
      preconditions: {
        request: {
          hasStructure: 'calcUserFinalSavedAppStructure',
            // if(app.consideration) include titleConsideration
            // I need to have the app in the context to calculate structure.. CONTEXT
            // I have the body: requestBody from graphql for each request -> I need to get it here
            // or join them in another file. So structure can be in a static json or be produced from a function
            // application: userFinalSavedAppStructure(body)
          hasValue: {application: {id: '1'}},
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
          { insertHistoryStep: { params: { nextState: 'precheckersQueue' }, execution: 'sync'} },
          { saveDB: { params: { application: {} }, execution: 'sync' } },
          { notifyUser: { params: { application: {} }, execution: 'async' } }
        ]
      }
    },
    {
      name: 'precheckerTempSaved',
      description: 'Prechecker temp saved an application',
      from: 'precheckerW_',
      to: 'precheckerW_',
      atEvent: 'precheckerTempSaved',
      preconditions: {
        request: {
          hasStructure: {
            judgment: {
              pending: { required: true, type: 'isBoolean' },
              pendingReason: { required: true, type: 'isString' },
              academicField: { id: null, name: null },
              attachedDocuments: [
                {
                  applicantComment: "",
                  date: null,
                  id: { required: true, type: 'isNumber' },
                  name: "testing-file-2.pdf",
                  precheckerChecked: false,
                  precheckerComment: "",
                  type: 2
                }
              ],
              color: null,
              internalComment: null,
              pending: false,
              pendingReason: "",
              queue: null
            }
          },
          hasValue: {},
        },
        services: []
      },
      effects: {
        response: {
          haStructure: {},
          hasValue: {}
        },
        services: [
        // define input-output and run tests with the actual functions on startup
          { 
            insertJudgment: {
              params: { fsmSubject: {}, eventBody: {} },
              return: { lastHistoryStep: {} }
            }
          },
          {
            saveDB: {
              params: { lastHistoryStep: {}, newHistoryStep:{} },
              return: { done: 'boolean' }
            }
          }
        ]
      }
    },
    { name: 'precheckerFinalSavedPending',
      description: 'Prechecker concludes working on an application',
      from: 'precheckerW_',
      to: 'userW_',
      atEvent: 'precheckerFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            judgment: {
              pending: { required: true, type: 'isBoolean' },
              pendingReason: { required: true, type: 'isString' },
              academicField: { id: null, name: null },
              attachedDocuments: [
                {
                  applicantComment: "",
                  date: null,
                  id: { required: true, type: 'isNumber' },
                  name: "testing-file-2.pdf",
                  precheckerChecked: false,
                  precheckerComment: "",
                  type: 2
                }
              ],
              color: null,
              internalComment: null,
              pending: false,
              pendingReason: "",
              queue: null
            }
          },
          hasValue: { judgment: { pending: true }, roleId: '12' },
        },
        services: [{ notifyUser: { params: { application: {}, nextState: 'userW_' }, execution: 'async' } }]
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        services: [
          {
            insertJudgment: {
              params: { fsmSubject: {}, eventBody: {} },
              return: { lastHistoryStep: {} }
            }
          },
          {
            newHistoryStep: {
              params: { fsmSubject: {}, nextState: 'userW_' },
              return: { newHistoryStep: {} },
              execution: 'sync'
            }
          },
          {
            saveDB: {
              params: { lastHistoryStep: {}, newHistoryStep: {} },
              return: { saveDB: true },
              execution: 'sync'
            }
          },
          {
            notifyUser: {
              params: { fsmSubject: {}, lastHistoryStep: {}, newHistoryStep: {} },
              return: { notifyUser: true },
              execution: 'async'
            } 
          }
        ]
      }
    },
    { name: 'precheckerFinalSavedNoPending',
      description: 'Prechecker concludes working on an application',
      from: 'precheckerW_',
      to: 'presidentW_Prechecker',
      atEvent: 'precheckerFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            state: { required: true, type: 'isString' },
            id: { required: true, type: 'isNumber' },
            name: { required: true, type: 'isString' }
          },
          // hasValue: { judgment: { pending: true }, roleId: '11' },
          hasValue: { judgment: { pending: false } },
        },
        services: []
      },
      effects: {
        response: {
          hasStructure: { newState: 'isString' },
          hasValue: {}
        },
        // rule engine creates a context and there is no need to carry params around like application
        // services: []
        servicesRules: {
          "name": "precheckerFinalSavedNoPendingEffectServices",
          "rules": [
            {
              "when": "always",
              "then": [
                "insertJudgment",
                { "closure": "findHistoryNextStep", "newState": "userW_" },
                "insertStep",
                "saveDB"
              ]
            }
          ]
        }
      }
    },
    { name: 'selectedByPrechecker',
      description: 'When prechecker selects from queue',
      from: 'precheckersQueue',
      to: 'precheckerW_',
      atEvent: 'selectedByPrechecker',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: {},
        },
        services: []
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        // rule engine creates a context and there is no need to carry params around like application
        servicesRules: {
          "name": "selectedByPrecheckerEffectServices",
          "rules": [
            {
              "when": "always",
              "then": [
                { "closure": "findHistoryNextStep", "newState": "userW_" },
                { "closure": "insertStep" }
              ]
            },
            {
              "name": "saveDB",
              "when": { "closure": "isApplicationValid" },
              "then": { "closure": "saveDB" }
            }
          ]
        }
      }
    },
    { name: 'unSelectedByPrechecker',
      description: 'When prechecker unselects application and sends it to queue',
      from: 'precheckerW_',
      to: 'precheckersQueue',
      atEvent: 'unSelectedByPrechecker',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: {},
        },
        services: []
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        // rule engine creates a context and there is no need to carry params around like application
        servicesRules: {
          "name": "unselectedByPrecheckerEffectServices",
          "rules": [
            {
              "when": "always",
              "then": [
                { "closure": "findHistoryNextStep", "newState": "userW_" },
                { "closure": "insertStep" }
              ]
            },
            {
              "name": "saveDB",
              "when": { "closure": "isApplicationValid" },
              "then": { "closure": "saveDB" }
            }
          ]
        }
      }
    },
    { name: 'presidentAssignToProponent',
      description: 'President sends it to the appropriete proponent',
      from: 'presidentW_Prechecker',
      to: 'proponentW_President',
      atEvent: 'presidentAssignToProponent',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'proponentAssignToConsultant',
      description: 'proponentAssignToConsultant',
      from: 'proponentW_President',
      to: 'consultantW_Proponent',
      atEvent: 'proponentAssignToConsultant',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'proponentFinalSavedSameTitle',
      description: 'proponentFinalSavedSameTitle',
      from: 'proponentW_President',
      to: 'viewerW_Proponent',
      atEvent: 'proponentFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {judgment: {sameTitle: true}},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'proponentFinalSavedNoSameTitle',
      description: 'proponentFinalSavedNoSameTitle',
      from: 'proponentW_President',
      to: 'boardW_Proponent',
      atEvent: 'proponentFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: { judgment: { sameTitle: false } },
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'consultantFinalSaved',
      description: 'consultantFinalSaved',
      from: 'consultantW_Proponent',
      to: 'boardW_Consultant',
      atEvent: 'consultantFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: { judgment: { sameTitle: false } },
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'boardMemberFinalSavedFC',
      description: 'boardMemberFinalSaved check if final vote and proceed to viewer',
      from: 'boardW_Consultant',
      to: 'viewerW_Board',
      atEvent: 'boardMemberFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
        },
        services: [
          { boardMembersAllSigned: { params: { application: {}}, return: {boolean: true}, execution: 'sync' }}
        ]
      },
      effects: {
        response: {
          haStructure: {},
          hasValue: {}
        },
        services: [
          { insertHistoryStep: { params: { application: {}, nextState: 'userW_' }, execution: 'sync' } },
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'boardMemberFinalSavedFP',
      description: 'boardMemberFinalSaved check if final vote and proceed to viewer',
      from: 'boardW_Proponent',
      to: 'viewerW_Board',
      atEvent: 'boardMemberFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
        },
        services: [
          { boardMembersAllSigned: { params: { application: {} }, return: { boolean: true }, execution: 'sync' } }
        ]
      },
      effects: {
        response: {
          haStructure: {},
          hasValue: {}
        },
        services: [
          { insertHistoryStep: { params: { application: {}, nextState: 'userW_' }, execution: 'sync' } },
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'boardMemberFinalSavedFPr',
      description: 'boardMemberFinalSaved check if final vote and proceed to viewer',
      from: 'boardW_President',
      to: 'viewerW_Board',
      atEvent: 'boardMemberFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
        },
        services: [
          { boardMembersAllSigned: { params: { application: {} }, return: { boolean: true }, execution: 'sync' } }
        ]
      },
      effects: {
        response: {
          haStructure: {},
          hasValue: {}
        },
        services: [
          { insertHistoryStep: { params: { application: {}, nextState: 'userW_' }, execution: 'sync' } },
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'boardMemberMoreInfoFC',
      description: 'boardMemberMoreInfo needed by one of the board members',
      from: 'boardW_Consultant',
      to: 'proponentW_Board',
      atEvent: 'boardMemberMoreInfo',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'boardMemberMoreInfoFP',
      description: 'boardMemberMoreInfo needed by one of the board members',
      from: 'boardW_Proponent',
      to: 'proponentW_Board',
      atEvent: 'boardMemberMoreInfo',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'boardMemberMoreInfoFPr',
      description: 'boardMemberMoreInfo needed by one of the board members',
      from: 'boardW_President',
      to: 'proponentW_Board',
      atEvent: 'boardMemberMoreInfo',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'proponentRedifineCourses',
      description: 'proponentRedifineCourses to consultant',
      from: 'proponentW_Board',
      to: 'consultantW_Proponent',
      atEvent: 'proponentRedifineCourses',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'proponentFillInfo',
      description: 'proponentFillInfo to consultant',
      from: 'proponentW_Board',
      to: 'boardW_Proponent',
      atEvent: 'proponentFillInfo',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'viewerCheckedFB',
      description: 'viewerChecked to president',
      from: 'viewerW_Board',
      to: 'presidentW_Viewer',
      atEvent: 'viewerChecked',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'viewerCheckedFP',
      description: 'viewerChecked to president',
      from: 'viewerW_Proponent',
      to: 'presidentW_Viewer',
      atEvent: 'viewerChecked',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'viewerCheckedFV',
      description: 'viewerChecked to president',
      from: 'viewerW_Vice',
      to: 'presidentW_Viewer',
      atEvent: 'viewerChecked',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'presidentDisagree',
      description: 'presidentDisagree with board sends back to board',
      from: 'presidentW_Viewer',
      to: 'boardW_President',
      atEvent: 'presidentDisagree',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'presidentAgree',
      description: 'presidentAgree to print',
      from: 'presidentW_Viewer',
      to: 'printDecisionW_',
      atEvent: 'presidentAgree',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'selectedByPrint',
      description: 'When print selects from print queue',
      from: 'printDecisionW_',
      to: 'printDecisionW_President',
      atEvent: 'selectedByPrintDecision',
      preconditions: {
        request: {
          hasStructure: {},
          hasValue: {},
        },
        services: []
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        // rule engine creates a context and there is no need to carry params around like application
        servicesRules: {}
      }
    },
    { name: 'presidentBoardDisagreement',
      description: 'presidentBoardDisagreement to vice',
      from: 'presidentW_Viewer',
      to: 'viceW_President',
      atEvent: 'presidentBoardDisagreement',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'viceDCDecision',
      description: 'viceDCDecision to president',
      from: 'viceW_President',
      to: 'viewerW_Vice',
      atEvent: 'viceDCDecision',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'printForSigning',
      description: 'printForSigning to president',
      from: 'printDecisionW_President',
      to: 'presidentW_PrintDecision',
      atEvent: 'printForSigning',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'presidentSigned',
      description: 'presidentSigned to user',
      from: 'presidentW_PrintDecision',
      to: 'finalized',
      atEvent: 'presidentSigned',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
    { name: 'actdownloadedByUser',
      description: 'actdownloadedByUser',
      from: 'finalized',
      to: 'forArchive',
      atEvent: 'actdownloadedByUser',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
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
          { saveDB: { params: { application: {}, nextState: 'userW_' } } }
        ]
      }
    },
  ]
}
