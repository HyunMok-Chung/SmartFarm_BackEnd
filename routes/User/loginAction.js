const mysql = require("mysql");
const db = require("../../db/index");
const encoding = require('./encodingModule');

checkUser = (userData, loginCondition) => {
    var params = [userData.id, userData.pw];
    console.log("checkUser");
    const sql = `SELECT id, pw, salt FROM user WHERE id = ?`;
    db.connection.query(sql, params[0], (err, results) => {
        if (err) console.log(err);
        console.log(results);

        if (results.length > 0) { //mySQL emptySet 오류 fix조건
            const hashedData = encoding.encryptForLogin(params[1], results[0].salt)
                .then((hashedPW) => {
                    if (results[0].id.length > 0 && hashedPW === results[0].pw)
                        loginCondition('true');
                    else if (hashedPW != results[0].pw)
                        loginCondition('checkPw');
                })
        }
        else loginCondition('checkId');
    });
};

delSession = (sessionID) => {
    const sql = 'DELETE from sessions WHERE session_id = ?'
    db.connection.query(sql, sessionID, (err, results) => {
        if (err) console.log(err);
        console.log(results);
    })
}
module.exports = {
    checkUser,
    delSession
};
