'use strict';

const admin = require('firebase-admin');

exports.getFirebaseAdminDb = () => {
    const pathToCredentials = '../../credentials/firebase.json'; // import de du SDK Admin
    const serviceAccount = require(pathToCredentials);      // réupération les variables de connexion du compte admin
    serviceAccount.project_id = process.env.FIREBASE_PROJECT_ID;
    serviceAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;
    serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY;
    serviceAccount.client_email = process.env.FIREBASE_CLIENT_EMAIL;
    serviceAccount.client_id = process.env.FIREBASE_CLIENT_ID;

    console.log(typeof process.env.FIREBASE_PRIVATE_KEY);

    const firebase = admin.initializeApp({ //  inititalisation de l'app firebase admin
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://muscufacile-b6eae.firebaseio.com/'
    });
    return firebase.database();
}
