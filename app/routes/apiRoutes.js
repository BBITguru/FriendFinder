// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friendsData = require("../data/friends");
console.log("Your friends have been logged to the console! " + friendsData)

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
    console.log("API friends GET success!")
  });

  app.get("/api/newFriend", function (req, res) {
    res.json(surveyData);
    console.log("newFriend Data success!");
  });

 // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    console.log("API post to '/api/friends', function (req, res) {}");

    // req.body is available since we're using the body-parser middleware
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


    for (var i = 0; i < friendsData.length; i++) {
      var scoreDifference = 0;
      console.log(friendsData[i]);

      for (var x = 0; x < friendsData[i].scores.length; x++) {
        scoreDifference += Math.abs(parseInt(surveyScore[x]) - parseInt(friendsData[i].scores[x]));
      }
      
      if (scoreDifference <= friendMatch.difference) {
        friendMatch.name = friendsData[i].name;
        friendMatch.photo = friendsData[i].photo;
        friendMatch.difference = scoreDifference;
      }
    }
    friendsData.push(surveyData);

    res.json(friendMatch);

  });
};