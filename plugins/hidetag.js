

let handler = async (m, { mking, isAdmins, isBotAdmins, text, participants, reply }) => {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins) return reply(mess.admin);
  if (!isBotAdmins) return reply(mess.botAdmin);

  let message = text || m.quoted?.text;
  if (!message) return reply('Send text or reply to a message to hide tag.');

  let member = participants.map(u => u.id);
  await mking.sendMessage(m.chat, { text: message, mentions: member });
};

handler.command = ['hidetag', 'ht'];
handler.tags = ['group'];
handler.help = ['hidetag'];
module.exports = handler;