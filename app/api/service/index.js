const importData = require('./importData');

module.exports = app => {
    app.get('/import/muscles', async(req,res)=>{
        let data = await importData.insertMuscleDB()
        res.status(200).send(data);
    })
}


module.exports = app => {
    app.get('/import/excercices', async(req,res)=>{
        let data = await importData.insertExerciceDB();
        res.status(200).send(data);
    })
}