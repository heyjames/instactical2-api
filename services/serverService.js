const axios = require("axios");
const fakeInstacticalServer = require("../common/fakeInstacticalServer.json");

async function getRawCassHtml(serverUrl) {
  const { data } = await axios.get(serverUrl);
  return data;
}

function getInstactical() {
  return fakeInstacticalServer;
}

exports.getRawCassHtml = getRawCassHtml;
exports.getInstactical = getInstactical;