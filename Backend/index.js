const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const cron = require("node-cron");
env.config();
const database = require("./config/database");
const bodyParser = require("body-parser");
database.connect();
const app = express();
const port = process.env.PORT;

const WateringSchedule = require("./v1/models/wateringSchedule.model.js");

app.use(cors()); // all url acess
app.use(bodyParser.json());

cron.schedule("0 12,16 * * *", async () => {
  const log = new WateringSchedule({
    date: new Date(),
    name: "Tưới cây tự động",
  });
  await log.save();
});

const routerApiV1 = require("./v1/routes/index.route.js");
routerApiV1(app);

app.listen(port, () => {
  console.log(`Chay tren cong ${port}`);
});
