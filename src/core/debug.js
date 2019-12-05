import {
    Util,
} from './util';
const debug = {
    log(...info) {
        const timestamp = Util.formateTime(new Date(), 'YYYY/MM/DD hh:mm:ss:sss');
        console.log(`[${this.constructor.name}][${timestamp}]`);
        console.log.apply(undefined, info);
    }
};

export {
    debug,
}