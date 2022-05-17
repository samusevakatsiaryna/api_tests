const request = require('supertest');
const expect = require('chai').expect;
let chai = require('chai');
chai.use(require('chai-json-schema'));
const userAuthData = require('../src/creds.json');
const bookingSchema = require('../src/bookingSchema.json');
const bookingData = require('../src/booking.json');
const updatebookingData = require('../src/updatebooking.json');
const { send } = require('express/lib/response');
const { base } = require('mocha/lib/reporters');
const res = require('express/lib/response');


describe("Booking API Tests", () => {
    const baseUrl = 'https://restful-booker.herokuapp.com';
    let bookingid;
    let token;
    let bookingItem;

    before(function(done) {
        request(baseUrl)
            .post('/auth')
            .send(userAuthData)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .end(function(error, response) {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.bookingid).not.to.be.null;
                token = response.body.token;
                done();
            })
    }) 

    it("Create Booking", (done) => {
        request(baseUrl)
            .post('/booking')
            .send(bookingData)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .end(function(error, response) {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.bookingid).not.to.be.null;
                bookingid = response.body.bookingid
                done();
            })
    }) 

    it("Get JSON by booking ID from preview request", (done) => {
        request(baseUrl)
            .get('/booking/' + bookingid)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .end(function(error, response) {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.firstname).to.be.equal(bookingData.firstname);
                done();
            })
    })

    it("Update Booking", (done) => {
        request(baseUrl)
        .put('/booking/' + bookingid)
        .send(updatebookingData)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
        .set('Cookie', 'token=' + token)
        .end(function(error, response) {
            
            expect(response.statusCode).to.be.equal(200);
            expect(response.body.firstname).to.be.equal(updatebookingData.firstname);
            done();
        })
    })

    it("Get Booking Details", (done) => {
        request(baseUrl)
            .get('/booking/' + bookingid)
            .set('Accept', 'application/json')
            .set('Content-type', 'application/json')
            .end(function(error, response) {
                bookingItem = response.body
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.lastname).to.be.equal(updatebookingData.lastname);
                done();
            })
    })

    it("Check JSON schema", (done) => {
        expect(bookingItem).to.be.jsonSchema(bookingSchema);
        done();
    })
    
})