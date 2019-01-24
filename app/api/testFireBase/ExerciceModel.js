'use strict;'

const firebase = require('../../database/firebaseConnection');

const db = firebase.getFirebaseAdminDb();

let root = db.ref();

//listener sur la valeur qui va renvoyer la valeur à chaque mise à jour
/*util.on('value', (snapshot) => {
    console.log(snapshot.val());
}, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
});*/

let userList = {
    "users": [{
        "id": "uuid",
        "name": "String",
        "lastName": "String",
        "dateOfBirth": "date",
        "gender": "boolean",
        "characteristic": [
            {
                "inputDate": "date",
                "height": "float",
                "weight": "float",
                "maximalStrengths": [
                    {
                        "exercise": "id",
                        "weigth": "float"
                    }
                ]
            }
        ],
        "session": [
            {
                "date": "datetime",
                "exercises": [{
                    "id": "int",
                    "value": "float or time",
                    "objectif": "String"
                }]
            }
        ],
        "diets": [{
            "id": "int",
            "dateStart": "dateTime",
            "dateEnd": "dateTime"
        }],
        "groups": []

    }],
    "usersgroup": [{

    }
    ],
    "exercises": [{
        "id": "uuid",
        "name": "String",
        "type": "enum, body, cardio,weight ",
        "instruments": "machine, freeweight, none",
        "img": [],
        "muscles": []
    }],
    "objectifs": [{
        "name": "String",
        "description": "String",
        "repetitions": "String"
    }],
    "muscles": [{
        "muscle_name": "String"
    }],
    "diets": [{

    }]
};


//mise à du contenu de root
root.update(userList);