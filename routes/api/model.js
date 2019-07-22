const db = require('../../db.js');
//callback ( req, result) ;


exports.productList = (req, callback) => {
    var flag = req.query.flag ? req.query.flag : null;
    var serviceId = req.query.serviceId ? req.query.serviceId : null;

    var sql = null;

    sql = `SELECT P.SERVICE_ID , P.PRODUCT_ID , P.PRODUCT_NAME , S.SERVICE_NAME `
        + `FROM 	PRODUCT_T P , SERVICE_T S `
        + `WHERE 	P.SERVICE_ID = S.SERVICE_ID `

    if (flag) sql += `AND P.D_FLAG = '0' AND S.D_FLAG = '0' `;
    if (serviceId) sql += `AND P.SERVICE_ID = ${serviceId} `;
    sql += `ORDER BY P.SERVICE_ID, P.PRODUCT_ID `

    sql += ';'
    db.select(db.DB_VOC, sql, (err, result) => {
        callback(err, result);
    });
}
exports.serviceList = (req, callback) => {
    var sql = null;
    sql = `SELECT SERVICE_ID, SERVICE_NAME `
        + `FROM SERVICE_T `
        + `ORDER BY SERVICE_ID`;
    db.select(db.DB_VOC, sql, (err, result) => {
        callback(err, result);
    });
}





exports.claimList = (req, callback) => {
    var flag = req.query.flag ? req.query.flag : null;
    var serviceId = req.query.serviceId ? req.query.serviceId : null;
    var productId = req.query.productId ? req.query.productId : null;
    var sql = `SELECT C.PRODUCT_ID , C.CLAIM_ID , C.CLAIM_NAME , C.CLAIM_DESC , S.SERVICE_ID , S.SERVICE_NAME , P.PRODUCT_NAME `
        + `FROM CLAIM_T C, PRODUCT_T P, SERVICE_T S `
        + `WHERE C.PRODUCT_ID = P.PRODUCT_ID AND P.SERVICE_ID = S.SERVICE_ID `
    if (flag) sql += `AND P.D_FLAG = 0 AND  C.D_FLAG = 0 AND S.D_FLAG = 0	`
    if (serviceId) sql += `AND 	P.SERVICE_ID = ${serviceId} `;
    if (productId) sql += ` AND 	C.PRODUCT_ID = ${productId} `
    if (flag) sql += ` ORDER BY S.SERVICE_ID, C.PRODUCT_ID, C.CLAIM_ID `
    else sql += ` ORDER BY C.CLAIM_ID ASC`
    sql += `;`
    db.select(db.DB_VOC, sql, (err, result) => {
        callback(err, result);
    });
}
exports.bsChargeTypeList = (req, callback) => {
    var sql = null;
    sql = ` SELECT BS_CHARGE_TYPE_ID , BS_CHARGE_TYPE_NAME , BS_CHARGE_FEE `
        + `FROM	BS_CHARGE_TYPE_T`;
    sql += ';'
    
    db.select(db.DB_VOC, sql, (err, result) => {
        callback(err, result);
    });
}



exports.agentList = (req, callback) => {
    var extZoneId = req.query.extZoneId ? req.query.extZoneId : null;

    var sql = `SELECT X.AGENT_ID, X.ZONE_ID, X.LOGIN_ID, X.AGENT_NAME `
        + `FROM ( SELECT A.ID AS AGENT_ID, A.USER_INFO AS ZONE_ID, A.ID AS LOGIN_ID, A.NAME AS AGENT_NAME `
        + `FROM INS.TBL_CF_USER A `
        + `WHERE A.DEPARTMENT_ID not like '1065%' `
        + `) X `
    if (extZoneId) sql += `WHERE X.ZONE_ID = '${extZoneId}' `
    sql += `ORDER BY AGENT_NAME `;
    sql += ';'
    
    db.select(db.DB_VOC, sql, (err, result) => {
        callback(err, result);
    })
}



exports.agentAuth = (req, callback) => {
    var loginId = req.query.loginId ? req.query.loginId : null;
    var sql = `WITH USER_GRADE AS (
                    SELECT ID, MAX(GRADE) GRADE
                    FROM (
	                SELECT ID, GRADE FROM INS.TBL_CF_USER 
	                    UNION
	                SELECT ID, GRADE FROM INS.TBL_CF_USER_GRADE
                    )
                    WHERE GRADE in ( 
		                SELECT CODE_ID
		                FROM INS.TBL_CF_INS_CODE C
		                WHERE C.CODE_CLASS = 'VOC_GRADE' 
		                )
                    GROUP BY ID
                )
                SELECT A.ID AS AGENTID, NVL(C.CODE_VALUE, 'X') AS AGENT_GRADE, A.NAME AS AGENT_NAME, A.USER_INFO AS ZONE_ID
                FROM INS.TBL_CF_USER A
                LEFT JOIN USER_GRADE B ON (A.ID = B.ID)
                LEFT JOIN INS.TBL_CF_INS_CODE C
                ON ( C.CODE_CLASS = 'VOC_GRADE' AND C.CODE_ID = B.GRADE )`
    if (loginId) sql += `WHERE A.ID = '${loginId}' `
    sql += `;`;
    db.select(db.DB_VOC, sql, (err, result) => {
        callback(err, result);
    })
}