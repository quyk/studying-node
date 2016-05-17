var http = require('http'),
    app = require('./config/express')();
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/numap');

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server listen at port ' + app.get('port'));
});