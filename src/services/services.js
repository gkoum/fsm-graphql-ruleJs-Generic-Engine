module.exports.services = {
  insertJudgment: (params) => {
    console.log('insertJudgment to existing history step: ', params)

  },
  insertHistoryStep: (params) => {
    let historyStep = findHistoryNextStep(params.nextState)
    if (historyStep) {
      insertStep(params.application, historyStep)
    }
  },
  saveDB: (params) => {
    saveDB(params.application, params.judgment)
  },
  notifyUser: (params) => {
    notifyUser(params)
  }
}

function findHistoryNextStep(nextState) {
  console.log('find and insert HistoryNextStep: ' + nextState)
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
  console.log('insertStep to the application')
}

function saveDB(application, judgment) {
  console.log('save to db the given entity: ' + application + judgment)
  return Promise.resolve()
}

function notifyUser(params) {
  console.log('notifyUser: ' + params)
}