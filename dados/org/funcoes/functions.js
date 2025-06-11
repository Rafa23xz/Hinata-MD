const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');
const cfonts = require('cfonts');
const Crypto = require('crypto');
const chalk = require('chalk');
const exec = require("child_process").exec;
const log = console.debug;
const mimetype = require('mime-types');
const cheerio = require('cheerio');
const { spawn } = require("child_process");
const ff = require('fluent-ffmpeg');
const { JSDOM } = require('jsdom');
const FormData = require('form-data');
const qs = require('qs');
const { fromBuffer } = require('file-type');
const toMs = require('ms');
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment-timezone');

var corzinhas = ["red","green","yellow","blue","magenta","cyan","white","gray","redBright","greenBright","yellowBright","blueBright","magentaBright","cyanBright","whiteBright"];
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor5 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];

function convertSticker(base64, author, pack){
 return new Promise((resolve, reject) =>{
axios('https://sticker-api-tpe3wet7da-uc.a.run.app/prepareWebp', {
method: 'POST',
headers: {
Accept: 'application/json, text/plain, */*',
'Content-Type': 'application/json;charset=utf-8',
'User-Agent': 'axios/0.21.1',
'Content-Length': 151330
},
data: `{"image": "${base64}","stickerMetadata":{"author":"${author}","pack":"${pack}","keepScale":true,"removebg":"HQ"},"sessionInfo":{"WA_VERSION":"2.2106.5","PAGE_UA":"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36","WA_AUTOMATE_VERSION":"3.6.10 UPDATE AVAILABLE: 3.6.11","BROWSER_VERSION":"HeadlessChrome/88.0.4324.190","OS":"Windows Server 2016","START_TS":1614310326309,"NUM":"6247","LAUNCH_TIME_MS":7934,"PHONE_VERSION":"2.20.205.16"},"config":{"sessionId":"session","headless":true,"qrTimeout":20,"authTimeout":0,"cacheEnabled":false,"useChrome":true,"killProcessOnBrowserClose":true,"throwErrorOnTosBlock":false,"chromiumArgs":["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],"executablePath":"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","skipBrokenMethodsCheck":true,"stickerServerEndpoint":true}}`
}).then(({data}) => {
resolve(data.webpBase64);
}).catch(reject);
});
}

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.json())
 .then(json => {
resolve(json)
}).catch((err) => {
reject(err)
})
})


exports.fetchText = fetchText = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.text()).then(text => {
resolve(text)
}).catch((err) => {
reject(err)
})
})

const getBuffer = async (url, opcoes) => {
try {
opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
	'DNT': 1,
	'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})
return post.data
} catch (erro) {
console.log(`Erro identificado: ${erro}`)
}
}

const randomBytes = (length) => {
return Crypto.randomBytes(length);
};

const generateMessageID = () => {
return randomBytes(10).toString('hex').toUpperCase();
};

const getExtension = async (type) => {
return await mimetype.extension(type)
}

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

const getMembros = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == null) admins.push(i.id)
}
return admins
}

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const banner2 = cfonts.render(('Canal: HTTPS://YOUTUBE.COM/@ALEATORYCONTEUDOS'), {
font: 'console',
align: 'center',
gradrient: [`${cor4}`,`${cor2}`], 
colors: [`${cor3}`,`${cor1}`,`${cor5}`],
lineHeight: 1
});
 
const banner3 = cfonts.render((`ALEATORY MD\n4.1`), {
font: 'slick',             
align: 'center',           
colors: [`${cor1}`,`${cor3}`,`${cor4}`,`${cor2}`],
background: 'transparent',  
letterSpacing: 1,           
lineHeight: 1,            
space: true,               
maxLength: '0',            
gradrient: [`${cor4}`,`${cor2}`],     
independentGradient: false, 
transitionGradient: false, 
env: 'node'
});  
 

function temporizador(segundos){
function tempo(s){
return (s < 10 ? '0' : '') + s;
}
var horas = Math.floor(segundos / (60*60));
var minutos = Math.floor(segundos % (60*60) / 60);
var segundos = Math.floor(segundos % 60);
return `${tempo(horas)}:${tempo(minutos)}:${tempo(segundos)}`;
}

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

function recognize(filename, config = {}) {
const options = getOptions(config)
const binary = config.binary || "tesseract"
const command = [binary, `"${filename}"`, "stdout", ...options].join(" ")
if (config.debug) log("command", command)
return new Promise((resolve, reject) => {
exec(command, (error, stdout, stderr) => {
if(config.debug) log(stderr)
if(error) reject(error)
resolve(stdout)
})
})
}

function getOptions(config) {
const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]
return Object.entries(config).map(([key, value]) => {
if (["debug", "presets", "binary"].includes(key)) return
if (key === "lang") return `-l ${value}`
if (ocrOptions.includes(key)) return `--${key} ${value}`
return `-c ${key}=${value}`
}).concat(config.presets).filter(Boolean)
}

authorname = 'ALEATORY-MD-3.0'
packname = '-JR-'

const usedCommandRecently = new Set()

//chyt = `558198923680@s.whatsapp.net`

const isFiltered = (userId) => !!usedCommandRecently.has(userId)

const addFilter = (userId) => {
usedCommandRecently.add(userId)
setTimeout(() => usedCommandRecently.delete(userId), 2000) 
}

function _0x34aeed(_0x48c920,_0x24de41,_0x1ea4c4,_0x2cbd76,_0x510aab){return _0x4d24(_0x510aab- -0x2d3,_0x1ea4c4);}function _0x61de1e(_0x31628e,_0x23a66e,_0x26f000,_0x35aaf5,_0xd6c5ea){return _0x4d24(_0x31628e-0xcc,_0xd6c5ea);}(function(_0x122e75,_0x23ea2a){function _0x1c7493(_0x24fd5b,_0xa1e77c,_0x3d7307,_0x2f60f1,_0x5f5137){return _0x4d24(_0x24fd5b-0x2f7,_0x5f5137);}function _0x4f7eeb(_0x56d39e,_0x323fad,_0x56b2b7,_0x3b93f8,_0x463e26){return _0x4d24(_0x56d39e- -0x31,_0x3b93f8);}function _0x1644ca(_0x4845c4,_0x3ebd79,_0xe33079,_0x387cd9,_0xde5e17){return _0x4d24(_0xe33079- -0x130,_0x4845c4);}function _0x3ea12b(_0xcc640e,_0x19eb2f,_0x2234cf,_0x594c49,_0x2a2e9f){return _0x4d24(_0x2a2e9f-0x1,_0xcc640e);}function _0x225af8(_0x3f07e0,_0x2c1c71,_0x231a64,_0x50f798,_0x343b17){return _0x4d24(_0x231a64-0x123,_0x3f07e0);}const _0x53c4b2=_0x122e75();while(!![]){try{const _0x52f5cb=parseInt(_0x1c7493(0x412,0x416,0x419,0x40d,'veYP'))/(0x1*-0x2231+-0xf2*0x1+0x2324)+parseInt(_0x1c7493(0x405,0x3f2,0x3f8,0x419,'%8P5'))/(0x1c93+-0x13ae+-0x8e3)*(parseInt(_0x1c7493(0x408,0x3ff,0x3f4,0x3fd,'Q0E2'))/(0x1edd+-0xa01*0x2+0x2*-0x56c))+parseInt(_0x1c7493(0x410,0x3ff,0x420,0x3fa,'v(dL'))/(0x593*-0x2+0x5*-0x36f+0x1c55)+-parseInt(_0x1644ca('0whn',-0xf,-0x6,-0x16,-0xa))/(0xe62+0xbf*0xc+0x2f*-0x7f)*(-parseInt(_0x1c7493(0x42b,0x423,0x424,0x42b,'DuJj'))/(-0x7*-0x19d+0x1607+-0x214c))+-parseInt(_0x1644ca('KIE]',-0x25,-0x19,-0xe,-0x10))/(0x2e+-0x92f+0x908)*(-parseInt(_0x3ea12b('ic)c',0x132,0x122,0x121,0x133))/(-0x1bdf+0x1c36+-0x1*0x4f))+parseInt(_0x1c7493(0x417,0x405,0x41a,0x401,'L%YN'))/(-0x1d*0x102+0x263e+0x1*-0x8fb)+parseInt(_0x225af8('3$V0',0x264,0x25b,0x24c,0x250))/(0x9*0x225+-0x9a7*-0x1+-0x1cea)*(-parseInt(_0x1644ca('(nS1',0x3,-0x12,-0x28,-0x15))/(-0x1f14+0x1*0x1407+0xb18));if(_0x52f5cb===_0x23ea2a)break;else _0x53c4b2['push'](_0x53c4b2['shift']());}catch(_0x1be73d){_0x53c4b2['push'](_0x53c4b2['shift']());}}}(_0x2d8a,-0x3fe5c+-0x2*-0x4a603+-0x65*-0xd55));function _0x4d24(_0xdabe9d,_0x521ea7){const _0xe7a6df=_0x2d8a();return _0x4d24=function(_0x9638f4,_0x549d04){_0x9638f4=_0x9638f4-(0x238f+0x1cb3+-0x3f36);let _0x25950e=_0xe7a6df[_0x9638f4];if(_0x4d24['sREfgO']===undefined){var _0xc0474d=function(_0x51e3c0){const _0x35d2a8='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x473e62='',_0x3b77ab='',_0x30c983=_0x473e62+_0xc0474d;for(let _0x3b3089=-0x24bd+0x2*0xc11+-0xc9b*-0x1,_0x502c44,_0x4075e8,_0x159f32=-0x1*-0x147a+-0x3*0x17b+-0x1009;_0x4075e8=_0x51e3c0['charAt'](_0x159f32++);~_0x4075e8&&(_0x502c44=_0x3b3089%(0xe1*-0x18+-0xc76*-0x1+0x8a6)?_0x502c44*(0x242d+0x1f2a+-0xd6b*0x5)+_0x4075e8:_0x4075e8,_0x3b3089++%(0x1*0x38c+0x1bfd+-0x1*0x1f85))?_0x473e62+=_0x30c983['charCodeAt'](_0x159f32+(0x1ebb*0x1+-0xf4*0xc+-0x1f*0x9f))-(0xb89*0x1+0x1*-0xac5+-0x2*0x5d)!==-0xd*0x33+0x1d0c+0xd*-0x209?String['fromCharCode'](0x925*-0x3+0x2303*0x1+-0x695&_0x502c44>>(-(-0x183d+0x74+-0x1*-0x17cb)*_0x3b3089&-0x6d*0x43+-0x18f7+0x3584*0x1)):_0x3b3089:-0x11b5+0x914*0x2+-0x73){_0x4075e8=_0x35d2a8['indexOf'](_0x4075e8);}for(let _0x9c2536=-0x1c*-0x2b+0x1131*-0x1+-0xc7d*-0x1,_0x4821ae=_0x473e62['length'];_0x9c2536<_0x4821ae;_0x9c2536++){_0x3b77ab+='%'+('00'+_0x473e62['charCodeAt'](_0x9c2536)['toString'](-0x13d1+-0x17*-0x129+-0x6ce))['slice'](-(-0x17f7+-0x2203+0x39fc));}return decodeURIComponent(_0x3b77ab);};const _0xcf3fe3=function(_0x50e105,_0x5eaed5){let _0x303865=[],_0x232c71=0x2*-0x2fb+0x258d*0x1+0x1*-0x1f97,_0x26acf7,_0x44ab8c='';_0x50e105=_0xc0474d(_0x50e105);let _0x2c32d3;for(_0x2c32d3=-0x2c*-0xbb+0x2*0x565+-0x2aee;_0x2c32d3<-0x2*-0x4d+-0x1b88+0x2cb*0xa;_0x2c32d3++){_0x303865[_0x2c32d3]=_0x2c32d3;}for(_0x2c32d3=-0x125e+0x822+0xa3c;_0x2c32d3<-0x599+0x3ce*0xa+-0x53*0x61;_0x2c32d3++){_0x232c71=(_0x232c71+_0x303865[_0x2c32d3]+_0x5eaed5['charCodeAt'](_0x2c32d3%_0x5eaed5['length']))%(-0x1463+0x1212+0x351),_0x26acf7=_0x303865[_0x2c32d3],_0x303865[_0x2c32d3]=_0x303865[_0x232c71],_0x303865[_0x232c71]=_0x26acf7;}_0x2c32d3=0xf*-0x16+-0x1fcf+0x2119,_0x232c71=0x6*-0x495+0x95a+-0x1b*-0xac;for(let _0x5c4169=-0x1d*0x10+-0x1650+0x1820;_0x5c4169<_0x50e105['length'];_0x5c4169++){_0x2c32d3=(_0x2c32d3+(0x18f7+0x1b5b+-0x3451))%(0xffe+0x1*0x5ea+-0x18*0xdf),_0x232c71=(_0x232c71+_0x303865[_0x2c32d3])%(0x8*0x4c3+-0x270f+0x1*0x1f7),_0x26acf7=_0x303865[_0x2c32d3],_0x303865[_0x2c32d3]=_0x303865[_0x232c71],_0x303865[_0x232c71]=_0x26acf7,_0x44ab8c+=String['fromCharCode'](_0x50e105['charCodeAt'](_0x5c4169)^_0x303865[(_0x303865[_0x2c32d3]+_0x303865[_0x232c71])%(0x6d4*0x2+0x21b0+-0x2e58)]);}return _0x44ab8c;};_0x4d24['wFQwpP']=_0xcf3fe3,_0xdabe9d=arguments,_0x4d24['sREfgO']=!![];}const _0x5e5c90=_0xe7a6df[-0xfef*-0x2+-0x1769+-0x875],_0x381eb2=_0x9638f4+_0x5e5c90,_0x21e976=_0xdabe9d[_0x381eb2];if(!_0x21e976){if(_0x4d24['cuTbEh']===undefined){const _0x1dd76a=function(_0x4c186e){this['adVIuq']=_0x4c186e,this['sjGnoW']=[0x1*-0xf2+0xccc+-0xbd9,0x1c93+-0x13ae+-0x8e5,0x1edd+-0xa01*0x2+0x1*-0xadb],this['WnRmHP']=function(){return'newState';},this['QeUnSJ']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['etHBru']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x1dd76a['prototype']['aeRVgX']=function(){const _0x1f36c7=new RegExp(this['QeUnSJ']+this['etHBru']),_0x122e75=_0x1f36c7['test'](this['WnRmHP']['toString']())?--this['sjGnoW'][0x593*-0x2+0x5*-0x36f+0x1c52]:--this['sjGnoW'][0xe62+0xbf*0xc+0x3a*-0x67];return this['Zqabhg'](_0x122e75);},_0x1dd76a['prototype']['Zqabhg']=function(_0x23ea2a){if(!Boolean(~_0x23ea2a))return _0x23ea2a;return this['AQWNji'](this['adVIuq']);},_0x1dd76a['prototype']['AQWNji']=function(_0x53c4b2){for(let _0x52f5cb=-0x7*-0x19d+0x1607+-0x2152,_0x1be73d=this['sjGnoW']['length'];_0x52f5cb<_0x1be73d;_0x52f5cb++){this['sjGnoW']['push'](Math['round'](Math['random']())),_0x1be73d=this['sjGnoW']['length'];}return _0x53c4b2(this['sjGnoW'][0x2e+-0x92f+0x901]);},new _0x1dd76a(_0x4d24)['aeRVgX'](),_0x4d24['cuTbEh']=!![];}_0x25950e=_0x4d24['wFQwpP'](_0x25950e,_0x549d04),_0xdabe9d[_0x381eb2]=_0x25950e;}else _0x25950e=_0x21e976;return _0x25950e;},_0x4d24(_0xdabe9d,_0x521ea7);}const _0xd37038=(function(){let _0x166ca7=!![];return function(_0x23a130,_0x212759){const _0x286937=_0x166ca7?function(){function _0x49053e(_0x24f7df,_0x4207d9,_0x1ba4a8,_0x1027a2,_0x22ca3c){return _0x4d24(_0x22ca3c-0x13d,_0x24f7df);}if(_0x212759){const _0x5d84e2=_0x212759[_0x49053e('L%YN',0x25a,0x27e,0x271,0x268)](_0x23a130,arguments);return _0x212759=null,_0x5d84e2;}}:function(){};return _0x166ca7=![],_0x286937;};}());function _0x2d8a(){const _0x4d5ae9=['WQFcUmoxm8oL','v8o6DWBcO8oJWORcOCouAt8qwa','W6HHjxHr','W5ldGbD7WR1QvZaptmkeW7P8','aSktamkNWOWbW6dcV8kbbbpcRmkw','fdBcIa','bSoCl3lcNSo3W7NcMSov','WRz0WRb1WR4','feL8W47dJCoAWO4pjXtdKI4bsG','W6m1WQXupa','wv7dLJ0j','stFcNSoqW4mEi8oGW4nfnINdUCkR','fCk/Av/dSq','waxcS8kMWP0','ACk+h8kWWO0','s38qWQ3cPG','y8klD27dTa','gamFmLi','gKZcQmo5W4JcJ0j0WOFdTSo9','raG7WPBcJq','sSoEW7zuCxdcQ8kUWQ9rrSkUjW','Asmuwva','W5jswK92W7ZcRYNdMq','dgNdUSkqWOG','WRbaFSoebHH8ma','jW/cUmkwW7SoeCocp8o7kG','luSQW6rcffPckdqXkGC','WR3dOrK6W48','W43dRqRdPCkhWPWytCo7ea','gMLv','W57dISk9ESok','W6mpW4xcGvu','gaNcG3ztWPBcVrZdJCkwlCkxtG','v8ketMtcJW','uJhcRmoUW5FdJ8oUWPVcVeHhWP4L','WQHGWQyswW','WOa6W7yyW7PZW6HOW7i','bSkGkuldOa','ga7cHcW8W4tdHZZdQa','W6n6WOdcLHipW6VcH8kQtSkH','d8oUomkvatmJcmkXt25mW6S','W5NcMCoVEH3cTSo0W5auWOmF','W63cUh17WRG','WPtcVuVcRSkF','dmoToCkuqwzrl8kECW','kNhcHWjJjmkECa'];_0x2d8a=function(){return _0x4d5ae9;};return _0x2d8a();}function _0x3b029b(_0x22ba1b,_0x18751d,_0x1aa6ca,_0x4c106d,_0x383ad7){return _0x4d24(_0x1aa6ca- -0x2b6,_0x383ad7);}const _0x233ee4=_0xd37038(this,function(){function _0x316583(_0x57f7c3,_0x51c2d2,_0x3693f2,_0x40b55c,_0x406c58){return _0x4d24(_0x57f7c3-0x39b,_0x406c58);}function _0xbfa08(_0x5db11e,_0x53061a,_0x4b1ef9,_0x31d37b,_0x1c9c9c){return _0x4d24(_0x31d37b-0x3c8,_0x53061a);}function _0x4fa8e7(_0x5623fe,_0x31be30,_0x4e36ec,_0x491833,_0x10eb4f){return _0x4d24(_0x4e36ec- -0xb1,_0x491833);}function _0x36599e(_0x13ff5c,_0x3c40b2,_0x301845,_0x153e52,_0x2ab451){return _0x4d24(_0x153e52- -0x54,_0x3c40b2);}const _0x55c8c1={};_0x55c8c1[_0x4fa8e7(0x74,0x99,0x82,'US)j',0x87)]=_0x316583(0x4b3,0x49c,0x4a6,0x4b1,'4iB6')+_0x316583(0x4c2,0x4bd,0x4ca,0x4ae,'Tpda')+'+$';function _0x46b215(_0x3619b7,_0x3e2fc7,_0x545135,_0x4eadf1,_0x375b94){return _0x4d24(_0x545135-0x113,_0x4eadf1);}const _0x376218=_0x55c8c1;return _0x233ee4[_0x36599e(0xe0,'Kqo)',0xcc,0xe2,0xe1)+_0x316583(0x4d0,0x4c4,0x4d6,0x4e7,'*@@b')]()[_0x36599e(0xda,'3$V0',0xbb,0xce,0xd8)+'h'](_0x376218[_0x36599e(0xdf,'(nS1',0xdf,0xe5,0xd1)])[_0x46b215(0x252,0x251,0x242,'Mk((',0x22b)+_0xbfa08(0x4d4,'icOq',0x4e3,0x4e5,0x4e4)]()[_0x46b215(0x211,0x22f,0x222,'v(dL',0x222)+_0x316583(0x4a8,0x495,0x49e,0x49f,'736s')+'r'](_0x233ee4)[_0x316583(0x4c1,0x4c3,0x4b6,0x4d1,'%)#x')+'h'](_0x376218[_0x4fa8e7(0x64,0x6c,0x78,'opwq',0x76)]);});function _0x4f5c75(_0x1e863a,_0x3c9c38,_0x5d2238,_0x408d8e,_0x43b193){return _0x4d24(_0x408d8e-0x2b4,_0x5d2238);}_0x233ee4();function _0x150e39(_0x49bb8f,_0x2021a5,_0x51bb47,_0x31a617,_0x1101c3){return _0x4d24(_0x49bb8f-0x1c7,_0x1101c3);}const nit=_0x3b029b(-0x19f,-0x181,-0x197,-0x185,'M)WI')+_0x3b029b(-0x188,-0x196,-0x19c,-0x1aa,'ike1')+_0x61de1e(0x1f4,0x205,0x1fd,0x20b,'E00I')+_0x3b029b(-0x195,-0x18c,-0x189,-0x189,'10F$')+_0x61de1e(0x1f0,0x1e1,0x1db,0x1f1,'v(dL')+'t',supre=_0x34aeed(-0x1b7,-0x1be,'US)j',-0x1cf,-0x1bf)+_0x61de1e(0x1ed,0x1e9,0x1e5,0x1fd,'u4dZ')+_0x150e39(0x2fe,0x311,0x2fe,0x2e9,'Q0E2')+_0x150e39(0x2dc,0x2de,0x2e5,0x2d7,'DuJj')+_0x61de1e(0x1f1,0x1e5,0x202,0x202,'0whn')+'t';


module.exports = { getBuffer, fetchJson, fetchText, generateMessageID, getGroupAdmins, getMembros, getRandom, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3,  getExtension, convertSticker, nit, supre, FormData }
