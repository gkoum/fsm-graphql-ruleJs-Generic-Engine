module.exports.helpers = {
  last: function(array, n) {
    if (array == null) return void 0;
    if (n == null) return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));
  },
  deepEqual: function(object1, object2) {
    console.log(this)
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      const val1 = object1[key]
      const val2 = object2[key]
      const areObjects = this.isObject(val1) && this.isObject(val2)
      if (
        areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2
      ) {
        return false
      }
    }
    return true
  },
  isObject: function(object) {
    return object != null && typeof object === 'object';
  },
  newHistoryStep: function (nextState) {
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
    // return new Promise(resolve => {
    //   setTimeout(() => { resolve(nextState) }, 2000);
    // })
  }
}

// function isObject(object) {
//   return object != null && typeof object === 'object';
// }