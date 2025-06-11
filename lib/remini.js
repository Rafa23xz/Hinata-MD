const FormData = require('form-data');

const https = require('https');

async function remini(imageBuffer, model = 'recolor') {

    return new Promise(async (resolve, reject) => {

        const validModels = ['enhance', 'recolor', 'dehaze'];

        if (!validModels.includes(model)) {

            model = validModels[0]; // Default to 'enhance' if the model is invalid

        }

        const url = 'https://inferenceengine.vyro.ai/' + model;

        const formData = new FormData();

        formData.append('image', Buffer.from(imageBuffer), {

            filename: 'enhance_image_body.jpg',

            contentType: 'image/jpeg'

        });

        formData.submit({

            url: url,

            host: 'inferenceengine.vyro.ai',

            path: '/' + model,

            protocol: 'https:',

            headers: {

                'User-Agent': 'okhttp/4.9.3',

                'Connection': 'Keep-Alive',

                'Accept-Encoding': 'gzip'

            }

        }, function (err, res) {

            if (err) {

                reject(err);

                return;

            }

            let responseData = [];

            res.on('data', function (chunk) {

                responseData.push(chunk);

            }).on('end', () => {

                resolve(Buffer.concat(responseData));

            }).on('error', () => {

                reject();

            });

        });

    });

}

module.exports.remini = remini;