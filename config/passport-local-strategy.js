const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
        User.findOne({email:email})
        .then((user)=>{
            if(!user || user.password!=password)
            {
                console.log('invalid username/password or user not exist');
                return done(null,false);
            }
            return done(null,user)
        })
        .catch((err)=>{
            console.log("error in finding usser ===>passport")
            return done(err);
        })
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  

//deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
  .catch(error => {
    done(error, null);
  });

  });


//check if the user is authenticated
passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
      return next();
    }
    //if user is not sign in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
  if(req.isAuthenticated()){
    //re.user contain signed in user from the session cookie ans we are just sending this to locals frm the views 
    res.locals.user=req.user;

  }
  next();
}



  

module.exports=passport;