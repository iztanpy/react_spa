import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./fb-config.js";
import express from "express";
import bodyParser from "body-parser";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log(user.uid);
  } else {
    console.log("signed out");
  }
});

// parse application/json
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
  var email = String(req.body.email).trim();
  var password = String(req.body.password).trim();
  console.log(email);
  console.log(password);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      res.status(200);
      res.send();
    })
    .catch((error) => {
      console.log(error);
      res.status(404);
      res.send();
    });
});

app.post("/login", async (req, res) => {
  var email = String(req.body.email).trim();
  var password = String(req.body.password).trim();
  await signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      res.status(200);
      res.send();
    })
    .catch((error) => {
      console.log(error);
      res.status(404);
      res.send();
    });
});

app.get("/authenticated", (req, res) => {
  console.log(currentUser);
  if (currentUser == null) {
    res.status(401);
    res.send();
  } else {
    res.status(200);
    res.send();
  }
});

// authenticate, authorize(['admin']),

app.get("/authorized", (req, res) => {
  // admin userid
  if (
    currentUser == null ||
    currentUser.uid != "csLcpZoNOdZZftQhpKi9hRXtedq2"
  ) {
    res.status(403);
    res.send();
  } else {
    res.status(200);
    res.send();
  }
});

// function autheticate(req, res, next) {
//     //checks
//     next();
// }

// function authorize(roles) {
//   return function(req, res, next) {
//     if (req.user.roles.includes(roles))
//   }
// }

app.get("/logout", (req, res) => {
  // admin userid
  currentUser = null;
  res.status(200);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
