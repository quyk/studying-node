var http = require('http'),
    app = require('./config/express')();

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server listen at port ' + app.get('port'));
});