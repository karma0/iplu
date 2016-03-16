#!/usr/bin/env node

var Request = require('request');
var Hawk = require('hawk');

var Conf = require('./config.js');

var uri = Conf.proto+'://'+Conf.host+':'+Conf.port;

var requestOptions = {
  uri: uri,
  method: 'PUT',
  headers: {}
};

var header = Hawk.client.header(uri, 'PUT',
                                {
                                  credentials: Conf.credentials,
                                  ext: 'some-app-data'
                                });
requestOptions.headers.Authorization = header.field;

Request(requestOptions, function (err, res, body) {
  if (err) { console.log(err); }

  var isValid =
    Hawk.client.authenticate(
      res,
      Conf.credentials,
      header.artifacts,
      { payload: body });

  if (Conf.debug)
    console.log(res.statusCode+': '+body+
                  (isValid ? ' (valid)' : ' (invalid)'));

});
