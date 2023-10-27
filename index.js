const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy')
const MongoStore=require('connect-mongo');
const sassMidlleware =require('node-sass-middleware')

app.use(sassMidlleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(cookieParser());

app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo is used to store the session cookie in the db
app.use(session({
    name:'codial',
    //change the sectret beofre deployemnt before production mode
    secret:'blahhh',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove:'disabled'
    }),
    function(err)
    {
        console.log(err || "connect mongodb setup")
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log("error",err);
    }
    console.log("serving port no",port);
});