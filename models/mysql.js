exports.findAllContinents = function(connection,cb) {
  connection.query('select * from gsfcjob', function (err, rows, fields) {
    // done: call callback with results
    cb(err, rows);
  });
};