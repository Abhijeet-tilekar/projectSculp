let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;
chai.use(chaiHttp);
let server = require('../app');

describe('Login API Tests : ', function () {
    this.timeout(2500);
    it('Should be able Login with Correct Credentials ', (done) => {
        let user = {
            MobileNo: '9657663844',
            password: '12345'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).is.a('Object');
                done();
            })
    })
    it('Should return generated token after sucessful login', (done) => {
        let user = {
            MobileNo: '9657663844',
            password: '12345'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).is.a('Object');
                (res.body).should.include.keys('token');
                expect(res.body['token']).length.greaterThan(0);
                done();
            })
    })
    it('Should Not Login with incorrect Credentials ', (done) => {
        let user = {
            MobileNo: '432423',
            password: '1234324324578'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                //console.log(res.body);
                expect(res).to.have.status(404);
                done();
            })
    })
    it('Should send error message if wrong password ', (done) => {
        let user = {
            MobileNo: '9657663844',
            password: '1234578'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                expect(res).to.have.status(404);
                (res.body).should.be.a('Object');
                (res.body).should.include.keys('message');
                expect(res.body['message']).length.greaterThan(0);
                (res.body['message']).should.contain('Wrong password');
                done();
            })
    })
    it('Should not be able to login with unregistered mobile no', (done) => {
        let user = {
            MobileNo: '9657232663844',
            password: '2323'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                expect(res).to.have.status(404);
                (res.body).should.be.a('Object');
                (res.body).should.include.keys('message');
                expect(res.body['message']).length.greaterThan(0);
                (res.body['message']).should.contain('Mobile is not registered');
                done();
            })
    })

})



describe('User Profile : ', function () {
    this.timeout(2500);
    it('Should return all details for user', (done) => {
        let user = {
            MobileNo: '9657663844',
            password: '12345'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                let token = res.body.token
                chai.request(server)
                    .get('/api/userProfile')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        //console.log(res.body);
                        (res.body).should.have.status(true);
                        (res.body.user).should.have.property('FirstName');
                        (res.body.user).should.have.property('LastName');
                        (res.body.user).should.have.property('MobileNo');
                        (res.body.user).should.have.property('Email');
                        (res.body.user).should.have.property('CountryCode');
                        (res.body.user).should.have.property('Password');
                        (res.body.user).should.have.property('ConfirmPassword');
                        done();
                    })
            })
    })
    it('Should return details of correct User', (done) => {
        let user = {
            MobileNo: '9657663844',
            password: '12345'
        }
        chai.request(server)
            .post('/api/authenticate')
            .send(user)
            .end((req, res) => {
                let token = res.body.token
                chai.request(server)
                    .get('/api/userProfile')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        expect(res.body.user.MobileNo).equal(user.MobileNo);
                        expect(res.body.user.Password).equal(user.password);
                        done();
                    })
            })
    })
})

