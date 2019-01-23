const categoriesController = require('./categoriesController');
const equipmentsController = require('./equipmentController');
const musclesController = require('./musclesController');
const exerciceController = require('./exerciceController')
const checkNumber= require('../../service/checkNumber');
module.exports = app => {
    
    app.get('/categories', async (req, res) => {
        let data = await categoriesController.getCategories();
        console.log(data);

        res.status(data.status).send(data.data);
    });

    app.get('/equipments', async (req, res) => {
        let data = await equipmentsController.getEquipments();
        console.log(data);
        res.status(data.status).send(data.data);
    })

    app.get('/muscles', async (req, res) => {
        let data = await musclesController.getMuscles();
        console.log(data);
        res.status(data.status).send(data.data);
    })

    app.get('/exercices', async (req, res) => {
        let query = { category: [], equipment: [], muscle: [] }
        let typeCheck=[];

        if (req.query.category !== undefined) {
            typeCheck.push(checkNumber(req.query.category));
            if (Array.isArray(req.query.category)) {
                req.query.category.map(el =>  query.category.push(parseInt(el)))
                query.category = query.category.concat(req.query.category);
            } else {
                query.category.push(parseInt(req.query.category));
            }
        }

        if (req.query.equipment !== undefined) {
            typeCheck.push(checkNumber(req.query.equipment));
            if (Array.isArray(req.query.equipment)) {
                req.query.equipment.map(el =>  query.equipment.push(parseInt(el)))
            } else {
                query.equipment.push(parseInt(req.query.equipment));
            }
        }

        if (req.query.muscle !== undefined) {
            typeCheck.push(checkNumber(req.query.muscle));
            if (Array.isArray(req.query.muscle)) {
                req.query.muscle.map(el =>  query.muscle.push(parseInt(el)))
            } else {
                query.muscle.push(parseInt(req.query.muscle));
            }
        }

        if(typeCheck.includes(false)){
            res.status(400).send({reason:"Wrong parameter type"})
        }else{
            let data= await exerciceController.getExercices(query);
            res.status(data.status).send(data.data);
        }
       
    });

    app.get('/exercices/:id', async (req, res) => {
        let exercice = await exerciceController.getExercice(req.params.id);

        if(!exercice){
            res.status(500).send({ error : "Erreur interne en cherchant l'exercice"});
        } else {
            res.status(200).send(exercice);
        }
    });

}