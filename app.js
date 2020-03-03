const express = require("express");
const koneksi = require("./config/database");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

//set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({ pesan: "Wowo berhasil" });
});

app.get("/api/bootcamps", (req, res) => {
  var statment = "SELECT * FROM bootcamp";
  koneksi.query(statment, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan" });
    }
    console.log(rows);
    res.status(200).json({ Succes: true, data: rows });
  });
});

app.post("/api/bootcamp/insert", (req, res) => {
  //split syntak
  const data = { ...req.body };
  var statment = "INSERT INTO bootcamp SET ?";
  koneksi.query(statment, data, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Gagal insert data" });
    }

    res.status(201).json({ succes: true, message: "berhasil" });
  });
});

app.delete("/api/bootcamp/delete/:id", (req, res) => {
  var statment1 = "SELECT * FROM bootcamp WHERE id = ?";
  var statment2 = "DELETE FROM bootcamp WHERE id = ?";
  koneksi.query(statment1, req.params.id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Gagal hapus data", error: err });
    }
    if (!rows.length) {
      return res
        .status(500)
        .json({ message: `ID ${req.params.id}tidak ditemukan` });
    }
    koneksi.query(statment2, req.params.id, (err, rows, field) => {
      if (err) throw err;

      if (rows.affectedRows == 1) {
        return res.status(200).json({ succes: true, message: "Data terhapus" });
      }
    });
  });
});

app.put("/api/bootcamp/update/:id", (req, res) => {
  var statment1 = "SELECT * FROM bootcamp WHERE id = ?";
  var statment2 = "UPDATE bootcamp SET ? WHERE id = ?";
  const data = { ...req.body };
  koneksi.query(statment1, req.params.id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Gagal hapus data", error: err });
    }
    if (!rows.length) {
      return res
        .status(500)
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
});
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
