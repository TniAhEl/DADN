const homeRoutes = require("./home.route.js");
const deviceRoutes = require("./device.route");
const dhtMoisureRoutes = require("./dht-moisure.route.js");
const dhtTempRoutes = require("./dht-temp.route.js");
const lightSensorRoutes = require("./light-sensors.route.js");
const authRoutes = require("./auth.route.js");
const uploadRoutes = require("./upload.route.js");
const wateringScheduleRoutes = require("./wateringSchedule.route.js");

const soilMoisureRoutes = require("./soil-moisure.route.js");

const turnOnLightRoutes = require("./turn-on-light.route.js");
const turnOnPumpRoutes = require("./turn-on-pump.route.js");
const getPumpStatusRoutes = require("./get-pump-status.route.js");
const getLightStatusRoutes = require("./get-light-status.route.js");
const MoistureThreshold = require("./moisture-threshold.route.js");
const LightThreshold = require("./light-threshold.route.js");


module.exports = (app) => {
  const version = "/api/v1";

  app.use(`${version}/home`, homeRoutes);

  app.use(`${version}/device`, deviceRoutes);

  app.use(`${version}/dht-moisure`, dhtMoisureRoutes);

  app.use(`${version}/dht-temp`, dhtTempRoutes);

  app.use(`${version}/light-sensor`, lightSensorRoutes);

  app.use(`${version}/soil-moisure`, soilMoisureRoutes);
  app.use(`${version}/auth`, authRoutes);
  app.use(`${version}/upload`, uploadRoutes);
  app.use(`${version}/watering-schedule`, wateringScheduleRoutes);
  app.use(`${version}/turnOnLight`, turnOnLightRoutes);
  app.use(`${version}/turnOnPump`, turnOnPumpRoutes);
  app.use(`${version}/getPump`, getPumpStatusRoutes);
  app.use(`${version}/getLight`, getLightStatusRoutes);
  app.use(`${version}/moisture-threshold`, MoistureThreshold);
  app.use(`${version}/light-threshold`, LightThreshold);



};
