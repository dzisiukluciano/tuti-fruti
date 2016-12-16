var express = require('express')
  , app = express()
  , sse = require('./sse')

var connections = []
  , votes = {yes: 0, no: 0}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(sse)

var time = 60;
function timeout() {
    setTimeout(function () {
      for(var i = 0; i < connections.length; i++) {
        connections[i].sseSendTimeout({
            message: time
            })
        }
        time -= 1;
        if(time == 0)
            time = 60;

        timeout();

    }, 1000);
};

timeout();

app.get('/', function(req, res) {
  res.render('vote')
})

app.get('/result', function(req, res) {
  res.render('result')
})

app.get('/vote', function(req, res) {
  if (req.query.yes === "true") votes.yes++
  else votes.no++

  for(var i = 0; i < connections.length; i++) {
    connections[i].sseSendMessage(votes)
  }

  res.sendStatus(200)
})

app.get('/stream', function(req, res) {
  res.sseSetup()
  res.sseSendMessage(votes)
  connections.push(res)
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
