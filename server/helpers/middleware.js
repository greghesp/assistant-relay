const passport = require('passport');
const { LocalStrategy } = require('passport-local');
const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));

export default function () {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const db = await low(configAdapter);
      const pw = db.get('password').value();

      console.log(password);
      return done();

      // if(password === pw) {
      //     return done(null, false);
      // }
      // if()

      //   User.findOne({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });
    }),
  );
}
