const sessionsModel = require('../../model/sessionModel');
const sanitizeEmail = require('../../service/sanitizeEmail');


exports.getSessions = async (email) => {
    email= sanitizeEmail(email);
    let result = await sessionsModel.getSessions(email);
    return { status: 200, data: result };
}

exports.insertSessions = async (sessionDetails) => {
    sessionDetails.email = sanitizeEmail(sessionDetails.email);
    result = await sessionsModel.insertSession(sessionDetails);
    return { status: 200, data: result };
}


exports.deleteSession = async (email, timestamp) => {
    email = sanitizeEmail(email);
    let result =await sessionsModel.deleteSessions(email, timestamp)
    return { status: 200, data: sessions };
}