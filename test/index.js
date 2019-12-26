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


describe('JUI Test Case', function () {
    describe('Tip', function () {
        it('Tip instance test.', function () {
            expect(new Tip()).to.be.an.instanceof(Tip);
        });
    });

    describe('Util.deepClone', function () {
        it('Simple data test.', function () {
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
            // console.dir(Util.deepClone(deepCloneTestObject));
            expect(Util.deepClone(deepCloneTestObject)).to.deep.equal(deepCloneTestObject);
        });
    });

    describe('Util.convertURLParamStringToObject', function () {
        it('Convert an URL string to parameter object.', function () {
            const urlString = 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries?key1=value1&key2=value2#abcd';
            const urlParamObject = {
                query: {
                    key1: 'value1',
                    key2: 'value2',
                },
                hash: 'abcd'
            }
            expect(Util.convertURLParamStringToObject(urlString)).to.deep.equal(urlParamObject);
        });
    });

    describe('Thousand Seperator', function () {
        it('Big float.', function () {
            expect(Util.thousandSeperator(12345679.1234)).to.equal('12,345,679.1234');
        });
        it('Small float 123.1234.', function () {
            expect(Util.thousandSeperator(123.1234)).to.equal('123.1234');
        });
        it('Small float 1234.1234.', function () {
            expect(Util.thousandSeperator(1234.1234)).to.equal('1,234.1234');
        });
    });

    describe('Covert function parameter to string.', function () {
        it('Complex parameter test.', function () {
            const paramFunction = () => {};
            const paramObject = {};
            const paramArray = [];
            expect(Util.hashParameter(['string', 123, true, Symbol('symName'), undefined, null, paramFunction, paramObject, paramArray])).to.equal('string123trueSymbol(symName)undefinednullparamFunction{}');
        });
    });


});