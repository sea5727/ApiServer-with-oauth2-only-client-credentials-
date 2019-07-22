const express = require('express');
const model = require('./model');


var commonResponse = (res, err, result) => {
    var resultInt = null;
    var resultString = null;
    res.status(200);
    res.contentType('Application/json');
    if (err) {
        resultInt = -1;
        resultString = "FAIL";
    }
    else if (result == null) {
        resultInt = 0;
        resultString = "NODATA";
    }
    else {
        resultInt = 0;
        resultString = "SUCCESS";
    }
    res.json({ result: resultInt, data: result, resultString: resultString });
}

exports.insertMultiAnnounceIS = (req, res) => {
    model.insertMultiAnnounceIS(req, (err, result) => {
        commonResponse(res, err, result);
    });
}

