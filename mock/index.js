const http = require('http');
const urlTool = require('url');
const querystring = require('querystring');
// const bodyPaeser = require('body-parser');
const fs = require('fs');
const path = require('path');

//Mock server configuration
const serverConfig = {
    port: 37238,
    address: '127.0.0.1',
};

const server = http.createServer((request, response) => {
    //
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    console.log(`url:${request.url}`);
    console.log(`method:${request.method}`);
});

const readMockJSON = function (fileName) {
    return fs.promises.readFile(path.join(__dirname, '/json', fileName), {
        encoding: 'utf8'
    });
}

server.on('request', (request, response) => {
    const urlObj = urlTool.parse(request.url);

    //Match url /jsonp
    if (urlObj.pathname === '/jsonp') {
        const searchParam = new URLSearchParams(urlTool.parse(request.url).query);
        const callbackName = searchParam.get('callback');
        if (callbackName) {
            //Mock JSON data
            readMockJSON('jsonp.json').then(file => {
                response.writeHead(200, {
                    'Content-Type': 'application/x-javascript'
                });
                response.end(`${callbackName}(${file})`);
            });
        }
    }

    //Match url /query
    if (urlObj.pathname === '/query') {
        readMockJSON('auto-complete.json').then(file => {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(file);
        });
    }

    //Match url /signup
    if (request.url === '/signup') {
        if (request.method === 'POST') {
            let queryBodyData = '';
            request.on('data', chunk => {
                console.log(chunk);
                queryBodyData += chunk;
            });
            request.on('end', () => {
                const queryParam = querystring.parse(queryBodyData);
                console.log(queryBodyData);
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                response.end(JSON.stringify(queryParam));
            })
        }
    }
});

server.listen(serverConfig.port, serverConfig.address, () => {
    console.log(`Sever listening on ${serverConfig.address}:${serverConfig.port}.`);
});