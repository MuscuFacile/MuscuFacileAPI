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
        let insert = userModel.insertUser(userData);

        if(!insert){
            insert = null;
        }
        res.json({
            'result' : insert
        });
    });

    app.get('/user/login', (req, res) => {

        const email = req.query.email;
        const pass = req.query.pass;

        let isValid = verifyLogin(sanitizeEmail(email), pass).then(isValid => {
            res.json({
                'isValid': isValid
            });
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