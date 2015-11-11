# Cookie-flash-messages
Use cookies to inject flash messages into your Express.js pages.
Useful when you want to display a confirmation/error message when submitting a form. You usually process the form and, depending of the result, redirect the user and display a message.

You can use sessions to do so but the aim was to avoid storing data on the server side.

## How to use

### Install
This is a middleware to be used in Express.js.

`npm install cookie-flash-messages`

### Require and declare
In your Express.js app:
```javascript
var express = require('express');
var app = express();
var cookieFlashMessages = require('cookie-flash-messages');

...

// Declare the middleware before your routes
app.use(cookieFlashMessages);
```

### Use

You will then be allowed to call a new method `res.flash()` in your routes:
```javascript
res.flash('your-message-type', 'Your message')
res.redirect('/your-page');
```
The type can be anything. I personnally use `error|info|success|warning`.

## Display

If a flash message was set, it will be available as a `flashMessage` variable in your templates. The objects looks like this:
```javascript
{
    type: 'your-message-type',
    text: 'Your message'
}
```

For example in a Jade template, a simple example looks like this:
```jade
if flashMessage
    div(class='flash-message ' + flashMessage.type)= flashMessage.text
```
