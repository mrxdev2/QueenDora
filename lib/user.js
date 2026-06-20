require("../settings");

const fs = require("fs");
const { modul } = require("../module");
const {
  default: DimzBotConnect,
  delay,
  jidNormalizedUser,
  makeWASocket,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  jidDecode,
  proto,
} = require("@whiskeysockets/baileys");
const { moment } = modul;
const userDbPath = `${process.cwd()}/database/user.json`;
const users = JSON.parse(fs.readFileSync(userDbPath, "utf-8"));

const time2 = moment().tz("Africa/Harare").format("HH:mm:ss");
let timeGreeting;

if (time2 < "05:00:00") {
  timeGreeting = "🌃 Good Night";
} else if (time2 < "11:00:00") {
  timeGreeting = "☀️ Good Morning";
} else if (time2 < "15:00:00") {
  timeGreeting = "🌞 Good Afternoon";
} else if (time2 < "18:00:00") {
  timeGreeting = "🌇 Good Evening";
} else if (time2 < "19:00:00") {
  timeGreeting = "🌆 Good Night";
} else {
  timeGreeting = "🌙 Good Night";
}

const handleIncomingMessage = (sock, id) => {}

const saveUsers = () => {
  fs.writeFileSync(userDbPath, JSON.stringify(users, null, 4));
};

module.exports = {
  handleIncomingMessage,
};