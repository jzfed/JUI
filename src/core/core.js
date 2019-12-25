import {
    debug
} from './debug';

//Global static method
class JUI {
    static mixin(originalClass, ...mixObjects) {
        Object.assign(originalClass.prototype, ...mixObjects);
    }

}

//Event emitter
class EventEmitter {
    constructor() {
        this.listener = {

        };
    }
    on(eventName, callback, onceFlag) {
        if (!(eventName in this.listener)) {
            this.listener[eventName] = [];
        }
        if (onceFlag) {
            if (!callback.__JUIOnceFlag__) {
                callback.__JUIOnceFlag__ = true;
                return this.listener[eventName].push(callback);
            }
        } else {
            this.listener[eventName].push(callback);
        }

    }
    off(eventName, callback) {
        if (eventName in this.listener) {
            const callbackIndex = this.listener[eventName].indexOf(callback);
            if (callbackIndex !== -1) {
                this.listener[eventName].splice(callbackIndex, 1);
            }
        }
    }
    delegate(eventName, ...args) {
        if (eventName in this.listener) {
            this.listener[eventName].forEach((item, index) => {
                item.apply(this, args);
                if (item.__JUIOnceFlag__) {
                    delete item.__JUIOnceFlag__;
                    this.listener[eventName].splice(index, 1);
                }
            });
        }
    }
    once(eventName, callback) {
        this.on(eventName, callback, true);
    }
    empty() {
        this.listener = null;
    }
}

//Base class
class Base extends EventEmitter {
    constructor() {
        super();
    }
    init() {
        this.beforeBind();
        this.bindEvent();
        this.delegate('render');
    }
    render() {
        this.log('This is the base log.');
    }
    beforeBind() {

    }
    bindEvent() {
        this.on('render', this.render);
    }
    destory() {
        this.off('render');
        this.empty();
    }
}

//Mixin with debug module, mutiple class extends
JUI.mixin(Base, debug);

export {
    JUI,
    Base,
}