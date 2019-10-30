const server = require('./server.js');


server.listen(process.env.PORT || 5000, () => {
  console.log("server running on port " + (process.env.PORT || 5000));
});
