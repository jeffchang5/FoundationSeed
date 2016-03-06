var home = require('../app/controllers/home');
var express = require('express');


module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.root + '/app/views');
    app.use(express.static(config.root + '/public'))
    console.log(config.root + '/public');
    app.get('/', home.index);

    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', { error: err.stack });
    });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
