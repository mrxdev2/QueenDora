
const { runtime } = require("../lib/myfunc");

let handler = async (m, { mking, reply, text }) => {

  if (!text) return reply("⚠️ Please enter at least 1 channel link!");
  const processMsg = await mking.sendMessage(m.chat, { text: "Checking channel..." });

  const links = text.split(/\s+/).slice(0, 10);
  let captionArr = [];

  for (let link of links) {
    if (!link.includes("https://whatsapp.com/channel/")) {
      captionArr.push(`[  !  ] Invalid link: ${link}`);
      continue;
    }

    let idPart = link.split('https://whatsapp.com/channel/')[1];

    try {
      let res = await mking.newsletterMetadata("invite", idPart);

      captionArr.push(
        `*${res.name || "No Name"}*\n` +
        `* Channel ID: ${res.id}\n` +
        `* Followers: ${res.subscribers || 0}\n` +
        `* Verification: ${res.verification || "–"}\n` +
        `* State: ${res.state || "–"}\n`
      );

    } catch (err) {
      console.error("❌ Error checking channel ID:", err);
      captionArr.push(`[  x  ] Failed to check channel: ${link}`);
    }
  }

  const caption = captionArr.join("\n\n") || "[  x  ] No valid channels to check.";

  // Edit initial message with results
  await mking.sendMessage(
    m.chat,
    {
      text: caption,
      edit: processMsg.key
    }
  );
};

handler.command = ["cekidch", "idch", "cid"];
handler.tags = ["info"];
handler.help = ["cid <link1> [link2]"];

module.exports = handler;