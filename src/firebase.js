import firebase from 'firebase';
import config from './firebase-config.json'

function init() {
  firebase.initializeApp(config);
}

function instance() {
  if (!firebase.apps.length) {
    init()
  }
  return firebase;
}

export {
  init,
  instance
}
