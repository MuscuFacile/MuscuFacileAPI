'use strict';
const admin = require('firebase-admin');

exports.getFirebaseAdminDb = () => {
    const pathToCredentials = '../credentials/firebase.json'; // import de du SDK Admin
    const serviceAccount = require(pathToCredentials);      // réupération les variables de connexion du compte admin
    const firebase = admin.initializeApp({ //  inititalisation de l'app firebase admin
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://muscufacile-b6eae.firebaseio.com/'
    });

    return firebase.database();
}