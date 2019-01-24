const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.use(chaiHttp);

describe("Exercices Test", async()=>{
    it("Get Exercices should return a 200 code",  (done)=>{
        chai.request(server)
            .get("/exercices")
            .end((err,res)=>{
                chai.expect(res).to.have.status(200);
                done();
            })
    })
});
