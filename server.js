const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", reviewRoutes);

app.get("/", (req, res) => {
  res.send("PRS Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
