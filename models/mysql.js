exports.findAllGsfcJobs = function(connection,cb) {
	var sql = "select `unique_name`, `alpha_homo`, `alpha_lumo`, `beta_homo`, `beta_lumo`, `cluster`, `scfe_energy`, `total_force`, "+ 
		"`molecule`, `spin`, `site_type`, `unrestricted_spin_guess`, `unrestricted_spin_real` from `gsfcjob`";
   
  connection.query(sql, function (err, rows, fields) {
    // done: call callback with results
    cb(err, rows);
  });
};

exports.findGsfcJobById = function(connection, id, cb) {
	var sql = "select * from gsfcjob where unique_name = " + connection.escape(id);
   
  connection.query(sql, function (err, rows, fields) {
    // done: call callback with results
    if (rows.length != 1){
    	cb(err, {});
    }
    cb(err, rows[0]);
  });
};