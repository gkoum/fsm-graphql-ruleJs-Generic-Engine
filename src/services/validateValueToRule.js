module.exports.validateValueToRule = {
  validate: (rule, pair) => {
    console.log(rule, pair)
    console.log('-----------validateValueToRule')
    // check type
    if (rule.type === 'number') {
      console.log('-----is a number')
      const valueNumber = Number(pair.value)
      if (typeof valueNumber != 'number') { return false}
      else {
        const result = validateNumber(rule, pair)
        console.log(result)
        return result
      }
    } else if (rule.type === 'string') {
      if (typeof pair.value != 'string') { return false }
      else {
        const result = validateString(rule, pair)
        console.log(result)
        return result
      }
    } else {
      console.log('----------type was not matched')
    }
  }
}

const validateNumber = (rule, pair) => {
  console.log('--------validateNumber')
  const criteria = []
  if (rule.gt) {
    if (pair.value > rule.gt) {
      console.log('gt is ok')
      criteria.push('gt is ok')
    } else {
      console.log('gt is not ok')
      criteria.push('gt is not ok')
      return false
    }
  }
  if (rule.gte) {
    if (pair.value >= rule.gte) {
      console.log('gte is ok')
      criteria.push('gte is ok')
    } else {
      console.log('gte is not ok')
      criteria.push('gte is not ok')
      return false
    }
  }
  if (rule.lt) {
    if (pair.value < rule.lt) {
      console.log('lt is ok')
      criteria.push('lt is ok')
    } else {
      console.log('lt is not ok')
      criteria.push('lt is not ok')
      return false
    }
  }
  if (rule.lte) {
    if (pair.value <= rule.lte) {
      console.log('lte is ok')
      criteria.push('lte is ok')
    } else {
      console.log('lte is not ok')
      criteria.push('lte is not ok')
      return false
    }
  }
  return true
}

const validateSelect = (rule, pair) => {
  console.log('------------validateString')
  return true
}

const validateString = (rule, pair) => {
  console.log('------------validateString')
  return true
}
