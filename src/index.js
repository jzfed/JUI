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
import {
    FormRequest
} from './components/form/form-request';

//Auto Complete
import {
    AutoComplete
} from './components/input/auto-complete';

//Util
import {
    Util
} from './core/util';

//Dragable
import {
    DragAble
} from './components/drag/drag';

//Promise
import {
    JUIPromise,
    JUIFetch,
    JUITemplate,
} from './core/polyfill';

//Content
import './components/content/content.less';
import './components/form/form.less';
import './components/button/button.less';
import './components/input/auto-complete.less';

//Tip
// const tip = new Tip();

//Scroll Tools
import {
    ScrollLoad,
    IsInSight,
} from './components/scroll/scroll';

//Network
import {
    JSONP,
    maxMultipleRequest,
} from './core/network';

//Form validation
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

//Form AJAX Request
const formRequest = new FormRequest({
    container: document.querySelector('.form-container'),
    callback: (data) => {
        console.log(data);
    }
});

//Auto Complete
const autoComplete = new AutoComplete({
    container: document.querySelector('.jui-ac-con'),
    url: 'http://localhost:37238/query?=',
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
    enterDropTarget: (dropTarget) => {
        dropTarget.classList.add('can-drop');
    },
    leaveDropTarget: (dropTarget) => {
        dropTarget.classList.remove('can-drop');
    },
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
    Promise.reject('Trigger a error'),
];

JUIPromise.all(promiseAllTest).then(results => {
    console.dir(results);
}).catch(err => {
    console.error(err);
});

//Fetch data
JUIFetch('http://localhost:37238/cache-test').then(data => {
    console.log('JUIFetchData:', data);
});


//Thousand Seperator
console.log(12345679.1234, Util.thousandSeperator(12345679.1234));
console.log(123.1234, Util.thousandSeperator(123.1234));
console.log(1234.1234, Util.thousandSeperator(1234.1234));






//Text limitation
const textLimiationDom = document.querySelector('.text-limitation');
// Util.textLimitation(textLimiationDom);
Util.textLimitation(textLimiationDom, 2);

//Sroll load
const scrollInElementContainer = document.querySelector('.scroll-in-element');
const scrollLoadInElement = new ScrollLoad({
    container: scrollInElementContainer,
    callback: (con) => {
        con.textContent += con.textContent;
    }
});
const scrollLoadInDoc = new ScrollLoad({
    callback: (con) => {
        console.log('load')
        const body = con.querySelector('body');
        const scrollLoadElement = document.createDocumentFragment();
        scrollLoadElement.append(document.createElement('hr'));
        const p = document.createElement('p');
        scrollLoadElement.append(p);
        p.innerText = 'Scroll load content.';
        scrollLoadElement.append(p);
        document.body.append(scrollLoadElement);
    }
});

//Is element in sight
const scrollIsInSightElement = document.querySelector('.scroll-is-in-sight');
const isInSight = new IsInSight({
    element: scrollIsInSightElement,
    callback: (element) => {
        element.innerHTML = 'This element is in sight.'
    }
});

//JSONP
window.test = function (data) {
    // alert(JSON.stringify(data, null, 4));
}
//<script defer src="http://127.0.0.1:37238/jsonp?abc=123&callback=test"></script>
const jsonp = new JSONP({
    url: 'http://127.0.0.1:37238/jsonp',
    data: {
        abc: 123
    },
    callbackName: 'test',
    callback: (data) => {
        jsonp.log(data);
    }
});

//Mutiple Request
const urls = [
    'http://127.0.0.1:37238/mutipleRequest?index=0',
    'http://127.0.0.1:37238/mutipleRequest?index=1',
    'http://127.0.0.1:37238/mutipleRequest?index=2',
    'http://127.0.0.1:37238/mutipleRequest?index=3',
    'http://127.0.0.1:37238/mutipleRequest?index=4',
    'http://127.0.0.1:37238/mutipleRequest?index=5',
    'http://127.0.0.1:37238/mutipleRequest?index=6',
    'http://127.0.0.1:37238/mutipleRequest?index=7',
    'http://127.0.0.1:37238/mutipleRequest?index=8',
    'http://127.0.0.1:37238/mutipleRequest?index=9',
    'http://127.0.0.1:37238/mutipleRequest?index=10',
    'http://127.0.0.1:37238/mutipleRequest?index=11',
    'http://127.0.0.1:37238/mutipleRequest?index=12',
];
maxMultipleRequest(urls, 5).then(results => {
    console.log(results);
}).catch(err => {
    alert(err);
});

//Template test
const templateObj = {
    data: {
        templateName: 'Jason',
        templateHi: 'Hello,',
    },
    template: '${templateHi} My name is ${templateName}. Glad to see you.'
}
console.log(JUITemplate(templateObj));


//This bind test
const testFn = function () {
    console.log(this);
}
const submitButton = document.querySelector('.jui-button');
submitButton.addEventListener('click', testFn);

//
const urlString = 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries?key1=value1&key2=value2&cnname=%E5%BC%A0%20%E9%BE%99#abcd';
console.log(Util.convertURLParamStringToObject(urlString));