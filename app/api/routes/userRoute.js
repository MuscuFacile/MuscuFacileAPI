'use strict';

const userModel = require('../../model/userModel');
const crypto = require('crypto');


module.exports = app => {

    app.post('/user/insert', (req, res) => {
        const email = req.body.email;

        let passSalt = cryptPassword(req.body.pass);

        let userData = {
            email : sanitizeEmail(email),
            password : passSalt.pass,
            salt : passSalt.salt
        }
        userModel.insertUser(userData).then(insert => {
            switch(insert){
                case true:
                    res.status(200).send({ success: 'Utilisateur enregistré avec succès' });
                break;
                case false:
                    res.status(401).send({ error: 'Utilisateur déjà existant' });
                break;
                default :
                    res.status(500).send({ error: 'Quelque chose s\'est mal, passé, contactez le webmestre' });
                break;
            }
        });

        
    });

    app.get('/user/login', (req, res) => {

        const email = req.query.email;
        const pass = req.query.pass;

        verifyLogin(sanitizeEmail(email), pass).then(isValid => {
            switch(isValid){
                case true:
                    res.status(200).send({ success : 'Utilisateur identfié avec succès'});
                break;
                case false:
                    res.status(403).send({ error : 'identifiants erronnés' });
                break;
                case 'non-inscrit':
                    res.status(401).send({ error: 'Utilisateur inconnu' });
                break;
                default:
                    res.status(500).send({ error : 'Quelque chose s\'est mal, passé, contactez le webmestre' });
                break;
            }
        });
    });
}

function cryptPassword(pass, salt = ''){

    if(salt === ''){
        salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); //random string pour saler le hash
    }

    return {
        pass : crypto.createHmac('sha256', salt).update(pass).digest('hex'),
        salt : salt
    };
}

function verifyLogin(email, pass){
    return userModel.getPass(email).then((userData) => {
        if(userData){
            return cryptPassword(pass, userData.salt).pass === userData.password;
        } else {
            return 'non-inscrit';
        }
    });
}

function sanitizeEmail(email){

    return email.replace('.', '_');
}