let chai = require('chai');
let chaiHttp = require('chai-http');
var should = require('chai').should();
let assert = chai.assert;
let expect = chai.expect;
chai.use(chaiHttp);
let server = require('../app');


describe("Registeration test", function() {
    this.timeout(4000);
    it('Register successfully ', (done) => {

        let user = {
            FirstName: "nidhi",
            LastName: 'Kanojia',
            CountryCode: 91,
            MobileNo: 7028332229,
            Email: 'nidhikanojia456@gmail.com',
            Password: 'nidhi1',
            ConfirmPassword: 'nidhi1',
            UserType: 'u'
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.have.status(200);
                (res).should.be.a('Object');
                (res.body).should.have.property('FirstName');
                (res.body).should.have.property('LastName');
                (res.body).should.have.property('CountryCode');
                (res.body).should.have.property('MobileNo');
                (res.body).should.have.property('Email');
                (res.body).should.have.property('Password');
                (res.body).should.have.property('ConfirmPassword');
                (res.body).should.have.property('UserType');
                done();
            })
    })

    it('FirstName should be a string less than 150 ', (done) => {
        let user = {
            FirstName: "nidhi"
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.be.a('Object');
                expect(user.FirstName).to.be.a('String').length.lessThan(150);
                done();

            })
    })
    it('LastName should be a string less than 150 ', (done) => {
        let user = {
            LastName: "nidhi"
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.be.a('Object');
                expect(user.LastName).to.be.a('String').length.lessThan(150);
                done();

            })
    })

    it('CountryCode should be a number less than 6 ', (done) => {
        let user = {
            CountryCode: 91
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.be.a('Object');
                expect(user.CountryCode).to.be.a('Number')
                done();

            })
    })

    it('Mobile no  should be a Number less than 16 ', (done) => {
        let user = {
            MobileNo: 123456789
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.be.a('Object');
                expect(user.MobileNo).to.be.a('Number');
                done();

            })
    })

    it('Email should be a string  ', (done) => {
        let user = {
            Email: "nidhikanojia456@gmail.com"
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.be.a('Object');
                expect(user.Email).to.be.a('String');
                done();

            })
    })

    it('Password  and confirmpassword should be a string less than 16 ', (done) => {
        let user = {
            Password: "nidhi1",
            ConfirmPassword: "nidhi1"
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.be.a('Object');
                expect(user.Password).to.be.a('String').length.lessThan(16);
                expect(user.ConfirmPassword).to.be.a('String').length.lessThan(16);
                //expect([user.Password]).to.be.equal([user.ConfirmPassword]);
                done();

            })
    })

    it('Should not be able to register', (done) => {
        let user = {
            FirstName: '',
            LastName: 'Kanojia',
            CountryCode: 91,
            MobileNo: 7028332229,
            Email: 'nidhikanojia456@gmail.com',
            Password: 'nidhi1',
            ConfirmPassword: 'nidhi1',
            UserType: 'u'
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
                (res).should.have.status(422);
                done();
            })


    })


})