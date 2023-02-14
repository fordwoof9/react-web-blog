import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { connection } from '../db.js';

export function initializePassport(passport){
        passport.use(
    new LocalStrategy(
        {
        usernameField: 'email',
        passwordField: 'password'
        },
        function (email, password, done) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return done(err);
            if (!results.length) {
            return done(null, false, { message: 'Incorrect email.' });
            }
            if (results[0].password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, results[0]);
        });
        }
    )
    );

    passport.serializeUser(function (user, done) {
    done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);
    });
    });
}

export default passport;
