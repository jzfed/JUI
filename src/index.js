//CSS Reset
import 'normalize.css';

//UI Components
//Tip
import {
    Tip
} from './components/tip/tip';
import './components/tip/tip.less';

//Form
import {
    Validate
} from './components/form/validate';

//Auto Complete
import {
    AutoComplete
} from './components/input/auto-complete';

//Util
import {
    Util
} from './util';

//Dragable
import {
    DragAble
} from './components/drag/drag';

//Promise
import {
    PromiseJUI
} from './promise';

//Content
import './components/content/content.less';
import './components/form/form.less';
import './components/button/button.less';
import './components/input/auto-complete.less';

const tip = new Tip();
const formValidationRules = [{
        name: 'username',
        rules: [{
                rule: 'required',
                errMsg: 'This input field is required',
            },
            {
                rule: 'minLength',
                value: 6,
                errMsg: 'This input field must be equal or large than %s',
            },
            {
                rule: 'regexp',
                value: /^[a-zA-Z0-9_-]{6,30}$/,
                errMsg: 'This input field only allow number,charater and dash.',
            }
        ],
    },
    {
        name: 'password',
        rules: [{
            rule: 'required',
            errMsg: 'This input field is required',
        }, ],
    },
    {
        name: 'email',
        rules: [{
                rule: 'required',
                errMsg: 'This input field is required',
            },
            {
                rule: 'regexp',
                value: /[\w-]+@[\w-]+(\.[a-zA-Z]{2,4})?\.[a-zA-z]{2,4}/,
                errMsg: 'This input format is invalid.',
            },
        ],
    }, {
        name: 'information',
        rules: [{
            rule: 'required',
            errMsg: 'This input field is required',
        }]
    }
];

const validate = new Validate({
    container: '.jui-form',
    rules: formValidationRules,
});

const autoComplete = new AutoComplete({
    container: document.querySelector('.jui-ac-con'),
    url: '/mock/autoComplete.json?=',
});

//Debouncing Test
// const log = function () {
//     console.log(new Date());
// }
// const logDeb = Util.debouncing(log, 1000);
// logDeb();
// logDeb();
// logDeb();
// logDeb();
// logDeb();
// logDeb();
// logDeb();
// logDeb();
// setTimeout(() => {
//     logDeb();
// }, 500);

//Throtting Test
// const scrollLog = function () {
//     console.log('Scroll');
// }
// const scrollLogThr = function () {
//     console.log('Scroll with throtting');
// }
// const scrollLogThrotting = Util.throtting(scrollLogThr, 500);
// window.addEventListener('scroll', scrollLog);
// window.addEventListener('scroll', scrollLogThrotting);

//Cache Test
const hashNameConverter = {
    '[object String]': item => item,
    '[object Number]': item => item,
    '[object Boolean]': item => item,
    '[object Undefined]': item => 'undefined',
    '[object Null]': item => 'null',
    '[object Symbol]': item => item.toString(),
    '[object Function]': item => item.name,
    '[object Array]': item => item.toString(),
    '[object Object]': item => JSON.stringify(item),
};

function hashParameter(...args) {
    console.log('args', Object.prototype.toString.call(args)); //Array Object
    // console.dir(args);
    console.log('arguments', Object.prototype.toString.call(arguments)); //Array Liked Object
    // console.dir(arguments);
    // Array.prototype.forEach.call(arguments, item => console.log(item)); //ForEach method inject into array like object.
    const paramStringArr = args.map(item => {
        const itemType = Object.prototype.toString.call(item);
        return hashNameConverter[itemType](item);
    });
    const paramString = paramStringArr.join('');
    console.log(paramString);
}

const paramFunction = () => {};
const paramObject = {};
const paramArray = [];
hashParameter('string', 123, true, Symbol('symName'), undefined, null, paramFunction, paramObject, paramArray);

const highCPUCompute = function (num) {
    let sum = 0;
    for (let i = 0; i < num; i++) {
        sum += i;
    }
    return sum;
}

const highCPUComputeCache = Util.cache(highCPUCompute);
console.time('ComputeCacheTime1');
console.log(highCPUComputeCache(10000));
console.timeEnd('ComputeCacheTime1');
console.time('ComputeCacheTime2');
console.log(highCPUComputeCache(10000));
console.timeEnd('ComputeCacheTime2');

//Curry Test
const sumTest = function (a, b, c) {
    return a + b + c;
}
console.log(sumTest(1, 2, 3));
const sumTestCurry = Util.curry(sumTest);
console.log(sumTestCurry(1)(2)(3));
console.log(sumTestCurry(1)(2, 3));
console.log(sumTestCurry(1, 2, 3));

const sumTestCurry1 = sumTestCurry(1);
console.log(sumTestCurry1(2, 3));
console.log(sumTestCurry1(2)(3));

//Drag
import './components/drag/drag.less';
const dragable = new DragAble({
    container: document.querySelector('.jui-drag-container'),
    selector: '.jui-drag-element',
});

//ForEach return
console.log('--------------------------------------------------------');
const forEachTestArr = [1, 2, 3, 4, 5, 6, 7, 8];
forEachTestArr.forEach((item, index) => {
    if (item === 4) {
        return 4; //Can't return, can't stop the loop.
    }
    console.log(item);
});

//Promise all
const promiseAllTest = [
    Promise.resolve('This is a promise result.'),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Get the result after 1s.');
        }, 1000)
    }),
    'This is a normal string.',
    Promise.reject('Trigger a erreo'),
];

PromiseJUI.all(promiseAllTest).then(results => {
    console.dir(results);
}).catch(err => {
    console.error(err);
});

//Thousand Seperator
console.log(12345679.1234, Util.thousandSeperator(12345679.1234));
console.log(123.1234, Util.thousandSeperator(123.1234));
console.log(1234.1234, Util.thousandSeperator(1234.1234));

//Find value path in object
const findingPathObject = document.body;
const findingName = 'information';

function findingPath(dom, name) {
    const path = [];
    let isMatched = false;

    function find(dom, name) {
        path.push(dom.tagName.toLowerCase() + (dom.hasAttribute('class') ? `.${dom.className.split(' ').join('.')}` : '') + (dom.name ? `[name="${dom.name}"]` : ''));
        if (dom.name === name) {
            isMatched = true;
        } else {
            if (dom.children.length > 0) {
                for (let element of dom.children) {
                    if (find(element, name)) {
                        break;
                    }
                }
            }
        }
        if (isMatched) {
            return isMatched;
        }
        path.pop();
    }
    find(dom, name);
    return path.join('>');
}
console.dir(findingPath(findingPathObject, findingName));