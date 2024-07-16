const User= require("../models/user.js");
const passport= require("passport");

module.exports.renderSignupForm= (req,res)=>{
    res.render("../views/users/signUp.ejs");
};

module.exports.signup = async (req,res)=>{
    try{
        let {username,email,password}= req.body;
        let newUser=new User({username,email});
        const registeredUser= await User.register(newUser,password);
         
          req.login(registeredUser,(err)=>{
            if(err) return next(err);
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        });
    }
    catch(e){
        req.flash("error","Username is already registered!");
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm= (req,res)=>{
    res.render("../views/users/login.ejs");
};


module.exports.login = (req, res, next) => {
    passport.authenticate ('local', (err, user, info) => {

        if (err) return next(err); 
     
        if (!user) { 
            if (info.name === 'IncorrectUsernameError') {
                req.flash('error', 'User not registered ! Please SignUp first.');
            } else if (info.name === 'IncorrectPasswordError') {
                req.flash('error', 'Incorrect password!');
            } else {
                req.flash('error', 'Login failed');
            }
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            if (err) { 
                return next(err); 
            }
            req.flash("success", "Welcome back to WanderLust!");
            const redirectUrl = res.locals.redirectUrl || "/listings";
         
            return res.redirect(redirectUrl);
        });

    }) (req, res, next); //custom callback for passport.authenticate()
};

module.exports.logout =(req,res,next)=>{
    req.logout( (err)=>{
       if(err){
        return next(err);
       }
       req.flash("success","Your are Successfully logged out!");
       res.redirect("/login");
    });
 }
