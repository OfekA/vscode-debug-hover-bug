// @ts-nocheck
const async = require('async')
let hook = {}
hook.result = {}

function timeout () {
  return new Promise(function (resolve, reject) {
      setTimeout(function() {
        resolve()
      }, 5000);
    })
}

function runHook() {
  return hook => {
    let info = {
      user: {},
      settings: {},
      notifications: []
    }
    return new Promise(function (resolve, reject) {
      async.parallel([
        function(callback) {
          timeout().then(() => {
            info.settings = "settings"
          })
          .catch(() => console.log('err1'))
          .then(() => callback(null, 'settings'))
        },
        function(callback) {
          timeout().then(() => {
            info.settings = "notifications"
          })
          .catch(() => console.log('err2'))
          .then(() => callback(null, 'notifications'))
        }
      ],
      // optional callback
      function(err, results) {
          Object.assign(hook.result, info)
          resolve()
      })
    })
  }
}

runHook()(hook)