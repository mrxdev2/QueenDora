let handler = async (m, { mking, text, isCreator, reply }) => {
  if (!isCreator) return reply("⚠️ This feature can only be used by Bot Developer!");

  const channels = await mking.newsletterFetchAllParticipating();
  const chList = Object.values(channels);
  if (!chList.length) return reply("❌ No channels followed by bot.");

  // === MODE: Direct channel ===
  if (m.chat.endsWith("@newsletter")) {
    const action = text.trim().toLowerCase();
    if (!["on", "off"].includes(action))
      return reply("Use:\n.notifch on — Disable notifications for this channel\n.notifch off — Enable notifications for this channel");

    try {
      if (action === "on") {
        await mking.newsletterMute(m.chat);
        reply(`Notifications for this channel successfully disabled.`);
      } else {
        await mking.newsletterUnmute(m.chat);
        reply(`Notifications for this channel successfully enabled.`);
      }
    } catch (e) {
      console.error(e);
      reply("⚠️ Failed to sync mute/unmute to WhatsApp.");
    }
    return;
  }

  // === MODE: Group or PV ===
  let [idPart, action] = text.split("|").map(a => a?.trim()?.toLowerCase());
  if (!idPart || !action) {
    let teks = `*📋 Channel List (${chList.length}):*\n\n`;
    chList.forEach((ch, i) => {
      teks += `${i + 1}. ${ch.name || "No Name"}\n`;
      teks += `   ID: ${ch.id}\n`;
      teks += `   Subs: ${ch.subscribers || 0}\n\n`;
    });
    teks += `Use:\n.mutech 1,3|on\n.mutech 2|off`;
    return reply(teks);
  }

  const indexes = idPart.split(",").map(x => parseInt(x.trim()) - 1);
  const isOn = action === "on";
  const isOff = action === "off";

  if (!isOn && !isOff)
    return reply("Use: .notifch 1,3|on or .notifch 2|off");

  let hasil = [];
  for (const idx of indexes) {
    if (isNaN(idx) || idx < 0 || idx >= chList.length) continue;
    const target = chList[idx];
    try {
      if (isOn) {
        await mking.newsletterMute(target.id);
        hasil.push(`🔕 ${target.name || target.id} muted.`);
      } else if (isOff) {
        await mking.newsletterUnmute(target.id);
        hasil.push(`🔔 ${target.name || target.id} unmuted.`);
      }
    } catch (e) {
      console.error(e);
      hasil.push(`⚠️ Failed to process ${target.name || target.id}.`);
    }
  }

  if (hasil.length === 0) return reply("✖️ No valid channel IDs.");
  return reply(hasil.join("\n"));
};

handler.help = ["mutech <id>|on/off"];
handler.tags = ["owner"];
handler.command = ["mutech", "notifch"];

module.exports = handler;