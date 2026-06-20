/* ════════════════════════════════
 *  🚀  MALVIN KING TECH - YT
 * ════════════════════════════════
 *  
 *  📺  YouTube    : https://www.youtube.com/@malvintech2
 *  💻  GitHub     : https://github.com/XdKing2
 *  🌐  Website    : Coming Soon
 *  
 *  👨‍💻  Developer  : Malvin King
 *  📧  Contact    : Available on GitHub
 *  
 *  ⚠️   Please do not remove this watermark ( credit )
 * ════════════════════════════════
 *  © 2025 Malvin Tech - All Rights Reserved
 * ═════════════════════════════ */

let handler = async (m, { mking, isAdmins, isBotAdmins, args, reply }) => {
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins) return reply(mess.admin);
  if (!isBotAdmins) return reply(mess.botAdmin);

  let user =
    m.quoted?.sender ||
    m.mentionedJid?.[0] ||
    (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

  if (!user) return reply('Tag or reply to the user message you want to make admin.');

  await mking.groupParticipantsUpdate(m.chat, [user], 'promote');
  return reply(`✅ Successfully promoted @${user.split('@')[0]} to group admin.`, { mentions: [user] });
};

handler.command = ['promote'];
handler.tags = ['group'];
handler.help = ['promote'];
module.exports = handler;