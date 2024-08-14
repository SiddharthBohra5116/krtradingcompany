require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const database = require("./firebase"); // Import the Firebase config

const Certificate = require("./models/certificate.js");
const Product = require("./models/product.js"); // Adjust based on Firebase structure
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const homeRouter = require("./routes/home.js");
const ownerRouter = require("./routes/owner.js");
const certificateRouter = require("./routes/certificate.js");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");

const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });

// Session and flash message configuration
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
app.use("/", homeRouter);
app.use("/owners", ownerRouter);
app.use("/certificates", certificateRouter);
app.use("/products", productRouter);
app.use("/admin", userRouter);

// Catch-all route for 404 errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  if (typeof statusCode !== "number" || statusCode < 100 || statusCode > 599) {
    statusCode = 500; // default to 500 Internal Server Error
  }
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
