// var bCrypt = require('bcrypt-nodejs');
// var passport = require('passport')
// module.exports = function (passport, hiker) {

// }
// module.exports = function (passport, hiker) {

//     var Hiker = hiker;
//     var LocalStrategy = require('passport-local').Strategy;


// passport.use('local-signup', new LocalStrategy(

//     {
//         usernameField: 'user',
//         passwordField: 'password',
//         passReqToCallback: true // allows us to pass back the entire request to the callback

//     },
//     function (req, user, password, done) {
//         var generateHash = function (password) {

//             return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//         }
//         Hiker.findOne({
//             where: {
//                 user: user
//             }
//         }).then(function (hiker) {

//             if (hiker) {

//                 return done(null, false, {
//                     message: 'That username is already taken'
//                 });

//             } else {

//                 var userPassword = generateHash(password);

//                 var data =

//                 {
//                     user: user,

//                     password: userPassword,
//                 };
//             }

//             Hiker.create(data).then(function (newUser, created) {

//                 if (!newUser) {

//                     return done(null, false);

//                 }

//                 if (newUser) {

//                     return done(null, newUser);

//                 }

//             });



//         });

//     }



// ));
// }