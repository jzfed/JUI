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
    curry(fn) {
        // let allArgs = []; //
        // return function cur(...args) {
        //     const saveThis = this;
        //     allArgs = allArgs.concat(args);
        //     if (allArgs.length === fn.length) {
        //         const result = fn.apply(saveThis, allArgs);
        //         allArgs.length = 0;
        //         return result;
        //     }
        //     return cur; //Return a function for the next function call to get the parameter.
        // }
        return function cur(...args) {
            const saveThis = this;
            if (args.length >= fn.length) {
                return fn.apply(saveThis, args);
            }
            return function (...otherArgs) { //Return a function for the next function call to get the parameter.
                return cur.apply(saveThis, args.concat(otherArgs)); //Pass the merged parameter to the next call. 
            }
        }
    }
}
export {
    Util,
}