// mongoose import
const mongoose = require("mongoose");

// Start connnecting string
mongoose.connect("mongodb://localhost:27017/ReminderApp", {
  useNewUrlParser: true,
});

// Model creation
const Record = mongoose.model("Record", {
  uname: String,
  unum: Number,
  pswd: String,
  records: [],
});

module.exports = {
  Record,
};
