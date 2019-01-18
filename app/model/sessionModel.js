'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();

exports.insertSession= async (session) => {
    
    const sessions = db.ref(`/sessions/${session.email}`);
    const dataToSave={};
    dataToSave[session.date]={
        'date': session.date,
        'exercices':session.exercices,
    };

    return (await sessions.update(dataToSave));  
}

exports.getSessions = async (email)=>{
    const sessions = db.ref(`/sessions/${email}`);
    const snapshot = await sessions.once('value');
    return snapshot.val();
}

exports.deleteSessions = async (email, timestamp) => {
    return (await db.ref(`/sessions/${email}/${timestamp}`).remove());
}
