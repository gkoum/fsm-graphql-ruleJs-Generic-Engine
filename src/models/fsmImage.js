module.exports.fsmImage = {
  validateUser: function (userId, token) {
    console.log(`received id: ${userId} and token: ${token} and start async user validation`)
  },
  nextState: function (currentState, event) {
    return this.transitions.find(trans => trans.atEvent === event && trans.from == currentState);
  },
  states: [
    { name: 'userW_', description: 'Εξωτερικός Χρήστης' },
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
    { name: 'precheckersQueue', description: 'Ουρά προελέγχου' },
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
    { name: 'userFinalSaved', description: '', body: {} },
    { name: 'precheckerFinalSaved', description: '', body: {} },
    { name: 'selectedByPrechecker', description: '', body: {} },
    { name: 'unSelectedByPrechecker', description: '', body: {} }
  ],
  transitions: [
    {
      name: 'precheckerFinalSavedPending',
      description: 'Prechecker concludes working on an application',
      from: 'precheckerW_',
      to: 'userW_',
      atEvent: 'precheckerFinalSaved',
      preconditions: {
        description: 'what should stand for the transition to happen',
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
        description: 'what should happen',
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
    {
      name: 'precheckerFinalSavedNoPending',
      description: 'Prechecker concludes working on an application',
      from: 'precheckerW_',
      to: 'presidentW_Prechecker',
      atEvent: 'precheckerFinalSaved',
      preconditions: {
        description: 'what should stand for the transition to happen',
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
        description: 'what should happen',
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
    {
      name: 'deleteApplication',
      description: 'Delete Application',
      from: 'userW_',
      to: 'deleted',
      atEvent: 'deleteApplication',
      preconditions: { haStructure: 'applicationJson', hasValue: 'applicationJson' },
      effects: {
        description: 'what should happen', response: { haStructure: {}, hasValue: {} }, services: {}
      }
    },
    {
      name: 'selectedByPrechecker',
      description: 'When prechecker selects from queue',
      from: 'precheckersQueue',
      to: 'precheckerW_',
      atEvent: 'selectedByPrechecker',
      preconditions: {
        description: 'what should stand for the transition to happen',
        request: {
          hasStructure: {},
          hasValue: {},
        },
        services: {}
      },
      effects: {
        description: 'what should happen',
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
    { name: 'unSelectedByPrechecker', from: 'precheckerW_', to: 'precheckersQueue' },
    { name: 'finalSavePrechecker', from: 'precheckerW_', to: 'presidentW_Prechecker' },
    { name: 'assignToProponent', from: 'presidentW_Prechecker', to: 'proponentW_President' },
    { name: 'equinalentExists', from: 'proponentW_President', to: 'viewerW_Proponent' },
    { name: 'verified', from: 'viewerW_Proponent', to: 'presidentW_Viewer' },
    { name: 'reset', from: '*', to: 'userW_' },
  ]
}
