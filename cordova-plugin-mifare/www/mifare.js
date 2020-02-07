/*global cordova, module*/

module.exports = {
    subscribeTag(callback, errorCallback) {
        cordova.exec(callback, errorCallback, "Mifare", "subscribeTag", [name]);
    },
    unsubscribeTag() {
        cordova.exec(null, null, "Mifare", "unsubscribeTag", []);
    },
    auth(data, callback, errorCallback) {
        cordova.exec(callback, errorCallback, "Mifare", "auth", data);
    },
    read(data, callback, errorCallback) {
        cordova.exec(callback, errorCallback, "Mifare", "read", data);
    },
};
