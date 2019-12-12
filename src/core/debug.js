import {
    Util,
} from './util';
const debug = {
    log(...info) {
        const timestamp = Util.formateTime(new Date(), 'YYYY/MM/DD hh:mm:ss:sss');
        console.log(`[%c${this.constructor.name}%c][%c${timestamp}%c]`, 'color: seagreen', 'color: lightgray', 'color: deepskyblue', 'color: lightgray', );
        console.log.apply(undefined, info);
    }
};

export {
    debug,
}