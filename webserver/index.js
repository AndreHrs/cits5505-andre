const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Disable CORS by allowing all origins
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
console.log(`Serving static files from: ${path.join(__dirname, "public")}`);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
