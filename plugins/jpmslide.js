const { generateWAMessageFromContent, generateWAMessage, proto } = require("@whiskeysockets/baileys")
const fs = require("fs")

let handler = async (m, { penting, mking, isCreator, text }) => {
  if (!isCreator) return m.reply("⚠️ This feature is only for Bot Owner!")

  const allGroups = await mking.groupFetchAllParticipating()
  const groupIDs = Object.keys(allGroups)
  let sentCount = 0
  if (!groupIDs.length) return m.reply("❌ No groups found.")

  const processMsg = await mking.sendMessage(m.chat, { text: `*⏳ Processing Broadcast...*\nGroup count: ${groupIDs.length}\nType: Carousel Message` }, { quoted: m })

  // === MINI BOT CREATIONS DATA ===
  const botServices = [
    {
      title: "🤖 Bot Creations",
      caption: `* Lite Basic Bot: $5 USD
* Mini Pro Bot: $10 USD  
* Advanced Bot: $15 USD
* Enterprise Bot: $25 USD

* Custom Plugins: $3-10 USD
* Bug Fixing: $2-5 USD
* Feature Addition: $5-15 USD
* Bot Renaming/Translation: $3 USD

💳 *Payment Methods:*
• PayPal: malvinb0004@gmail.com
• EcoCash (Zimbabwe)

_All bots include:_
• Source code
• Setup guide
• Basic support
• Free updates

* *Developer Channel:*
${global.linkSaluran}`,
      image: global.thumbbc,
      button: "Order Now",
      source: "https://malvin-api-site.vercel.app/contact",
    },
    {
      title: "🚀 Lite Bot Features",
      caption: `🤖 *Lite Basic Bot Features:*
• Basic commands (!menu, !sticker, !ping)
• Media downloader
• Sticker creator  
• Simple games
• User management
• Anti-spam protection

🤖 *Mini Pro Bot Features:*
• All Lite features +
• Plugin system
• Database support
• Admin tools
• Multi-language
• Custom commands

🤖 *Advanced Bot Features:*
• All Pro features +
• Web dashboard
• API integration  
• Payment system
• Auto backup
• Advanced moderation

💳 *Payment:*
PayPal: malvinb0004@gmail.com
EcoCash: Available for Zimbabwe`,
      image: global.thumbbc,
      button: "View Features",
      source: "https://malvin-api-site.vercel.app/contact",
    },
    {
      title: "💡 Custom Services",
      caption: `* Custom Plugin Development: $3-10 USD
* Bot Script Modification: $5-20 USD
* Bug Fixing & Optimization: $2-10 USD
* Feature Addition: $5-15 USD
* Multi-device Setup: $8 USD
* Bot Renaming/Translation: $3 USD
* 24/7 Maintenance: $15/month

💳 *Payment Methods:*
• PayPal: malvinb0004@gmail.com
• EcoCash (Zimbabwe)

_Services Include:_
• Source Code Access
• Documentation
• Installation Guide
• Support Period
• Free Minor Updates

📞 Contact for custom requests!`,
      image: global.thumbbc,
      button: "Custom Order",
      source: "https://malvin-api-site.vercel.app/contact",
    },
    {
      title: "🌍 Translation & Renaming",
      caption: `* Bot Translation to English: $3 USD
* Bot Renaming Service: $3 USD
* Multi-language Setup: $5 USD
* Custom Command Names: $2 USD
* Language Pack Installation: $4 USD

_Translation Services:_
• English language setup
• Custom bot name
• Command translations
• Menu text localization
• Error messages in English

_Renaming Services:_
• Change bot name
• Custom prefix setup
• Command name changes
• Menu reorganization
• Brand customization

💳 *Payment:*
PayPal: malvinb0004@gmail.com
EcoCash: Zimbabwe`,
      image: global.thumbbc,
      button: "Translate/Rename",
      source: "https://malvin-api-site.vercel.app/contact",
    }
  ]

  // === BROADCAST TO GROUPS ===
  for (const id of groupIDs) {
    if (penting?.blacklistJpm?.includes(id)) continue
    try {
      const cards = []

      for (const item of botServices) {
        const imgMsg = await generateWAMessage(
          m.chat,
          { image: { url: item.image } },
          { upload: mking.waUploadToServer }
        )

        cards.push({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: item.caption || "",
          }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            title: item.title || "",
            hasMediaAttachment: true,
            imageMessage: imgMsg.message.imageMessage,
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: item.button || "Open",
                  url: item.source || "https://malvin-api-site.vercel.app/contact",
                }),
              },
            ],
          }),
        })
      }

      const broadcastMsg = generateWAMessageFromContent(
        id,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.create({
                  text: `*🤖 Mini Bot Creations & Services!*\n*💳 PayPal: malvinb0004@gmail.com | EcoCash: Zimbabwe*\n*Check our services below*`,
                }),
               
                header: proto.Message.InteractiveMessage.Header.create({
                  hasMediaAttachment: false,
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards,
                }),
              }),
            },
          },
        },
        {}
      )

      await mking.relayMessage(id, broadcastMsg.message, { messageId: broadcastMsg.key.id })
      sentCount++
      await new Promise(resolve => setTimeout(resolve, global.delayJpm || 4000))
    } catch (err) {
      console.error(`❌ Failed to send to ${id}:`, err)
    }
  }

  await mking.sendMessage(m.chat, { text: `✅ Broadcast Completed!*\nSuccessfully sent to *${sentCount}* groups out of ${groupIDs.length} total.` }, { edit: processMsg.key })
}

handler.help = ["jpmslide"]
handler.tags = ["owner"]
handler.command = ["broadcastslide", "bcslide"]

module.exports = handler