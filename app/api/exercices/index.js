const categoriesController = require('./categoriesController');
const equipmentsController = require('./equipmentController');
const musclesController = require('./musclesController');
const exerciceController = require('./exerciceController')

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
        console.log(req.query);
        let query = { category: [], equipment: [], muscle: [] }

        if (req.query.category !== undefined) {
            if (Array.isArray(req.query.category)) {
                req.query.category.map(el =>  query.category.push(parseInt(el)))
                query.category = query.category.concat(req.query.category);
            } else {
                query.category.push(parseInt(req.query.category));
            }
        }

        if (req.query.equipment !== undefined) {
            if (Array.isArray(req.query.equipment)) {
                req.query.equipment.map(el =>  query.equipment.push(parseInt(el)))
            } else {
                query.equipment.push(parseInt(req.query.equipment));
            }
        }

        if (req.query.muscle !== undefined) {
            if (Array.isArray(req.query.muscle)) {
                req.query.muscle.map(el =>  query.muscle.push(parseInt(el)))
            } else {
                query.muscle.push(parseInt(req.query.muscle));
            }
        }

        let data= await exerciceController.getExercices(query);
        
        res.status(data.status).send(data.data)
    })


}