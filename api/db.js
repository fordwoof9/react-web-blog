import mysql from "mysql"

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blog"
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});
