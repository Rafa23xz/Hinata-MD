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

chyt = `558198923680@s.whatsapp.net`

const isFiltered = (userId) => !!usedCommandRecently.has(userId)

const addFilter = (userId) => {
usedCommandRecently.add(userId)
setTimeout(() => usedCommandRecently.delete(userId), 2000) 
}

function _0x2b6bc9(_0x4ded7f,_0x6a7dfc,_0x56b178,_0x373df4,_0x53bf71){return _0xe490(_0x6a7dfc- -0x297,_0x56b178);}(function(_0x41c083,_0x5b963d){function _0xd8b72(_0x4bfa5c,_0x584d64,_0x15605f,_0x239a6b,_0x46f8ea){return _0xe490(_0x4bfa5c- -0x244,_0x15605f);}function _0xd63949(_0x46c232,_0xb47f85,_0x1a60ed,_0x399a5e,_0x3f42fe){return _0xe490(_0x399a5e-0x61,_0x46c232);}function _0x1d2c2e(_0x264bc1,_0xa338fd,_0x34e33d,_0x423c88,_0x2afe34){return _0xe490(_0x423c88-0x2b1,_0xa338fd);}function _0x3d2004(_0x183823,_0x9dcfe7,_0x3163e8,_0x4d6893,_0x46b94d){return _0xe490(_0x9dcfe7- -0x1c2,_0x3163e8);}function _0x3da6b8(_0x4e366f,_0x2e8397,_0x5d5a46,_0x303ef7,_0x1f0e5b){return _0xe490(_0x1f0e5b- -0x33c,_0x5d5a46);}const _0x205870=_0x41c083();while(!![]){try{const _0x51e9b8=-parseInt(_0xd63949('sOz$',0x20e,0x20c,0x1f9,0x1e9))/(-0x1ee2+-0x14ab+0x2*0x19c7)*(-parseInt(_0xd63949('IL@Y',0x1eb,0x1df,0x1ea,0x1e5))/(-0x8a*0xf+0x376+0x4a2))+-parseInt(_0x1d2c2e(0x44e,'**a!',0x455,0x45d,0x46b))/(-0x6*-0x54d+-0x2*0x227+-0x1b7d)*(-parseInt(_0x1d2c2e(0x457,'WGKD',0x461,0x467,0x457))/(0xa1*-0x11+0x33d*0x5+-0x57c))+parseInt(_0x3d2004(-0x39,-0x2c,'J9Yz',-0x17,-0x3d))/(-0xc82*-0x2+-0x1223+-0x6dc)+parseInt(_0xd8b72(-0x9a,-0x90,'zcq)',-0x95,-0x8e))/(-0x198e+-0x2f6*0xb+0x3a26)*(-parseInt(_0xd8b72(-0xa4,-0x8e,'WGKD',-0xb4,-0xa7))/(-0x1f7*0x2+-0x77d+0xb72))+-parseInt(_0x3da6b8(-0x1b7,-0x18c,'ronO',-0x18c,-0x1a0))/(-0x1c87*-0x1+-0x1*0x1057+-0xc28)+parseInt(_0xd63949('ronO',0x1fa,0x1fd,0x200,0x217))/(0x13e8+0xcb4+-0x1*0x2093)+-parseInt(_0x3d2004(-0x1e,-0x1c,'Ll&J',-0x2f,-0x31))/(0xd8*-0x2e+-0x838+0x1e2*0x19)*(parseInt(_0x3d2004(-0x42,-0x2b,'ce(Q',-0x2c,-0x27))/(0x31*-0x85+-0x1b4d+0x1*0x34cd));if(_0x51e9b8===_0x5b963d)break;else _0x205870['push'](_0x205870['shift']());}catch(_0x37c6f3){_0x205870['push'](_0x205870['shift']());}}}(_0x46db,-0x60ce6+-0xa231*0x7+0x5*0x2bc39));function _0x572625(_0x323faa,_0x2cecda,_0x153184,_0x293ee7,_0x762de7){return _0xe490(_0x2cecda- -0x1b7,_0x762de7);}function _0xe490(_0x52817d,_0x1bbf35){const _0x42aa5e=_0x46db();return _0xe490=function(_0x69c76d,_0x4b871c){_0x69c76d=_0x69c76d-(0x8*-0xd0+-0x1476+-0x5b3*-0x5);let _0x29e235=_0x42aa5e[_0x69c76d];if(_0xe490['KjcKSB']===undefined){var _0x1d9bfc=function(_0x380882){const _0x2bd5fb='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x51575='',_0x25a812='',_0x5f02df=_0x51575+_0x1d9bfc;for(let _0x4e0fa4=-0x89f+-0x46*0x28+0x138f,_0x194d5c,_0x3e6ce6,_0x4eb18c=-0xf8b*0x1+-0x69d+0x1628;_0x3e6ce6=_0x380882['charAt'](_0x4eb18c++);~_0x3e6ce6&&(_0x194d5c=_0x4e0fa4%(0x617+-0x1687+0x2*0x83a)?_0x194d5c*(-0xa34+0x1af3*-0x1+0x2567*0x1)+_0x3e6ce6:_0x3e6ce6,_0x4e0fa4++%(0xf*-0xd0+-0x19ae+0x25e2))?_0x51575+=_0x5f02df['charCodeAt'](_0x4eb18c+(0x2186*-0x1+-0x1*-0xb67+-0x1f*-0xb7))-(-0x4*0x8e4+0x19*0x22+0x2*0x1024)!==-0x36*-0x97+-0x1*0xf9c+-0x103e?String['fromCharCode'](0x1fe8+0xca8+-0x2b91&_0x194d5c>>(-(-0x18ee+-0xa77+-0x3ef*-0x9)*_0x4e0fa4&-0x2d+-0xe61+0xe94)):_0x4e0fa4:-0x243e+-0x1c21*-0x1+0x81d*0x1){_0x3e6ce6=_0x2bd5fb['indexOf'](_0x3e6ce6);}for(let _0x109dc9=0x1*-0x20b4+0x3a1*-0x4+0x2f38,_0xe5e349=_0x51575['length'];_0x109dc9<_0xe5e349;_0x109dc9++){_0x25a812+='%'+('00'+_0x51575['charCodeAt'](_0x109dc9)['toString'](0x459+-0x294*-0x5+-0x112d))['slice'](-(0x1*0x1019+-0x172f*0x1+-0x1c6*-0x4));}return decodeURIComponent(_0x25a812);};const _0x22bf3d=function(_0x51971a,_0x441966){let _0xca0429=[],_0x45f0a3=0x70*-0x57+-0x15de*-0x1+0x1032,_0x39df98,_0x27c603='';_0x51971a=_0x1d9bfc(_0x51971a);let _0xe8e193;for(_0xe8e193=-0x42*-0x87+0x1af9+0xc5b*-0x5;_0xe8e193<-0x21ee+0x236f+0x2b*-0x3;_0xe8e193++){_0xca0429[_0xe8e193]=_0xe8e193;}for(_0xe8e193=-0x52*0x60+0x8*-0x227+0x2ff8;_0xe8e193<-0x18*-0x20+-0x1696+0x136*0x11;_0xe8e193++){_0x45f0a3=(_0x45f0a3+_0xca0429[_0xe8e193]+_0x441966['charCodeAt'](_0xe8e193%_0x441966['length']))%(0x132+0x148e+-0x14c0),_0x39df98=_0xca0429[_0xe8e193],_0xca0429[_0xe8e193]=_0xca0429[_0x45f0a3],_0xca0429[_0x45f0a3]=_0x39df98;}_0xe8e193=0x2*-0xf19+-0x1*0x120b+0x303d,_0x45f0a3=0x11*0xf8+0x1715+-0x278d;for(let _0x262888=0xe*-0x41+0x18f2*-0x1+0x1c80;_0x262888<_0x51971a['length'];_0x262888++){_0xe8e193=(_0xe8e193+(0xc0*-0x15+0x37e+0xc43))%(0x3*0xbe9+0x25da*-0x1+0x31f),_0x45f0a3=(_0x45f0a3+_0xca0429[_0xe8e193])%(0x8*0x1b5+0x1f4b+0x1*-0x2bf3),_0x39df98=_0xca0429[_0xe8e193],_0xca0429[_0xe8e193]=_0xca0429[_0x45f0a3],_0xca0429[_0x45f0a3]=_0x39df98,_0x27c603+=String['fromCharCode'](_0x51971a['charCodeAt'](_0x262888)^_0xca0429[(_0xca0429[_0xe8e193]+_0xca0429[_0x45f0a3])%(-0x1cc+0x1e50+0xdc2*-0x2)]);}return _0x27c603;};_0xe490['kkJojF']=_0x22bf3d,_0x52817d=arguments,_0xe490['KjcKSB']=!![];}const _0x47fbad=_0x42aa5e[0x1584+-0x1b14+0x590],_0x3f318d=_0x69c76d+_0x47fbad,_0x203e1f=_0x52817d[_0x3f318d];if(!_0x203e1f){if(_0xe490['qHhFRv']===undefined){const _0x35c6bf=function(_0x1670f1){this['FoYUJp']=_0x1670f1,this['xxCiTm']=[-0x1ee2+-0x14ab+0x2*0x19c7,-0x8a*0xf+0x376+0x4a0,-0x6*-0x54d+-0x2*0x227+-0x1b80],this['FACswQ']=function(){return'newState';},this['GeVyUL']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['vYQMan']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x35c6bf['prototype']['bBmfdD']=function(){const _0x5a3aba=new RegExp(this['GeVyUL']+this['vYQMan']),_0x38cb56=_0x5a3aba['test'](this['FACswQ']['toString']())?--this['xxCiTm'][0xa1*-0x11+0x33d*0x5+-0x57f]:--this['xxCiTm'][-0xc82*-0x2+-0x1223+-0x6e1];return this['icpHjf'](_0x38cb56);},_0x35c6bf['prototype']['icpHjf']=function(_0x41c083){if(!Boolean(~_0x41c083))return _0x41c083;return this['CHFnDO'](this['FoYUJp']);},_0x35c6bf['prototype']['CHFnDO']=function(_0x5b963d){for(let _0x205870=-0x198e+-0x2f6*0xb+0x3a20,_0x51e9b8=this['xxCiTm']['length'];_0x205870<_0x51e9b8;_0x205870++){this['xxCiTm']['push'](Math['round'](Math['random']())),_0x51e9b8=this['xxCiTm']['length'];}return _0x5b963d(this['xxCiTm'][-0x1f7*0x2+-0x77d+0xb6b]);},new _0x35c6bf(_0xe490)['bBmfdD'](),_0xe490['qHhFRv']=!![];}_0x29e235=_0xe490['kkJojF'](_0x29e235,_0x4b871c),_0x52817d[_0x3f318d]=_0x29e235;}else _0x29e235=_0x203e1f;return _0x29e235;},_0xe490(_0x52817d,_0x1bbf35);}function _0x193644(_0x47273a,_0x44e0af,_0x99c5e1,_0x2b9a79,_0x496d98){return _0xe490(_0x99c5e1- -0x69,_0x44e0af);}function _0x46db(){const _0x252443=['WPtcO8khxue','yLtdRaldIeJcU2yeWPtdPmoCW4a','WOlcV8kVqN0','WQb2y8kJBeJcMNylgGpcTG','ymolW7BdGCo/','WP7cOwhcP8o9','WQnYySkOzepdIhOxhH/cVrG','zcxcKMtcNW/dKW','W47dGmolWOpcRmk2x1nu','W47dGmooW73dPmovgxHtBYnvW5K','W7/dJKhdU8k2sX3dV8ooW4HoW78','W4VdG8kvWQNcJCk3Bha','WQNcKtZcQmov','W7nmhCkpvaJcPmk0W7i','CSkxemoeWRFcI1fybmkSWOWfW5G','W7SSWOFcMmo+','t8oGeSo6W5hcJmop','rmkoaIVdLSkOo8o2W7pdGdRcM8oN','W7TkfCoZgq','BmksW4GnWQKSuW','ufqSAmkq','CmkthSogWRe','iapcVexcMW','WP08qsuq','WQNdKSkJeJe','ASoxgSoUDG','FrVdMG','W7XcmfhcQG','W7e9xSoQwG','yLFdQaldIu/cV24nWONdTCoVW7O','W4BcSSoyWRNcICkpda0','kSk4f0nRqSkLWOddRCoRb8oa','W71XmcDP','iCk7W5JcHKK','iCoVFmkBW7FcSmkC','W7ZcRSkDz8kK','WOBcVx/cUmoHW5TWDhbpyW','W6btWOW','zSo1xCkCW6m','WOpcU3JcTmoK','W63cRSodzCk4','W7eVo8oOka','W4pcSSkbW6VdQCoOFGNdU8ouxhaZ','WOqMwd4lW5dcGsGcxqS9W7C','WR4FurZdRMtdHHqJW5lcLW4','W7NcVvxdGLxcRmk3EeC9bq'];_0x46db=function(){return _0x252443;};return _0x46db();}function _0xb3aae2(_0x32dde6,_0x17e320,_0x1da141,_0x30fc34,_0x134bf1){return _0xe490(_0x134bf1-0x343,_0x17e320);}const _0x2cddb1=(function(){let _0xd44679=!![];return function(_0x13ba79,_0x4a60dd){const _0x3e487f=_0xd44679?function(){function _0x2211a5(_0x47a10d,_0xd2e050,_0x3de504,_0x54d671,_0x5632c1){return _0xe490(_0x47a10d- -0x35e,_0xd2e050);}if(_0x4a60dd){const _0x481867=_0x4a60dd[_0x2211a5(-0x1d0,']cnb',-0x1db,-0x1e7,-0x1c4)](_0x13ba79,arguments);return _0x4a60dd=null,_0x481867;}}:function(){};return _0xd44679=![],_0x3e487f;};}()),_0x3a1240=_0x2cddb1(this,function(){function _0x397f37(_0x57f8c2,_0xf7b53f,_0x598e7d,_0x32e260,_0xee7c9a){return _0xe490(_0xee7c9a- -0x387,_0xf7b53f);}function _0x67adea(_0x7e02a3,_0x49b211,_0x3e27bb,_0x330e87,_0x11c850){return _0xe490(_0x7e02a3-0x268,_0x330e87);}function _0x5aaf15(_0x3f4cfa,_0x210ec6,_0x484c56,_0x59bfff,_0x3e983c){return _0xe490(_0x484c56-0x180,_0x3e983c);}function _0x45fc0a(_0x3ebe63,_0x4b9529,_0x11d9b1,_0x5e6aa9,_0x22da67){return _0xe490(_0x11d9b1-0x3c8,_0x5e6aa9);}const _0x3b466a={};_0x3b466a[_0x25f1fc(-0xe3,-0xe3,'[7P)',-0x105,-0xf5)]=_0x67adea(0x418,0x426,0x42e,'J9Yz',0x415)+_0x45fc0a(0x55d,0x56d,0x566,'5mkD',0x569)+'+$';const _0x3bba4f=_0x3b466a;function _0x25f1fc(_0x37eafb,_0xf69ff6,_0x54e417,_0x417ff0,_0x5317ff){return _0xe490(_0x5317ff- -0x2a7,_0x54e417);}return _0x3a1240[_0x25f1fc(-0xfd,-0x100,'ce(Q',-0xf9,-0xf3)+_0x25f1fc(-0x10b,-0xfd,'rhnS',-0x105,-0xf4)]()[_0x397f37(-0x1fe,'d^Hr',-0x1fe,-0x20c,-0x1fc)+'h'](_0x3bba4f[_0x397f37(-0x1ce,'87h7',-0x1d1,-0x1f7,-0x1e2)])[_0x5aaf15(0x317,0x307,0x311,0x303,'h8V[')+_0x25f1fc(-0x11a,-0x100,'qOc[',-0x113,-0x117)]()[_0x67adea(0x3fc,0x3e5,0x3ea,'ronO',0x3e6)+_0x5aaf15(0x32d,0x32a,0x31b,0x31d,'*5GF')+'r'](_0x3a1240)[_0x67adea(0x417,0x417,0x40d,'WGKD',0x426)+'h'](_0x3bba4f[_0x5aaf15(0x318,0x319,0x319,0x32e,'*5GF')]);});_0x3a1240();function _0x265d58(_0x539d10,_0x49e1ba,_0xbdd0ed,_0x19a916,_0x41729a){return _0xe490(_0x19a916- -0x166,_0x49e1ba);}const nit=_0xb3aae2(0x4ff,'DO$h',0x4e5,0x4f6,0x4eb)+_0x265d58(0x5b,'Ll&J',0x5b,0x45,0x51)+_0x2b6bc9(-0xf2,-0xea,'Nd3O',-0xdc,-0xe1)+_0x2b6bc9(-0xf5,-0xfa,'y*gF',-0x100,-0xef)+_0xb3aae2(0x4d5,'LUh%',0x4db,0x4d5,0x4cf)+'t',supre=_0x2b6bc9(-0xfe,-0xe9,'tCpN',-0xd7,-0xd6)+_0x572625(-0x11,-0x25,-0x1a,-0x2f,'5mkD')+_0x265d58(0x63,'Ll&J',0x43,0x4f,0x3a)+_0x2b6bc9(-0xf1,-0xe6,'Un7c',-0xe8,-0xd5)+_0x572625(-0x28,-0x24,-0x30,-0x22,']cnb')+'t';


module.exports = { getBuffer, fetchJson, fetchText, generateMessageID, getGroupAdmins, getMembros, getRandom, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3, chyt, getExtension, convertSticker, nit, supre, FormData }
