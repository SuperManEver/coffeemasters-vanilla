import ProductItem from './ProductItem.js';

export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });

    this.styles = document.createElement('style');

    this.root.appendChild(this.styles);

    this.loadCSS();
  }

  async loadCSS() {
    const request = await fetch('/components/MenuPage.css');
    const css = await request.text();

    this.styles.textContent = css;
  }

  connectedCallback() {
    const template = document.getElementById('menu-page-template');
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);

    window.addEventListener('appmenuchange', () => {
      this.render();
    });

    this.render();
  }

  render() {
    if (!window.app) {
      return;
    }

    if (window.app.store.menu) {
      this.root.querySelector('#menu').innerHTML = '';

      for (let category of app.store.menu) {
        const liCategory = document.createElement('li');
        liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;
        this.root.querySelector('#menu').appendChild(liCategory);

        // TODO: placeholder

        category.products.map((product) => {
          const item = document.createElement('product-item');
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector('ul').appendChild(item);
        });
      }
    } else {
      this.root.querySelector('#menu').innerHTML = 'Loading';
    }
  }
}

customElements.define('menu-page', MenuPage);
