module.exports = app => {
    app.get('/user',(req,res)=>{
        res.status(200).send({user: 'TEST'})
    })
}