const server = require('../src/server');
const request = require('supertest');
const expect = require('chai').expect;


server.get('/firstEndpoint', (error, response) => {
    response.status(200).json({ "ok": "response"});

})

describe("Test Response from server", () => {
    
    it("Check Status code 200", () => {
        request(server)
        .get('/firstEndpoint')
        .end((error, response) => {
            expect(response.statusCode).to.be.equal(200);

        })
    })

    it("Check query param", () => {
        request(server)
        .get('/course')
        .query({'name': 'mocha'})
        .expect(200, {name: 'mocka'})
        
    })

})

