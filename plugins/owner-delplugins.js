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

let handler = async (m, { mking, isCreator, text, example, reply}) => {
if (!isCreator) return reply(mess.creator)
if (!text) return reply(example("plugin filename"))
if (!text.endsWith(".js")) return reply("File name must be in .js format")
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return reply("Plugin file not found!")
await fs.unlinkSync("./plugins/" + text.toLowerCase())
return reply(`Successfully deleted plugin file *${text.toLowerCase()}*`)
}

handler.command = ["delplugins", "delplugin"]

module.exports = handler