'use strict';

const userModel = require('../../model/userModel');
const crypto = require('crypto');


module.exports = app => {

    app.post('/user/insert', (req, res) => { // route d'inscription
        const email = req.body.email;

        let passSalt = cryptPassword(req.body.pass);

        let userData = {
            email: sanitizeEmail(email),
            password: passSalt.pass,
            salt: passSalt.salt
        }
        userModel.insertUser(userData).then(insert => {
            switch (insert) {
                case true:
                    res.status(200).send({ success: 'Utilisateur enregistré avec succès' });
                    break;
                case false:
                    res.status(401).send({ error: 'Utilisateur déjà existant' });
                    break;
                default:
                    res.status(500).send({ error: 'Quelque chose s\'est mal, passé, contactez le webmestre' });
                    break;
            }
        });
    });

    app.post('/user/login', (req, res) => { // route de connexion

        const email = req.body.email;
        const pass = req.body.pass;

        verifyLogin(sanitizeEmail(email), pass).then(isValid => {
            switch (isValid) {
                case true:
                    res.status(200).send({ success: 'Utilisateur identfié avec succès' });
                    break;
                case false:
                    res.status(403).send({ error: 'identifiants erronnés' });
                    break;
                case 'non-inscrit':
                    res.status(401).send({ error: 'Utilisateur inconnu' });
                    break;
                default:
                    res.status(500).send({ error: 'Quelque chose s\'est mal, passé, contactez le webmestre' });
                    break;
            }
        });
    });

    app.post('/user/details', (req, res) => { // route d'insertion des détails de l'utilisateur
        console.log(req.body);

        /**
         * liste des details :
         * poids
         * taille
         * age
         * hobbies
         */
        const details = {
            poids : req.body.poids,
            taille : req.body.taille || 'non-renseigné',
            age : req.body.age || 'non-renseigné',
            hobbies : req.body.hobbies || []
        }


        const email = 'test@test.test'; //recupérer depuis la session

        insertDetails(sanitizeEmail(email), details).then(inserted => {
            switch (inserted) {
                case true:
                    res.status(200).send({ success: 'Utilisateur mis-à-jour' });
                    break;
                case false:
                    res.status(500).send({ error: 'Insertion impossible pour le moment' });
                    break;
                default:
                    res.status(500).send({ error: 'Quelque chose s\'est mal, passé, contactez le webmestre' });
                    break;
            }
        });
    });
}

function cryptPassword(pass, salt = '') {

    if (salt === '') {
        salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); //random string pour saler le hash
    }

    return {
        pass: crypto.createHmac('sha256', salt).update(pass).digest('hex'),
        salt: salt
    };
}

function verifyLogin(email, pass) {
    return userModel.getPass(email).then((userData) => {
        if (userData) {
            return cryptPassword(pass, userData.salt).pass === userData.password;
        } else {
            return 'non-inscrit';
        }
    });
}

function sanitizeEmail(email) {
    return email.replace(/\./g, '_');
}

function insertDetails(email, details){

    return userModel.insertDetails(email, details).then(inserted => { return inserted; })
}