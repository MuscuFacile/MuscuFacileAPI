const sessionsController = require('./sessionsController')


module.exports = app => {
    app.get('/sessions/:email', async (req, res) => {

        if (req.params.email === undefined) {
            res.status(400).send({reason:"Wrong parameters"})
        }else{
        let data = await sessionsController.getSessions(req.params.email)
        res.status(data.status).send(data.data);
        }


    });

    app.post('/sessions', async (req, res) => {

        if (req.body.email === undefined || req.body.date === undefined || req.body.exercices === undefined ) {
            res.status(400).send({reason:"Wrong parameters"})
        }else{
            let data=await sessionsController.insertSessions(req.body)
            res.status(data.status).send(data.data);
        }
    });

    app.delete('/sessions/:email/date/:timestamp', async (req, res) => {
        let timestamp = req.params.timestamp;
       

        let response = await sessionsController.deleteSession( req.params.email, req.params.timestamp);
        res.status(200).send({
            success: 'Suppression réussie'
        });
    });



}