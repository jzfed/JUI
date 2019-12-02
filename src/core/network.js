class JSONP {
    constructor({
        url = '',
        data = {},
        callbackName = '',
        callback = () => {},
    } = {}) {
        this.url = url;
        this.data = data;
        this.callbackName = callbackName;
        this.callback = callback;
        if (this.url === '' || this.callbackName === '') {
            return;
        }
        this.init();
    }
    parseData() {
        let url = this.url;
        url = url.indexOf('?') === -1 ? url + '?' : url;
        let dataStringArr = Object.entries(this.data).map(item => {
            return item[0] + '=' + encodeURIComponent(item[1]);
        });
        dataStringArr.push(`callback=${this.callbackName}`);
        url += dataStringArr.join('&');
        return url;
    }
    init() {
        const promise = new Promise((resolve, reject) => {
            this.script = document.createElement('script');
            this.script.defer = true;
            this.script.src = this.parseData();
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
export {
    JSONP,
}