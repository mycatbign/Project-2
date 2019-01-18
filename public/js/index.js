// Get references to page elements
var $username = $("#defaultForm-new-user");
var $password = $("#defaultForm-new-pass");
var $firstname = $("#defaultForm-first-name");

$(".sign-in-display").hide();

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
  // if user clicks sign out it signs out user
  $(document).on("click", ".sign-out", function() {
    signedOut();
  });
  $(document).on("click", "#start-sign-up", function() {
    handleFormSubmit();
  });
  $(document).on("click", "#start-sign-in", function() {
    $("#sign-up-text").hide();
    $("#sign-in-text").show();
    refreshExamples();
  });
  // if user clicks delete it pops up a modal for confirmation
  $(document).on("click", ".delete-profile", function() {
    $("#delete-modal").modal("toggle");
  });

  //if user clicks yes in delete modal it deletes user profile
  $(document).on("click", "#confirm-delete-button", function() {
    var idToDelete = $("#username-input").text();

    API.deleteExample(idToDelete).then(function() {
      console.log("Profile " + idToDelete + " deleted");
      signedOut();
      $("#delete-modal").modal("toggle");
    });
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
    var $userLogin = $(".user-login-info").val();
    // var hiker = $username.val().trim()
    console.log($userLogin);
    if (!$userLogin) {
      alert("I'm sorry but you need to enter a username and password.");
      return;
    }
    API.getExamples($userLogin).then(function(data) {
      if (data) {
        console.log(data.user);
        console.log(data);
        // var profileimage = data.image;
        // $("#sign-in-modal").modal("toggle");
        // signedIn();
        // var image = $("<img> </img>").attr("src", profileimage);
        window.open("/profile", "_self");
        $(window).load(function() {
          $("#username-input").text(data.user);
        });
        // $("#username-input").text(data.user);
        // $("#username-input").append(image);
      } else {
        alert("I'm sorry that username or password is incorrect.");
      }
    });
  };

  // handleFormSubmit is called whenever we submit a new hiker
  // Save the new hiker to the db and refresh the list
  var handleFormSubmit = function() {
    var newHiker = {
      user: $username.val().trim(),
      password: $password.val().trim(),
      firstName: $firstname.val().trim(),
      lastName: $("#defaultForm-last-name")
        .val()
        .trim(),
      displayName: $("#defaultForm-display-name")
        .val()
        .trim(),
      information: $("#defaultForm-new-info")
        .val()
        .trim(),
      image: $(".image-file").val()
    };

    if (!(newHiker.user && newHiker.password)) {
      alert("You must enter a user name and password!");
      return;
    }
    API.saveExample(newHiker)
      .then(function() {
        $("#sign-in-modal").modal("toggle");
        var saveNew = newHiker.user;
        API.getExamples(saveNew).then(function(data) {
          if (data) {
            console.log(data.user);
            console.log(data);
            // var profileimage = data.image;
            // $("#sign-in-modal").modal("toggle");
            // signedIn();
            // var image = $("<img> </img>").attr("src", profileimage);
            // $("#username-input").text(data.user);
            // $("#username-input").append(image);
          } else {
            alert("I'm sorry that username or password is incorrect.");
          }
        });
      })
      .fail(function() {
        console.log("sorry that username is already taken");
      });
  };
  // var signedIn = function() {
  //   console.log("You are successfully signed in");
  //   $(".sign-in-display").show();
  //   $(".sign-up").hide();
  //   $(".sign-in").hide();
  //};
  var signedOut = function() {
    console.log("You are successfully signed in");
    $("#username-input").empty();
    $(".sign-in-display").hide();
    $(".sign-up").show();
    $(".sign-in").show();
  };
});
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
