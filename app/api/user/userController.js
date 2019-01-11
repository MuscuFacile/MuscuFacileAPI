

const crypto = require('crypto');
const userModel = require('../../model/userModel');

exports.cryptPassword = (pass, salt = '') => {

    if (salt === '') {
        //random string pour saler le hash
        salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    return {
        pass: crypto.createHmac('sha256', salt).update(pass).digest('hex'),
        salt: salt
    };
}

exports.verifyLogin = (email, pass) => {
    return userModel.getPass(email).then((userData) => {
        if (userData) {
            return this.cryptPassword(pass, userData.salt).pass === userData.password;
        } else {
            return 'non-inscrit';
        }
    });
}

exports.sanitizeEmail = (email) => {
    return email.replace(/\./g, '_');
}

exports.insertDetails = (email, details) => {
    return userModel.insertDetails(email, details).then(inserted => { return inserted; })
}

exports.calculImc = (taille, poids) => {
    return poids / Math.pow((taille / 100), 2);
}

exports.statutImc = (imc) => {

    let statut = "IMC invalide";

    if(imc < 16.5){
        statut = "famine";
    } else if(imc < 18.5){
        statut = "maigreur";
    } else if(imc < 25){
        statut = "corpulence normale";
    } else if(imc < 30){
        statut = "surpoids";
    } else if(imc < 35){
        statut = "obésité modérée";
    } else if(imc < 40){
        statut = "obésité sévère";
    } else if(imc > 40){
        statut = "obésité morbide (ou massive)"
    }

    return statut;
}