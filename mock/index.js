const http = require('http');
const urlTool = require('url');

const serverConfig = {
    port: 37238,
    address: '127.0.0.1',
};
const server = http.createServer((request, response) => {
    console.log(`url:${request.url}`);
    console.log(`method:${request.method}`);
});

const testReturnJSON = {
    name: 'Jason',
    age: 20,
    gender: 'male',
}

server.on('request', (request, response) => {
    if (request.url.indexOf('jsonp') !== -1) {
        const urlObj = new URLSearchParams(urlTool.parse(request.url).query);
        const callbackName = urlObj.get('callback');
        if (callbackName) {
            response.writeHead(200, {
                'Content-Type': 'application/x-javascript'
            });
            response.end(`${callbackName}(${JSON.stringify(testReturnJSON)})`);
        }

    }
});

server.listen(serverConfig.port, serverConfig.address, () => {
    console.log(`Sever listening on ${serverConfig.address}:${serverConfig.port}.`);
});