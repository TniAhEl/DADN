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

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;

cron.schedule("* * * * *", async (req, res) => {
  const log = new WateringSchedule({
    date: new Date(),
    name: "Tưới cây tự động",
  });
  await log.save();
  const value = 1;
  const response = await axios.post(
    `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/pump/data`,
    { value },
    {
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": AIO_KEY,
      },
    }
  );
  res.json({
    code: 200,
    message: "Pump control command sent successfully",
    author: "Cuong & Phat",
    data: response.data,
  });
});

const routerApiV1 = require("./v1/routes/index.route.js");
routerApiV1(app);

app.listen(port, () => {
  console.log(`Chay tren cong ${port}`);
});
