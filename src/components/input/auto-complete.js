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
        this.list.addEventListener('click', this.setValue);
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
        const target = e.target;
        const value = target.textContent;
        this.input.value = value;
        e.preventDefault();
    }
    search() {
        const searchText = this.input.value;
        const searchUrl = this.url + searchText;
        fetch(searchUrl)
            .then(response => response.json())
            .then(json => {
                let htmlString = '';
                json.forEach(item => {
                    const template = `<a href="${item.url}">${item.title}</a>`;
                    htmlString += template;
                });
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