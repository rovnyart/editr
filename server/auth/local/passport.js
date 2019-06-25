import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const WRONG_CREDENTIALS = { message: 'Incorrect username or password' };

export function setup(models) {
  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      if (!email || !password) return done(null, false, WRONG_CREDENTIALS);

      try {
        const user = await models.users.unscoped().findOne({ where: { email } });
        if (!user) return done(null, false, WRONG_CREDENTIALS);

        const authenticated = await user.authenticate(password);
        if (!authenticated) return done(null, false, WRONG_CREDENTIALS);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.users.findByPk(id, { attributes: { exclude: 'password' } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
