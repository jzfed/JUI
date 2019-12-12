import {
    Util
} from './util';
import {
    Base
} from './core';
import {
    request
} from 'http';

class JSONP extends Base {
    constructor({
        url = '',
        data = {},
        callbackName = '',
        callback = () => {},
    } = {}) {
        super();
        this.url = url.indexOf('?') === -1 ? url + '?' : url;
        this.data = data;
        this.callbackName = callbackName;
        this.callback = callback;
        if (this.url === '' || this.callbackName === '') {
            return;
        }
        this.init();
    }
    init() {
        const promise = new Promise((resolve, reject) => {
            this.script = document.createElement('script');
            this.script.defer = true;
            this.script.src = this.url + Util.convertObjectToURLParamString(this.data, {
                callback: this.callbackName
            });
            document.head.append(this.script);
            this.script.addEventListener('load', (e) => {
                resolve(this.script);
            });
            this.script.addEventListener('error', (err) => {
                reject(err);
            });
        });
        promise.then((script) => {
            this.callback(script);
        }).catch(err => {
            this.callback(err);
        }).finally(() => {
            this.script.remove();
            this.script = null;
        });
    }
}

const maxMultipleRequest = function (urls, maxNumber) {
    if (!Array.isArray(urls)) return;
    if (urls.length < 1) return;
    if (!Number.isInteger(maxNumber)) return;
    return new Promise((resolve, reject) => {
        let sendIndex = 0;
        let sendingCount = 0;
        let fullfilledCount = 0;
        const results = [];
        const request = function () {
            if (sendingCount < maxNumber && sendIndex < urls.length) {
                send(sendIndex);
                sendIndex++
                sendingCount++;
                request();
            }
        }
        const processData = function (err, data, index) {
            if (err) {
                return reject(err);
            }
            results[index] = data;
            fullfilledCount++;
            sendingCount--;
            if (fullfilledCount >= urls.length) {
                resolve(results);
            } else {
                request();
            }
        }
        const send = function (index) {
            const url = urls[index];
            fetch(url).then(response => response.text()).then(data => {
                processData(undefined, data, index);
            }).catch(err => {
                processData(err);
            });
        }
        request();
    });
}

export {
    JSONP,
    maxMultipleRequest,
}