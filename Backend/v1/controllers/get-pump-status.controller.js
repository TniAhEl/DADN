const axios = require("axios");

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;

module.exports.getPumpValue = async (req, res) => {
    try {
        const response = await axios.get(
            `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/pump/data`,
            {
                headers: {
                    "X-AIO-Key": AIO_KEY,
                },
            }
        );

        const pumpData = response.data[0]; // lấy phần tử mới nhất

        res.json({
            code: 200,
            message: "Get latest pump status successfully",
            author: "Team",
            data: pumpData, // trả về giá trị mới nhất
        });
    } catch (error) {
        console.error("Error getting pump status:", error.message);
        res.status(500).json({
            code: 500,
            message: "Failed to get pump status",
            author: "Team",
            error: error.response?.data || error.message,
        });
    }
};
