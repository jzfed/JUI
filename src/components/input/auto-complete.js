import {
    Util
} from '../../util';

class AutoComplete {
    constructor({
        container = document.body,
        url = '',
    } = {}) {
        this.container = container;
        this.url = url;
        this.input = container.querySelector('input');
        this.list = container.querySelector('.jui-ac-list');
        this.input.setAttribute('autocomplete', 'off');
        this.bindChange = this.bindChange.bind(this);
        this.unbindChange = this.unbindChange.bind(this);
        this.setValue = this.setValue.bind(this);
        this.search = this.search.bind(this);
        this.debSearch = Util.debouncing(this.search, 1000);
        this.init();
    }
    init() {
        this.list.style.width = this.input.clientWidth + 'px';
        this.list.style.left = this.input.getBoundingClientRect().left + 'px';
        this.bindEvent();
    }
    bindEvent() {
        this.input.addEventListener('focus', this.bindChange);
        this.list.addEventListener('mousedown', this.setValue);
        this.input.addEventListener('blur', this.unbindChange);
    }
    bindChange() {
        this.showList();
        this.input.addEventListener('input', this.debSearch);
    }
    unbindChange() {
        this.input.removeEventListener('input', this.debSearch);
        this.hideList();
    }
    setValue(e) {
        const target = e.target.closest('li');
        const value = target.textContent;
        // this.input.focus();
        this.input.value = value;

    }
    search() {
        const searchText = this.input.value;
        const searchUrl = this.url + searchText;
        const regExp = new RegExp(`(${searchText})`, 'g');
        fetch(searchUrl)
            .then(response => response.json())
            .then(json => {
                let htmlString = '<ul>';
                json.forEach(item => {
                    const template = `<li value="${item.url}">${item.title.replace(regExp, '<span>$1</span>')}</li>`;
                    htmlString += template;
                });
                htmlString += '<ul>';
                this.list.innerHTML = '';
                this.list.insertAdjacentHTML('beforeend', htmlString);
                this.showList();
            });
    }
    showList() {
        this.list.classList.add('show');
    }
    hideList() {
        this.list.classList.remove('show');
    }
}
export {
    AutoComplete,
}