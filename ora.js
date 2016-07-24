var oracledb = require('oracledb');
 
oracledb.getConnection(
  {
    user          : "hr",
    password      : "benwood",
    connectString : "localhost/XE"
  },
  function(err, connection)
  {
    if (err) { console.error(err.message); return; }
 
    connection.execute(
      "SELECT department_id, department_name " +
        "FROM departments " +
        "WHERE manager_id < :id",
      [110],  // bind value for :id 
      {outFormat:oracledb.OBJECT}, 
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        console.log(result.rows);
      });
  });
