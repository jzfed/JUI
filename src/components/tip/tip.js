class Tip {
    constructor() {

        this.tipOffsetTop = 5;
        this.hideDelay = 2000;
        this.target = null;
        this.timmer = null;

        this.showTip = this.showTip.bind(this);
        this.hideTip = this.hideTip.bind(this);

        this.render();
        this.bindEvent();

    }
    render() {
        const tipDom = document.querySelector('.jui-tip');
        if (!tipDom) {
            const template = `<div class="jui-tip"></div>`;
            document.body.insertAdjacentHTML('beforeend', template);
        }
        this.tipDom = document.querySelector('.jui-tip');
    }
    showTip(e) {
        const target = e.target;
        if ((target.hasAttribute('data-tip') && this.target !== target)) {
            console.log('mouseover');
            this.showTipDom(target);
            const tipConfig = JSON.parse(target.dataset.tip.replace(/\'/g, '"'));
            if (tipConfig.hasOwnProperty('tipText')) {
                this.tipDom.innerHTML = tipConfig.tipText || '';
            }
            if (tipConfig.hasOwnProperty('tipDom')) {
                let tipContentDom = null;
                if (typeof tipConfig.tipDom === 'boolean') {
                    tipContentDom = target.querySelector('.jui-tip-dom').cloneNode(true);
                }
                if (typeof tipConfig.tipDom === 'string') {
                    tipContentDom = document.querySelector(tipConfig.tipDom).cloneNode(true);
                }
                this.tipDom.innerHTML = '';
                this.tipDom.append(tipContentDom);
            }

            const tipOffsetTop = target.offsetHeight;
            const {
                left: x,
                top: y,
            } = target.getBoundingClientRect();
            this.tipDom.style.transform = `translate(${x}px, ${y + tipOffsetTop + this.tipOffsetTop}px)`;
        }
        if (target.closest('.jui-tip') && this.target !== target) {
            this.showTipDom();
        }
    }
    hideTip(e) {
        const target = e.relatedTarget;
        if (target === null) return;
        if (!target.hasAttribute('data-tip') && !target.closest('[data-tip]') && !target.closest('.jui-tip')) {
            console.log('mouseout');
            this.timmer = setTimeout(() => this.hideTipDom(), this.hideDelay);
        }
    }
    showTipDom(target) {
        if (target) {
            this.tipDom.classList.add('show');
            this.target = target;
        }
        clearTimeout(this.timmer);

    }
    hideTipDom() {
        this.tipDom.classList.remove('show');
        this.target = null;
    }
    bindEvent() {
        document.addEventListener('mouseover', this.showTip);
        document.addEventListener('mouseout', this.hideTip);
    }
}
export {
    Tip,
}