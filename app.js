const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")
const fs = require("fs")
const readLastLines = require('read-last-lines');
require('./tools')
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: 'log.log',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000 || process.env.PORT

function isNumber(val) {
    return typeof val === 'number';
}
app.get('/log', (req, res) => {
    try {
        let lineCount = 30
        readLastLines.read('log.log', lineCount)
            .then((lines) => {
                res.end(lines)
            });
    } catch (error) {
        res.end('/log')
    }
})
app.get('*', (req, res) => {
    res.end('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const intervalLimit = 30;
const prefix = config.prefix;
const startCommand = (prefix + "discoo");
const defaultColor = "040505";
// 759040727845437450 => bugsbunny
// 656226413892075541 => umut
// 701706424492883978 => oskan
// 456522796147933184 => alifatih42x
const developerID = "317264858674626560"
const developersIDs = ["317264858674626560", "449291881629745162"];
const userIDs = ["317264858674626560", "449291881629745162", "656226413892075541", "701706424492883978", "456522796147933184","692490081017004082"];

var interval
var intervalCount = 0;
var isStarted = false
var xx = "-------------------------------------------------------------------------------------------------------------------------------------------"

client.on('ready', () => {
    // console.log("\x1b[41m ");
    // logdir = "log.json"
    // if (!fs.existsSync(logdir)) {
    //     fs.writeFile(logdir, '{}', function (err) {
    //         if (err) throw err;
    //         console.log('Log File is created successfully.');
    //       });
    // }
    // create a custom timestamp format for log statements

    console.log(`Logged in as ${client.user.tag}! Current version 1.0.8`);
});
client.on('message', async message => {
    try {
        var serverid = message.guild.id
        var servername = message.guild.name
        var userid = message.author.id
        var username = message.author.username + "#" + message.author.discriminator
    } catch (error) {
    }
    if (!isStarted && userIDs.indexOf(userid) != -1) {
        if (message.content === startCommand) {
            if (!message.guild) return;
            if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
                log.error("SERVER_ID: ```" + serverid + "``` SERVER_NAME: ```" + servername + "``` USER_ID:```null``` USER_NAME:```null``` ```BOTUN_ROL_YETKISI_YOK```\n" + xx);
                message.reply(`Rolleri yönetme yetkim yok. :(`);
                console.log('HAS NO MANAGE_ROLES');
                isStarted = false
                return
            };
            var colors = ['070809', 'd1d3d4', 'fd2b2b', 'ffffff', 'ff7722', 'fff01f', '57ff00', '1a57e1', '00c0f3', '865aff', '0d0e0e', 'e0218a', 'ff41bc'];

            message.guild.roles.cache.map(item => {
                // 852501790427709450 - floppa - rgb
                // mine 848727673001345034
                if (item.id == `852501790427709450` || item.id == `848727673001345034`) {
                    try {
                        log.info("SERVER_ID: ```" + serverid + "``` SERVER_NAME: ```" + servername + "``` USER_NAME: ```" + username + "``` USER_ID: ```" + userid + "``` ```BOT_BASLATILDI```\n" + xx);
                        message.reply(`Disco botu başlatıldı! Limit: ${intervalLimit} saniye`);
                        console.log(`\nline36: Disco botu başlatıldı! Limit: ${intervalLimit} saniye`);
                        isStarted = true;
                        interval = setInterval(() => {
                            var random = Math.floor(Math.random() * colors.length);
                            item.edit({
                                color: colors[random]
                            })
                            intervalCount += 0.8;
                            if (intervalCount >= intervalLimit) {
                                message.reply(`Disco botu durdu. Limit: ${intervalLimit} saniye`);
                                console.log(`\nline49: Disco botu durdu. Limit: ${intervalLimit} saniye`);
                                clearInterval(interval)
                                console.log('interval cleared');
                                intervalCount = 0
                                isStarted = false
                            }
                        }, 0.8 * 1000)
                    } catch (error) {
                        console.log('catched\n', error);
                    }
                    console.log('here we are');
                }
            })
        }
    }

    else if (userIDs.indexOf(userid) == -1 && message.content === startCommand) {
        console.log('\nline73: Yetkisiz işlem yapıldı. Ve haddi bildirildi.\n');

        log.warn("SERVER_ID: ```" + serverid + "``` SERVER_NAME: ```" + servername + "``` USER_NAME: ```" + username + "``` USER_ID: ```" + userid + "``` ```BOTU_YETKISIZ_CALISTIRMA```\n" + xx);
        let links = [
            `https://cdn.discordapp.com/attachments/807983715770826782/808000446589304832/final_601aac5c731c1a0033f03f88_660120.mp4`,
            `https://cdn.discordapp.com/attachments/849078838759129099/849407675761688647/video.mp4`,
        ]
        let randomNum = Math.floor(Math.random() * links.length)
        var msg = `Disco botunu çalıştırmak için gerekli yetkin yok!!! || ${links[randomNum]} ||`;
        client.users.fetch(userid, false).then((user) => {
            user.send(msg);
        });
    }
    if (isStarted && userIDs.indexOf(userid) != -1 && message.content == (prefix + "stop")) {
        clearInterval(interval)
        intervalCount = 0;
        isStarted = false
        // item.edit({
        //     color: defaultColor
        // })
        message.reply(`Disco botu durduruldu. Limit: ${intervalLimit} saniye`);
        console.log(`\nline70: Disco botu ${prefix+"stop"} komutu ile durduruldu. Limit: ${intervalLimit} saniye`);
    }
    if (message.content.startsWith((prefix + "logdisco")) && userid == developerID) {


        var lineCount
        lineCount = message.content.replace((prefix + "logdisco") + " ", '')
        lineCount = parseInt(lineCount);
        (isNumber(lineCount) && lineCount > 1) ? ((lineCount % 2 == 1) ? (lineCount = (lineCount + 1) * 2) : lineCount *= 2) : lineCount = 10;

        var lines = `null`
        readLastLines.read('log.log', lineCount)
            .then((lines) => {
                linesArr = lines.split("\r")
                client.users.fetch(developerID, false).then((user) => {
                    if (!lines) {
                        lines = `Log dosyası boş`
                    }
                    user.send(lines);
                });
            });
        log.info("SERVER_ID: ```" + serverid + "``` SERVER_NAME: ```" + servername + "``` USER_NAME: ```" + username + "``` USER_ID: ```" + userid + "``` ```LOG_ISLEMI```\n" + xx);
    } else if (message.content.startsWith((prefix + "logdisco")) && userid != developerID) {
        log.warn("SERVER_ID: ```" + serverid + "``` SERVER_NAME: ```" + servername + "``` USER_NAME: ```" + username + "``` USER_ID: ```" + userid + "``` ```YETKISIZ_LOG_ISLEMI```\n" + xx);
    }


    // botu durdurma komutu

    
});

client.login(process.env.BOT_TOKEN);