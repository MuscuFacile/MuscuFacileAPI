'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();


exports.insertUser = userData => {
    const user = db.ref(`/users/${userData.email}`);

    return user.update(userData).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}

exports.getPass = email => {
    return db.ref(`/users/${email}`).once('value').then(function (snapshot) {
        return snapshot.val();
    });
}