const User=require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title:"codial || profile"
    });
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codial || sign-up"
    })
}

module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"codial || sign-in"
})
}


module.exports.create=function(req,res){
    // console.log(req.body)
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email})
    .then((user)=>{
       if(user){
        //a user with the same email exists
        console.log("a user with the same email exists")
        return res.redirect('/users/sign-in')
       }
       else{
        //create a new user
        User.create(req.body)
        .then((newUser)=>{
            //redirect to sign-in page
            return res.redirect('/users/sign-in');
        })
        .catch((err)=>{
            console.log("error creating user");
            return ;
        })
       }
    })
    .catch((err)=>{
        console.log("finding error",err);
        return;
    })
    
}

module.exports.createSession=function(req,res)
{
return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    req.logout(function(err){
        if (err) {
            // Handle the error, e.g., by displaying an error message
            console.log('Error logging out');
            return;
          }
    });
    return res.redirect('/');
}