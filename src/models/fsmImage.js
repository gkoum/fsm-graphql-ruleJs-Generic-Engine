module.exports.fsmImage = {
  validateUser: function (userId, token) {
    console.log(`received id: ${userId} and token: ${token} and start async user validation`)
  },
  nextState: function (currentState, event) {
    return this.transitions.find(trans => trans.atEvent === event && trans.from == currentState);
  },
  states: [
    { name: 'userW_', description: 'Εξωτερικός Χρήστης' },
    { name: 'precheckersQueue', description: 'Ουρά προελέγχου' },
    { name: 'precheckerW_', description: 'Προέλεγχος' },
    { name: 'presidentW_Prechecker', description: 'Πρόεδρος από Προέλεγχο' },
    { name: 'proponentW_President', description: 'Εισηγητής από Πρόεδρο' },
    { name: 'proponentW_Board', description: 'Εισηγητής από Εκτελεστική επιτροπή' },
    { name: 'viewerW_Proponent', description: 'Έλεγχος από Εισηγητή' },
    { name: 'viewerW_Vice', description: 'Έλεγχος από Αντιπρόεδρο' },
    { name: 'viewerW_Board', description: 'Έλεγχος από Εκτελεστική επιτροπή' },
    { name: 'viceW_President', description: 'Αντιπρόεδρος από Πρόεδρο' },
    { name: 'boardW_President', description: 'Εκτελεστική επιτροπή από Πρόεδρο' },
    { name: 'boardW_Proponent', description: 'Εκτελεστική επιτροπή από Εισηγητή' },
    { name: 'boardW_Consultant', description: 'Εκτελεστική επιτροπή από Ακαδημαϊκό' },
    { name: 'printDecisionW_', description: 'Καταχωρητής Απόφασης' },
    { name: 'presidentW_PrintDecision', description: 'Πρόεδρος από Καταχωρητή' },
    { name: 'president_finalized', description: 'Ολοκληρωμένη-Παραλαβή' },
    { name: 'consultantW_Proponent', description: 'Ακαδημαϊκός Σύμβουλος από Εισηγητή' },
    { name: 'presidentW_Viewer', description: 'Πρόεδρος' },
    { name: 'boardW_', description: 'Εκτελεστική επιτροπή' },
    { name: 'REDIRECTION_NEEDED', description: 'Επαναδρομολόγηση' },
    { name: 'printDecisionW_President', description: 'Ουρά καταχωρητών' },
    { name: 'deactivated', description: 'Απενεργοποιημένη' }
  ],
  events: [
    { name: 'userTempSaved', description: '', body: {} },
    { name: 'proponentTempSaved', description: '', body: {} },
    { name: 'precheckerTempSaved', description: '', body: {} },
    { name: 'boardMemberTempSaved', description: '', body: {} },
    //
    { name: 'created', description: '', body: {} },
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
    { name: 'printForSigning', description: 'to president', body: {} },
    { name: 'presidentSigned', description: 'waitForDownload', body: {} },
    { name: 'actdownloadedByUser', description: 'waitForDownload', body: {} },
  ],
  transitions: [
    { name: 'created',
      description: 'User concludes working on an application',
      from: null,
      to: 'userW_',
      atEvent: 'created',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
        },
        services: {}
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
    { name: 'userFinalSaved',
      description: 'User concludes working on an application',
      from: 'userW_',
      to: 'precheckersQueue',
      atEvent: 'userFinalSaved',
      preconditions: {
        request: {
          hasStructure: {
            application: {}
          },
          hasValue: {},
        },
        services: {}
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        services: [
          { insertHistoryStep: { params: { application: {}, nextState: 'userW_' }, execution: 'sync'}},
          { saveDB: { params: { application: {}, nextState: 'userW_' } } },
          { notifyUser: { params: { application: {}, nextState: 'userW_' }, execution: 'async' } }
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
            state: { required: true, type: 'isString' },
            id: { required: true, type: 'isNumber' },
            name: { required: true, type: 'isString' }
          },
          hasValue: { judgment: { pending: true }, userId: '1' },
        },
        services: {}
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        services: [
          {
            insertHistoryStep: {
              params: { application: {}, nextState: 'userW_' }, execution: 'sync'
            }
          },
          { saveDB: { params: { application: {}, nextState: 'userW_' } } },
          { notifyUser: { params: { application: {}, nextState: 'userW_' }, execution: 'async' } }
        ]
      }
    },
    { name: 'precheckerFinalSavedNoPending',
      description: 'Prechecker concludes working on an application',
      from: 'precheckerW_',
      to: 'presidentW_Prechecker',
      atEvent: 'precheckerFinalSaved',
      preconditions: {
        // user previliges and transitionRequest are checked in the event resolver
        request: {
          hasStructure: {
            state: { required: true, type: 'isString' },
            id: { required: true, type: 'isNumber' },
            name: { required: true, type: 'isString' }
          },
          hasValue: { judgment: { pending: false } },
        },
        services: {}
      },
      effects: {
        response: {
          haStructure: { newState: 'isString' },
          hasValue: {}
        },
        // rule engine creates a context and there is no need to carry params around like application
        servicesRules: {
          "name": "precheckerFinalSavedEffectServices",
          "rules": [
            {
              "when": "always",
              "then": [
                { "closure": "insertJudgment" },
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
        services: {}
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
        services: {}
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
        services: {}
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
        services: {}
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
    {
      name: 'proponentFinalSavedSameTitle',
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
        services: {}
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
    {
      name: 'proponentFinalSavedNoSameTitle',
      description: 'President sends it to the appropriete proponent',
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
        services: {}
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
