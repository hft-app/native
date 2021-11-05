/*global cordova, module*/

module.exports = {
  subscribeTag(callback, errorCallback) {
    cordova.exec(callback, errorCallback, 'StudentID', 'subscribeTag', [name]);
  },
  unsubscribeTag() {
    cordova.exec(null, null, 'StudentID', 'unsubscribeTag', []);
  },
  read(data) {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, 'StudentID', 'read', data));
  },
};
