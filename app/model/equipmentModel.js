'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();
const uuidv1 = require('uuid/v1');

exports.insertEquipment = async (equipment) => {
    const equipments = db.ref(`/equipments`);
    const dataToSave={};
    dataToSave[equipment.id]=
    {
        'name': equipment.name,
    };
    return equipments.update(dataToSave);  
}