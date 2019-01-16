// Get references to page elements
var $username = $("#defaultForm-new-user");
var $password = $("#defaultForm-new-pass");
// var $userLogin = $(".user-login-info");
// var $userPassword = $(".password-login-info");
//var $info = $("#defaultForm-new-info");
// var $hikerDisplay;
// var $hikerDisplay = $("#hiker-display");
//modal logic
$("document").ready(function() {
  // on load a sign in modal pops up
  $("#sign-in-modal").modal("show");
  $("#sign-up-text").hide();
  // if user clicks new user it switches to sign up script
  $(document).on("click", "#switch-sign-up", function(event) {
    $("#sign-in-modal").modal("show");
    event.preventDefault();
    console.log("switch modals");
    $("#sign-in-text").hide();
    $("#sign-up-text").show();
  });
  // if on sign up modal and clicks return to sign in it switches to sign in script
  $(document).on("click", "#return-to-sign-in", function() {
    $("#sign-up-text").hide();
    $("#sign-in-text").show();
  });
  //if user closes model and then clicks sign up button at top of screen it brings up model with sign up script
  $(document).on("click", ".sign-up", function() {
    console.log("working");
    $("#sign-in-modal").modal("toggle");
    $("#sign-in-text").hide();
    $("#sign-up-text").show();
  });
  //if user closes model and then clicks sign in button at top of screen it brings up model with sign in script
  $(document).on("click", ".sign-in", function() {
    $("#sign-in-modal").modal("toggle");
    $("#sign-up-text").hide();
    $("#sign-in-text").show();
  });
  $(document).on("click", "#start-sign-up", function() {
    handleFormSubmit();
  });
  $(document).on("click", "#start-sign-in", function() {
    refreshExamples();
  });

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/hiker",
        data: JSON.stringify(example)
      });
    },
    getExamples: function(user) {
      return $.ajax({
        url: "api/hiker/" + user,
        type: "GET"
      });
    },
    deleteExample: function(user) {
      return $.ajax({
        url: "api/hiker/" + user,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets a new hiker from the db and populates the hiker's information
  var refreshExamples = function() {
    var hiker = {
      user: $username.val().trim()
    };
    if (!(hiker)) {
      alert("I'm sorry that username or password is incorrect.");
      return;
    }
    API.getExamples(hiker).then(function() {
      if (hiker) {
        console.log("data")
        console.log(hiker);
        var $user = $("<h2>").text(hiker.user);
      } else {
        alert("I'm sorry that username or password is incorrect.");
      }
      // $hikerDisplay.empty();
      // $hikerDisplay.append($examples);
    });
  };

  // handleFormSubmit is called whenever we submit a new hiker
  // Save the new hiker to the db and refresh the list
  var handleFormSubmit = function() {
    //event.preventDefault();

    var hiker = {
      user: $username.val().trim(),
      password: $password.val().trim()
    };

    if (!(hiker.user && hiker.password)) {
      alert("You must enter a user name and password!");
      return;
    }
    $("#sign-in-modal").modal("toggle");
    API.saveExample(hiker).then(function() {
      refreshExamples();
    });

    // $exampleText.val("");
    // $exampleDescription.val("");
  };
});
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list

//*****not done yet*****
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };
