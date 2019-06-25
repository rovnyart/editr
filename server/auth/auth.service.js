import passport from 'passport';

/**
 * Ensures that a user is logged in
 * Otherwise returns 401
 */
export const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: 'Please log in to continue' });
  }
  return next();
};

/**
 * Logs user in
 */
export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(401).json(info);

    return req.login(user, (loginError) => {
      if (loginError) return res.status(401).json({ message: loginError.message });
      return next();
    });
  })(req, res, next);
};

/**
 * Logs user instance in
 */
export const loginUser = (req, user) => new Promise((resolve, reject) => {
  req.login(user, (error) => {
    if (error) reject(error);
    resolve();
  });
});
