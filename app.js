require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");
const Certificate = require("./models/certificate.js");
const Product = require("./models/product.js");

// Import routes
const homeRouter = require("./routes/home.js");
const ownerRouter = require("./routes/owner.js");
const certificateRouter = require("./routes/certificate.js");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const mongoUrl = "mongodb://localhost:27017/KR"
const dbUrl = process.env.ATLASDB_URL;
// Connect to MongoDB
async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24*3600
  });
  
  store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE",error)
  })

// Configure session and flash messages
const sessionOptions = {
  store,
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

// Set up view engine and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Middleware to pass flash messages and current user to views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Use routes
app.use("/", homeRouter);
app.use("/owners", ownerRouter);
app.use("/certificates", certificateRouter);
app.use("/products", productRouter);
app.use("/admin", userRouter);

// Catch-all route for 404 errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  if (typeof statusCode !== "number" || statusCode < 100 || statusCode > 599) {
    statusCode = 500; // default to 500 Internal Server Error
  }
  res.status(statusCode).render("error.ejs", { message });
});

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
