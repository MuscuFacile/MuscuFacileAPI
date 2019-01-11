'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();


exports.insertResetPassword = resetPasswordData => {
    
    const resetPassword = db.ref(`/resetPassword/${resetPasswordData.email}`);

    return resetPassword.update(resetPasswordData).then(() => {
        return true;
    }).catch(() => {
        return 'error';
    });
}

exports.getResetPassword = email => {
    return db.ref(`/resetPassword/${email}`).once('value').then((snapshot) => {
        return snapshot.val();
    });
}