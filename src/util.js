const Util = {
    debouncing(fn, time) {
        let timer;
        return function (...args) {
            const saveThis = this;
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(saveThis, args);
                }, time);
            } else {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(saveThis, args);
                }, time);
            }
        }
    },
    throtting(fn, time) {
        let cooldown = true;
        return function (...args) {
            if (!cooldown) {
                return;
            }
            const saveThis = this;
            fn.apply(saveThis, args);
            cooldown = false;
            setTimeout(() => {
                cooldown = true;
            }, time);
        }
    },
    delay(fn, time) {
        return function (...args) {
            setTimeout(() => {
                fn.apply(this, args);
            }, time);
        }
    },
    hashNameConverter: {
        '[object String]': item => item,
        '[object Number]': item => item,
        '[object Boolean]': item => item,
        '[object Undefined]': item => 'undefined',
        '[object Null]': item => 'null',
        '[object Symbol]': item => item.toString(),
        '[object Function]': item => item.name,
        '[object Array]': item => item.toString(),
        '[object Object]': item => JSON.stringify(item),
    },
    hashParameter(args) {
        const paramStringArr = args.map(item => {
            const itemType = Object.prototype.toString.call(item);
            return this.hashNameConverter[itemType](item);
        });
        const paramString = paramStringArr.join('');
        return paramString;
    },
    cache(fn) {
        let cache = {};
        const util = this;
        return function (...args) {
            const saveThis = this;
            const key = util.hashParameter(args);
            if (cache.hasOwnProperty(key)) {
                return cache[key];
            }
            return cache[key] = fn.apply(saveThis, args);
        }
    },
}
export {
    Util,
}