const importData = require('./importData');

module.exports = app => {

    app.get('/import/muscles', async(req,res)=>{
        let data = await importData.insertMusclesDB()
        res.status(200).send(data);
    })

    app.get('/import/excercices', async(req,res)=>{
        let data = await importData.insertExercicesDB();
        res.status(200).send(data);
    })

    app.get('/import/equipments', async(req,res)=>{
        let data = await importData.insertEquipmentsDB();
        res.status(200).send(data);
    })

    app.get('/import/categories', async(req,res)=>{
        let data = await importData.insertCategoriesDB();
        res.status(200).send(data);
    })
}

