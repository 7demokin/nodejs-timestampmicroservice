const express = require("express");
const app = express();
const regex = new RegExp('(\d*)-(\d{2})-(\d{2})');
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening on port " + listener.address().port);
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date
  let utc, unix

  if (new Date(date) !== null && regex.test(date)) {
    utc = new Date(date)
    unix = Math.floor(new Date('2012.08.10').getTime() / 1000)
  } else if (new Date(date * 1000) !== null) {
    unix = date
    let tmpDate = new Date(Number(unix));
    utc = tmpDate.toUTCString()
  }else{
    utc = Date.now()
    unix = utc.toUTCString()
  }
  //date = new Date(req.params.date) != null ? new Date(req.params.date) : new Date(req.params.date * 1000) != null ? req.params.date : new Date.now();
  //new Date(req.params.date) != null ? new Date(req.params.date) : req.params.date != null ? req.params.date : new Date.now();
  console.log(unix)
  console.log(utc)
  res.send({"unix": Number(unix), "utc": utc})
})

