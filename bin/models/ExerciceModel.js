'use strict;'

const firebase = require('../../config/database.js');

const db = firebase.getFirebaseAdminDb();

let root = db.ref();

//listener sur la valeur qui va renvoyer la valeur à chaque mise à jour
/*util.on('value', (snapshot) => {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
});*/

let userList = {
    "users2" : [
        {
            "id" : 1,
            "nom" : "Cayet",
            "prenom" : "Matthieu",
            "mdp": "07123E1F482356C415F684407A3B8723E10B2CBBC0B8FCD6282C49D37C9C1ABC"
        },
        {
            "id": 2,
            "nom": "Bezabeh-Meucci",
            "prenom": "Stefano",
            "mdp": "07123E1F482356C415F684407A3B8723E10B2CBBC0B8FCD6282C49D37C9C1ABC"
        },
        {
            "id": 3,
            "nom": "Bezabeh-Meucci",
            "prenom": "Cyprien",
            "mdp": "07123E1F482356C415F684407A3B8723E10B2CBBC0B8FCD6282C49D37C9C1ABC"
        },
        {
            "id": 4,
            "nom": "Perrin",
            "prenom": "Antoine",
            "mdp": "07123E1F482356C415F684407A3B8723E10B2CBBC0B8FCD6282C49D37C9C1ABC"
        }
    ]
};

//mise à du contenu de root
root.update(userList);