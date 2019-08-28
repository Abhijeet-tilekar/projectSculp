let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;
chai.use(chaiHttp);
let server = require('../app');



describe('Login API Test', function(){
    this.timeout(4000); 
    it('Test 1 : Getting Token ',(done)=>{
        let user = {
            MobileNo : '9657663844',
            password : '12345'
        }
        chai.request(server)
        .post('/api/authenticate')
        .send(user)
        .end((req,res)=>{
            console.log(res.body)
            expect(res).to.have.status(200);
            expect(res.body).is.a('Object');
            (res.body).should.include.keys('token');
            expect(res.body['token']).length.greaterThan(0);
            done();
        })
    })
    it('Test 2 : Getting Error Msg ',(done)=>{
        let user = {
            MobileNo : '9657663844',
            password : '1234578'
        }
        chai.request(server)
        .post('/api/authenticate')
        .send(user)
        .end((req,res)=>{
            console.log(res.body);
            expect(res).to.have.status(404);
            (res.body).should.be.a('Object');
            (res.body).should.include.keys('message');
            expect(res.body['message']).length.greaterThan(0);
            done();
        })
    })
})

