const db = require('../../db.js');
const async = require('async');
//callback ( req, result) ;

function resultObj(err, count) {
    this.err = err;
    this.count = count;
}


exports.insertMultiAnnounceIS = (req, callback) => {

    console.log('insertMultiAnnounceIS start..');

    var funcObj = [];
    
    req.body.forEach((MultiAnn) => {
        var USER_ID = db.set(MultiAnn.USER_ID);
        var SVC_TYPE = db.set(MultiAnn.SVC_TYPE);
        var ANI = db.set(MultiAnn.ANI);
        var ANN_NUMBER = db.set(MultiAnn.ANN_NUMBER);
        var ANN_NAME = db.set(MultiAnn.ANN_NAME);
        var ANN_ADDRS = db.set(MultiAnn.ANN_ADDRS);
        var ANI_OPER = db.set(MultiAnn.ANI_OPER);
        var ANI_NAME = db.set(MultiAnn.ANI_NAME);
        var CCALLID = db.set(MultiAnn.CCALLID);
        var SEQ_NO = db.set(MultiAnn.SEQ_NO);
        var CGUIDETYPE = db.set(MultiAnn.CGUIDETYPE);
        var CGUIDELEVEL = db.set(MultiAnn.CGUIDELEVEL);
        var CCALLDIST = db.set(MultiAnn.CCALLDIST);
        var CSRCHSVCCODE = db.set(MultiAnn.CSRCHSVCCODE);
        var CSRCHNAME = db.set(MultiAnn.CSRCHNAME);
        var CBIZSVC = db.set(MultiAnn.CBIZSVC);
        var CGUIDEDONGCODE = db.set(MultiAnn.CGUIDEDONGCODE);
        var CGUIDEDONGDIV = db.set(MultiAnn.CGUIDEDONGDIV);
        var CSVCAREA = db.set(MultiAnn.CSVCAREA);
        var CGUIDECODE = db.set(MultiAnn.CGUIDECODE);
        var CNDASINFO = db.set(MultiAnn.CNDASINFO);
        var NCELLPOS = db.set(MultiAnn.NCELLPOS);

        var sql = `INSERT INTO INS.TBL_HIST_MULANN 
	      			(USER_ID,STD_TIME,SVC_TYPE,ANI,ANN_NUMBER,ANN_NAME,ANN_ADDRS,ANI_OPER,ANI_NAME,CCALLID,SEQ_NO
	      			,CGUIDETYPE,CGUIDELEVEL,CCALLDIST,CSRCHSVCCODE,CSRCHNAME,CBIZSVC,CGUIDEDONGCODE,CGUIDEDONGDIV,CSVCAREA,CGUIDECODE,CNDASINFO,NCELLPOS) 
	      			VALUES (${USER_ID},TO_CHAR(SYSDATE, 'yyyymmddhh24miss'),${SVC_TYPE},${ANI},${ANN_NUMBER},${ANN_NAME},${ANN_ADDRS},${ANI_OPER},${ANI_NAME},${CCALLID}, ${SEQ_NO}
	      			,${CGUIDETYPE},${CGUIDELEVEL},${CCALLDIST},${CSRCHSVCCODE},${CSRCHNAME},${CBIZSVC},${CGUIDEDONGCODE},${CGUIDEDONGDIV},${CSVCAREA},${CGUIDECODE},${CNDASINFO},${NCELLPOS})`;
        sql += ';'

        funcObj.push((callback) => {
            //console.log('sql = ' + sql);
            db.insert(db.DB_INS, sql, (err, count) => {
                console.log('count = ' + count + ' err = ' + err);
                if (err) {
                    callback(null, new resultObj(err, 0));
                }
                else {
                    callback(null, new resultObj(err, count));
                }
            });
        });
        console.log('for loop end');
    });
    console.log('forEach End');
    async.parallel(funcObj, function (err, resultObjs) {
        var err = null;
        var total_count = 0;
        for (var result of resultObjs) {
            if (err == null && result.err != null)
                err = result.err;
            total_count += result.count;            
        }
        callback(err, total_count);
    });




}
