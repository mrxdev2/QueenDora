const { getBuffer, runtime } = require("../lib/myfunc");

let handler = async (m, { mking, isCreator, reply }) => {
  if (!isCreator) return reply("⚠️ This feature is only for Bot Developer!");

  await mking.sendMessage(m.chat, { react: { text: "👁️‍🗨️", key: m.key } });

  let channels;
  try {
    channels = await mking.newsletterFetchAllParticipating();
  } catch (e) {
    console.error(e);
    return m.reply("*✖️ Failed to fetch channel list.*");
  }

  let chList = Object.values(channels);
  if (!chList.length) return m.reply("⚠️ No channels you are following.");

  let teks = `*📡 Channel Details List (${chList.length} Channels):*\n\n`;
  chList.forEach((ch, i) => {
 
    let role = ch.viewer_metadata?.role || "–";
    let mute = ch.viewer_metadata?.mute || "–";
    let verified = ch.verification || "–";
    let state = ch.state || "–";

    teks += `*${i + 1}. ${ch.name || "No Name"}*\n`;
    teks += `├ ID: ${ch.id || "❓"}\n`;
    teks += `├ Subscribers: ${ch.subscribers || 0}\n`;
    teks += `├ Your role: ${role}\n`;
    teks += `├ Mute: ${mute}\n`;
    teks += `├ Verification: ${verified}\n`;
    teks += `├ State: ${state}\n`;
    teks += `└ Link: ${ch.invite ? `https://whatsapp.com/channel/${ch.invite}` : "❌ Not available"}\n\n`;
  });

  await mking.sendMessage(
    m.chat,
    {
      text: teks,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: `${chList.length} Active Channels`,
          body: `Runtime : ${runtime(process.uptime())}`,
          sourceUrl: global.linksaluran || "https://whatsapp.com",
          thumbnail: await getBuffer(global.img),
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m }
  );
};

handler.command = ["listchannel", "listch"];
handler.tags = ["info"];
handler.help = ["listchannel"];

module.exports = handler;