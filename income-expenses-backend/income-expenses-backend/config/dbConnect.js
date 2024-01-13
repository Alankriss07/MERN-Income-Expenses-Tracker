const mongooseInstance = require("mongoose");

// Establish a connection to the MongoDB database

const connectToDatabase = async () => {
  try {
    await mongooseInstance.connect(
      "mongodb+srv://somil:WEFADFASDayfFWE-lwS@mongodb-demo.lqjq2rn.mongodb.net/income-expenses-app?retryWrites=true&w=majority"
    );
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
};

// Call the function to connect to the database
connectToDatabase();
