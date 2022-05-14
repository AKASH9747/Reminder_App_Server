// Import data service
const dataService = require("./services/dataService");

// import cors
const cors = require("cors");

// Import jwt web token
const jwt = require("jsonwebtoken");

// Import express
const express = require("express");
  const { json } = require("express/lib/response");

// create an application using express
const app = express();
// parse
app.use(express.json());

// set up the port number
app.listen(3000, () => {
  console.log("Server start at port number: 3000");
});
// Use cors to specify origin
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// To verify token
// const jwtMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers["x-access-token"];
//     const data = jwt.verify(token, 'privatekey123');
//     req.currentUnum = data.currentUnum
//     next();
//   } catch {
//     res.status(422).json({
//       statusCode: 422,
//       status: false,
//       message: "please login",
//     });
//   }
// };

// Register API
app.post("/register", (req, res) => {
  dataService
    .register(req.body.uname, req.body.unum, req.body.pswd)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// Login API
app.post("/login", (req, res) => {
  dataService.login(req.body.unum, req.body.pswd).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

// AddEvent API
app.post("/dashboard", (req, res) => {
  dataService
    .addEvent(req, req.body.unum, req.body.date, req.body.discription)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

// History API
app.post("/history", (req, res) => {
  dataService.history(req.body.unum).then((result) => {
    res.status(res.statusCode).json(result);
  });
});
