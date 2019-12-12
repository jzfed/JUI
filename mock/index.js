const http = require('http');
const urlTool = require('url');
const querystring = require('querystring');

const etag = require('etag');
const util = require('./util');

//Mock server configuration
const serverConfig = {
    port: 37238,
    address: '127.0.0.1',
};

const server = http.createServer((request, response) => {
    //Same origin
    const requestOrigin = request.headers.referer;
    console.log(requestOrigin);
    response.setHeader('Access-Control-Allow-Origin', requestOrigin.slice(0, requestOrigin.length - 1));
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    console.log(`url:${request.url}`);
    console.log(`method:${request.method}`);
});


server.on('request', (request, response) => {
    const urlObj = urlTool.parse(request.url);

    //Cache Test
    if (urlObj.pathname === '/cache-test') {
        // console.log(request.headers);
        const fileName = util.getMockJsonFileName(urlObj.pathname);
        const fileInfo = [util.readMockJSON(fileName), util.readMockJSONState(fileName)];
        Promise.all(fileInfo).then(resultArr => {
            const [fileContent, fileStats] = resultArr;
            const etagHash = etag(fileContent);
            if (request.headers['if-none-match'] && etagHash === request.headers['if-none-match']) {
                if (request.headers['if-modified-since'] && (fileStats.mtime.toGMTString() === request.headers['if-modified-since'])) {
                    response.writeHead(304);
                    response.end();
                    return;
                }
            }
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=60',
                'Etag': etagHash,
                'Last-Modified': fileStats.mtime.toGMTString(),
            });
            response.end(fileContent);
        });
        return;
    }

    //
    if (urlObj.pathname === '/mutipleRequest') {
        const urlParam = new URLSearchParams(urlTool.parse(request.url).query);
        const index = urlParam.get('index');
        setTimeout(() => {
            response.end(`Response ${index} after 3000ms.`);
        }, 3000);
        return;
    }

    //Match url /jsonp
    if (urlObj.pathname === '/jsonp') {
        const searchParam = new URLSearchParams(urlTool.parse(request.url).query);
        const callbackName = searchParam.get('callback');
        // console.log(request.headers); //Can get cookie..
        if (callbackName) {
            //Mock JSON data
            util.readMockJSON(util.getMockJsonFileName(urlObj.pathname)).then(file => {
                response.writeHead(200, {
                    'Content-Type': 'application/x-javascript',
                    'Cache-Control': 'max-age=60;HttpOnly',
                    'Set-Cookie': 'jwt=EF67672JHHGG',
                });
                response.end(`${callbackName}(${file})`);
            });
        }
        return;
    }

    //Match url /query
    if (urlObj.pathname === '/query') {
        util.readMockJSON('auto-complete.json').then(file => {
            console.log(request.headers);
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=60;HttpOnly',
                'Set-Cookie': 'jwt=EF67672JHHGG',
            });
            response.end(file);
        });
        return;
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
                    'Content-Type': 'application/json',
                })
                response.end(JSON.stringify(queryParam));
            })
        }
        return;
    }
});

server.listen(serverConfig.port, serverConfig.address, () => {
    console.log(`Sever listening on ${serverConfig.address}:${serverConfig.port}.`);
});