'use strict';

const firebase = require('../database/firebaseConnection');
const db = firebase.getFirebaseAdminDb();
const uuidv1 = require('uuid/v1');

exports.insertCategory = async (category) => {
    const categories = db.ref(`/categories`);
    const dataToSave={};
    dataToSave[category.id]=
    {
        'name': category.name,
    };
    return categories.update(dataToSave);  
}