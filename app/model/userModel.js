'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();


exports.insertUser = (id, userData) => {
    
    const user = db.ref(`/users/${id}`);

    return user.once('value').then(snapshot => {

        if (snapshot.val()) { //si l'user existe déjà
            return false;

        } else {
            return user.update(userData).then(() => {
                return true;
            }).catch(() => {
                return 'error';
            });
        }
    });
}

exports.getUser = email => {
    const user = db.ref(`/users/${email}`);

    return user.once('value').then(snapshot => {

        if (snapshot.val()) { //si l'user existe déjà
            return snapshot.val();

        } else {
            return false
        }
    });
}

exports.getPass = email => {

    return db.ref(`/users/${email}`).once('value').then((snapshot) => {
        return snapshot.val();
    });
}

exports.insertDetails = (email, details) => {

    return db.ref(`/users/${email}`).update(details).then(() => { 
        return true; 
    }).catch(() => { 
        return false; 
    });
}