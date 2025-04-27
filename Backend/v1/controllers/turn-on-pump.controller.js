const axios = require("axios");

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;

module.exports.controlPump = async (req, res) => {
    const { value } = req.body; // { value: "1" } bật, { value: "0" } tắt

    if (value === undefined) {
        return res.status(400).json({
            code: 400,
            message: "Missing 'value' in request body (should be '0' or '1')",
        });
    }

    try {
        const response = await axios.post(
            `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/pump/data`, // đây là feed pump
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
    } catch (error) {
        console.error("Error controlling pump:", error.message);
        res.status(500).json({
            code: 500,
            message: "Failed to send control command to Pump",
            author: "Cuong & Phat",
            error: error.response?.data || error.message,
        });
    }
};

