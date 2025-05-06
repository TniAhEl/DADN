const axios = require('axios');
require('dotenv').config();

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;
const FEED_NAME = 'soil-moisure';
const ADAFRUIT_IO_URL = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED_NAME}/data`;

module.exports.index = async (req, res) => {
    try {
        const response = await axios.get(ADAFRUIT_IO_URL, {
            headers: {
                'X-AIO-Key': AIO_KEY
            },
            params: {
                limit: 10
            }
        });

        res.json({
            code: 200,
            message: "success",
            author: "Cuong & Phat",
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Failed to fetch soil moisture data",
            error: error.message
        });
    }
};

module.exports.getLatest = async (req, res) => {
    try {
        const response = await axios.get(ADAFRUIT_IO_URL, {
            headers: {
                'X-AIO-Key': AIO_KEY
            },
            params: {
                limit: 1
            }
        });

        const adafruitData = response.data[0];

        res.json({
            code: 200,
            message: "success",
            author: "Cuong & Phat",
            data: adafruitData,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Failed to fetch soil moisture data",
            error: error.message
        });
    }
};
