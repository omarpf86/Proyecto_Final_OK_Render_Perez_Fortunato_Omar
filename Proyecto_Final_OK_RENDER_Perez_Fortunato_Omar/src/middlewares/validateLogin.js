export const validateLogin = (req, res, next) => {
    if (req.session.info && req.session.info.loggedIn) next();
    else res.send('unauthorized user')
};