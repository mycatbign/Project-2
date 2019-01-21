// declare var require: any;
// var moment = require("moment");
// var require : Noderequire
// (id: "moment") => any
$("document").ready(function() {
  var trackhikes = [];
  var uniquehikes = [];
  //only display google maps
  $(".manage-hikes-display").hide();
  $(".display-google-maps").show()
  console.log("loaded")
  var hikerName = $("#username-input");
  var hikerBio = $(".bio");
  var hikerImage = $("#hikerPic");
  var userData = localStorage.getItem("userinfo");
  //parse the value 
  var userinput = JSON.parse(userData);
  // function that displays user pictures
  var showPic = function(animal, pic){
    if (userinput.profileImage === animal) {
      hikerImage.attr("src", pic).width("100").height("100")
      // hikerImage.attr("width", "50")
    };
  };
  //calling picture function for all pictures
  showPic("Bear", "./images/profile-images/Bear.jpg");
  showPic("Cat", "./images/profile-images/Cat.jpg");
  showPic("Dragon", "./images/profile-images/Dragon.jpg");
  showPic("Goat", "./images/profile-images/Goat.jpg");
  showPic("Koala", "./images/profile-images/Koala.jpg");
  showPic("Panda", "./images/profile-images/Panda.jpg");
  showPic("Pig", "./images/profile-images/Pig.jpg");
  showPic("Squirrel", "./images/profile-images/Squirrel.jpg");
  //insert user info into page
  hikerName.text(userinput.displayName);
  hikerBio.text(userinput.userBio);
  // populate hours field
  for (i=3; i<25; i++){
    var hour = $("<option></option>").text(i + " hours");
    $(".hours").append(hour);
  };
  // populate minutes field
  for (i=3; i<61; i++){
    var minute = $("<option></option>").text(i + " minutes");
    $(".minutes").append(minute);
  };
  // function to display the hikes a user has done
  var hikerSearch = userinput.displayName;
  var gethikes = function(user) {
    return $.ajax({
      url: "api/hikes/" + user,
      type: "GET"
    });
  }
  // setting get hikes search parameter
  var hikerSearch = userinput.displayName;
 
  // calling function to display user hikes 
gethikes(hikerSearch).then( function(data){
  console.log(data)
  // var date =  data[1].datehiked.split("T")[0];
  // $(".mountains-hiked-list").empty()
  
  for(i=0; i < data.length; i++){
    
    var date = data[i].datehiked.split("T")[0];
      var mountain = $("<div></div>").text(data[i].mountain +" " + date + " " + data[i].hourstaken + " hour[s] " + data[i].minutestaken + " minute[s] Difficulty Level: " + data[i].difficulty ).addClass("hikes");
      $(".mountains-hiked").append(mountain);
      trackhikes.push(data[i].mountain);
      //  console.log(trackhikes)
      //  }
      //  for (j=0; j< trackhikes; j++) {
        // console.log(trackhikes)
        $.each(trackhikes, function(i, el){
          if($.inArray(el, uniquehikes) === -1) uniquehikes.push(el);
    //       for(j=0; j<uniquehike.length; j++){
    //       var newmountains = $("<li> </li").text(uniquehikes)
    // $(".mountains-hiked-list").append(newmountains)
    //       }
        })
  
  // console.log(uniquehikes)
  var hikedTotal = uniquehikes.length;
    $(".mountains-hiked-list").text("Mountains Hiked: " + hikedTotal);
    // for (j=0; j<uniquehike.length; j++) {
      console.log(uniquehikes)
      var newmountains = $("<div> </div").text(uniquehikes)
      $(".mountains-hiked-list").append(newmountains)
    
       }
})
// ***************************On clicks*****************************************
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
// if user clicks find hiker it displays hiker with matching name
  $(document).on("click", ".find-hiker", function() {
    console.log("searching");
    var friend = $(".display-name-search").val();
    console.log(friend)
    findHikers(friend).then(function(data) {
      if (data) {
      // retrieve friend info to display
        var friendImage = data.imagetext;
        var friendBio = data.information;
        var friendDisplayName = data.displayName;
        /// insert into modal
        $("#friend-modal").modal("toggle");
        $(".friend-name").text(friendDisplayName);
        $(".friend-info").text(friendBio);
        console.log(friendImage)
        // function to show friend picture
        var showFriendPic = function(animal, pic){
          if (friendImage === animal) {
            $(".friend-pic").attr("src", pic).width("100").height("100")
          };
        };
        //calling function on all pics to display
        showFriendPic("Bear", "./images/profile-images/Bear.jpg");
        showFriendPic("Cat", "./images/profile-images/Cat.jpg");
        showFriendPic("Dragon", "./images/profile-images/Dragon.jpg");
        showFriendPic("Goat", "./images/profile-images/Goat.jpg");
        showFriendPic("Koala", "./images/profile-images/Koala.jpg");
        showFriendPic("Panda", "./images/profile-images/Panda.jpg");
        showFriendPic("Pig", "./images/profile-images/Pig.jpg");
        showFriendPic("Squirrel", "./images/profile-images/Squirrel.jpg");
        console.log(data)
      } else {
        alert("I'm sorry that username does not exist.");
      }
    });
  });
  // if user clicks Map it displays map
  $(document).on("click", ".MapBtn", function(){
    $(".manage-hikes-display").hide();
    $(".display-google-maps").show()
  })
  // if user clicks my hikes it displays hikes and option to add more hikes
  $(document).on("click", ".myHikesBtn", function(){
    $(".manage-hikes-display").show();
    $(".display-google-maps").hide()
  });

  // if user clicks add a hike it is saved to database and displayed in mountains hiked section
  $(document).on("click", ".mountain-submit", function(){
    $("#manage-hike-modal").modal("toggle");
  });
  $(document).on("click", "#add-hike", function(){
    console.log("click")
    var mount = $(".mountain").val().trim();
    var hikername = userinput.displayName;
    var hikerhours = $(".hours").val(); 
    var hikerminutes = $(".minutes").val();
    var hikerdate = $(".time").val();
    var difficulty = $(".rank").val();
    console.log(hikername)
    var hike = {
      user: hikername,
      mountain: mount,
      minutestaken: hikerminutes,
      hourstaken: hikerhours,
      datehiked: hikerdate,
      difficulty: difficulty
};
console.log(hike)
    savehike(hike).then(function(){
      console.log(hike);
      gethikes(hikerSearch).then( function(data){
        console.log(data)
        var hikedTotal = data.length;
        $(".mountains-hiked-list").text("Mountains Hiked: " + hikedTotal)
        for(i=0; i < hikedTotal; i++){
          var date = data[i].datehiked.split("T")[0];
          var mountain = $("<div ></div>").text(data[i].mountain +" " + date + " " + data[i].hourstaken + " hour[s] " + data[i].minutestaken + " minute[s] Difficulty Level: " + data[i].difficulty ).addClass("hikes");
          $(".mountains-hiked").append(mountain);
          $("#manage-hike-modal").modal("toggle");
        }
      })

})

})
// ***********************End on clicks*****************************************

  //
  var signedOut = function() {
    console.log("You are successfully signed out");
    $("#username-input").empty();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.open("/", "_self");
    }).catch(function(error) {
      // An error happened.
    });
   
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
  // ************************************************
  var savehike = function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/hikes",
      data: JSON.stringify(example)
    });
}
 });