const User = require('../models/users');


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
}


module.exports.signup = async (req, res) => {
    try {
        let {username, email, password}= req.body;
    const newUser = new User({username, email});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash('success', 'Welcome to Airbnb!');
        res.redirect('/listings');
    });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back to Airbnb!');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/listings');
});
}