"use strict";

const categoriesController = require('./../exercices/categoriesController');

module.exports = app => {
    app.get('/categories/:id', async (req, res) => {

        let categorie = await categoriesController.getCategorie(req.params.id);

        if (!categorie) {
            res.status(500).send({
                error: "Erreur interne en cherchant la catégorie"
            });
        } else {
            res.status(200).send(categorie);
        }
    });
}