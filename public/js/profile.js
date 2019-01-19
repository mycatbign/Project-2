$("document").ready(function() {
console.log("loaded")
  var hikerName = $("#username-input");
  var hikerBio = $(".bio");
  var hikerImage = $("#hikerPic");
  var userData = localStorage.getItem("userinfo");
  //pase the value 
  var userinput = JSON.parse(userData);
  console.log(userinput); 
    hikerName.text(userinput.displayName),
    hikerBio.text(userinput.userBio)
  
 
  // var image = $("<img> </img>").attr("src", userinput.profileImage);
  hikerImage.attr("src", userinput.profileImage);
  // $("#username-input").append(image)
  // if user clicks sign out it signs out user
  $(document).on("click", ".sign-out", function() {
    signedOut();
  });
  // if user clicks delete it pops up a modal for confirmation
  $(document).on("click", ".delete-profile", function() {
    $("#delete-modal").modal("toggle");
  });
  //if user clicks yes in delete modal it deletes user profile
  $(document).on("click", "#confirm-delete-button", function() {
    var idToDelete = hikerName.text();
    deleteProfile(idToDelete).then(function() {
      console.log("Profile " + idToDelete + " deleted");
      deleteProfile();
      signedOut()
      $("#delete-modal").modal("toggle");
    });
  });

  $(document).on("click", ".find-hikers", function() {
   
    console.log("searching");
    var friend = $(".display-name-search").val();
    console.log(friend)
    findHikers(friend).then(function(data) {
      if (data) {
    // retrieve friend info
      var friendImage = data.image;
      var friendBio = data.information;
      var friendDisplayName = data.displayName;
      /// insert into modal
      $("#friend-modal").modal("toggle");
      $(".friend-name").text(friendDisplayName);
      $(".friend-info").text(friendBio);

      console.log(data)
    
 
  } else {
    alert("I'm sorry that username does not exist.");
  }

    });
  });
  var signedOut = function() {
    console.log("You are successfully signed out");
    $("#username-input").empty();
    window.open("/", "_self");
  };
  var deleteProfile = function(user) {
    return $.ajax({
      url: "api/hiker/" + user,
      type: "DELETE"
    });
  }
    var findHikers  = function(user) {
      return $.ajax({
        url: "api/hiker/" + user,
        type: "GET"
      });
    }


});