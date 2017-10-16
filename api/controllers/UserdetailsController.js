"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbUtilies = require("../services/dbUtils");
// Get Users
function get_users(req, res, next) {
    let name = req.query['name'];
    let id = req.query['id'];
    if (name) {
        let reqObj = { username: name };
        dbUtilies.getOne('user_details', reqObj).subscribe(data => {
            res.status(200).send(data);
        }, err => {
            res.status(404).send(err);
        });
    }
    else if (id) {
        let reqObj = { id: id };
        dbUtilies.getOne('user_details', reqObj).subscribe(data => {
            res.status(200).send(data);
        }, err => {
            res.notFound(err);
            // res.status(404).send(err);
        });
    }
    else {
        dbUtilies.getAll('user_details')
            .subscribe(data => {
            res.status(200).send(data);
        }, err => {
            res.status(500).send(err);
        });
    }
}
exports.get_users = get_users;
// Create New User
function create_user(req, res, next) {
    let reqBody = req.body;
    dbUtilies.create('user_details', reqBody).subscribe(data => {
        res.status(200).send(data);
    }, err => {
        res.status(400).send(err);
    });
}
exports.create_user = create_user;
// Update The User
function update_user(req, res, next) {
    let id = req.query['id'];
    let reqObj = { id: id };
    let reqBody = req.body;
    dbUtilies.update('user_details', reqObj, reqBody).subscribe(data => {
        res.status(200).send(data);
    }, err => {
        res.status(404).send(err);
    });
}
exports.update_user = update_user;
//Delete The User
function delete_user(req, res, next) {
    let id = req.query['id'];
    let reqObj = { id: id };
    dbUtilies.destroy('user_details', reqObj).subscribe(data => {
        res.status(200).send(data);
    }, err => {
        res.status(404).send(err);
    });
}
exports.delete_user = delete_user;
