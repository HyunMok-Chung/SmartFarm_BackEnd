const express = require('express');
const router = express.Router();
const db = require("../../db/index");

router.post('/', (req, res) => {
    let body = req.body;
    console.log(body);

    //body.id, body.ec_value, body.tem, body.hum, body.water_level
    const params = [body.id, body.ec_value, body.tem, body.hum, body.water_level,];
    const sql = 'INSERT INTO sensor_value VALUES (?,?,?,?,?,now())'
    db.connection.query(sql,params, (err, results) =>
    {
        if(err)
        {
            console.log(err);
            res.json({'result' : 'false'});
        }
        else
            res.json({'result' : 'true'});
        console.log(results);
    })
});

router.post('/List', (req, res) => {
    let id = req.body.id;
    const params = id;
    const sql = 'SELECT * FROM farm_list WHERE id = ?';
    db.connection.query(sql, params, (err, results) => {
        if(err){
            console.log(err);
            res.json({'result' : 'false'});
        }else
            res.json({'result' : results});
    });
});

router.post('/Chart', (req, res) => { //센서 데이터 불러오는 라우터
    const params = [req.body.id, req.body.time];
    console.log(req.body.time);
    //오늘 하루
    let sql = `SELECT ec_value, tem, hum, water_level, date_format(time, '%h:%i') as time FROM sensor_value WHERE id = ? AND time BETWEEN DATE_ADD(NOW(), INTERVAL -1 DAY ) AND NOW()`;

    //전체
    if(req.body.time === 'all')
        sql = `SELECT ec_value, tem, hum, water_level, date_format(time, '%m/%d/%h:%i') as time FROM sensor_value WHERE id = ?`;
    if(req.body.time === 'week')
        sql = `select avg(ec_value) as ec_value, avg(tem) as tem, avg(hum) as hum, avg(water_level) as water_level, date_format(time, '%m-%d') as time from sensor_value where id = ? AND time BETWEEN DATE_ADD(NOW(), INTERVAL -7 DAY ) AND NOW() group by date_format(time, '%m-%d');`;

        db.connection.query(sql, params, (err, results)=>{
        if(err) console.log(err);
        else
            res.json({ 'results': results });
            console.log('SENSOR CHART Router');
            console.log(results);
    });
});

module.exports = router;
