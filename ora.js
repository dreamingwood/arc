var oracledb = require('oracledb');





oracledb.getConnection(
  {
    user          : "arc",
    password      : "benwood",
    connectString : "localhost/XE"
  },
  function(err, connection)
  {
    if (err) { console.error(err.message); return; }
 
    connection.execute(
      "select * from KC_SUMMARY2015 t where sunitname like :ed" ,
      ['%新乡机务段%'],
      {outFormat:oracledb.OBJECT}, 
      function(err, result)
      {
        if (err) { console.error(err.message); return; } 
       // res.json(result.rows);
        console.log(result.rows);
      });
  });









 
// oracledb.getConnection(
//   {
//     user          : "hr",
//     password      : "benwood",
//     connectString : "localhost/XE"
//   },
//   function(err, connection)
//   {
//     if (err) { console.error(err.message); return; }
 
//     connection.execute(
//       "SELECT department_id, department_name " +
//         "FROM departments " +
//         "WHERE manager_id < :id",
//       [110],  // bind value for :id 
//       {outFormat:oracledb.OBJECT}, 
//       function(err, result)
//       {
//         if (err) { console.error(err.message); return; }
//         console.log(result.rows);
//       });
//   });
