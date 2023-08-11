import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import app from "./app";

const { EXPRESS_PORT, MONGO_CONNECTION_STRING } = env;

// Check Express Configurations
if (!EXPRESS_PORT || !app) {
  console.error("ERROR: Missing Express Configurations Values")
} else {
  // Check Mongo and Mongoose configurations
  if (!MONGO_CONNECTION_STRING) {
    console.log("ERROR: Missing Mongoose Configuration Values");
  } else {

  // Connect to Database
  mongoose.connect(MONGO_CONNECTION_STRING).then(() => {
    console.log("Connection was successful to database");
    app.listen(EXPRESS_PORT, () => {
      console.log(`Server is running on port: ${EXPRESS_PORT}`);
    });
  }).catch((err) => {
    console.error(`ERROR: Unable to connect to database ${err}`)
  });
}
}
