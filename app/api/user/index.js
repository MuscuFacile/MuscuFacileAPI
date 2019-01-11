'use strict';

const userModel = require('../../model/userModel');
const jwt = require('jsonwebtoken');
const userController = require('./userController');

module.exports = app => {

    app.post('/users', (req, res) => { // route d'inscription
        const email = req.body.email;

        let passSalt = userController.cryptPassword(req.body.pass);

        let userData = {
            email: email,
            password: passSalt.pass,
            salt: passSalt.salt
        }

        userModel.insertUser(userController.sanitizeEmail(email), userData).then(insert => {
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

    app.post('/users/login', (req, res) => { // route de connexion

        const email = req.body.email;
        const pass = req.body.pass;

        userController.verifyLogin(userController.sanitizeEmail(email), pass).then(isValid => {
            switch (isValid) {
                case true:
                    res.status(200).send({ success: 'Utilisateur identfié avec succès', token: jwt.sign({ 'email': email }, 'muscuAPI') });
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

    app.patch('/users/:email', (req, res) => { // route d'insertion des détails de l'utilisateur
        const email = req.params.email;
        const reqBody = req.body;

        let details = {};

        if (reqBody['prenom']) {
            details['prenom'] = reqBody['prenom'];
        }

        if (reqBody['nom']) {
            details['nom'] = reqBody['nom'];
        }

        if (reqBody['poids']) {
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

        userController.insertDetails(userController.sanitizeEmail(email), details).then(inserted => {
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

    app.get('/users/:email', (req, res) => {

        userModel.getUser(userController.sanitizeEmail(req.params.email)).then(userDetails => {

            if (!userDetails) {
                res.status(404).send({ error: 'Utilisateur inconnu' });
            } else {
                res.status(200).json(userDetails);
            }
        });
    });

    app.get('/users/:email/imc', async (req, res) => {
        let email = userController.sanitizeEmail(req.params.email);
        let userDetails = await userModel.getUser(email)

        let imc,
            statut,
            poids;

        if (!userDetails) {
            res.status(404).send({ error: 'Utilisateur inconnu' });
        } else {
            poids = await userModel.getLastPoids(email);
            imc = userController.calculImc(userDetails.taille, poids); //calcul de l'imc avec le poids le plus récent
            statut = imc ? userController.statutImc(imc) : "IMC invalide";

            res.status(200).json({
                "imc": imc,
                "statut": statut
            });
        }
    });

    app.post('/users/:email/poids', (req, res) => {

        console.log(req.params);
        userModel.addPoids(userController.sanitizeEmail(req.params.email), req.body.poids, req.body.date).then((poidsUser) => {
            if (!poidsUser) {
                res.status(500).send({ error: 'Impossible d\'insérer' });
            } else {
                res.status(200).send({ success: 'Insertion réussie' });
            }
        });
    });

    app.get('/users/:email/poids', (req, res) => {
        userModel.getPoids(userController.sanitizeEmail(req.params.email)).then((poidsUser) => {
            if (!poidsUser) {
                res.status(404).send({ error: 'Poids introuvables' });
            } else {
                res.json(poidsUser);
            }
        });
    });
}