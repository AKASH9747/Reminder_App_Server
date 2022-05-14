// Import model
const db = require("./db");

// Import jsonWebToken
const jwt = require("jsonwebtoken");

database = {
  1000: { uname: "Akash", unum: 1000, pswd: 2000, records: [] },
  1001: { uname: "Najad", unum: 1001, pswd: 1001, records: [] },
  1002: { uname: "favas", unum: 1002, pswd: 1002, records: [] },
};

// Register definition
const register = (uname, unum, pswd) => {
  return db.Record.findOne({ unum }).then((result) => {
    if (result) {
      return {
        statusCode: 422,
        status: false,
        message: "user already exist!!.. plesae login..",
      };
    } else {
      const newRecord = new db.Record({
        uname,
        unum,
        pswd,
        records: [],
      });
      newRecord.save();
      return {
        statusCode: 200,
        status: true,
        message: "Successfully Registered..",
      };
    }
  });
};

// Login definition
const login = (unum, pswd) => {
  // Asynchronous
  return db.Record.findOne({ unum, pswd }).then((result) => {
    if (result) {
      currentUnum = unum;
      currentUserName = result.uname;
      // Token generation
      const token = jwt.sign(
        {
          currentUnum: unum,
        },
        'privatekey123'
      );
      console.log(token);
      return {
        statusCode: 200,
        status: true,
        message: "Successfully Log In",
        currentUnum,
        currentUserName,
        token,
      };
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "Incorrect Password/Account Number",
      };
    }
  });
};

// Add event definition
const addEvent = (req,unum, date, discription) => {
  // Asynchronous
  // var currentUnum=req.currentUnum
  return db.Record.findOne({ unum }).then((result) => {
    if (result) {
      // if (currentUserNumber != unum) {
      //   return {
      //     statusCode: 422,
      //     status: false,
      //     message: "Operation denied..",
      //   };
      // }
      result.records.push({
        date,
        discription,
      });
      result.save();
      return {
        statusCode: 200,
        status: true,
        message: "Event added Successfully",
      };
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "Please Login Again..",
      };
    }
  });
};

// History definition
const history = (unum) => {
  // Asynchronous
  return db.Record.findOne({ unum }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        status: true,
        history: result.records,
      };
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "User does not exist",
      };
    }
  });
};

module.exports = {
  register,
  login,
  addEvent,
  history,
};
