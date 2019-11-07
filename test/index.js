import 'jsdom-global/register';
import {
    expect
} from 'chai';

import {
    Tip
} from '../src/components/tip/tip';

import {
    Util
} from '../src/util';

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
                    i: undefined
                }
            ]
        }
    }
}

console.dir(Util);

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