const categoriesController = require('./categoriesController');


module.exports = app => {
    app.get('/categories', async(req,res)=>{
        let data= await categoriesController.getCategories();
        console.log(data);

        res.status(data.status).send(data.data);
    })
}