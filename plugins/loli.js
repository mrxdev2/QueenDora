let handler = async (m, { mking, command }) => {
    const defaultMenu = `Click here bro`;
    mking.sendMessage(m.chat, {
        location: {
            degreesLatitude: -6.2088, // Change with location latitude
            degreesLongitude: 106.8456 // Change with location longitude
        },
        caption: defaultMenu,
        footer: foother,
        buttons: [
                {
                buttonId: `huu`,
                buttonText: {
                    displayText: '\nI am a pedo:v'
                },
                type: 1
            }
        ],
        headerType: 6,
        viewOnce: true
    }, { quoted: m });
};

handler.command = ["loli"]
module.exports = handler