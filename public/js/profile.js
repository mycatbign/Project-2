$("document").ready(function () {
  var trackhikes = [];
  var uniquehikes = [];
  var mountainsHikedUnique = function (){
    $.each(trackhikes, function (i, el) {
      if ($.inArray(el, uniquehikes) === -1) {uniquehikes.push(el);
      }
    });
    // console.log(uniquehikes)
    var hikedTotal = uniquehikes.length;
    $(".mountains-hiked-list").text("Mountains Hiked: " + hikedTotal);
    // for (j=0; j<uniquehike.length; j++) {
    console.log(uniquehikes);
    for (i=0; i<uniquehikes.length; i++) {
      var newmountains = $("<div> </div").text(uniquehikes[i]).addClass("mountain-list-items");
      $(".mountains-hiked-list").append(newmountains);
    }
  };
  //only display google maps
  $(".manage-hikes-display").hide();
  $(".display-google-maps").show();
  console.log("loaded");
  var hikerName = $("#username-input");
  var hikerBio = $(".bio");
  var hikerImage = $("#hikerPic");
  var userData = localStorage.getItem("userinfo");
  //parse the value 
  var userinput = JSON.parse(userData);
  // function that displays user pictures
  var showPic = function (animal, pic) {
    if (userinput.profileImage === animal) {
      hikerImage.attr("src", pic)
        .width("100")
        .height("100");
    }
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
  for (i = 3; i < 25; i++) {
    var hour = $("<option ></option>").text(i + " hours");
    hour.val(i);
    $(".hours").append(hour);
  }
  // populate minutes field
  for (i = 3; i < 61; i++) {
    var minute = $("<option></option>").text(i + " minutes");
    minute.val(i);
    $(".minutes").append(minute);
  }
  // function to display the hikes a user has done
  var hikerSearch = userinput.displayName;
  var gethikes = function (user) {
    return $.ajax({
      url: "api/hikes/" + user,
      type: "GET"
    });
  };
  // setting get hikes search parameter
  var hikerSearch = userinput.displayName;
  // estabnlishing and calling function to display user hikes 
  var retrieveHikes = function(){
    $(".mountains-hiked").empty();
    gethikes(hikerSearch).then(function (data) {
      console.log(data);
      for (i = 0; i < data.length; i++) {
        var date = data[i].datehiked.split("T")[0];
        var time = data[i].hourstaken * 60 + data[i].minutestaken;
        console.log(time);
        var mountainTable = $("<tr> </tr>").addClass("hikes");
        var mountainName = $("<th> </th>").text(data[i].mountain);
        var mountainDate = $("<th> </th>").text(date);
        var mountainTime = $("<th> </th>").text(time + " minutes");
        var mountainDifficulty = $("<th> </th>").text(data[i].difficulty);
        mountainTable.append(mountainName);
        mountainTable.append(mountainDate);
        mountainTable.append(mountainTime);
        mountainTable.append(mountainDifficulty);
        $(".mountains-hiked").append(mountainTable);
        trackhikes.push(data[i].mountain);
      }
      mountainsHikedUnique();
    });
  };
  retrieveHikes();
  var mountainOptions = function () {
    return $.ajax({
      url: "api/mountains",
      type: "GET"
    });
  };
  mountainOptions().then(function (data) {
    console.log(data[1]);
    for (i=0;i<data.length; i++){
      var mountainNames = $("<option> </option").text(data[i].Name);
      $(".mountain").append(mountainNames);
    }
  
  });
  // ***************************On clicks*****************************************
  // if user clicks sign out it signs out user
  $(document).on("click", ".sign-out", function () {
    signedOut();
  });
  // if user clicks delete it pops up a modal for confirmation
  $(document).on("click", ".delete-profile", function () {
    $("#delete-modal").modal("toggle");
  });
  //if user clicks yes in delete modal it deletes user profile
  $(document).on("click", "#confirm-delete-button", function () {
    var idToDelete = hikerName.text();
    deleteProfile(idToDelete).then(function () {
      console.log("Profile " + idToDelete + " deleted");
      deleteProfile();
      signedOut();
      $("#delete-modal").modal("toggle");
    });
  });
  // if user clicks find hiker it displays hiker with matching name
  $(document).on("click", ".find-hiker", function () {
    console.log("searching");
    var friend = $(".display-name-search").val();
    console.log(friend);
    findHikers(friend).then(function (data) {
      if (data) {
        // retrieve friend info to display
        var friendImage = data.imagetext;
        var friendBio = data.information;
        var friendDisplayName = data.displayName;
        /// insert into modal
        $("#friend-modal").modal("toggle");
        $(".friend-name").text(friendDisplayName);
        $(".friend-info").text(friendBio);
        console.log(friendImage);
        // function to show friend picture
        var showFriendPic = function (animal, pic) {
          if (friendImage === animal) {
            $(".friend-pic").attr("src", pic)
              .width("100")
              .height("100");
          }
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
        console.log(data);
      } else {
        alert("I'm sorry that username does not exist.");
      }
    });
  });
  // if user clicks Map it displays map
  $(document).on("click", ".MapBtn", function () {
    $(".manage-hikes-display").hide();
    $(".display-google-maps").show();
  });
  // if user clicks my hikes it displays hikes and option to add more hikes
  $(document).on("click", ".myHikesBtn", function () {
    $(".manage-hikes-display").show();
    $(".display-google-maps").hide();
  });
  // if user clicks add a hike it is saved to database and displayed in mountains hiked section
  $(document).on("click", ".mountain-submit", function () {
    $("#manage-hike-modal").modal("toggle");
  });
  $(document).on("click", ".close-hikes", function () {
    $("#manage-hike-modal").modal("toggle");
  });
  
  $(document).on("click", ".add-hike", function () {
    console.log("click");
    var mount = $(".mountain option:selected").val().trim();
    var hikername = userinput.displayName;
    var hikerhours = $(".hours").val();
    var hikerminutes = $(".minutes").val();
    var hikerdate = $(".time").val();
    var difficulty = $(".rank").val();
    console.log(hikername);
    var hike = {
      user: hikername,
      mountain: mount,
      minutestaken: hikerminutes,
      hourstaken: hikerhours,
      datehiked: hikerdate,
      difficulty: difficulty
    };
      // $(".mountains-hiked").empty()
    // $(".mountains-hiked-list").empty()
    savehike(hike).then(function () {
      retrieveHikes();
      $("#manage-hike-modal").modal("toggle");
    });
  });
  // ***********************End on clicks*****************************************
  //
  var signedOut = function () {
    console.log("You are successfully signed out");
    $("#username-input").empty();
    // Sign-out successful.
    window.open("/", "_self");
  };
  var deleteProfile = function (user) {
    return $.ajax({
      url: "api/hiker/" + user,
      type: "DELETE"
    });
  };
  var findHikers = function (user) {
    return $.ajax({
      url: "api/hiker/" + user,
      type: "GET"
    });
  };
  // ************************************************
  var savehike = function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/hikes",
      data: JSON.stringify(example)
    });
  };
 
});
