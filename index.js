// @ts-nocheck
const async = require('async')
let hook = {}
hook.result = {}

function runHook() {
  return hook => {
    if (hook.data.info) {
      let info = {
        user: {
          email: hook.params.user.email, 
          id: hook.params.user.id
        },
        settings: {},
        notifications: []
      }
      return new Promise(function (resolve, reject) {
        async.parallel([
          function(callback) {
            hook.app.service('settings').find()
              .then(settings => {
                info.settings = settings[0]
              })
              .catch((err) => console.log('Error fetching settings for user'))
              .then(() => callback(null, 'settings'))
          },
          function(callback) {
            hook.app.service('notifications').find()
              .then(notifications => {
                info.notifications = notifications
              })
              .catch((err) => console.log('Error fetching notifications for user'))
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
}

runHook()