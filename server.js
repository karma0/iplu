#!/usr/bin/env node

var Http = require('http');
var Hawk = require('hawk');
var fs = require('fs');

var Creds = require('./creds.json');

var ips_file = "./ips.json";
var IPs = require(ips_file);

var getCreds = function (id, cb) { return cb(null, Creds[id]); };

var updateIP = function (user, ip, cb) {
  IPs[user] = ip;
  fs.writeFile(ips_file, JSON.stringify(IPs, null, 2), cb);
};

var handler = function (req, res) {
  Hawk.server.authenticate(req, getCreds, {}, function (err, creds, artifacts) {
    var headers = { 'Content-Type': 'text/plain' };

    var respCode = 200;
    var payload = '';
    if (err) {
      respCode = 401;
      payload = 'Not Authorized';
    } else {

      if ((req.method === 'PUT') || (req.method === 'POST')) {
        updateIP(creds.user, req.connection.remoteAddress, function(err) {
          payload = !err ? 'OK' : "Could not update address.";
        });
      } else if (req.method === 'GET') {
        payload = IPs[creds.user];
      }

    }

    var header = Hawk.server.header(
                      creds,
                      artifacts,
                      {
                        payload: payload,
                        contentType: headers['Content-Type']
                      });
    headers['Server-Authorization'] = header;

    res.writeHead(respCode, headers);
    res.end(payload);
  });
};

var port = process.env.NODE_PORT ? process.env.NODE_PORT : 8000;
var addr = process.env.NODE_LISTEN ? process.env.NODE_LISTEN : '127.0.0.1';

Http.createServer(handler).listen(port, addr);
