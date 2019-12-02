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
});