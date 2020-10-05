const express = require("express");
const router = express.Router();
const config = require("config");
const { http } = require("winston");
const authorize = require("../middleware/auth");
const { timeout } = require("../common/timeout");
const { getRawCassHtml, getInstactical } = require("../services/serverService");
const { formatRawCassHtml } = require("../utils/formatRawCassHtml");

router.get("/", async (req, res) => {
  const result = getInstactical();
  res.json(result);
});

router.get("/currentcassandraplayers", [authorize], async (req, res) => {
  const serverUrls = [
    "http://cassandra0.confluvium.info/cassandra0.html",
    "http://cassandra.confluvium.info/cassandra1.html",
    "http://cassandra.confluvium.info/cassandra2.html",
    "http://cassandra.confluvium.info/cassandra3.html",
    "http://cassandra4.confluvium.info/ss-status/cassandra5.html"
  ];
  const servers = [];
  
  for (let i = 0; i < serverUrls.length; i++) {
    try {
      const data = await Promise.race([
        timeout(5000), formatRawCassHtml(await getRawCassHtml(serverUrls[i]))
      ]);
      
      if (data !== null) servers.push(data);
    } catch (ex) {
      console.log(ex.response.status);
    }
  }
  
  res.send(servers);
});

module.exports = router;