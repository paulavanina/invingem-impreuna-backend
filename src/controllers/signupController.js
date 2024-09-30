import express, { request } from "express";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import multer from "multer";
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const signupController = async (req, res) => {
  const salt = 10;

  const { nume, prenume, email, parola } = req.body;
  const imageBuffer = req.file.buffer;
  const sql =
    "INSERT INTO users (userUUID, nume, prenume, avatar, email, parola) OUTPUT Inserted.userUuid VALUES (NEWID(), @nume, @prenume, @avatar, @email, @parola)";
  const sqlEmail = "SELECT email FROM users WHERE email = @email";

  //verificare email-ului
  const emailRequest = new mssql.Request();
  emailRequest.input("email", mssql.VarChar, req.body.email);

  emailRequest.query(sqlEmail, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: "Eeroare la verificarea emailului." });
    }
    if (result.recordset.length > 0) {
      return res.status(400).json({ Error: "acest email a fost utilizat." });
    }

    bcrypt.hash(parola, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ Error: "Eroare la hash-are parolei." });
      }

      const request = new mssql.Request();
      request.input("nume", mssql.VarChar, nume);
      request.input("prenume", mssql.VarChar, prenume);
      request.input("avatar", mssql.VarBinary, imageBuffer);
      request.input("email", mssql.VarChar, email);
      request.input("parola", mssql.VarChar, hash);

      request.query(sql, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ Error: "Eroare la inserarea datelor." });
        }
        return res.status(200).json({ Status: "Cont creat cu succes!" });
      });
    });
  });
};

export default signupController;
