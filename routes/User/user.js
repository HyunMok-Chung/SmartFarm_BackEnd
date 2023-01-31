const request = require('request');
const express = require('express');
const mysql = require("mysql");
const db = require("../../db/index");
const router = express.Router();
const user = require('./loginAction');
const encoding = require('./encodingModule');
//const session = require('express-session');

router.post('/SignUp', (req, res) => {
    var body = req.body;
    console.log(body);
    //비밀번호 예외처리
    //pw가 null이나 undefined 일때
    //pw가 string이 아닌 다른 자료형일때
    if(!body.pw || typeof body.pw != 'string'){
        console.log('비밀번호');
        res.json({'result' : 'false'});
    }
    else
    {
        const hasedData = encoding.encryptPassword(body.pw)
        .then((hasedData) => {
            console.log(hasedData.hased);
            var params = [body.id, body.name, hasedData.hashed, body.email, 0, hasedData.salt];
            var sql = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)';
            db.connection.query(sql, params, (err, results) => {
                if (err) {
                    console.log(err);
                    res.json({ 'result': 'false' });
                }
                else
                    res.json({ 'result': 'true' });
                console.log(results);
            });
        })
    console.log(hasedData);
    }
});

router.post('/Login', (req, res) => {
    let body = req.body;
    console.log(body);
    loginCondition = (loginData) => {
        req.session.displayName = body.id;
        req.session.isLogin = true;
        console.log(req.session.id);
        res.json({ 'result': loginData, 'displayName': body.id, 'sessionID': req.sessionID });
    };
    user.checkUser(body, loginCondition);
});

router.post('/Logout', (req, res) => {
    user.delSession(req.headers.authorization)
    res.json({ 'result': 'true' });
});

router.post('/Register', (req, res) =>
{
    let userId = req.body.userId;
    let farmId = req.body.farmId;
    let params = [userId, farmId];
    const sql = 'INSERT INTO farm_list VALUES (?,?)';
    db.connection.query(sql, params, (err, results) =>
    {
        if (err) {
            console.log(err);
            res.json({'result' : 'false'});
        }
        else
            res.json({'result' : 'true'});
        console.log(results);
    })
})

module.exports = router;
