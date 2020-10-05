const formatRawCassHtml = data => {
  const rawServerData = data.split("\n");
  const server = {};
  server.title = getTitle(rawServerData[1]);
  server.maxOccupancy = getMaxOccupancy(server.title);
  server.subtitle = getSubtitle(rawServerData[2]);
  server.sid = getSid(rawServerData[3]);
  server.map = getMap(rawServerData[4]);
  server.playerCount = getPlayerCount(rawServerData[5]);
  server.currentObjective = getCurrentObjective(rawServerData[5]);
  server.uptime = getUptime(rawServerData[6]);
  server.ip = getIp(rawServerData[7]);
  
  const playersIndex = rawServerData.findIndex(item => item.includes("<br>Names:"));
  const rawPlayersData = getPlayers(rawServerData[playersIndex]);
  const formattedPlayers = formatPlayers(rawPlayersData);
  server.players = formattedPlayers;
  
  return server;
}

const getMaxOccupancy = htmlStr => {
  // Get string inside parenthesis. E.g. 8+2.
  const playerSlots = htmlStr.match(/\(([^)]+)\)/)[1];

  // Separate the string by the plus operator into an array.
  const playerSlotsArray = playerSlots.split("+");

  // Get the max player slots for non-Moderators.
  const nonModMaxPlayerSlots = parseInt(playerSlotsArray[0]);

  // Add the two items in the array.
  return playerSlotsArray.reduce((a, b) => parseInt(a) + parseInt(b));
}

const removeNonBreakingSpace = data => {
  data = data.replace(/&nbsp;/g, "");
  data = data.replace(/&nbsp/g, "");
  return data;
}

const removeHtmlLineBreakTag = data => {
  return data.replace(/<br>/g, "");
}

const removeHtmlBoldTag = data => {
  data = data.replace(/<b>/g, "");
  data = data.replace(/<\/b>/g, "");
  return data;
}

const removeDoubleSpace = data => {
  return data.replace(/\s\s/g, "");
}

const getTitle = title => {
  return removeHtmlBoldTag(title).trim();
}

const getSubtitle = subtitle => {
  return removeHtmlLineBreakTag(subtitle).trim();
}

const getSid = sid => {
  return sid.substring(8).trim();
}

const getMap = map => {
  map = removeNonBreakingSpace(map);
  map = removeHtmlLineBreakTag(map);
  map = removeDoubleSpace(map);
  map = map.substring(map.indexOf("Map:") + 4);
  
  return map.trim();
}

const getPlayerCount = playerCount => {
  playerCount = removeNonBreakingSpace(playerCount);
  playerCount = removeHtmlLineBreakTag(playerCount);
  playerCount = removeDoubleSpace(playerCount);
  playerCount = playerCount.substring(playerCount.indexOf("Players:") + 8);
  playerCount = playerCount.substring(0, 2).trim();

  return parseInt(playerCount);
}

const getCurrentObjective = currentObjective => {
  currentObjective = removeNonBreakingSpace(currentObjective);
  currentObjective = removeHtmlLineBreakTag(currentObjective);
  currentObjective = removeDoubleSpace(currentObjective);
  currentObjective = currentObjective.substring(currentObjective.indexOf("Status:") + 7);

  return currentObjective.trim();
}

const getUptime = uptime => {
  uptime = removeHtmlLineBreakTag(uptime);
  uptime = removeNonBreakingSpace(uptime);
  uptime = uptime.substring(uptime.indexOf("Connect:") + 8);
  uptime = uptime.substring(0, uptime.indexOf("since"));

  return uptime.trim();
}

const getIp = ip => {
  ip = removeHtmlLineBreakTag(ip);
  ip = ip.substring(ip.indexOf("Connect:") + 8);

  return ip.trim();
}

// Create an array from the long string of players
const getPlayers = players => {
  const identifier = "<a href=\"http://steamcommunity.com/profiles/";
  players = players.split(identifier);

  return players.filter(item => /765611/g.test(item));
}

const getSteamId = steamId => {
  steamId = steamId.substring(0, 17).trim();
  
  return steamId;
}

const getSteamName = steamName => {
  steamName = steamName.substring(36);
  steamName = steamName.substring(0, steamName.length - 5);
  
  return steamName.trim();
}

// Extract Steam ID and and Steam Name into a player object and push to 
// server.players array
const formatPlayers = rawPlayersData => {
  if (rawPlayersData.length === 0) return rawPlayersData;
  
  const myArray = [];
  for (let i = 0; i < rawPlayersData.length; i++) {
    let player = {};
    player.steamId = getSteamId(rawPlayersData[i]);
    player.steamName = getSteamName(rawPlayersData[i]);
    myArray.push(player);
  }

  return myArray;
}

exports.formatRawCassHtml = formatRawCassHtml;