const User=require('../models/user');

module.exports.profile = function(req, res){
    res.end('<h1>User Profile</h1>');
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codial || sign-up"
    })
}

module.exports.signIn=function(req,res)
{
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
        console.log(user);
        if(!user)
            {
                User.create({err,res})
                .then((res)=>{
                    return res.redirect('/users/sign-up')
                })
                .catch((err)=>{
                    console.log("errorr");
                    return
                })
               
            }
    })
    .catch((err)=>{
        if(err){console.log("finding error"); return;}
    })
    return;
    

}

module.exports.createSession=function(req,res)
{
//todo later
}