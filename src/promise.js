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
    }
}
export {
    PromiseJUI,
}