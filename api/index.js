import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import passport from "passport";
import session from "express-session";
import { initializePassport } from "./config/passport-config.js";

const app = express();

// Initialize PassportJS
initializePassport(passport);

app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: "8e0b98998062e0cad422143eb72ea40c8ac3af791f9c6409e77f6ec90ac9cb97",
  resave: false,
  saveUninitialized: false
}));

// Use PassportJS middleware for session management
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, fileName);
  }
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});
