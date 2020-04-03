const Engine = require("rules-js")


const engine = new Engine()

engine.closures.add("always", (fact, context) => {
  console.log("---Rule always", fact, context.parameters)
  return true
})

engine.closures.add("insertJudgment", (fact, context) => {
  console.log("---Rule insertJudgment", context.parameters)
  return fact
})

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

engine.closures.add("findHistoryNextStep", async (fact, context) => {
  console.log("---Rule findHistoryNextStep", fact, context.parameters)
  fact.nextStep = await delay(2000, {
    date: Date.now(),
    dateCompleted: "",
    applicationStatus: "userW_",
    user: { id: null, name: null, surname: null },
  })
  console.log(fact.nextStep)
  return fact
})
engine.closures.add("insertStep", (fact, context) => {
  console.log("---Rule insertStep", fact, context.parameters)
  fact.fsmSubject['history'] = fact.nextStep
  console.log("---Rule insertStep2", fact)
  return fact
})

engine.closures.add("saveDB", (fact, context) => {
  console.log("---Rule saveDB1")
  console.log(fact.fsmSubject.history)
  // console.log("saveDB", fact.application.history.then(mes => mes), fact, context.parameters)
  return fact
})

engine.closures.add("isApplicationValid", (fact, context) => {
  console.log("---Rule isApplicationValid", fact.nextStep, context.parameters)
  return fact
})

module.exports.run = ({ fsmSubject: fsmSubject, transition: transition }) => {
  const parameters = { fsmSubject: fsmSubject, transition: transition }
  console.log(engine.closures.namedClosures, transition.effects.servicesRules.name)
  if (!engine.closures.namedClosures[transition.effects.servicesRules.name]) {
    engine.add(transition.effects.servicesRules)
  }
  return engine.process(transition.effects.servicesRules.name, parameters)
}