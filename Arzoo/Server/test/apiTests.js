let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;
chai.use(chaiHttp);
let server = require('../app');

describe('Login API Tests : ', function () {
    this.timeout(5000);
    it('Should be able login with correct credentials ', (done) => {
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
    it('Should not login with incorrect Credentials ', (done) => {
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
    this.timeout(5000);
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


describe("Registeration test", function () {
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

    it('First name should be a string less than 150 ', (done) => {
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
    it('Last name should be a string less than 150 ', (done) => {
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

    it('Countrycode should be a number less than 6 ', (done) => {
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

    it('Mobile no should be a Number less than 16 ', (done) => {
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
                expect(user.Password).equal(user.ConfirmPassword);
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
    // it('OTP should be send and verified succefully', (done) => {
    //     let user = {
    //         Mobile: 7028332229,
    //         Email: 'nidhikanojia456@gmail.com',
    //     }
    //     chai.request(server)
    //         .post('/api/OTP')
    //         .send(user)
    //         .end((err, res) => {
    //             (res).should.have.status(200);
    //             (res.body).should.have.property('mailOTP');
    //             (res.body).should.have.property('smsOTP');
    //             done();
    //         })
    // })
})

describe("User Plan", function () {
    this.timeout(4000);
    it('User should be able to get his enrolled plan details', (done) => {
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
                    .get('/api/myPlan')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        
                        //console.log(res.body);
                        (res).should.have.status(200);
                        (res.body[0]).should.have.property('StartDate');
                        (res.body[0]).should.have.property('EndDate');
                        (res.body[0]).should.have.property('PlanDetail');
                        (res.body[0].PlanDetail).should.have.property('GoalType');
                        (res.body[0].PlanDetail).should.have.property('Duration');
                        (res.body[0].PlanDetail).should.have.property('Price');
    
                        done();
                    })
            })
    });
    it('User should be able to get his coach details for enrolled plan ', (done) => {
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
                    .get('/api/myPlan')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        //console.log(res.body);
                        (res).should.have.status(200);
                        (res.body[0]).should.have.property('CoachDetails');
                        (res.body[0].CoachDetails).should.have.property('FirstName');
                        (res.body[0].CoachDetails).should.have.property('LastName');
                        (res.body[0].CoachDetails).should.have.property('Bio');
                        done();
                    })
            })
    });
    it('User should be able to see his start and end date for enrolled Plan ', (done) => {
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
                    .get('/api/myPlan')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        //console.log(res.body);
                        (res).should.have.status(200);
                        (res.body[0]).should.have.property('PlanDetail');
                        (res.body[0]).should.have.property('StartDate');
                        (res.body[0]).should.have.property('EndDate');
                        (res.body[0].PlanDetail).should.have.property('Duration');
                        done();
                    })
            })
    });
    it('User should see message if he is not enrolled to any plan ', (done) => {
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
                    .get('/api/myPlan')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        //console.log(res.body);
                        (res).should.have.status(404);
                        (res.body).should.have.property('error');
                        (res.body.error).should.equal('Not Enrolled');
                        done();
                    })
            })
    });
});