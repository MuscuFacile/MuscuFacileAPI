'use strict';

const crypto = require('crypto');


exports.generatePassword = () => {
    return crypto.randomBytes(256);
}