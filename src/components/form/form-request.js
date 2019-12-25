import {
    Base
} from '../../core/core';

class FormRequest extends Base {
    constructor({
        container = document.body,
        callback = () => {},
    } = {}) {
        super();
        this.container = container;
        this.callback = callback;
        this.form = this.container.querySelector('form');
        this.sendData = this.sendData.bind(this);
        this.init();
    }
    init() {
        this.bindEvent();
    }
    sendData(e) {
        fetch(this.form.action, {
            method: 'POST',
            body: this.formatFormData(), // data can be `string` or {object}!
            credentials: 'include',
        }).then(response => {
            return response.json();
        }).then(data => {
            this.callback(data);
        }).catch(err => {
            this.callback(null, err);
        });
        e.preventDefault();
    }
    formatFormData() {
        const formData = new URLSearchParams();
        Array.from(this.form.elements).forEach(element => { //The elements is HTMLCollections object, it is a array-liked object. 
            if (element.hasAttribute('name')) {
                const elementName = element.getAttribute('name');
                formData.append(elementName, element.value);
                // console.log(elementName);
                // console.log(element.value);
            }
        });
        // console.log('Form Data:');
        // for (let value of formData.values()) {
        //     console.log(value);
        // }
        return formData.toString();
    }
    bindEvent() {
        this.form.addEventListener('submit', this.sendData);
    }

}
export {
    FormRequest,
}