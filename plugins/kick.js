
let handler = async (m, { mking, isAdmins, isBotAdmins, args, reply }) => {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins) return reply(mess.admin);
  if (!isBotAdmins) return reply(mess.botAdmin);

  let user =
    m.quoted?.sender ||
    m.mentionedJid?.[0] ||
    (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

  if (!user) return reply('Tag or reply to the user message you want to kick.');
  if (user === m.sender) return reply('😅 Why kick yourself bro.');

  await mking.groupParticipantsUpdate(m.chat, [user], 'remove');
  return reply(`Successfully kicked @${user.split('@')[0]} from the group.`, { mentions: [user] });
};

handler.command = ['kick'];
handler.tags = ['group'];
handler.help = ['kick'];
module.exports = handler;