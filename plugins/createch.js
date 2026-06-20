

const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");
const { getBuffer } = require("../lib/myfunc");

let handler = async (m, { mking, qmsg, mime, isCreator, text, reply }) => {
  if (!isCreator) return reply(mess.creator);
  if (!text) return reply("📛 *Use format:*\n.createchannel <name>|<description>");

  let [name, desc] = text.split("|");
  if (!name) return reply("❌ Please write the channel name.");
  desc = desc ? desc.trim() : "No description.";

  await mking.sendMessage(m.chat, { react: { text: "👁️‍🗨️", key: m.key } });

  let imageUrl = "https://files.catbox.moe/xpntd8.jpg";
  if (m.quoted && /image/.test(mime)) {
    try {
      const mediaPath = await mking.downloadAndSaveMediaMessage(qmsg);
      const form = new FormData();
      form.append("fileToUpload", fs.createReadStream(mediaPath));
      const res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: new URLSearchParams({
          reqtype: "fileupload",
          userhash: "",
        }),
      });

      const upload = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: form,
      });
      const url = await upload.text();
      if (url && url.startsWith("https")) imageUrl = url.trim();
      fs.unlinkSync(mediaPath);
    } catch (e) {
      console.error(e);
      reply("⚠️ Failed to upload image, using default image.");
    }
  }
  
  try {
    const newsletter = await mking.newsletterCreate(name.trim(), desc, { url: imageUrl });
    const invite = newsletter?.invite || "❌ Not available";
    const id = newsletter?.id || "❓";

    await mking.sendMessage(
      m.chat,
      {
        text: `✅ *Channel Successfully Created!*\n\n📡 *Name:* ${name}\n📝 *Description:* ${desc}\n🆔 *ID:* ${id}\n🔗 *Link:* https://whatsapp.com/channel/${invite}`,
        contextInfo: {
          externalAdReply: {
            title: name,
            body: "Channel successfully created via NeoShiroko Labs system",
            sourceUrl: `https://whatsapp.com/channel/${invite}`,
            thumbnail: await getBuffer(imageUrl),
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    reply("✖️ *Failed to create channel.* Make sure your bot account meets the requirements to create a channel.");
  }
};

handler.command = ["createchannel", "createch"];
handler.tags = ["owner"];
handler.help = ["createchannel <name>|<description>"];
module.exports = handler;