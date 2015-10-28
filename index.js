'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var cookie = require('cookie');

var JWT_SECRET = 'changeThisSecret';

module.exports = {

    flashMessageToken: expressJwt({
        secret: JWT_SECRET,
        requestProperty: 'flashMessage',
        credentialsRequired: false,
        getToken: function fromCookie(req) {
            if (req.headers.cookie) {
                // Parse them
                var cookies = cookie.parse(req.headers.cookie);
                //Will return undefined if the cookie does not exist. This is okay
                return cookies.jwt_flash_message;
            }
        }
    }),

    flashMessages: function (req, res, next) {
        // Set a flash method to the res object
        // Usage : res.flash('error|info|success|warning', 'Your message here');
        res.flash = function (type, message) {

            var payload = {
                type: type,
                message: message
            };
            var options = {
                expiresInMinutes: 10
            };

            var messageToken = jwt.sign(payload, JWT_SECRET, options);
            res.cookie('jwt_flash_message', messageToken, { httpOnly: true });
        };

        // Is there a flash message? If so, set it as a variable so that we can use it in the template
        if (req.flashMessage) {
            res.locals.flashMessage = req.flashMessage.message;

            //// Clear previous flash messages (for the next request only). It won't affect the current request
            res.clearCookie('jwt_flash_message');
        }

        next();
    }
};
