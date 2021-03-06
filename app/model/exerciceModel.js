'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();
const uuidv1 = require('uuid/v1');

exports.insertExercice = async (exercice) => {
    const exercices = db.ref(`/exercices`);
    const dataToSave={};
    dataToSave[exercice.id]=
    {
        'name': exercice.name,
        'description':exercice.description,
        'category':exercice.category,
        'muscles':exercice.muscles,
        'muscles_secondary':exercice.muscles_secondary,
        'equipment':exercice.equipment,  
        'images': exercice.images,  
    };
    return exercices.update(dataToSave);  
}

exports.getAllExercices = async ()=>{
    const exercices = db.ref('/exercices');
    const snapshot = await exercices.once('value');
    return snapshot.val();
}

exports.getExercice = async (id) => {
    let snapshot = await db.ref(`/exercices/${id}`).once('value');

    return snapshot.val();
}