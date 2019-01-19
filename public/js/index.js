// Get references to page elements
var $username = $("#defaultForm-new-user");
var $password = $("#defaultForm-new-pass");
var $firstname = $("#defaultForm-first-name");
// var displayAvatar=function(imagetext, animal){
//   if (imagetext=== animal)

// }


$(".sign-in-display").hide();
//function that displays sign in info
var showSignIn = function() {
  $("#sign-up-text").hide();
  $("#sign-in-text").show();
};
//function that shows sign up info
var showSignUp = function() {
  $("#sign-in-text").hide();
  $("#sign-up-text").show();
};
// do this when document is ready
$("document").ready(function() {
  // on load a sign in modal pops up
  $("#sign-in-modal").modal("show");
  showSignIn();
  // if user clicks new user it switches to sign up script

  // $(document).on("click", ".profile-pic-options", function(event) {
  // //   var image= $(".profile-pic-options").val()
  // //   $(".image-selection").html(image)
  // }

  $(document).on("click", "#switch-sign-up", function(event) {
    $("#sign-in-modal").modal("show");
    event.preventDefault();
    console.log("switch modals");
    showSignUp();
  });
  // if on sign up modal and clicks return to sign in it switches to sign in script
  $(document).on("click", "#return-to-sign-in", function() {
    showSignIn();
  });
  //if user closes model and then clicks sign up button at top of screen it brings up model with sign up script
  $(document).on("click", ".sign-up", function() {
    console.log("working");
    $("#sign-in-modal").modal("toggle");
    showSignUp();
  });
  //if user closes model and then clicks sign in button at top of screen it brings up model with sign in script
  $(document).on("click", ".sign-in", function() {
    $("#sign-in-modal").modal("toggle");
    showSignIn();
  });
  //if user clicks sign up on modal starts submitting info
  $(document).on("click", "#start-sign-up", function() {
    handleFormSubmit();
  });
  //if user clicks sign in on modal starts submitting info
  $(document).on("click", "#start-sign-in", function() {
    showSignIn();
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
    var $userLogin = $(".user-login-info").val();
    // var hiker = $username.val().trim()
    console.log($userLogin);
    if (!$userLogin) {
      alert("I'm sorry but you need to enter a username and password.");
      return;
    }
    API.getExamples($userLogin).then(function(data) {
      if (data) {
        // create user data object
        var profileData = {
          user: data.user,
          profileImage: data.imagetext,
          userBio: data.information,
          displayName: data.displayName
        };
        localStorage.setItem("userinfo", JSON.stringify(profileData));
        window.open("/profile", "_self");
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
      imagetext: $(".image-file option:selected").val()
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
            var profileData = {
              user: data.user,
              profileImage: data.imagetext,
              userBio: data.information,
              displayName: data.displayName
            };
            localStorage.setItem("userinfo", JSON.stringify(profileData));
            window.open("/profile", "_self");
          } else {
            alert("I'm sorry that username or password is incorrect.");
          }
        });
      })
      .fail(function() {
        console.log("sorry that username is already taken");
      });
  };
});
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
