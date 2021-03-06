const { helpers } = require('../helpers/helpers')
const { fsmImage } = require('../models/fsmImage')
const { wizardImage } = require('../models/wizardImage')

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

    const lastHistoryStep = fsmSubject.applicationHistory[fsmSubject.applicationHistory.length - 1]
    lastHistoryStep.judgment = eventBody.judgment
    return { lastHistoryStep: lastHistoryStep }
  },
  // produce nextHistoryStep. input: transition,  output: nextHistoryStep
  newHistoryStep: async ({transition}) => {
    console.log('---insert HistoryStep for state: ')
    return { newHistoryStep: helpers.newHistoryStep(transition.to) }
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
    return helpers.deepEqual(ob1, ob2)
  },
  wizardEvent: async ({ name, body, models, image, numberOfPairs}) => {
    console.log('----------------ENTERING EVENT VALUES')
    console.log(name, body, image)

    let currentImage = {}
    if (image === 'wizard') {
      currentImage = wizardImage
    } else if (image === 'fsm') {
      currentImage = fsmImage
    } else {
      return 'not supported schema found'
    }
    // 1.	eventExists map the event to an existing event on wizard => NEED array of string events
    const eventExists = currentImage.events.find(event => event.name === name)
    if (!eventExists) {
      console.log('---Wizard Event not Supported')
      return { name, judgment: 'Event not Supported' }
    }

    // 2.	Fetch USER-FSMSUBJECT-SYSTEM ROLES
    // fetch roles in RAM
    // role can alter the behavior of the wizard
    // subject can be the history of the specific user in this wizard in a historySteps array
    const roles = await models.Roles.findAll()
    const allRoles = roles.map(role => { return { id: role.id, name: role.name } })
    // const userFromToken = await delay(2000, {id: 10})
    const userDb = await models.Users.findByPk('1a0e3eba-af5e-11e8-aec6-aa00006b40c9')
    const userRoles = await models.UserRoles.findAll({
      where: {
        user_id: '1a0e3eba-af5e-11e8-aec6-aa00006b40c9'
      },
    })

    const userAllRoles = allRoles.filter(role => userRoles.map(r => r.roleId).includes(role.id))
    const userAllRolesName = userAllRoles.map(role => role.name)

    // the DB module will retrieve from db and put into context with names given in currentImage 
    // const fsmSubjectDb = await models.Applications.findByPk('610')
    // const subjectHistory = await models.ApplicationRoutes.findAll({
    //   where: {
    //     application_id: '610'
    //   },
    // })
    // subjectHistory.forEach(step => console.log(step.applicationStatus))
    const fsmSubjectS = {
      id: 1263,
      history: []
    }
    const fsmSubject = fsmSubjectS
    console.log('----------- fsmSubject')
    const fsmObjectLastStep = helpers.last(fsmSubject.history[0])

    // 3. Can the user (depending on his roles - can have multiple roles) fire such an event?
    // const allUserEvents = currentImage.roles
    //   .filter(role => userAllRolesName.includes(role.name))
    //   .reduce((acc, val) => acc.events.concat(val.events))
    // console.log(allUserEvents)

    // const canUserSendEvent = allUserEvents.includes(eventExists.name)
    // if (!canUserSendEvent) {
    //   console.log('---User cannot send such an event')
    //   return { name, judgment: 'User cannot send such an event' }
    // }

    // 4. Can the user access the specific fsmSubject in the current state?
    // const allUserStates = currentImage.roles
    //   .filter(role => userAllRolesName.includes(role.name))
    //   .reduce((acc, val) => acc.hasAccess.concat(val.hasAccess))

    // const canUserAccessObject = allUserStates.includes(fsmObjectLastStep.applicationStatus) &&
    //   fsmObjectLastStep.user.id === userDb.id || null
    // if (!canUserAccessObject) {
    //   console.log('---User cannot access the specific app')
    //   return { name, judgment: 'User cannot access the specific app' }
    // } else {
    //   console.log(
    //     '---User can access the specific app: ',
    //     fsmObjectLastStep.applicationStatus,
    //     fsmObjectLastStep.user.id
    //   )
    // }

    // 5. Is the fsmSubject in state that can accept this Event => SAME AS 6?
    // const applicableEventsForState = currentImage.states
    //   .find(state => state.name === fsmObjectLastStep.applicationStatus).events
    // console.log(applicableEventsForState)

    // const canSubjectAcceptEvent = applicableEventsForState.includes(name)

    // if (!canSubjectAcceptEvent) {
    //   console.log('---Event: ', name, ' not applicable for Subject: ', fsmObjectLastStep.applicationStatus)
    //   return { name, judgment: '---Event not applicable for Subject' }
    // } else {
    //   console.log('---Event: ', name, ' applicable for Subject: ', fsmObjectLastStep.applicationStatus)
    // }

    // 6. Find all avalable transitions: NEED array state: [transitions] --- not search for it each time
    // Approve transition = (fired at this Event) + (tr.from = fsmObject DB state)
    const transitionsForState = currentImage.transitions
      .filter(tr => tr.atEvent === name)
    if (transitionsForState.length < 1) {
      console.log('---Event for current Subject State not Supported')
      return {
        name,
        error: 'Event for current Subject State not Supported',
        currentState: name
      }
    }

    // 7.	Find transition and next state depending on eventBody (e.g. pending)
    const transition = await models.Fsm.validateTransitionRequest({
      eventBody: body,
      event: name,
      type: image,
      allowedTransitions: transitionsForState,
      numberOfPairs
    })
    if (!transition) { return { name, judgment: '---Transition could not be located' } }

    // STEPS 1-7 are done in parallel to successful completion and then
    //    STEP 8 is done to successful completion and then
    //      STEP 9 is done to successful completion and then
    // END
    // => each should return a promice and check for successful completion to go to next step
    // validateRequest().then(validationResults => {
    //   checkPreconditions(validationResults).then(preResults => {
    //     runPreconditions(preResults).then(preSerResults => {
    //       applyEffects(preSerResults).then(allResults => console.log(allResults))
    //     })
    //   })
    // })
    // STEP 1-7 to be given in a json and implemented dynamically again to have an array of promises
    // and use those that are needed each time
    // VALIDATE_REQUEST: [
    //   { eventExists: { params: { eventName: 'precheckerFinalSave' }, execution: 'sync'},
    //   {fetchUser: params: {}, execution: 'async'},
    //   {fetchFsmSubject: params: {}, execution: 'async'},
    //   {canUserSendEvent: params: {}},
    //   {canUserAccessObject: params: {}},
    //   {canSubjectAcceptEvent: params: {}},
    //   {transitionsForState: params: {}},
    //   {transition: params: {}}
    // ]

    // 8.	Check Preconditions: validate transition request = 
    // {structure + specific values(were checked fοr transition) + needed actions}
    const structureApproved = await models.Applications.validateStructure({
      application: body,
      structure: transition.preconditions.request.hasStructure
    })
    const preActionsOk = await models.Fsm.executePreActions({
      fsmSubject: fsmSubject,
      transition: transition
    })
    console.log(structureApproved, preActionsOk)
    if (!structureApproved || !preActionsOk) {
      return { name, judgment: 'Preconditions Failed' }
    }

    // 9.	Apply Effects: move to new state and take all action
    const effectsApplied = await models.Fsm.applyEffects({
      fsmSubject: fsmSubject,
      transition: transition,
      body: body
    })

    console.log('------- Effects: ', effectsApplied)
    if (effectsApplied) {
      console.log('---Εffects applied')
      // each request has each own returned values described in transition as response.hasStructure
      // so API has all possible concepts and for each the response is assempled dynamically
      // transition.effects.response.hasStructure{for each key add the same name from context}
      return {
        name: transition.to,
        fsmObjectId: fsmSubject.id,
        judgment: transition.name,
        roleId: body.roleId,
        currentState: transition.from,
        newState: transition.to
      }
    } else {
      console.log('--- Effects could not be applied')
      return { name, judgment: 'Effects could not be applied' }
    }
  },
  event: async ({name, body, models, image}) => {
    console.log('----------------ENTERING EVENT VALUES')
    console.log(name, body, models, image)

    let currentImage = {}
    if (image === 'wizard') {
      currentImage = wizardImage
    } else if (image === 'fsm') {
      currentImage = fsmImage
    } else {
      return 'not supported schema found'
    }
    // 1.	eventExists map the event to an existing event on wizard => NEED array of string events
    const eventExists = currentImage.events.find(event => event.name === name)
    if (!eventExists) {
      console.log('---Event not Supported')
      return { name, judgment: 'Event not Supported' }
    }

    // 2.	Fetch USER-FSMSUBJECT-SYSTEM ROLES
    // fetch roles in RAM
    const roles = await models.Roles.findAll()
    const allRoles = roles.map(role => { return { id: role.id, name: role.name } })
    // const userFromToken = await delay(2000, {id: 10})
    const userDb = await models.Users.findByPk('1a0e3eba-af5e-11e8-aec6-aa00006b40c9')
    const userRoles = await models.UserRoles.findAll({
      where: {
        user_id: '1a0e3eba-af5e-11e8-aec6-aa00006b40c9'
      },
    })

    const userAllRoles = allRoles.filter(role => userRoles.map(r => r.roleId).includes(role.id))
    const userAllRolesName = userAllRoles.map(role => role.name)

    // console.log(userDb.name, allRoles, userAllRoles, userAllRolesName)
    // userRoles.forEach(role => console.log(role.roleId))

    // the DB module will retrieve from db and put into context with names given in currentImage 
    const fsmSubjectDb = await models.Applications.findByPk('610')
    const subjectHistory = await models.ApplicationRoutes.findAll({
      where: {
        application_id: '610'
      },
    })
    // console.log(fsmSubjectDb.specialFields, fsmSubjectDb.externalUsersId)
    subjectHistory.forEach(step => console.log(step.applicationStatus))
    const fsmSubjectS = {
      consideration: true,
      correspondence: true,
      degreeType: "bachelor",
      id: 1263,
      recognitionWith: "aeiAndTei",
      applicationHistory: [
        {
          applicationStatus: "userW_",
          date: "2020-12-30 12:17:02",
          dateCompleted: "2021-01-08 13:59:12",
          id: 6876,
          judgment: null,
          releaseComment: null,
          reroute: false,
          rerouteComment: null,
          role: null,
          user: { id: null, name: null, surname: null }
        },
        {
          applicationStatus: "precheckersQueue",
          date: "2021-01-08 13:59:12",
          dateCompleted: "2021-01-08 14:00:04",
          id: 6921,
          judgment: null,
          releaseComment: null,
          reroute: false,
          rerouteComment: null,
          role: "PreChecker",
          user: { id: null, name: null, surname: null }
        },
        {
          applicationStatus: "precheckerW_",
          date: "2021-01-08 14:00:04",
          dateCompleted: null,
          id: 6939,
          judgment: {
            academicField: { id: null, name: null },
            id: null,
            name: null,
            color: null,
            internalComment: null,
            pending: false,
            pendingReason: null,
            queue: null
          },
          releaseComment: null,
          reroute: false,
          rerouteComment: null,
          role: "PreChecker",
          user: { id: "1a0e3eba-af5e-11e8-aec6-aa00006b40c9", name: "doatap1", surname: "Rigas" }
        }
      ]
    }
    const fsmSubject = fsmSubjectS
    console.log('----------- fsmSubject')
    const fsmObjectLastStep = helpers.last(fsmSubject.applicationHistory)

    // 3. Can the user (depending on his roles - can have multiple roles) fire such an event?
    // Need to produce an eventAvalable/Role array event: [allowedRoles] and check if user has one of them
    const allUserEvents = currentImage.roles
      .filter(role => userAllRolesName.includes(role.name))
      .reduce((acc, val) => acc.events.concat(val.events))
    console.log(allUserEvents)

    const canUserSendEvent = allUserEvents.includes(eventExists.name)
    // = eventExists.roles.some(role=> userDb.roles.indexOf(role) >= 0)
    if (!canUserSendEvent) {
      console.log('---User cannot send such an event')
      return { name: allUserEvents, judgment: 'User cannot send such an event' }
    }

    // 4. Can the user access the specific fsmSubject in the current state?
    // userHasAccessTo --> app.state --> app under users processing
    // or if user null belongs to all in role like viewer
    const allUserStates = currentImage.roles
      .filter(role => userAllRolesName.includes(role.name))
      .reduce((acc, val) => acc.hasAccess.concat(val.hasAccess))
    // console.log(allUserStates, fsmObjectLastStep.applicationStatus, fsmObjectLastStep.user.id, userDb.id)

    const canUserAccessObject = allUserStates.includes(fsmObjectLastStep.applicationStatus) &&
      fsmObjectLastStep.user.id === userDb.id || null
    if (!canUserAccessObject) {
      console.log('---User cannot access the specific app')
      return { name, judgment: 'User cannot access the specific app' }
    } else {
      console.log(
        '---User can access the specific app: ',
        fsmObjectLastStep.applicationStatus,
        fsmObjectLastStep.user.id
      )
    }

    // 5. Is the fsmSubject in state that can accept this Event => SAME AS 6?
    // NEED array of events and states that are applicable: state: [eventsApplicable]
    const applicableEventsForState = currentImage.states
      .find(state => state.name === fsmObjectLastStep.applicationStatus).events
    console.log(applicableEventsForState)

    const canSubjectAcceptEvent = applicableEventsForState.includes(name)

    if (!canSubjectAcceptEvent) {
      console.log('---Event: ', name, ' not applicable for Subject: ', fsmObjectLastStep.applicationStatus)
      return { name, judgment: '---Event not applicable for Subject' }
    } else {
      console.log('---Event: ', name, ' applicable for Subject: ', fsmObjectLastStep.applicationStatus)
    }

    // 6. Find all avalable transitions: NEED array state: [transitions] --- not search for it each time
    // Approve transition = (fired at this Event) + (tr.from = fsmObject DB state)
    const transitionsForState = currentImage.transitions
      .filter(tr => tr.atEvent === name)
    if (transitionsForState.length < 1) {
      console.log('---Event for current Subject State not Supported')
      return {
        name,
        error: 'Event for current Subject State not Supported',
        currentState: name
      }
    }

    // 7.	Find transition and next state depending on eventBody (e.g. pending)
    const transition = await models.Fsm.validateTransitionRequest({
      eventBody: body.requestBody,
      event: name,
      type: 'fsm',
      allowedTransitions: transitionsForState
    })
    if (!transition) { return { name, judgment: '---Transition could not be located' } }

    // STEPS 1-7 are done in parallel to successful completion and then
    //    STEP 8 is done to successful completion and then
    //      STEP 9 is done to successful completion and then
    // END
    // => each should return a promice and check for successful completion to go to next step
    // validateRequest().then(validationResults => {
    //   checkPreconditions(validationResults).then(preResults => {
    //     runPreconditions(preResults).then(preSerResults => {
    //       applyEffects(preSerResults).then(allResults => console.log(allResults))
    //     })
    //   })
    // })
    // STEP 1-7 to be given in a json and implemented dynamically again to have an array of promises
    // and use those that are needed each time
    // VALIDATE_REQUEST: [
    //   { eventExists: { params: { eventName: 'precheckerFinalSave' }, execution: 'sync'},
    //   {fetchUser: params: {}, execution: 'async'},
    //   {fetchFsmSubject: params: {}, execution: 'async'},
    //   {canUserSendEvent: params: {}},
    //   {canUserAccessObject: params: {}},
    //   {canSubjectAcceptEvent: params: {}},
    //   {transitionsForState: params: {}},
    //   {transition: params: {}}
    // ]

    // 8.	Check Preconditions: validate transition request = 
    // {structure + specific values(were checked fοr transition) + needed actions}
    const structureApproved = await models.Applications.validateStructure({
      application: body,
      structure: transition.preconditions.request.hasStructure
    })
    const preActionsOk = await models.Fsm.executePreActions({
      fsmSubject: fsmSubject,
      transition: transition
    })
    console.log(structureApproved, preActionsOk)
    if (!structureApproved || !preActionsOk) {
      return { name, judgment: 'Preconditions Failed' }
    }

    // 9.	Apply Effects: move to new state and take all action
    const effectsApplied = await models.Fsm.applyEffects({
      fsmSubject: fsmSubject,
      transition: transition,
      body: body
    })

    console.log('------- Effects: ', effectsApplied)
    if (effectsApplied) {
      console.log('---Εffects applied')
      // each request has each own returned values described in transition as response.hasStructure
      // so API has all possible concepts and for each the response is assempled dynamically
      // transition.effects.response.hasStructure{for each key add the same name from context}
      return {
        name,
        fsmObjectId: fsmSubject.id,
        judgment: transition.name,
        roleId: body.roleId,
        currentState: fsmObjectLastStep.applicationStatus,
        newState: transition.to
      }
    } else {
      console.log('--- Effects could not be applied')
      return { name, judgment: 'Effects could not be applied' }
    }
  }
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