const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'db_hao'
});

function query(callback) {
  pool.getConnection(function (err, connection) {
    if (!err) {
      connection.query('SELECT * FROM t_data', function (err, rows, fields) {
        if (!err) {        
          callback(rows);
        } 
        connection.release();
      });
    } else {
      connection.release();
    }
  });
}

function insert(data, callback) {
  let sql = '';
  for (let i = 0; i < data.length; i++) {
    sql += `('${data[i].label}', '${data[i].name}', '${data[i].href}'),`
  }
  sql = sql.substring(0, sql.length - 1);

  pool.getConnection(function (err, connection) {
    if (!err) {
      connection.query('DELETE FROM t_data', function (err) {
        if (!err) {   
          connection.query(`INSERT INTO t_data VALUES${sql}`, function (err) {
            if (!err) {        
              callback('success');
            } else {
              callback('failure');
            }
            connection.release();
          });
        } else {
          callback('failure');
          connection.release();
        }
      });
    } else {
      callback('failure');
      connection.release();
    }
  });
}

module.exports = {
  query: query,
  insert: insert
}
