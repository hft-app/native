/*global cordova, module*/

module.exports = {
  subscribe(callback, errorCallback) {
    cordova.exec(callback, errorCallback, 'StudentID', 'subscribe', [name]);
  },
  unsubscribe() {
    cordova.exec(null, null, 'StudentID', 'unsubscribe', []);
  },
  read(data) {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, 'StudentID', 'read', data));
  },
};
