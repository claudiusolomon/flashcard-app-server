const express = require("express");

const flashcardRoutes = express.Router();

// helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// get a list of all the flashcards
flashcardRoutes.route("/flashcards").get(function (req, res) {
    let dbConnection = req.app.locals.db;
    dbConnection
        .collection("flashcards")
        .find()
        .toArray()
        .then((items) => items.sort(() => Math.random() - 0.5))
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

// get a single flashcard by id
flashcardRoutes.route("/flashcards/:id").get(function (req, res) {
    let dbConnection = req.app.locals.db;
    let myquery = { _id: ObjectId(req.params.id) };
    dbConnection
        .collection("flashcards")
        .findOne(myquery)
        .then((item) => res.json(item))
        .catch((err) => console.log(err));
});

// get flashcards by cardSet
flashcardRoutes.route("/flashcards/cardSet/:cardSetName").get(function (req, res) {
    let dbConnection = req.app.locals.db;
    let myquery = { cardSet: req.params.cardSetName };
    dbConnection
        .collection("flashcards")
        .find(myquery)
        .toArray()
        .then((items) => items.sort(() => Math.random() - 0.5))
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

// create a new flashcard
flashcardRoutes.route("/flashcards").post(function (req, res) {
    console.log("Create new", req.body)
    let dbConnection = req.app.locals.db;
    console.log("dbConnection", dbConnection)
    let newCard = {
        front: req.body.front,
        back: req.body.back,
        level: req.body.level,
        cardSet: req.body.cardSet
    };
    dbConnection
        .collection("flashcards")
        .insertOne(newCard)
        .then((item) => res.json(item))
        .catch((err) => console.log(err));
});

// update a flashcard by id.
flashcardRoutes.route("/flashcards").put(function (req, res) {
    let dbConnection = req.app.locals.db;
    console.log("ID:", req.body._id)
    let myquery = { _id: new ObjectId(req.body._id) };
    let newValues = {
        $set:{
            front: req.body.front,
            back: req.body.back,
            level: req.body.level,
            cardSet: req.body.cardSet
        }
    };
    dbConnection
        .collection("flashcards")
        .updateOne(myquery, newValues)
        .then((item) => res.json(item))
        .catch((err) => console.log(err));
});

// delete a flashcard by id
flashcardRoutes.route("/flashcards/:id").delete((req, res) => {
    let dbConnection = req.app.locals.db;
    let myquery = { _id: ObjectId(req.params.id) };
    dbConnection
        .collection("flashcards")
        .deleteOne(myquery)
        .then((item) => res.json(item))
        .catch((err) => console.log(err));
});

module.exports = flashcardRoutes;