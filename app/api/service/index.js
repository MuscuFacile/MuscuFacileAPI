const importData = require('./importData');

module.exports = app => {
    app.get('/muscles', async(req,res)=>{
        let data = await importData.getmuscles()
        res.status(200).send(data);
    })
}