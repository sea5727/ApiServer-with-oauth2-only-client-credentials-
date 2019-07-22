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

exports.productList = (req, res) => {
    model.productList(req, (err, result) => {
        commonResponse(res, err, result);
    });
}

exports.serviceList = (req, res) => {
    model.serviceList(req, (err, result) => {
        commonResponse(res, err, result);
    });

}

exports.claimList = (req, res) => {
    model.claimList(req, (err, result) => {
        commonResponse(res, err, result);
    });
}

exports.bsChargeTypeList = (req, res) => {
    model.bsChargeTypeList(req, (err, result) => {
        commonResponse(res, err, result);
    });
}

exports.agentList = (req, res) => {
    model.agentList(req, (err, result) => {
        commonResponse(res, err, result);
    });
}

exports.agentAuth = (req, res) => {
    model.agentAuth(req, (err, result) => {
        commonResponse(res, err, result);
    });
}


