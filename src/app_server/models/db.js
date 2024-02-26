const mongoose = require("mongoose");
const dbURI = "mongodb://localhost/Loc8r";
const readline = require("readline");

if (process.platform === "win32") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}
mongoose.connect(dbURI, { useNewUrlParser: true });

// Connection Events

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
