
let handler = async (m, { mking, isAdmins, isBotAdmins, args, reply }) => {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins) return reply(mess.admin);
  if (!isBotAdmins) return reply(mess.botAdmin);

  let user =
    m.quoted?.sender ||
    m.mentionedJid?.[0] ||
    (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

  if (!user) return reply('Tag or reply to the user message you want to demote from admin.');

  await mking.groupParticipantsUpdate(m.chat, [user], 'demote');
  return reply(`⬇️ Successfully demoted @${user.split('@')[0]} from group admin.`, { mentions: [user] });
};

handler.command = ['demote'];
handler.tags = ['group'];
handler.help = ['demote'];
module.exports = handler;