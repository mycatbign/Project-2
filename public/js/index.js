// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// TaH
// var $signUpBtn = $("#submit-sign-up");
// var $signInBtn = $("#submit-sign-in");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");
      $li.append($button);
      return $li;
    });
    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("HFS: ");
  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };
  console.log("HFS: Example" + example);

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }
  API.saveExample(example).then(function() {
    refreshExamples();
  });
  $exampleText.val("");
  $exampleDescription.val("");
};

// handleSignUp is called whenever we submit a new hiker
// var handleSignUp = function(event) {
//   event.preventDefault();
//   var example = {
//     user: $exampleText.val().trim(),
//     pswd: $exxampleText.val().trim()
//   };

//   // validate the username is not blank
//   if (!example.user) {
//     alert("Username can not be blank.");
//     return;
//   }

//   // validate the password is not blank
//   if (!example.pswd) {
//     alert("Password can not be blank.");
//     return;
//   }

//   // validate the username is not a duplicate
//   if (false) {
//     alert("Username is already in use - please try again.");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// handleSignIn is called whenever hiker wants to sign in 
// var handleSignIn = function(event) {
//   event.preventDefault();
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


// JBOND - Signup button
// $signUpBtn.on("click", handleSignUp);
// $signInBtn.on("click", handleSignIn);