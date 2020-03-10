const koneksi = require("../config/database");
const { getBootcamps, createBootcamp } = require("../models/bootcamp-model");

//@desc Gett All API
//@route GET

exports.getBootcamps = (req, res, next) => {
  var statement = "SELECT * FROM bootcamp";
  getBootcamps(res, statment);
};

exports.createBootcamp = (req, res, next) => {
  const data = { ...req.body };
  var statement = "INSERT into bootcamp set ?";
  createBootcamp(res, statement, data);
};

//desc delete bootcamp
//API delete /api/bootcamp/delete
//@acces private
exports.deleteBootcamp = (req, res, next) => {
  var statment1 = "SELECT * FROM bootcamp WHERE id = ?";
  var statment2 = "DELETE FROM bootcamp WHERE id = ?";
  koneksi.query(statment1, req.params.id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Gagal hapus data", error: err });
    }
    if (!rows.length) {
      return res
        .status(404)
        .json({ message: `ID ${req.params.id}tidak ditemukan` });
    }
    koneksi.query(statment2, req.params.id, (err, rows, field) => {
      if (err) throw err;

      if (rows.affectedRows == 1) {
        return res.status(200).json({ succes: true, message: "Data terhapus" });
      }
    });
  });
};

//desc update bootcamp
//API put/api/bootcamp/delete
//@acces private
exports.updateBootcamp = (req, res, next) => {
  var statment1 = "SELECT * FROM bootcamp WHERE id = ?";
  var statment2 = "UPDATE bootcamp SET ? WHERE id = ?";
  const data = { ...req.body };
  koneksi.query(statment1, req.params.id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Gagal hapus data", error: err });
    }
    if (!rows.length) {
      return res
        .status(404)
        .json({ message: `ID ${req.params.id}tidak ditemukan` });
    }
    koneksi.query(statment2, [data, req.params.id], (err, rows, field) => {
      if (err) throw err;

      if (rows.changedRows == 1) {
        return res
          .status(200)
          .json({ succes: true, message: "Berhasil Update" });
      }
    });
  });
};
