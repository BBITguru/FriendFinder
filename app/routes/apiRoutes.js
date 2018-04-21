var friends = require("../data/friends.js");
var express = require("express");
console.log("Your friends have been logged to the console! " + friends)


module.exports = function (app) {

  // GET Routes
  app.get("/api/friends", function (req, res) {
    res.json(friendsArray);
    console.log("API friends GET route successful!")
  });

  app.get("/api/newFriend", function (req, res) {
    res.json(surveyData);
    console.log("newFriend Data GET request successful!");
  });

  // POST REQUESTS
  app.post("/api/friends", function (req, res) {
    var surveyData = req.body;
    var surveyName = surveyData.name;
    var surveyImg = surveyData.photo;
    var surveyScore = surveyData.scores;

    console.log(surveyScore);

    var friendMatch = {
      name: "",
      photo: "",
      difference: 1000
    };
    var userAns = req.body;
    var userScores = userAns.scores;

    var scoreDifference = 0;

    for (var i = 0; i < friendsArray.length; i++) {
      console.log(friendsArray[i]);

      for (var x = 0; x < friendsArray[i].scores[x]; x++) {
        scoreDifference += Math.abs(parseInt(surveyScore[x] - parseInt(friendsArray[i].scores[x])));

        if (scoreDifference <= friendMatch.difference) {
          friendMatch.name = friendsArray[i].name;
          friendMatch.photo = friendsArray[i].photo;
          friendMatch.scoreDifference = scoreDifference;
        }
      }
    }
    friendsArray.push(surveyData);

    res.json(friendMatch);

  });
};