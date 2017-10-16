"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rxjs = require("rxjs");
const sails = require("sails");
function getAll(modelName) {
    console.log(modelName);
    return Rxjs.Observable.fromPromise(sails.models[modelName].find());
}
exports.getAll = getAll;
function getOne(modelName, obj) {
    return Rxjs.Observable.fromPromise(sails.models[modelName].find(obj))
        .mergeMap(data => responseValidation(data));
}
exports.getOne = getOne;
function create(modelName, obj) {
    return Rxjs.Observable.fromPromise(sails.models[modelName].create(obj));
}
exports.create = create;
function update(modelName, obj, reqBody) {
    return Rxjs.Observable.fromPromise(sails.models[modelName].update(obj, reqBody))
        .mergeMap(data => responseValidation(data));
}
exports.update = update;
function destroy(modelName, obj) {
    return Rxjs.Observable.fromPromise(sails.models[modelName].destroy(obj))
        .mergeMap(data => responseValidation(data));
}
exports.destroy = destroy;
function responseValidation(res) {
    if (res['length'] > 0) {
        return Rxjs.Observable.from(res);
    }
    else {
        return Rxjs.Observable.throw('No Data Found From The Given Object');
    }
}
