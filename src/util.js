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
    objType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    },
    hashNameConverter: {
        'String': item => item,
        'Number': item => item,
        'Boolean': item => item,
        'Undefined': item => 'undefined',
        'Null': item => 'null',
        'Symbol': item => item.toString(),
        'Function': item => item.name,
        'Array': item => item.toString(),
        'Object': item => JSON.stringify(item),
    },
    hashParameter(args) {
        const paramStringArr = args.map(item => {
            return this.hashNameConverter[this.objType(item)](item);
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
        return function cur(...args) { //Named Function Expression
            const saveThis = this;
            if (args.length >= fn.length) {
                return fn.apply(saveThis, args);
            }
            return function (...otherArgs) { //Return a function for the next function call to get the parameter.
                return cur.apply(saveThis, args.concat(otherArgs)); //Pass the merged parameter to the next call by using the recursion. 
            }
        }
    },
    deepClone(obj) {

        //Primitives
        if (
            Util.objType(obj) === 'String' ||
            Util.objType(obj) === 'Number' ||
            Util.objType(obj) === 'Boolean' ||
            Util.objType(obj) === 'Undefined' ||
            Util.objType(obj) === 'Null'
        ) {
            return obj;
        }

        //Array
        if (Util.objType(obj) === 'Array') {
            // copy[key] = obj[key].slice(0);
            return obj.map(element => {
                return Util.deepClone(element);
            });

        }

        //Object
        if (Util.objType(obj) === 'Object') {
            const copy = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const cloneValue = obj[key];
                    copy[key] = Util.deepClone(cloneValue);
                }
            }
            return copy;
        }

        //Function

        //Date

        //DOM

        //RegExp

        //Map

        //Set
    }
}
export {
    Util,
}