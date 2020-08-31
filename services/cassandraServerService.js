const axios = require("axios");

async function getRawServerData(serverUrl) {
  const { data } = await axios.get(serverUrl);
  return data;
}

exports.getRawServerData = getRawServerData;