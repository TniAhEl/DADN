const axios = require("axios");

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;

module.exports.getLightValue = async (req, res) => {
    try {
        const response = await axios.get(
            `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/light/data`,
            {
                headers: {
                    "X-AIO-Key": AIO_KEY,
                },
            }
        );

        const lightData = response.data[0]; // Lấy phần tử mới nhất

        res.json({
            code: 200,
            message: "Get latest light status successfully",
            author: "Cuong & Phat", // hoặc để Team tùy bạn
            data: lightData, // trả về giá trị mới nhất
        });
    } catch (error) {
        console.error("Error getting light status:", error.message);
        res.status(500).json({
            code: 500,
            message: "Failed to get light status",
            author: "Cuong & Phat",
            error: error.response?.data || error.message,
        });
    }
};
