import 'jsdom-global/register';
import {
    expect
} from 'chai';

import {
    Tip
} from '../src/components/tip/tip';

import {
    Util
} from '../src/core/util';

const deepCloneTestObject = {
    a: 1,
    b: {
        c: 'string',
        d: {
            e: [1, 2, 3]
        }
    },
    f: ['test'],
    g: {
        e: {
            h: [
                null,
                {
                    i: undefined,
                }
            ]
        }
    },
    j: {
        k: null,
    }
}

deepCloneTestObject.j.k = deepCloneTestObject.j;
deepCloneTestObject.f[1] = deepCloneTestObject.f

console.dir(Util.deepClone(deepCloneTestObject));

const urlString = 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries?key1=value1&key2=value2#abcd';
const urlParamObject = {
    query: {
        key1: 'value1',
        key2: 'value2',
    },
    hash: 'abcd'
}

describe('JUI Test Case', function () {
    describe('Tip', function () {
        it('Tip instance test.', function () {
            expect(new Tip()).to.be.an.instanceof(Tip);
        });
    });


    describe('Util.deepClone', function () {
        it('Simple data test.', function () {
            expect(Util.deepClone(deepCloneTestObject)).to.deep.equal(deepCloneTestObject);
        })
    })


    describe('Util.convertURLParamStringToObject', function () {
        it('Convert an URL string to parameter object.', function () {
            expect(Util.convertURLParamStringToObject(urlString)).to.deep.equal(urlParamObject);
        })
    })
});