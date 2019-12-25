import {
    Base
} from '../../core/core';

class Validate extends Base {
    constructor({
        container = document.body,
        rules = []
    } = {}) {
        super();
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.rules = rules;
        if (this.rules.length === 0) return;
        this.pass = false;
        this.lastError = null;
        this.validatorConfig = {
            'required': function (inputValue) {
                if (inputValue === '') {
                    return false;
                }
                return true;
            },
            'minLength': function (inputValue, length) {
                if (inputValue.length < length) {
                    return false;
                }
                return true;
            },
            'regexp': function (inputValue, regexp) {
                if (regexp.test(inputValue)) {
                    return true;
                }
                return false;
            },
        }
        this.init();

    }
    init() {
        this.log('rules', this.rules);
        if (this.container.tagName.toLowerCase() === 'form' && this.container.classList.contains('jui-form')) {
            this.container.classList.add('jui-validate');
        }
        this.preventSubmit = this.preventSubmit.bind(this);
        this.bindEvent();
    }
    validate() {
        for (let elementRules of this.rules) {
            if (!this.validateRule(elementRules)) {
                return;
            }
        }
        this.clearErrorMsg();
        this.pass = true;
    }
    validateRule(elementRules) {
        const inputDom = this.container.elements[elementRules.name];
        const inputValue = inputDom.value;
        for (let ruleObj of elementRules.rules) {
            if (!this.validator(ruleObj, inputValue)) {
                this.showErrorMsg(inputDom, ruleObj.errMsg, ruleObj.value);
                return false;
            }
        }
        return true;
    }
    validator(ruleObj, inputValue) {
        const ruleName = ruleObj.rule;
        const ruleValue = ruleObj.value || '';
        const validateResult = this.validatorConfig[ruleName](inputValue, ruleValue);
        if (!validateResult) {
            return false;
        }
        return true;
    }
    clearErrorMsg() {
        this.lastError.classList.remove('jui-input-error');
        this.lastError.querySelector('.jui-validate-msg').remove();
        this.lastError = null;
    }
    showErrorMsg(inputDom, errMsg, ruleValue) {
        if (this.lastError) {
            this.clearErrorMsg();
        }
        const inputContainer = inputDom.closest('.jui-form-group');
        const errHtmlString = `<div class="jui-validate-msg">
            ${errMsg.replace(/%s/g, ruleValue)}
        </div>`;
        inputContainer.classList.add('jui-input-error');
        inputContainer.insertAdjacentHTML('beforeend', errHtmlString);
        this.lastError = inputContainer;
    }
    preventSubmit(e) {
        this.validate();
        if (!this.pass) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }
    bindEvent() {
        this.container.addEventListener('submit', this.preventSubmit);
    }
}

export {
    Validate,
}