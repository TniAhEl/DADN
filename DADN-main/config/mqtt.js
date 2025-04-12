module.exports.connmqtt =  async () => {
    mqttClient.on('connect', () => {
        console.log('MQTT connected');
        mqttClient.subscribe('Phong_Phan_24404/feeds/test');
      });
      
      // Khi có dữ liệu đến
      mqttClient.on('message', async (topic, message) => {
        console.log(`Received from ${topic}: ${message.toString()}`);
      
        const data = new DataModel({ value: message.toString() });
        await data.save();
        console.log('Data saved to MongoDB');
      });
}