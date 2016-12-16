module.exports = function (req, res, next) {
  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  }

  res.sseSendMessage = function(data) {
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  res.sseSendTimeout = function(data) {
    res.write("event: timeout\n" +
              "data: " + JSON.stringify(data) + "\n\n");
  }

  next()
}
