exports.findAllContinents = function(connection,cb) {
  connection.query('select unique_name, alpha_homo from gsfcjob', function (err, rows, fields) {
    // close connection first
    connection.end();
    // done: call callback with results
    cb(err, rows);
  });
};