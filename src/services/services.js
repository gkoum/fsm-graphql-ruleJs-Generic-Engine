module.exports.services = {
  // ISSUE: we create non-dynamic chains of executing services that wait for
  // results from each other. Need to make them dynamically orchestrated.
  // saveDB should wait for nextStep when finalSave but not in tempSave

  // insertJudgment: {
  //   params: { fsmSubject, eventBody },
  //   return: { lastHistoryStep }
  // }
  insertJudgment: async ({ fsmSubject, eventBody }) => {
    console.log('------insert Judgment to existing history step: ')
    console.log(fsmSubject, eventBody)
    // console.log(fsmSubject, transition, eventBody, context)
    const lastHistoryStep = fsmSubject.applicationHistory[fsmSubject.applicationHistory.length - 1]
    lastHistoryStep.judgment = eventBody.judgment
    return { lastHistoryStep: lastHistoryStep }
  },
  // produce nextHistoryStep. input: transition,  output: nextHistoryStep
  newHistoryStep: async ({transition}) => {
    console.log('---insert HistoryStep for state: ')
    // context.fsmSubject.nextStep = await delay(1000, {
    //   date: Date.now(),
    //   dateCompleted: "",
    //   applicationStatus: "userW_",
    //   user: { id: null, name: null, surname: null },
    // })
    // let historyStep = calcHistoryNextStep(params.nextState)
    // if (historyStep) {
    //   insertStep(context.fsmSubject, historyStep)
    // }
    // var key = insertHistoryStep.name
    // var result = { [key]: { newHistoryStep: transition.to } }
    // console.log(result)
    return { newHistoryStep: transition.to }
  },
  // what to save to db
  saveDB: async ({lastHistoryStep, newHistoryStep, fsmSubject}) => {
    console.log('---saveDB: ')
    console.log(lastHistoryStep, newHistoryStep, fsmSubject)
    // const obj = {}
    // obj[saveDB.name] = true
    // return obj
    const historySaved = fsmSubject.applicationHistory.concat(newHistoryStep)
    console.log(historySaved)
    return { historySaved: historySaved }
  },
  // ISSUE: notify needs not to wait sending 200 ok to client = async
  // BUT needs to be done after everything else concludes.
  notifyUser: async ({fsmSubject}) => {
    console.log('---notifyUser: ')
    // await context.fsmSubject.nextStep
    // notifyUser(params)
    const obj = {}
    obj[notifyUser.name] = true
    return obj
  },
  deepEqual: (ob1, ob2) => {
    return deepEqual(ob1, ob2)
  }
}

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
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
  return new Promise(resolve => {
    setTimeout(() => { resolve(historyStep) }, 2000);
  })
}

function insertStep(application, historyStep) {
  console.log('---insertStep to the application: ')
  return new Promise(resolve => {
    setTimeout(() => { resolve(historyStep) }, 2000);
  })
  // console.log(application)
  // console.log(historyStep)
}

function saveDB(application, judgment) {
  console.log('---save to db the given entity: ')
  return Promise.resolve()
}

function notifyUser(params) {
  console.log('---notifyUser: ')
  return new Promise(resolve => {
    setTimeout(() => { resolve(params) }, 2000);
  });
}

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}