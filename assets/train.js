//FireBase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA5kyYmg4Anz1XOpHeYMgHbIJNvRp7SZBg",
    authDomain: "train-homework7-52115.firebaseapp.com",
    databaseURL: "https://train-homework7-52115.firebaseio.com",
    projectId: "train-homework7-52115",
    storageBucket: "",
    messagingSenderId: "278225043750",
    appId: "1:278225043750:web:ffb9b4d38a27b8cb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#submit-button").on("click", function(event){
      event.preventDefault();

    //creating object so that these can be pushed to the database?
    var trainObject = {
        trainName: $("#train-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        trainTime: moment($("#train-time-input").val().trim(), "HH:mm").format("HH:mm"),
        frequency: $("#frequency-input").val().trim()
    };

    //testing to make sure the JS reads the user inputs
    console.log("Submit Button has been Clicked");
    console.log(trainObject);

    //the below should push these to the database
    database.ref().push(trainObject);

  });
  
  database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
    var arrival = moment(trainTime - frequency).format("HH:mm");
    var minutesAway = moment(arrival - trainTime).format("mm");

    console.log(arrival);
    console.log(minutesAway);

    $("#train-name").text(trainName);
    $("#destination").text(destination);
    $("#frequency").text(frequency);
    $("#arrival").text(arrival);
    $("#minutes").text(minutesAway);

    });

