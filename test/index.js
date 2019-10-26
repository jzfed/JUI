import 'jsdom-global/register';
import {
    expect
} from 'chai';
import {
    Tip
} from '../src/components/tip/tip';
describe('JUI Test Case', function () {
    describe('#Tip', function () {
        it('Tip instance test.', function () {
            expect(new Tip()).to.be.an.instanceof(Tip);
        });
    });
});