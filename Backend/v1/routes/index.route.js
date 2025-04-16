const homeRoutes = require("./home.route.js")
const deviceRoutes = require("./device.route")
const dhtMoisureRoutes = require("./dht-moisure.route.js")
const dhtTempRoutes = require("./dht-temp.route.js")
const lightSensorRoutes = require("./light-sensors.route.js")
const soilMoisureRoutes = require("./soil-moisure.route.js")


module.exports = (app) => {
    const version = "/api/v1";

    app.use(`${version}/home`, homeRoutes)

    app.use(`${version}/device`, deviceRoutes)

    app.use(`${version}/dht-moisure`, dhtMoisureRoutes)

    app.use(`${version}/dht-temp`, dhtTempRoutes)

    app.use(`${version}/light-sensor`, lightSensorRoutes)

    app.use(`${version}/soil-moisure`, soilMoisureRoutes)




}