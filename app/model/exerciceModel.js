'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();
const uuidv1 = require('uuid/v1');

exports.insertExercice = async (exercice) => {
    const muscles = db.ref(`/exercices`);
    const dataToSave={};
    dataToSave[exercice.id]=
    {
        'name': exercice.name,
        'status': exercice.status,
        'description':exercice.description,
        'category':exercice.category,
        'muscles':exercice.muscles,
        'muscles_secondary':exercice.muscles_secondary,
        'equipment':exercice.equipment,    
    };
    return muscles.update(dataToSave);  
}