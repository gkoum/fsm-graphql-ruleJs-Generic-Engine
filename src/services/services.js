module.exports.services = {
  // ISSUE: we create non-dynamic chains of executing services that wait for
  // results from each other. Need to make them dynamically orchestrated.
  // saveDB should wait for nextStep when finalSave but not in tempSave 
  insertJudgment: (params, context) => {
    console.log('------insertJudgment to existing history step: ')
    // console.log(params)
    // console.log(context)
    return context
  },
  insertHistoryStep: async (params, context) => {
    console.log('---insertHistoryStep for state: ')
    // console.log(params)
    // console.log(context)
    context.fsmSubject.nextStep = await delay(3000, {
      date: Date.now(),
      dateCompleted: "",
      applicationStatus: "userW_",
      user: { id: null, name: null, surname: null },
    })
    let historyStep = calcHistoryNextStep(params.nextState)
    if (historyStep) {
      insertStep(context.fsmSubject, historyStep)
    }
    return context.fsmSubject.nextStep
  },
  saveDB: async (params, context) => {
    console.log('---saveDB: ')
    // console.log(params)
    // console.log(context)
    // if insertHistoryStep within the services await for it. We need services here
    // OR a service that will calculate the course based on services given 
    if (context.fsmSubject.id === '1'){
      await context.fsmSubject.nextStep
    }
    saveDB(context.fsmSubject, params.judgment)
    return true
  },
  // ISSUE: if reply does need to wait for the notifyUser it needs to be 
  // executed in another loop but after all the rest have ended
  notifyUser: async (params, context) => {
    await context.fsmSubject.nextStep
    notifyUser(params)
    return true
  }
}

function calcHistoryNextStep(nextState) {
  console.log('---calc HistoryNextStep: ' + nextState)
  switch (nextState) {
    case 'userW_':
      return {
        date: Date.now(),
        dateCompleted: "",
        applicationStatus: "userW_",
        user: { id: null, name: null, surname: null },
      }
    default:
      break;
  }
  return false
}

function insertStep(application, historyStep) {
  console.log('---insertStep to the application: ')
  // console.log(application)
  // console.log(historyStep)
}

function saveDB(application, judgment) {
  console.log('---save to db the given entity: ')
  return Promise.resolve()
}

function notifyUser(params) {
  console.log('---notifyUser: ')
}

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}