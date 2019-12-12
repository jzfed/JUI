const PromiseJUI = {
    all(promises) {
        return new Promise((resolve, reject) => {
            const results = [];
            if (promises.length === 0) return resolve(results);
            let fullfilledCount = 0;
            const processResult = function (result, i) {
                results[i] = result;
                fullfilledCount++;
                if (fullfilledCount === promises.length) {
                    resolve(results);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                let promise = promises[i];
                if (!(promise instanceof Promise)) {
                    promise = Promise.resolve(promise);
                }
                promise.then(result => {
                    processResult(result, i);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    },
}
window.Promise.all = window.Promise.all || PromiseJUI;
const JUIFetch = function (url, method = 'GET') {
    return new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        XHR.open(method, url);
        XHR.send();
        XHR.addEventListener('load', (data) => {
            if (XHR.status === 200 && XHR.readyState === 4) {
                const responseHeader = XHR.getAllResponseHeaders().split('\n').reduce((acc, cur) => {
                    const [key, value] = cur.split(': ');
                    if (key) {
                        acc[key] = value.trim();
                    }
                    return acc;
                }, {});
                if (responseHeader['content-type'] === 'application/json') {
                    return resolve(JSON.parse(XHR.response));
                }
                resolve(XHR.response);
            }

        });
        XHR.addEventListener('error', (err) => {
            reject(err);
        });
    });
}
export {
    PromiseJUI,
    JUIFetch,
}