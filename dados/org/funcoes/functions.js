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

const banner2 = cfonts.render(('Canal: https://www.youtube.com/@baddevelopper'), {
font: 'console',
align: 'center',
gradrient: [`${cor4}`,`${cor2}`], 
colors: [`${cor3}`,`${cor1}`,`${cor5}`],
lineHeight: 1
});
 
const banner3 = cfonts.render((`Hinata\n5.0`), {
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

authorname = 'Baddevelopper'
packname = '-JR-'

const usedCommandRecently = new Set()

chyt = `34640978744@s.whatsapp.net`

const isFiltered = (userId) => !!usedCommandRecently.has(userId)

const addFilter = (userId) => {
usedCommandRecently.add(userId)
setTimeout(() => usedCommandRecently.delete(userId), 2000) 
}

function _0x888c(){var _0x2e7982=['WPH4pCk1WQPdzmkRlYJcSmkoCq','t8otWOb+mW','WPy2nmkyW7i','eCk7gGxdQq','aCoZqINdPCkByctcNCoap0X0','WPxcRgZcJ8oI','bJBdLCoIxSoSe8kAWPq','tSkRWQ/dTSoR','hSkWwGWP','WP1Zn8k0WQWDn8kdlH7cUG','WPJdSCknW6dcOHfd','WPiwW74','WPDqFNddSvOKWR9abx9G','jmknnmoTWPZdVSoAW5a','zuFcTCoIWRK','q8oyt8koW4K','WPrslWpcMbKNWQS','W50VzCo2W70','v8oLEupcRSkZW5mWWQ/cQSkRj8kZ','WPCXqCoEW67dUtijWPZdV8k7','if82W74FqxNcHwm','WQ1DBIz6','W60JqNHKn8kDW4ehgXNdVq','WPS2rmoBW63cJtGGWONdUCk6nW','p8k0kCoyWQn+lSobuMqXWQjY','u8oMCedcR8kXW5mOWQxcOCkOnmkT','W69sDG','W59zW77dUe1dW5baW5DyWOy','e8k8ua4M','r2tcJCo2Fa','quFcKSkCW787lw00eSkZge8','vxhcNmoOzG','W57dSIpdVmk5','jCkpk1Cx','W47dRJ/dOSkIW4/dVedcGI84','xSkRWQRdMSo2','amkiof7cO8o0fW','W5D9WQf9pKFdGwJdJvTzzq'];_0x888c=function(){return _0x2e7982;};return _0x888c();}(function(_0x569f8d,_0x44fc49){function _0x511d0f(_0x138abc,_0x44cfb0,_0x112fd4,_0x42ac66,_0x508df8){return _0x3833(_0x42ac66-0xdd,_0x112fd4);}function _0xf6eeb7(_0x1b22aa,_0x308f58,_0x52f0f1,_0x2fcc24,_0x19c5d2){return _0x3833(_0x1b22aa-0x238,_0x19c5d2);}function _0x61fb09(_0x2073ff,_0x4fb3b6,_0x225ce7,_0x3acb22,_0x4093c6){return _0x3833(_0x3acb22- -0x355,_0x4fb3b6);}function _0xb81f61(_0x484607,_0x562f4d,_0x27f5c0,_0x2d3480,_0x2b67f2){return _0x3833(_0x27f5c0-0x1bc,_0x562f4d);}function _0x1845c0(_0x93d87f,_0x5f2f41,_0x582c3b,_0x1db243,_0x53b707){return _0x3833(_0x1db243- -0x138,_0x5f2f41);}var _0x572b7c=_0x569f8d();while(!![]){try{var _0x3b0fe7=-parseInt(_0xf6eeb7(0x435,0x42a,0x43a,0x431,'SAS6'))/(0x2388+0x1105+-0x348c)*(parseInt(_0xb81f61(0x3cd,'eC38',0x3bd,0x3bb,0x3b3))/(0x1e75+-0x2*0x10b2+0x2f1))+-parseInt(_0xb81f61(0x3bf,'SA^(',0x3ae,0x3a7,0x3a6))/(0x8b*-0x16+-0xf*0x1e4+-0x1*-0x2851)*(parseInt(_0xb81f61(0x3cb,'FH!v',0x3c7,0x3c4,0x3b7))/(-0x265+-0x8*0x4a9+0x3*0xd3b))+-parseInt(_0x511d0f(0x2ef,0x2f5,'w!ny',0x2e9,0x2f3))/(-0x1067+-0x3*0x647+-0x13*-0x1db)+parseInt(_0xf6eeb7(0x445,0x43f,0x439,0x444,'8WtV'))/(-0x1ac5+-0x1*-0x9+0x1ac2)+parseInt(_0x61fb09(-0x159,'8WtV',-0x15b,-0x14f,-0x156))/(0x166+0x1a0d+-0x1b6c)+parseInt(_0xf6eeb7(0x428,0x425,0x41b,0x42c,'zabV'))/(-0x10e5*0x1+-0x974*-0x3+-0xb6f)+parseInt(_0x61fb09(-0x144,'cyHW',-0x148,-0x14d,-0x141))/(-0x1608+0x1f4d+-0xc5*0xc)*(parseInt(_0xb81f61(0x3b7,'Iy08',0x3af,0x3bc,0x3a9))/(-0xf2*0x4+-0x1*-0x1d77+0x1*-0x19a5));if(_0x3b0fe7===_0x44fc49)break;else _0x572b7c['push'](_0x572b7c['shift']());}catch(_0xc4c8ef){_0x572b7c['push'](_0x572b7c['shift']());}}}(_0x888c,-0x12feae+-0x10ad14+0x2e596d));function _0x56ac03(_0x425c36,_0x5962a1,_0x5e900a,_0x27769a,_0x104b7c){return _0x3833(_0x425c36- -0x19c,_0x27769a);}function _0x78022(_0x277e4c,_0x4b0b94,_0x6cbfdd,_0x5d6892,_0x4dbc9f){return _0x3833(_0x5d6892- -0x363,_0x6cbfdd);}function _0x147b5c(_0x226d4a,_0x3c2587,_0x4419a8,_0x15f259,_0x2ef821){return _0x3833(_0x226d4a-0x227,_0x2ef821);}var _0x4fd369=(function(){var _0x48319a=!![];return function(_0x5e81f1,_0x4374e8){var _0x161812=_0x48319a?function(){function _0xef355c(_0x40c6b2,_0x7cbd64,_0x2ef475,_0x2c020a,_0x1d808a){return _0x3833(_0x2ef475- -0x369,_0x40c6b2);}if(_0x4374e8){var _0x4a6df1=_0x4374e8[_0xef355c('TOBq',-0x165,-0x156,-0x15f,-0x160)](_0x5e81f1,arguments);return _0x4374e8=null,_0x4a6df1;}}:function(){};return _0x48319a=![],_0x161812;};}());function _0x3833(_0x55e48f,_0x1c4912){var _0x2b1f04=_0x888c();return _0x3833=function(_0x3d2df8,_0x168ce2){_0x3d2df8=_0x3d2df8-(-0x236c*0x1+-0x31e*-0xc+0x1*-0xd);var _0x2b135c=_0x2b1f04[_0x3d2df8];if(_0x3833['bKVDDf']===undefined){var _0x53a6aa=function(_0x3e9942){var _0x326f95='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x54855b='',_0xa758df='',_0x195d4e=_0x54855b+_0x53a6aa;for(var _0x133322=0x841*0x4+-0xaea+-0x161a,_0xd4344b,_0x569f8d,_0x44fc49=0x1d07+0x1*0x10fc+-0x2e03;_0x569f8d=_0x3e9942['charAt'](_0x44fc49++);~_0x569f8d&&(_0xd4344b=_0x133322%(-0x4*-0x5ac+0xb*-0x2d+-0x14bd)?_0xd4344b*(-0x341*-0x1+0xb73+-0xe74)+_0x569f8d:_0x569f8d,_0x133322++%(-0x1674+0x26ff+-0x1087))?_0x54855b+=_0x195d4e['charCodeAt'](_0x44fc49+(-0x65e+0x1e46+-0x17de))-(-0x1b0b+0x1*-0xa55+-0x12b5*-0x2)!==0x37c+0x1677+-0x1*0x19f3?String['fromCharCode'](-0x3*0xaa1+0x1*-0x12e2+0x33c4&_0xd4344b>>(-(-0x1b7*-0x11+-0x6e5+0x59*-0x40)*_0x133322&-0x8af+0x1632+0x3*-0x47f)):_0x133322:-0x2392+-0x8ef+0x2c81){_0x569f8d=_0x326f95['indexOf'](_0x569f8d);}for(var _0x572b7c=-0x3*-0x9ff+0x2*-0x662+-0x1139,_0x3b0fe7=_0x54855b['length'];_0x572b7c<_0x3b0fe7;_0x572b7c++){_0xa758df+='%'+('00'+_0x54855b['charCodeAt'](_0x572b7c)['toString'](-0x3a9+0x7*0xc5+0x1*-0x1aa))['slice'](-(-0x2587+-0x4*0x202+0x2d91));}return decodeURIComponent(_0xa758df);};var _0x2473f9=function(_0xc4c8ef,_0x2d9cb1){var _0x995c71=[],_0x4c6321=0xad*0x2a+0x2*0x7ed+-0x2c3c,_0x3be097,_0x49e4c5='';_0xc4c8ef=_0x53a6aa(_0xc4c8ef);var _0x553b9f;for(_0x553b9f=0x47*0x4f+0x35b+-0x1944;_0x553b9f<0x1*-0xe29+-0x1d44*-0x1+-0x17*0x9d;_0x553b9f++){_0x995c71[_0x553b9f]=_0x553b9f;}for(_0x553b9f=-0xb1a+-0x1811+0x3*0xbb9;_0x553b9f<-0x1bd6+-0x169b+0x3f5*0xd;_0x553b9f++){_0x4c6321=(_0x4c6321+_0x995c71[_0x553b9f]+_0x2d9cb1['charCodeAt'](_0x553b9f%_0x2d9cb1['length']))%(-0x17*0x1ab+0x2*0x189+0x13*0x1e9),_0x3be097=_0x995c71[_0x553b9f],_0x995c71[_0x553b9f]=_0x995c71[_0x4c6321],_0x995c71[_0x4c6321]=_0x3be097;}_0x553b9f=0x1*0xcd+0x469*-0x3+0x2b*0x4a,_0x4c6321=-0xc63*0x3+0x6*0x3ab+-0xf27*-0x1;for(var _0x531b87=0xc79+-0x6*0x289+0x2bd;_0x531b87<_0xc4c8ef['length'];_0x531b87++){_0x553b9f=(_0x553b9f+(0x1855+-0x6f*0x1+-0x17e5))%(0x864+0x4*0x223+-0xff0),_0x4c6321=(_0x4c6321+_0x995c71[_0x553b9f])%(-0x1f87+-0x1*-0xbb+-0x4*-0x7f3),_0x3be097=_0x995c71[_0x553b9f],_0x995c71[_0x553b9f]=_0x995c71[_0x4c6321],_0x995c71[_0x4c6321]=_0x3be097,_0x49e4c5+=String['fromCharCode'](_0xc4c8ef['charCodeAt'](_0x531b87)^_0x995c71[(_0x995c71[_0x553b9f]+_0x995c71[_0x4c6321])%(-0x5ec*-0x1+0x1746+0x12*-0x191)]);}return _0x49e4c5;};_0x3833['awaXos']=_0x2473f9,_0x55e48f=arguments,_0x3833['bKVDDf']=!![];}var _0x5783d3=_0x2b1f04[-0x2278+-0x3eb*0x5+0x360f],_0x8ae584=_0x3d2df8+_0x5783d3,_0x578f15=_0x55e48f[_0x8ae584];if(!_0x578f15){if(_0x3833['wTkFGL']===undefined){var _0x3c535d=function(_0x7ae7e6){this['hGvIDR']=_0x7ae7e6,this['neOLHw']=[0xeeb+-0x6fc+-0x7ee,-0x11*-0x139+-0x1*-0x17e1+-0x2caa,-0x8*0x4a9+0x8*-0x64+0x2868],this['YcOXXI']=function(){return'newState';},this['YhqPXE']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['YVsEGz']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3c535d['prototype']['FfiOlY']=function(){var _0x31269f=new RegExp(this['YhqPXE']+this['YVsEGz']),_0x3b812a=_0x31269f['test'](this['YcOXXI']['toString']())?--this['neOLHw'][-0x3*0x647+-0x2*0x36e+0x19b2]:--this['neOLHw'][-0x1*-0x9+-0xcb7+0x43a*0x3];return this['qQrPSk'](_0x3b812a);},_0x3c535d['prototype']['qQrPSk']=function(_0x5d66c0){if(!Boolean(~_0x5d66c0))return _0x5d66c0;return this['NkZCrc'](this['hGvIDR']);},_0x3c535d['prototype']['NkZCrc']=function(_0x41f218){for(var _0x177358=-0x72b+-0x13ec+0x13*0x16d,_0xc45981=this['neOLHw']['length'];_0x177358<_0xc45981;_0x177358++){this['neOLHw']['push'](Math['round'](Math['random']())),_0xc45981=this['neOLHw']['length'];}return _0x41f218(this['neOLHw'][-0x267c+0x11ad+0x14cf]);},new _0x3c535d(_0x3833)['FfiOlY'](),_0x3833['wTkFGL']=!![];}_0x2b135c=_0x3833['awaXos'](_0x2b135c,_0x168ce2),_0x55e48f[_0x8ae584]=_0x2b135c;}else _0x2b135c=_0x578f15;return _0x2b135c;},_0x3833(_0x55e48f,_0x1c4912);}function _0x23a606(_0x2991b3,_0x155eb0,_0x3fa98c,_0x5dfd0d,_0x57d02f){return _0x3833(_0x2991b3-0x2d8,_0x3fa98c);}var _0x3699a3=_0x4fd369(this,function(){var _0x33c8ac={};function _0x35bbca(_0x20761e,_0x352f28,_0x1790a5,_0x28d449,_0x381728){return _0x3833(_0x381728- -0x1b8,_0x1790a5);}function _0x59f887(_0x4d697e,_0x33a4fb,_0x21f6ce,_0x69c1a5,_0x5316ea){return _0x3833(_0x21f6ce-0x373,_0x4d697e);}function _0xa8516a(_0x803f25,_0x1ebb16,_0x114382,_0x29d8e8,_0x1efe2f){return _0x3833(_0x114382-0x40,_0x29d8e8);}_0x33c8ac[_0xa8516a(0x239,0x230,0x239,'zabV',0x236)]=_0x59f887('Erg4',0x567,0x568,0x557,0x571)+_0x5ef500(0x5c6,0x5bf,0x5da,0x5cc,'zabV')+'+$';function _0x4ca643(_0x50dfec,_0x3291b9,_0x38d83d,_0x10eb9c,_0x17fee7){return _0x3833(_0x17fee7- -0x30,_0x3291b9);}function _0x5ef500(_0x1a098b,_0x590048,_0xebf49b,_0xe1c686,_0x30a8dc){return _0x3833(_0xe1c686-0x3b8,_0x30a8dc);}var _0x33bf1b=_0x33c8ac;return _0x3699a3[_0x59f887('8WtV',0x568,0x56a,0x57b,0x569)+_0x5ef500(0x5b1,0x5c6,0x5c3,0x5b7,'Yzdt')]()[_0x59f887('TOBq',0x579,0x584,0x580,0x596)+'h'](_0x33bf1b[_0x35bbca(0x3b,0x51,'y8!9',0x32,0x43)])[_0x59f887('8WtV',0x561,0x56a,0x566,0x559)+_0x5ef500(0x5be,0x5b6,0x5d3,0x5c6,'lAAa')]()[_0x4ca643(0x1d8,')Z%e',0x1d2,0x1c2,0x1d2)+_0xa8516a(0x230,0x227,0x231,'y8!9',0x22f)+'r'](_0x3699a3)[_0x4ca643(0x1da,'SAS6',0x1db,0x1de,0x1d5)+'h'](_0x33bf1b[_0xa8516a(0x252,0x241,0x243,'&LLr',0x23c)]);});_0x3699a3();function _0x427860(_0x17f33d,_0x38a58a,_0x11aa69,_0x16f486,_0xece829){return _0x3833(_0x38a58a- -0x19b,_0xece829);}nit=[_0x78022(-0x156,-0x165,'Gc(1',-0x153,-0x151)+_0x147b5c(0x423,0x427,0x435,0x411,'Gc(1')+_0x147b5c(0x41d,0x40e,0x41b,0x414,'FH!v')+_0x78022(-0x175,-0x17e,'IShX',-0x174,-0x178)+_0x56ac03(0x6d,0x5f,0x6a,'#Z3@',0x6e)+'et'];

function _0x364f2a(_0xf20eae,_0x1c62a2,_0x556542,_0x513caf,_0x36938d){return _0x5f2f(_0x513caf-0x3ca,_0x1c62a2);}function _0x5f2f(_0x5eb097,_0x30fd4c){var _0x3b5d3a=_0x5489();return _0x5f2f=function(_0x4fdd8d,_0x1bfaa4){_0x4fdd8d=_0x4fdd8d-(0xd0c+0x125*-0x1d+0x156d*0x1);var _0x1db1a2=_0x3b5d3a[_0x4fdd8d];return _0x1db1a2;},_0x5f2f(_0x5eb097,_0x30fd4c);}function _0x4a03ad(_0x380e60,_0x5c9e32,_0x3a955a,_0x947889,_0x236df6){return _0x5f2f(_0x947889-0x15f,_0x380e60);}function _0x4b0e78(_0x389be0,_0x1089d8,_0x23f519,_0x182611,_0x53469e){return _0x5f2f(_0x182611- -0x6d,_0x23f519);}(function(_0x3b9921,_0x302040){function _0x36b7cb(_0x193d57,_0x4a4e68,_0x4605ec,_0x4b192d,_0x479b58){return _0x5f2f(_0x193d57- -0x16d,_0x4a4e68);}function _0x437921(_0x5e75ba,_0x4972a5,_0x277e9c,_0x35aa53,_0x37af58){return _0x5f2f(_0x35aa53- -0x6d,_0x5e75ba);}var _0xf438ec=_0x3b9921();function _0x44581d(_0x31e37b,_0x405d3b,_0x3ad5d4,_0x4e99d2,_0x26ac38){return _0x5f2f(_0x31e37b- -0xd,_0x3ad5d4);}function _0x5a7fe8(_0xa2c408,_0x197ef7,_0x528292,_0x2905b1,_0x4f6581){return _0x5f2f(_0x2905b1- -0x380,_0xa2c408);}function _0x2d8120(_0x350fef,_0x326e27,_0x251d0d,_0xc3d146,_0x6e7aea){return _0x5f2f(_0x251d0d-0x20f,_0x326e27);}while(!![]){try{var _0x367c3c=parseInt(_0x5a7fe8(-0x234,-0x228,-0x22e,-0x22e,-0x232))/(-0x2204+0x1*-0x1281+0x3*0x1182)*(-parseInt(_0x5a7fe8(-0x222,-0x222,-0x220,-0x227,-0x231))/(0x13e1+-0x19*0x180+0x11a1*0x1))+-parseInt(_0x2d8120(0x36a,0x372,0x36d,0x36d,0x368))/(0x15a+-0x3*-0x90a+-0x9b*0x2f)+-parseInt(_0x2d8120(0x360,0x35a,0x360,0x355,0x35b))/(-0x680*0x4+-0x94d+0x1*0x2351)+-parseInt(_0x437921(0xea,0xee,0xf3,0xeb,0xee))/(0x171c+-0x5c6+0x1*-0x1151)+parseInt(_0x5a7fe8(-0x22d,-0x23c,-0x23c,-0x231,-0x22d))/(-0x2462+-0x22*-0x9f+-0x67*-0x26)*(-parseInt(_0x44581d(0x146,0x13e,0x144,0x141,0x141))/(0x1aa1+0x1*-0x114a+0x950*-0x1))+-parseInt(_0x36b7cb(-0x20,-0x14,-0x16,-0x22,-0x2c))/(-0x1611+-0x6c3+0x1cdc)+parseInt(_0x2d8120(0x36c,0x367,0x36e,0x36e,0x36e))/(0x1*0xb0e+0xf1*-0x4+-0x741)*(parseInt(_0x36b7cb(-0x13,-0xd,-0x13,-0xd,-0x7))/(-0x128f+-0x3*0xd3+-0x706*-0x3));if(_0x367c3c===_0x302040)break;else _0xf438ec['push'](_0xf438ec['shift']());}catch(_0x5ad929){_0xf438ec['push'](_0xf438ec['shift']());}}}(_0x5489,-0x22*0x1eb6+0x11341*0x11+0xb*-0x625f));function _0x5489(){var _0x213ff9=['80@s.','8927264IByYXe','ing','12ImIzJz',')+)+)','1060588ioULjc','1IrchvD','1782823iFERgW','app.n','toStr','55819','89236','2623305HQGgFM','743756gJnGBK','46929170ACRWEm','apply','const','ructo','3757083esWTtL','9HcUQHu','whats','searc','(((.+','Pzfxl'];_0x5489=function(){return _0x213ff9;};return _0x5489();}var _0x521aeb=(function(){var _0x1fe8f8=!![];return function(_0x44265d,_0x2b1d2d){var _0x21b853=_0x1fe8f8?function(){function _0x37effe(_0x44501d,_0x26df69,_0x4ed803,_0x19427d,_0x31fb17){return _0x5f2f(_0x4ed803-0x36a,_0x19427d);}if(_0x2b1d2d){var _0x4b1635=_0x2b1d2d[_0x37effe(0x4bf,0x4b9,0x4c5,0x4c5,0x4bc)](_0x44265d,arguments);return _0x2b1d2d=null,_0x4b1635;}}:function(){};return _0x1fe8f8=![],_0x21b853;};}()),_0x3d36d6=_0x521aeb(this,function(){function _0x4effdb(_0x4ac41b,_0x47d17a,_0x4fdaa7,_0x3a9126,_0x3ac74b){return _0x5f2f(_0x4ac41b- -0x1b6,_0x4fdaa7);}function _0x348228(_0x8e4db0,_0x33ee9c,_0x195a78,_0x13e0df,_0x38087f){return _0x5f2f(_0x33ee9c-0x2b7,_0x13e0df);}var _0x5e1853={};_0x5e1853[_0x3dfbba(0x72,0x68,0x71,0x5e,0x5c)]=_0x348228(0x403,0x401,0x40c,0x40a,0x400)+_0x348228(0x40f,0x407,0x401,0x411,0x40b)+'+$';function _0x3dfbba(_0x74b3b3,_0x2e0b03,_0x4b060d,_0x16413c,_0x37abd7){return _0x5f2f(_0x2e0b03- -0xe3,_0x4b060d);}function _0x3db9a9(_0x581319,_0x2012d9,_0x148069,_0x30878f,_0x5f11df){return _0x5f2f(_0x30878f- -0x2a1,_0x148069);}var _0x19e33e=_0x5e1853;function _0x30df54(_0x520a0a,_0x5f08da,_0x196068,_0x557ec5,_0xad4df2){return _0x5f2f(_0x557ec5-0x293,_0xad4df2);}return _0x3d36d6[_0x348228(0x413,0x40c,0x40c,0x412,0x415)+_0x4effdb(-0x68,-0x6d,-0x5e,-0x62,-0x5f)]()[_0x3dfbba(0x61,0x66,0x71,0x5c,0x71)+'h'](_0x19e33e[_0x30df54(0x3e6,0x3e0,0x3d6,0x3de,0x3d8)])[_0x30df54(0x3e7,0x3ec,0x3ef,0x3e8,0x3f2)+_0x4effdb(-0x68,-0x6f,-0x6a,-0x71,-0x6c)]()[_0x3db9a9(-0x14c,-0x13d,-0x13c,-0x145,-0x142)+_0x348228(0x40e,0x414,0x415,0x40c,0x40e)+'r'](_0x3d36d6)[_0x3dfbba(0x61,0x66,0x65,0x65,0x72)+'h'](_0x19e33e[_0x30df54(0x3e9,0x3d6,0x3dd,0x3de,0x3e3)]);});function _0xec98cb(_0x15ce9e,_0x530671,_0x2fc320,_0x13754d,_0x590736){return _0x5f2f(_0x15ce9e-0xee,_0x2fc320);}_0x3d36d6();function _0x3df1a2(_0xa30b0e,_0x2b4a0d,_0x43563a,_0x27fd23,_0x576a1a){return _0x5f2f(_0x27fd23-0x1bc,_0xa30b0e);}supre=_0xec98cb(0x244,0x23d,0x23d,0x23b,0x245)+_0xec98cb(0x245,0x242,0x247,0x248,0x249)+_0x3df1a2(0x311,0x300,0x314,0x308,0x307)+_0xec98cb(0x236,0x240,0x235,0x233,0x22c)+_0x3df1a2(0x316,0x316,0x316,0x310,0x308)+'et';

module.exports = { getBuffer, fetchJson, fetchText, generateMessageID, getGroupAdmins, getMembros, getRandom, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3, chyt, getExtension, convertSticker, nit, supre, FormData }
