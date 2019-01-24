module.exports = (email) => {
    return email.replace(/\./g, '_');
}
