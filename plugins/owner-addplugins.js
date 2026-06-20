/*═══════════════════════════════════════════════════════
 *  ⌬  YT NeoShiroko Labs
 *═══════════════════════════════════════════════════════
 *  🌐  Website     : https://www.neolabsofficial.my.id
 *  ⌨︎  Developer   : https://zass.cloud
 *  ▶︎  YouTube     : https://www.youtube.com/@zassci_desu
 *  ⚙︎  Panel Murah : pteroku-desu.zass.cloud
 *
 *  ⚠︎  Please do not remove this watermark
 *═══════════════════ © 2025 Zass Desuta ─════════════════════
 */

const fs = require("fs")

let handler = async (m, { mking, isCreator, text, reply, example }) => {
if (!isCreator) return reply(mess.creator)
if (!text) return reply(example("filename & reply code"))
if (!m.quoted || !m.quoted.text) return reply(example("filename & reply code"))
if (!text.endsWith(".js")) return reply("File name must be in .js format")
let kondisi = "adding"
if (fs.existsSync("./plugins/" + text)) return reply("Plugin file name is already registered in the plugins folder!")
let teks = m.quoted.text
await fs.writeFileSync("./plugins/" + text, teks)
return reply(`Successfully ${kondisi} plugin file *${text}*`)
}

handler.command = ["addplugins", "addplugin", "addp", "addplug"]

module.exports = handler