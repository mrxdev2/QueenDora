let handler = async (m, { mking, isAdmins, isBotAdmins, reply, text }) => {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins) return reply(mess.admin);
  if (!isBotAdmins) return reply(mess.botAdmin);

  let metadata = await mking.groupMetadata(m.chat);
  let teks = `📢 *TagAll by Admin*\n\n${text ? text + "\n\n" : ""}`;
  let mentionAll = metadata.participants.map(a => a.id);
  mentionAll.forEach(u => (teks += `👤 @${u.split('@')[0]}\n`));

  await mking.sendMessage(m.chat, { text: teks, mentions: mentionAll });
};

handler.command = ["tagall"];
handler.tags = ["group"];
handler.help = ["tagall"];
handler.group = true;

module.exports = handler;