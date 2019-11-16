import {
    Util
} from '../../core/util';
class IsInSight {
    constructor({
        element = null,
        callback = () => {},
    } = {}) {
        this.element = element;
        this.callback = callback;
        this.isInSight = this.isInSight.bind(this);
        this.isInSight = Util.debouncing(this.isInSight);
        this.init();
    }
    init() {
        this.bindEvent();
    }
    bindEvent() {
        window.addEventListener('scroll', this.isInSight);
    }
    isInSight(e) {
        const {
            top,
            left,
            height,
        } = this.element.getBoundingClientRect();
        if (top < 0 && top + height >= 0) {
            return this.callback(this.element);
        }
        if (top >= 0 && top <= document.documentElement.clientHeight) {
            return this.callback(this.element);
        }
    }
}

class ScrollLoad {
    constructor({
        container = document.documentElement,
        callback = () => {},
        bottomDistance = 100,
        debouncingRate = 200,
    } = {}) {
        this.container = container;
        this.callback = callback;
        this.callbackDeb = Util.debouncing(this.callback, debouncingRate);
        this.bottomDistance = bottomDistance;
        this.scrollLoad = this.scrollLoad.bind(this);
        this.init();
        this.scrollLoad();
    }
    init() {
        this.bindEvent();
    }
    scrollLoad(e) {
        if (this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop <= this.bottomDistance) {
            this.callbackDeb(this.container);
        }
    }
    hasScrollBar() {
        return this.container.scrollHeight > this.container.offsetHeight;
    }
    bindEvent() {
        if (this.container === document.documentElement) {
            return window.addEventListener('scroll', this.scrollLoad);
        }
        this.container.addEventListener('scroll', this.scrollLoad);
    }
}

export {
    IsInSight,
    ScrollLoad,
}