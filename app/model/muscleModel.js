'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();
const uuidv1 = require('uuid/v1');

exports.insertMuscle = async (muscle) => {
    const muscles = db.ref(`/muscles`);
    const dataToSave={};
    dataToSave[muscle.id]={'name': muscle.name, 'is_front': muscle.is_front};
    return muscles.update(dataToSave);  
}

exports.getAllMuscles = async ()=>{
    const muscles = db.ref('/muscles');
    const snapshot = await muscles.once('value');
    return snapshot.val();
}