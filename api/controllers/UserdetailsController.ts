import util = require('util');
import express = require('express');
import Rxjs = require('rxjs');
import sails = require('sails');
import dbUtilies = require('../services/dbUtils');

// Get Users
export function get_users(req:any, res:any, next: Function):any {
  let name = req.query['name'];
  let id = req.query['id'];
  if (name) {
    let reqObj = {username: name};
    dbUtilies.getOne('user_details', reqObj).subscribe(
      data => {
        res.status(200).send(data);
      },
      err => {
        res.status(404).send(err);
      }
    );
  } else if (id) {
    let reqObj = {id: id};
    dbUtilies.getOne('user_details', reqObj).subscribe(
      data => {
        res.status(200).send(data);
      },
      err => {
        res.notFound(err);
        // res.status(404).send(err);
      }
    );
  } else {
    dbUtilies.getAll('user_details')
      .subscribe(
        data => {
          res.status(200).send(data);
        },
        err => {
          res.status(500).send(err);
        }
    );
  }
}
// Create New User
export function create_user(req: any, res: any, next: Function) {
  let reqBody = req.body;
  dbUtilies.create('user_details', reqBody).subscribe(
    data => {
      res.status(200).send(data);
    },
    err => {
      res.status(400).send(err);
    }
  );
}
// Update The User
export function update_user(req: any, res: any, next: Function) {
  let id = req.query['id'];
  let reqObj = {id: id};
  let reqBody = req.body;
  dbUtilies.update('user_details', reqObj, reqBody).subscribe(
    data => {
      res.status(200).send(data);
    },
    err => {
      res.status(404).send(err);
    }
  );
}

//Delete The User
export function delete_user(req: any, res: any, next: Function) {
  let id = req.query['id'];
  let reqObj = {id: id};
  dbUtilies.destroy('user_details', reqObj).subscribe(
    data => {
      res.status(200).send(data);
    },
    err => {
      res.status(404).send(err);
    }
  );
}