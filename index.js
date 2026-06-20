/* ═════════════════════════════════
 *  🚀  MALVIN KING TECH - YT
 * ═════════════════════════════════
 *  
 *  📺  YouTube    : https://www.youtube.com/@malvintech2
 *  💻  GitHub     : https://github.com/XdKing2
 *  🌐  Website    : Coming Soon
 *  🪀  WhatsApp  : https://whatsapp.com/channel/0029VbB3YxTDJ6H15SKoBv3S
 *  
 *  👨‍💻  Developer  : Malvin King
 *  📧  Contact    : Available on GitHub
 *  
 *  ⚠️   Please do not remove this watermark
 * ═════════════════════════════════
 *  © 2025 Malvin Tech - All Rights Reserved
 * ════════════════════════════════ */


require("./settings");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason, delay, Browsers, makeCacheableSignalKeyStore, jidDecode, downloadContentFromMessage, getAggregateVotesInPollMessage, generateWAMessageFromContent, generateForwardMessageContent, getMessage } = require('@whiskeysockets/baileys');

const { modul } = require("./module");
const moment = require("moment-timezone");
const figlet = require("figlet");
const gradient = require("gradient-string");
const { baileys, chalk, fs, FileType, path, pino, PhoneNumber, axios, os } = modul;
const { makeInMemoryStore } = require("./lib/store/");
const { color, bgcolor } = require("./lib/color");
const { uncache, nocache } = require("./lib/loader");
const Pino = require("pino");
const readline = require("readline");
const yargs = require('yargs/yargs')
const _ = require('lodash')
const NodeCache = require("node-cache");

const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize, tanggal, day, bulan, tahun, weton, loadModule, protex } = require("./lib/myfunc");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif, imageToWebpAvatar, videoToWebpAvatar, writeExifImgAvatar, writeExifVidAvatar } = require('./lib/exif')
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const prefix = "";
const type = (x) => x?.constructor?.name || (x === null ? "null" : "undefined");
const isStringSame = (x, y) => (Array.isArray(y) ? y.includes(x) : y === x);
const buttonTypes = [];

// Main database path
const dbPath = path.join(__dirname, "database");
const dbFile = path.join(dbPath, "database.json");
const pentingFile = path.join(dbPath, "penting.json");
const usersJson = path.join(dbPath, "user.json");
const contactsFile = path.join(dbPath, "contacts.vcf");

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath);
  console.log(chalk.greenBright("[Database] Folder created automatically."));
}
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({}, null, 2));
  console.log(chalk.greenBright("[Database] database.json file created."));
}
if (!fs.existsSync(usersJson)) {
  const userDefault = []
  fs.writeFileSync(usersJson, JSON.stringify(userDefault, null, 2));
  console.log(chalk.greenBright("[Database] user.json file created."));
}
if (!fs.existsSync(pentingFile)) {
  const pentingDefault = {
    blacklistJpm: [],
    autoJpm: {
      status: false,
      interval: 0,
      type: "hour",
      messages: [],
      lastIndex: 0,
    },
  };
  fs.writeFileSync(pentingFile, JSON.stringify(pentingDefault, null, 2));
  console.log(chalk.greenBright("[Database] penting.json file created."));
}

if (!fs.existsSync(contactsFile)) {
  fs.writeFileSync(contactsFile, "");
  console.log(chalk.greenBright("[Database] contacts.vcf file created."));
}
const { handleIncomingMessage } = require("./lib/user");
const pentingPath = path.join(process.cwd(), "database", "penting.json")
let penting = JSON.parse(fs.readFileSync(pentingPath))
// Save changes to file
function savePenting() {
  fs.writeFileSync(pentingPath, JSON.stringify(penting, null, 2))
}
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store",
  }),
});

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`./database/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
game: {},
database: {},
settings: {},
setting: {},
others: {},
sticker: {},
...(global.db.data || {})}
  global.db.chain = _.chain(global.db.data)}
loadDatabase()

// ===================== CONSOLE SETUP ===================== //
console.clear();
console.log(
  chalk.yellow("[ Starting ] ") + chalk.white.bold("Welcome In Terminal Mk-bot!")
);

process.on("unhandledRejection", (reason, promise) => {
  console.log(chalk.red("[Error] Unhandled Rejection →"), reason);
});
process.on("rejectionHandled", (promise) => {
  console.log(chalk.gray("[Info] Rejection handled."));
});
process.on("Something went wrong", function (err) {
  console.log(chalk.red("[Exception]"), err);
});

// ========== STARTUP SPLASH ========== //
setTimeout(() => {
  console.clear();
  console.log(
    chalk.cyan.bold(
      figlet.textSync("M-K", { horizontalLayout: "full" })
    )
  );
  console.log(gradient.pastel.multiline("Booting Mk-Bot Engine..."));
  console.log(chalk.gray("──────────────────────────────────────────────"));
  console.log(chalk.white("Welcome to Mk-Bot - YT Malvin Tech"));
  console.log(chalk.gray("──────────────────────────────────────────────\n"));

  console.log(
    chalk.cyan.bold("Operating System Information:"),
    "\n",
    chalk.white(`├ Platform : ${os.platform()} ${os.arch()}`),
    "\n",
    chalk.white(`├ Release  : ${os.release()}`),
    "\n",
    chalk.white(`├ Hostname : ${os.hostname()}`),
    "\n",
    chalk.white(`├ Total RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`),
    "\n",
    chalk.white(`├ Free RAM : ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`),
    "\n",
    chalk.white(`└ Uptime   : ${os.uptime()} sec\n`)
  );

  console.log(chalk.magenta.bold("==============================================="));
  console.log(chalk.cyan.bold("Preparing environment..."));
}, 1000);
protex();

const ask = (text) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(text, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

// ========== FIXED SESSION HANDLER ==========
async function initializeSession() {
    const sessionDir = "./session";
    
    // Create session directory if it doesn't exist
    if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
    }

    const credsPath = path.join(sessionDir, "creds.json");
    
    // Check if we have a session ID in settings
    if (global.SESSION_ID && global.SESSION_ID.startsWith('starcore~')) {
        console.log(chalk.blue('🔄 Found SESSION_ID in settings, injecting...'));
        try {
            const base64Data = global.SESSION_ID.replace('starcore~', '');
            if (base64Data && /^[A-Za-z0-9+/=]+$/.test(base64Data)) {
                const decodedData = Buffer.from(base64Data, "base64");
                const sessionData = JSON.parse(decodedData.toString("utf-8"));
                
                console.log(chalk.blue('📦 Session data structure:'));
                console.log(chalk.blue(`   - Has creds: ${!!sessionData.creds}`));
                console.log(chalk.blue(`   - Has keys: ${!!sessionData.keys}`));
                console.log(chalk.blue(`   - Registered: ${sessionData.creds?.registered || 'unknown'}`));
                
                // Always inject the session ID data (overwrite existing)
                fs.writeFileSync(credsPath, JSON.stringify(sessionData, null, 2));
                console.log(chalk.green('✅ Session ID successfully injected into creds.json'));
                
                // Verify the file was written
                if (fs.existsSync(credsPath)) {
                    const writtenData = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
                    console.log(chalk.green(`✅ Verification: creds.json created with registered status: ${writtenData.creds?.registered || 'unknown'}`));
                }
            } else {
                console.log(chalk.red('❌ Invalid base64 format in SESSION_ID'));
            }
        } catch (error) {
            console.log(chalk.red('❌ Failed to parse SESSION_ID:'), error.message);
        }
    } else {
        console.log(chalk.yellow('ℹ️  No SESSION_ID found in settings, using existing session files'));
    }

    // Use Baileys' multi-file auth state (this will read the creds.json we just created)
    console.log(chalk.green('✓ Loading session using multi-file auth state'));
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    
    // Debug session state
    console.log(chalk.blue('🔍 Session state after loading:'));
    console.log(chalk.blue(`   - Registered: ${state.creds.registered ? 'YES' : 'NO'}`));
    console.log(chalk.blue(`   - Me ID: ${state.creds.me?.id || 'Not set'}`));
    console.log(chalk.blue(`   - Device ID: ${state.creds.deviceId || 'Not set'}`));
    
    return { state, saveCreds };
}

async function startsesi() {
  await new Promise((r) => setTimeout(r, 2000));
  console.clear();
  console.log(gradient.morning(figlet.textSync("Mk-Bot v1.0.1", { horizontalLayout: "full" })));
  console.log(chalk.gray("──────────────────────────────────────────────"));
  console.log(chalk.cyanBright("Initializing Mk System..."));
  console.log(chalk.gray("──────────────────────────────────────────────\n"));

  // Initialize session first
  const sessionResult = await initializeSession();
  
  // Check session status
  const hasExistingSession = sessionResult.state.creds.registered;
  console.log(chalk.white(`🔐 Session status: ${hasExistingSession ? '✅ REGISTERED' : '❌ NOT REGISTERED'}`));

  // Only ask for bot number if we don't have a registered session
  let botNumber = global.nomorbot;
  if (!hasExistingSession && (!botNumber || botNumber.trim() === "")) {
    console.log(chalk.yellow("\n📱 Bot Setup Required"));
    console.log(chalk.yellow("Enter bot number for pairing (ex: 26371xxxxxx): "));
    botNumber = await ask("> ");
    global.nomorbot = botNumber;
    
    // Save to settings
    const settingsPath = "./settings.js";
    if (fs.existsSync(settingsPath)) {
      let settingsContent = fs.readFileSync(settingsPath, "utf-8");
      settingsContent = settingsContent.replace(/global\.nomorbot\s*=\s*(['"`]).*?\1/, `global.nomorbot = '${botNumber}'`);
      fs.writeFileSync(settingsPath, settingsContent, "utf-8");
      console.log(chalk.green('✓ Bot number saved to settings.js'));
    }
  } else if (hasExistingSession) {
    console.log(chalk.green('✅ Using existing registered session'));
    botNumber = global.nomorbot || sessionResult.state.creds.me?.id?.split(':')[0];
  }

  // Owner info (only ask if not set)
  if (!global.ownernumber || global.ownernumber.trim() === "") {
    console.log(chalk.yellow("\n👤 Register owner number (ex: 26371xxxxxx): "));
    global.ownernumber = await ask("> ");
  }

  if (!global.ownername || global.ownername.trim() === "") {
    console.log(chalk.yellow("What is your name?: "));
    global.ownername = await ask("> ");
  }

  // Save owner info to settings
  try {
    const settingsPath = "./settings.js";
    if (fs.existsSync(settingsPath)) {
      let settingsContent = fs.readFileSync(settingsPath, "utf-8");
      settingsContent = settingsContent
        .replace(/global\.ownernumber\s*=\s*(['"`]).*?\1/, `global.ownernumber = '${global.ownernumber}'`)
        .replace(/global\.ownername\s*=\s*(['"`]).*?\1/, `global.ownername = '${global.ownername}'`);
      fs.writeFileSync(settingsPath, settingsContent, "utf-8");
      console.log(chalk.greenBright("✓ Owner data saved to settings.js"));
    }
  } catch (err) {
    console.log(chalk.red("Failed to save to settings.js:"), err);
  }

  console.log(chalk.cyanBright("\n📊 System Info:"));
  console.log(chalk.white(`├ Hostname : ${os.hostname()}`));
  console.log(chalk.white(`├ Platform : ${os.platform()} ${os.arch()}`));
  console.log(chalk.white(`├ RAM Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`));
  console.log(chalk.white(`├ Node.js  : ${process.version}`));
  console.log(chalk.white(`├ Owner    : ${global.ownername} (${global.ownernumber})`));
  console.log(chalk.white(`└ Bot      : ${botNumber || 'Not set'}`));

  console.log(chalk.gray("\n──────────────────────────────────────────────"));
  console.log(chalk.blueBright("🔗 Creating connection...\n"));

  // ========== BAILEYS CONNECTION ==========
  const msgRetryCounterCache = new NodeCache();

  const mking = makeWASocket({
    logger: Pino({ level: "fatal" }),
    printQRInTerminal: !sessionResult.state.creds.registered,
    browser: Browsers.macOS("Safari"),
    auth: {
      creds: sessionResult.state.creds,
      keys: makeCacheableSignalKeyStore(sessionResult.state.keys, Pino({ level: "fatal" })),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
  });

  // Handle credentials updates
  mking.ev.on("creds.update", sessionResult.saveCreds);

  // Connection event handler
  mking.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log(chalk.yellow("📱 QR Code received - Scan with WhatsApp"));
    }

    if (connection === "connecting") {
      console.log(chalk.yellow("🔄 Connecting to WhatsApp..."));
    } else if (connection === "open") {
      console.log(chalk.green.bold('✅ Connected Successfully to WhatsApp'));
      console.log(chalk.white(`🤖 Bot Name: ${mking.user?.name || 'Unknown'}`));
      console.log(chalk.white(`📞 Bot Number: ${mking.user?.id.split(':')[0] || 'Unknown'}`));
      
      // Update settings with actual bot number
      if (mking.user?.id) {
        const actualBotNumber = mking.user.id.split(':')[0];
        if (actualBotNumber !== global.nomorbot) {
          global.nomorbot = actualBotNumber;
          const settingsPath = "./settings.js";
          if (fs.existsSync(settingsPath)) {
            let settingsContent = fs.readFileSync(settingsPath, "utf-8");
            settingsContent = settingsContent.replace(/global\.nomorbot\s*=\s*(['"`]).*?\1/, `global.nomorbot = '${actualBotNumber}'`);
            fs.writeFileSync(settingsPath, settingsContent, "utf-8");
            console.log(chalk.green(`✓ Updated bot number in settings: ${actualBotNumber}`));
          }
        }
      }
      
      // Load modules after successful connection
      loadModule(mking);
      
      // Auto join group
      let inviteLink = "https://chat.whatsapp.com/Dx7HbtW7Cf12iCVjJBpD0x"; 
      try {
        let inviteCode = inviteLink.split('/')[3]; 
        await mking.groupAcceptInvite(inviteCode);
        console.log(chalk.green('✓ Joined support group'));
      } catch (error) {
        // Silent fail for group join
      }
    } else if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(chalk.red(`Connection closed. ${shouldReconnect ? 'Reconnecting...' : 'Please restart the bot.'}`));
      
      if (shouldReconnect) {
        setTimeout(() => {
          startsesi();
        }, 5000);
      }
    }
  });

  // Only request pairing code if not registered
  if (!sessionResult.state.creds.registered) {
    setTimeout(async () => {
      try {
        console.log(chalk.yellow('🔐 Requesting pairing code...'));
        const code = await mking.requestPairingCode(botNumber);
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.black.bgGreen("🎯 PAIRING CODE:"), chalk.white.bold(formattedCode));
        console.log(chalk.cyan("\n📱 How to pair:"));
        console.log(chalk.white("1. Open WhatsApp → Settings → Linked Devices"));
        console.log(chalk.white("2. Tap 'Link a Device'"));
        console.log(chalk.white("3. Enter the code above"));
        console.log(chalk.gray("──────────────────────────────────────────────"));
      } catch (error) {
        console.log(chalk.red('❌ Failed to get pairing code:'), error.message);
      }
    }, 3000);
  } else {
    console.log(chalk.green('✅ Session is pre-registered, no pairing needed'));
  }

  // Auto JPM functionality
  setInterval(async () => {
    try {
      if (!penting.autoJpm || !penting.autoJpm.status) return
      if (!penting.autoJpm.messages || !penting.autoJpm.messages.length) return

      let ms = penting.autoJpm.interval * 60000
      if (penting.autoJpm.type === "hour") ms *= 60
      if (penting.autoJpm.type === "day") ms *= 1440

      if (!penting.autoJpm._lastRun) penting.autoJpm._lastRun = Date.now()
      if (Date.now() - penting.autoJpm._lastRun < ms) return

      penting.autoJpm._lastRun = Date.now()

      if (typeof penting.autoJpm.lastIndex !== "number") penting.autoJpm.lastIndex = 0

      let idx = penting.autoJpm.lastIndex % penting.autoJpm.messages.length
      let pesan = penting.autoJpm.messages[idx]

      const allGroups = await mking.groupFetchAllParticipating()
      const groupIDs = Object.keys(allGroups).filter(id => !penting.blacklistJpm.includes(id))

      for (const gid of groupIDs) {
        try {
          if (pesan.type === "text") {
            await mking.sendMessage(gid, { text: pesan.text })
          } else {
            if (!fs.existsSync(pesan.path)) continue
            await mking.sendMessage(gid, {
              [pesan.type]: fs.readFileSync(pesan.path),
              caption: pesan.caption || ""
            })
          }
          await sleep(global.delayJpm || 4000)
        } catch (e) {
          console.error(`❌ Failed to send to ${gid}:`, e.message)
        }
      }

      penting.autoJpm.lastIndex = idx + 1
      savePenting()
    } catch (err) {
      console.error("❌ AutoJpm Error:", err.message)
    }
  }, 60 * 1000)
  
  // Call event handler
  mking.ev.on('call', async (call) => {
    if (!global.anticall) return
    for (let ff of call) {
      if (ff.isGroup == false) {
        if (ff.status == "offer") {
          let sendcall = await mking.sendMessage(ff.from, {
            text: `@${ff.from.split("@")[0]} Sorry, I will block you because the bot owner has activated the *Anticall* feature\nIf this was accidental, please contact the owner immediately to unblock`, 
            contextInfo: {
              mentionedJid: [ff.from], 
              externalAdReply: {
                thumbnail: fs.readFileSync("./media/warning.jpg"), 
                title: "｢ CALL DETECTED ｣", 
                previewType: "PHOTO"
              }
            }
          }, {quoted: null})
          mking.sendContact(ff.from, [global.ownernumber], "Developer WhatsApp Bot", sendcall)
          await sleep(10000)
          await mking.updateBlockStatus(ff.from, "block")
        }
      }
    }
  })
  
  // Message event handler
  mking.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const kay = chatUpdate.messages[0];
      if (!kay.message) return;

      kay.message = Object.keys(kay.message)[0] === "ephemeralMessage"
        ? kay.message.ephemeralMessage.message
        : kay.message;

      const m = smsg(mking, kay, store);
      
      if (!m.message) return
      m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
      if (m.isBaileys) return
      
      if (m.key && m.key.remoteJid === 'status@broadcast') {
        if (global.autoreadsw) mking.readMessages([m.key])
      }
      
      let fill = [global.ownernumber]
      if (!mking.public && !fill.includes(m.key.remoteJid.split("@")[0]) && !m.key.fromMe && chatUpdate.type === 'notify') return
      if (global.autoread) mking.readMessages([m.key])

      if (
        !mking.public &&
        !(
          kay.key.fromMe ||
          (kay.key.participant && global.ownernumber.includes(kay.key.participant.split("@")[0])) ||
          global.ownernumber.includes(m.sender.split("@")[0])
        ) &&
        chatUpdate.type === "notify"
      ) {
        return;
      }

     // mking.public = true;

      if (kay.key.id.startsWith("BAE5") && kay.key.id.length === 16) return;

      if (!m.key.fromMe && m.key.remoteJid.endsWith("@s.whatsapp.net") && m.text) {
        handleIncomingMessage(mking, m.key.remoteJid);
      }

      require("./case")(mking, m, chatUpdate, store);
    } catch (err) {
      console.error("Error while processing message:", err);
    }
  });

  // ========== COMPLETE UTILITY METHODS ==========
  
  mking.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    mking.sendMessage(
      jid,
      {
        text: text,
        contextInfo: {
          mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(
            (v) => v[1] + "@s.whatsapp.net",
          ),
        },
        ...options,
      },
      {
        quoted,
      },
    );
    
  mking.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };
  
  mking.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = mking.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = {
          id,
          name: contact.notify,
        };
    }
  });
  
  mking.getName = (jid, withoutContact = false) => {
    let id = mking.decodeJid(jid);
    withoutContact = mking.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = mking.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international")
        );
      });
    else
      v = id === "0@s.whatsapp.net"
        ? { id, name: "WhatsApp" }
        : id === mking.decodeJid(mking.user.id)
          ? mking.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international")
    );
  };
  
  mking.parseMention = (text = "") => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (v) => v[1] + "@s.whatsapp.net",
    );
  };
  
  mking.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await mking.getName(i),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await mking.getName(i)}\nFN:${await mking.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${global.ytname || ''}\nitem2.X-ABLabel:YouTube\nitem3.URL:${global.socialm || ''}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${global.location || ''};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      });
    }
    mking.sendMessage(
      jid,
      {
        contacts: {
          displayName: `${list.length} Contact`,
          contacts: list,
        },
        ...opts,
      },
      {
        quoted,
      },
    );
  };
  
  mking.setStatus = (status) => {
    mking.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

  mking.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    return await mking.sendMessage(
      jid,
      {
        image: buffer,
        caption: caption,
        ...options,
      },
      {
        quoted,
      },
    );
  };
  
  mking.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }
    await mking.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      },
    ).then((response) => {
      fs.unlinkSync(buffer);
      return response;
    });
  };
  
  mking.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }
    await mking.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      },
    );
    return buffer;
  };
  
  mking.sendImageAsStickerAvatar = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImgAvatar(buff, options);
    } else {
      buffer = await imageToWebpAvatar(buff);
    }
    await mking.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      },
    ).then((response) => {
      fs.unlinkSync(buffer);
      return response;
    });
  };
  
  mking.sendVideoAsStickerAvatar = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split`,`[1], "base64")
        : /^https?:\/\//.test(path)
          ? await getBuffer(path)
          : fs.existsSync(path)
            ? fs.readFileSync(path)
            : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVidAvatar(buff, options);
    } else {
      buffer = await videoToWebpAvatar(buff);
    }
    await mking.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      },
    );
    return buffer;
  };
  
  mking.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype;
    if (options.readViewOnce) {
      message.message =
        message.message &&
        message.message.ephemeralMessage &&
        message.message.ephemeralMessage.message
          ? message.message.ephemeralMessage.message
          : message.message || undefined;
      vtype = Object.keys(message.message.viewOnceMessage.message)[0];
      delete (message.message && message.message.ignore
        ? message.message.ignore
        : message.message || undefined);
      delete message.message.viewOnceMessage.message[vtype].viewOnce;
      message.message = {
        ...message.message.viewOnceMessage.message,
      };
    }
    let mtype = Object.keys(message.message)[0];
    let content = await generateForwardMessageContent(message, forceForward);
    let ctype = Object.keys(content)[0];
    let context = {};
    if (mtype != "conversation") context = message.message[mtype].contextInfo;
    content[ctype].contextInfo = {
      ...context,
      ...content[ctype].contextInfo,
    };
    const waMessage = await generateWAMessageFromContent(
      jid,
      content,
      options
        ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo
              ? {
                  contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo,
                  },
                }
              : {}),
          }
        : {},
    );
    await mking.relayMessage(jid, waMessage.message, {
      messageId: waMessage.key.id,
    });
    return waMessage;
  };
  
  mking.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    let trueFileName;
    if (type.ext == "ogg" || type.ext == "opus") {
      trueFileName = attachExtension ? filename + ".mp3" : filename;
      await fs.writeFileSync(trueFileName, buffer);
    } else {
      trueFileName = attachExtension ? filename + "." + type.ext : filename;
      await fs.writeFileSync(trueFileName, buffer);
    }
    return trueFileName;
  };
  
  mking.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };
  
  mking.getFile = async (PATH, save) => {
    let res;
    let data = Buffer.isBuffer(PATH)
      ? PATH
      : /^data:.*?\/.*?;base64,/i.test(PATH)
        ? Buffer.from(PATH.split`,`[1], "base64")
        : /^https?:\/\//.test(PATH)
          ? await (res = await getBuffer(PATH))
          : fs.existsSync(PATH)
            ? ((filename = PATH), fs.readFileSync(PATH))
            : typeof PATH === "string"
              ? PATH
              : Buffer.alloc(0);
    let type = (await FileType.fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    if (data && save) fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      size: await getSizeMedia(data),
      ...type,
      data,
    };
  };
  
  mking.sendText = (jid, text, quoted = "", options) =>
    mking.sendMessage(
      jid,
      {
        text: text,
        ...options,
      },
      {
        quoted,
      },
    );
    
  mking.serializeM = (m) => smsg(mking, m, store);
  
  mking.sendFile = async (jid, media, options = {}) => {
    let file = await mking.getFile(media);
    let mime = file.ext,
      type;
    // Determine file type based on extension
    if (mime == "mp3") {
      type = "audio";
      options.mimetype = "audio/mpeg";
      options.ptt = options.ptt || false;
    } else if (mime == "jpg" || mime == "jpeg" || mime == "png") {
      type = "image";
    } else if (mime == "webp") {
      type = "sticker";
    } else if (mime == "mp4") {
      type = "video";
    } else {
      type = "document";
    }
    // Add caption and quoted to message sending
    return mking.sendMessage(
      jid,
      {
        [type]: file.data,
        caption: options.caption || "", // Add caption if exists
        ...options,
      },
      {
        quoted: options.quoted || "", // Add quoted if exists
        ...options,
      },
    );
  };
  
  mking.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    let mime = "";
    let res = await axios.head(url);
    mime = res.headers["content-type"];
    if (mime.split("/")[1] === "gif") {
      return mking.sendMessage(
        jid,
        {
          video: await getBuffer(url),
          caption: caption,
          gifPlayback: true,
          ...options,
        },
        {
          quoted: quoted,
          ...options,
        },
      );
    }
    let type = mime.split("/")[0] + "Message";
    if (mime === "application/pdf") {
      return mking.sendMessage(
        jid,
        {
          document: await getBuffer(url),
          mimetype: "application/pdf",
          caption: caption,
          ...options,
        },
        {
          quoted: quoted,
          ...options,
        },
      );
    }
    if (mime.split("/")[0] === "image") {
      return mking.sendMessage(
        jid,
        {
          image: await getBuffer(url),
          caption: caption,
          ...options,
        },
        {
          quoted: quoted,
          ...options,
        },
      );
    }
    if (mime.split("/")[0] === "video") {
      return mking.sendMessage(
        jid,
        {
          video: await getBuffer(url),
          caption: caption,
          mimetype: "video/mp4",
          ...options,
        },
        {
          quoted: quoted,
          ...options,
        },
      );
    }
    if (mime.split("/")[0] === "audio") {
      return mking.sendMessage(
        jid,
        {
          audio: await getBuffer(url),
          caption: caption,
          mimetype: "audio/mpeg",
          ...options,
        },
        {
          quoted: quoted,
          ...options,
        },
      );
    }
  };

  // Poll messages update handler
  mking.ev.on("messages.update", async (chatUpdate) => {
    for (const { key, update } of chatUpdate) {
      if (update.pollUpdates && key.fromMe) {
        const pollCreation = await getMessage(key);
        if (pollCreation) {
          const pollUpdate = await getAggregateVotesInPollMessage({
            message: pollCreation,
            pollUpdates: update.pollUpdates,
          });
          var toCmd = pollUpdate.filter((v) => v.voters.length !== 0)[0]?.name;
          if (toCmd == undefined) return;
          var prefCmd = prefix + toCmd;
          mking.appenTextMessage(prefCmd, chatUpdate);
        }
      }
    }
  });

  return mking;
}

// Start the bot
startsesi().catch(console.error);

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
