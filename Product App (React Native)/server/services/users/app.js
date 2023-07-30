const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("./config/mongoConnection");
const router = require("./routers/user");
const app = express();
const port = 4002;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", router);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`);
  }
})();
