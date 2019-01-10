'use strict';

const userModel = require('../../model/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


module.exports = app => {

    app.post('/user/insert', (req, res) => { // route d'inscription
        const email = req.body.email;

        let passSalt = cryptPassword(req.body.pass);

        let userData = {
            email: email,
            password: passSalt.pass,
            salt: passSalt.salt
        }
        userModel.insertUser(sanitizeEmail(email), userData).then(insert => {
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
                    res.status(200).send({ success: 'Utilisateur identfié avec succès', token : jwt.sign({'email': email}, 'muscuAPI')});
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

    app.patch('/user/details/:email', (req, res) => { // route d'insertion des détails de l'utilisateur
        const email = req.params.email;
        const reqBody = req.body;

        let details = {};
        
        if(reqBody['poids']){
            details['poids'] = reqBody['poids'];
        }

        if (reqBody['taille']) {
            details['taille'] = reqBody['taille'];
        }

        if (reqBody['age']) {
            details['age'] = reqBody['age'];
        }

        if (reqBody['hobbies']) {
            details['hobbies'] = reqBody['hobbies'];
        }

        if (reqBody['genre']) {
            details['genre'] = reqBody['genre'];
        }

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
    
    app.get('/user/details/:email', (req, res) => {

        userModel.getUser(sanitizeEmail(req.params.email)).then(userDetails => {
           
            if(!userDetails){
                res.status(404).send({error: 'Utilisateur inconnu'});
            } else {
                res.status(200).json(userDetails);
            }
        });
    });
}

function cryptPassword(pass, salt = '') {

    if (salt === '') {
        //random string pour saler le hash
        salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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