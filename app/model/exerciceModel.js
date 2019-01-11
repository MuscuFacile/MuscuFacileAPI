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