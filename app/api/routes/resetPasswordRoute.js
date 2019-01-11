'use strict';

const userModel = require('../../model/userModel');
const resetPasswordModel = require('../../model/resetPasswordModel');
const passwordService = require('../services/passwordService');
const crypto = require('crypto');


module.exports = app => {

    app.post('/reset/password/:email/:code', (req, res) => {

        const email = sanitizeEmail(req.params.email);
        const code = req.params.code;
        
        resetPasswordModel.getResetPassword(email).then((resetPasswordData) => {
            if(resetPasswordData && resetPasswordData.code == code) {
                // ajout dans la table resetPassword & envoi mail avec code
                let newPassword = passwordService.generatePassword();
                if(userModel.updatePassword(email, newPassword)) {
                    res.status(200).send({ success: 'Mot de passe réinitilisé.',  });
                } else {

                };
            } else {
                res.status(401).send({ error: 'Aucun code de réinitilisation ne correspond à cet utilisateur.' });
            }
        });


    });

    app.post('/reset/password/:email', (req, res) => {

        const email = req.params.email;
        let userExist = false;
        userModel.getUser(sanitizeEmail(email)).then((userData) => {
            if(userData) {
                // ajout dans la table resetPassword & envoi mail avec code

                res.status(200).send({ success: 'Un email vient de vous être envoyé avec un lien pour réinitialiser votre mot de passe.' });
            } else {
                res.status(404).send({ error: 'Utilisateur inconnu' });
            }
        });


    });

}

function sanitizeEmail(email) {
    return email.replace(/\./g, '_');
}
