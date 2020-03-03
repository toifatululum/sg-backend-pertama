const mysql = require("mysql");
//buat konfigurasi koneksi menggunakan objek
const koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "study-group",
  multipleStatements: true
});

//koneksi database
koneksi.connect(err => {
  if (err) throw err;
  console.log("Mysql connected...");
});

module.exports = koneksi;
