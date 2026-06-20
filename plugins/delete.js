let handler = async (m, { mking, isAdmins, isBotAdmins, reply }) => {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins) return reply(mess.admin);
  if (!isBotAdmins) return reply(mess.botAdmin);

  if (!m.quoted) return reply("Reply to the message you want to delete, then type *.delete*");

  try {
    await mking.sendMessage(m.chat, { react: { text: "👁️‍🗨️", key: m.key } });
    await mking.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender
      }
    });
  } catch (err) {
    console.log(err);
    reply("❌ Failed to delete message, maybe the message is too old or not from a member.");
  }
};

handler.command = ["delete", "del"];
handler.tags = ["group"];
handler.help = ["delete"];
handler.group = true;

module.exports = handler;