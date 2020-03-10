const koneksi = require("../config/database");

exports.getBootcamps = (res, statment) => {
  statment => {
    var statment = "SELECT * FROM bootcamp";
    koneksi.query(statment, (err, rows, field) => {
      if (err) {
        return res.status(500).json({ message: "Ada kesalahan" });
      }
      console.log(rows);
      res.status(200).json({ Succes: true, data: rows });
    });
  };
};

exports.createBootcamp = (res, statment, data) => {
  koneksi.query(statment, data, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Gagal insert data" });
    }

    res.status(201).json({ succes: true, message: "berhasil" });
  });
};
