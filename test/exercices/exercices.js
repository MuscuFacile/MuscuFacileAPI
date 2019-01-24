const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const exepectedResults = require('./mock/exepectedResults')
chai.use(chaiHttp);

describe("Exercices Test", async () => {

    it("Should get Categories should return a 200 code with all the categories", (done) => {
        chai.request(server)
            .get("/categories")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.eql(exepectedResults.expectedCategories);
                done();
            })
    });

    it("Should get equipments should return a 200 code with all the equipments", (done) => {
        chai.request(server)
            .get("/equipments")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.eql(exepectedResults.expectedEquipments);
                done();
            })
    });

    it("Should get muscles should return a 200 code with all the muscles", (done) => {
        chai.request(server)
            .get("/muscles")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.eql(exepectedResults.expectedMuscles);
                done();
            })
    });

    it("Should get information about one specific exercice should return a 200 code with all the spesific exercice", (done) => {
        chai.request(server)
            .get("/exercices/74")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.eql(exepectedResults.expectedExercice);
                done();
            })
    });

    it("Should get an error message since the muscle does not exist", (done) => {
        chai.request(server)
            .get("/exercices/1")
            .end((err, res) => {
                chai.expect(res).to.have.status(500);
                chai.expect(res.body).to.eql(exepectedResults.expectedError);
                done();
            })
    });
});
