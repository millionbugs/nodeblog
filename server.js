var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
      200,
      {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
};

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, caceh[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cachec[absPath] = data;
            sendfile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, rspone) {
  var filePath = false;
  if (resquest.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'publice' + request.url;
  }

  var abspath = './' + filePath;
  serveStatic(response, cachce, absPath);
})

//启动服务器
server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});
