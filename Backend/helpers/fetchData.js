const axios = require('axios');

module.exports.callData = (feedkey) => {
    const url = `https://io.adafruit.com/api/v2/${process.env.AIO_USERNAME}/feeds/${feedkey}/data`;
    
    return axios.get(url, {
      headers: {
        'X-AIO-Key': process.env.AIO_KEY
      }
    })
    .then(response => {
        // console.log(response.data);
        return response.data;
    })
    .catch(error => {
        return ('Lỗi:', error.response?.data || error.message);
    });
}