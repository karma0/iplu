var Request = require('request');
var Hawk = require('hawk');


// Client credentials

var credentials = {
    id: 'dh37fgj492je',
    key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
    algorithm: 'sha256'
}

// Request options

var requestOptions = {
    uri: 'http://localhost:8000/',
    method: 'GET',
    headers: {}
};

// Generate Authorization request header

var header = Hawk.client.header('http://localhost:8000/', 'GET', { credentials: credentials, ext: 'some-app-data' });
requestOptions.headers.Authorization = header.field;

// Send authenticated request

Request(requestOptions, function (error, response, body) {

    // Authenticate the server's response

    var isValid = Hawk.client.authenticate(response, credentials, header.artifacts, { payload: body });

    // Output results

    console.log(response.statusCode + ': ' + body + (isValid ? ' (valid)' : ' (invalid)'));
});
