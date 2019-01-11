const categoriesController = require('./categoriesController');
const equipmentsController = require('./equipmentController');

module.exports = app => {
    app.get('/categories', async(req,res)=>{
        let data= await categoriesController.getCategories();
        console.log(data);

        res.status(data.status).send(data.data);
    });

    app.get('/equipments', async(req,res)=>{
        let data= await equipmentsController.getEquipments();
        console.log(data);
        res.status(data.status).send(data.data);
    })

}